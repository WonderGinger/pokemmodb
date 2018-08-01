const $ = require('jquery')
require('bootstrap')
var dt = require('datatables.net-bs4')(window, $)
var pokedexObj = require('./app/pokedex/pokemmo_min.json')
var pool = require('./app/pokedex/custom_pool.json')
var dataTable
var currentDex = pokedexObj
var data = []
const { remote } = require('electron')
const { BrowserWindow } = remote

var sortHP = true
var sortAtk = true
var sortDef = true
var sortSpa = true
var sortSpd = true
var sortSpe = true
$(document).ready(function () {
  $('#sort-hp').click(function () {
    sortHP = !sortHP
  })
  $('#sort-atk').click(function () {
    sortAtk = !sortAtk
  })
  $('#sort-def').click(function () {
    sortDef = !sortDef
  })
  $('#sort-spa').click(function () {
    sortSpa = !sortSpa
  })
  $('#sort-spd').click(function () {
    sortSpd = !sortSpd
  })
  $('#sort-spe').click(function () {
    sortSpe = !sortSpe
  })
  $('.sort-button').click(function () {
    updateSort()
  })
  initTable(pokedexObj)

  $('#full').click(() => {
    dataTable.clear()
    let updatedData = populateTable({
      pokedex: pokedexObj,
      total: (stats) => sortTotalDefault(stats)
    })
    dataTable.rows.add(updatedData).draw()
    $('td').addClass('align-middle')
  })
  $('#reduced').click(() => {
    dataTable.clear()
    let updatedData = populateTable({
      pokedex: pool,
      total: (stats) => sortTotalDefault(stats)
    })
    dataTable.rows.add(updatedData).draw()
    $('td').addClass('align-middle')
  })
})

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function sortTotalDefault (stats) {
  let sum = 0
  for (let stat of stats) sum += stat.base_stat
  return sum
}

function sortStats (stats) {
  return sortSpe * stats[0].base_stat +
    sortSpd * stats[1].base_stat +
    sortSpa * stats[2].base_stat +
    sortDef * stats[3].base_stat +
    sortAtk * stats[4].base_stat +
    sortHP * stats[5].base_stat
}

function createEntryPage (entry) {
  let win = new BrowserWindow({
    width: 1200,
    height: 900
  })
  win.on('closed', () => {
    win = null
  })
}

function initTable (pokedex) {
  console.log(pokedex)
  let initialData = populateTable({
    pokedex: pokedexObj,
    total: (stats) => sortTotalDefault(stats)
  })
  dataTable = $('#table').DataTable({
    'destroy': true,
    'data': initialData,
    'dom': `<'top'<'row'fl>>rt<'bottom'<'row'flp>><'clear'>`,
    'paging': false,
    'columnDefs': [
      // When sorting by Total, sort by speed second.
      { 'targets': 4,
        'orderData': [ 4, 10 ]
      },
      // Metadata column invisible
      {
        'targets': [ 3 ],
        'visible': false
      },
      {
        'targets': 0,
        'className': 'cell-num cell-fixed img-fluid'
      },
      {
        'targets': [ 1, 2 ],
        'width': '10%'
      }
    ],
    'language': {
      search: '_INPUT_',
      searchPlaceholder: 'Search pokedex'
    }
  })
  $('td').addClass('align-middle')
}

function updateSort () {
  dataTable.clear()
  let updatedData = populateTable({
    pokedex: currentDex,
    total: (stats) => sortStats(stats)
  })
  dataTable.rows.add(updatedData).draw()
}

function populateTable (options) {
  data = []
  options = options === undefined ? {} : options
  let pokedex = currentDex = options.pokedex === undefined ? pokedexObj : options.pokedex
  $.each(pokedex, function (i, item) {
    let id = pokedex[i].id += ''
    while (id.length < 3) id = '0' + id

    let total = 0
    for (let j = 0; j <= 5; j++) total += pokedex[i].stats[j].base_stat
    total = options.total(pokedex[i].stats)

    let name = pokedex[i].species.name
    name = capitalize(name)

    let idCell =
    `<span class="infocard-cell-img">
        <img src="${pokedex[i].sprites.front_default}" class="img-fixed icon-pkmn" alt="${name} icon">
      </span>
      <span class="infocard-cell-data">${id}</span>`

    let types = ''
    for (let type of pokedex[i].types) {
      types += `<span class="type ${type.type.name}">${type.type.name}</span></br>`
    }

    let typeLiterals = ''
    for (let type of pokedex[i].types) {
      typeLiterals += `${type.type.name}-type `
    }

    let abilities = ''
    for (let ability of pokedex[i].abilities) {
      abilities += `${ability.ability.name} `
    }

    let moves = ''
    for (let move of pokedex[i].moves) {
      moves += `${move.move.name} `
    }
    data.push([
      idCell,
      `<a id="entry-${i}" href="#">${name}</a>`,
      // https://pokemondb.net/pokedex/${name}
      types,
      `${abilities} ${moves} ${typeLiterals}`,
      total,
      pokedex[i].stats[5].base_stat,
      pokedex[i].stats[4].base_stat,
      pokedex[i].stats[3].base_stat,
      pokedex[i].stats[2].base_stat,
      pokedex[i].stats[1].base_stat,
      pokedex[i].stats[0].base_stat])
  })
  return data
}
