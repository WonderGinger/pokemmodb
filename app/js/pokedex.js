const $ = require('jquery')
require('bootstrap')
var dt = require('datatables.net-bs4')(window, $)
var pokedexObj = require('./app/pokedex/pokemmo_min.json')
var pool = require('./app/pokedex/custom_pool.json')
var tableFull

$(document).ready(function () {
  // populateTable(pool)
  initTable(pokedexObj)
})

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function sortTotalDefault (stats) {
  let sum = 0
  for (let stat of stats) sum += stat.base_stat
  return sum
}

/**
 *  TODO: Analytics table
*/
function initTable (pokedex) {
  console.log(pokedex)
  tableFull = $('#table').DataTable({
    'dom': '<"top"f>rt<"bottom"f><"clear">',
    'paging': false,
    'columnDefs': [
      { 'orderData': [ 4, 10 ], 'targets': 4 },
      {
        'targets': [ 3 ],
        'visible': false
      }
    ],
    'language': {
      search: '_INPUT_',
      searchPlaceholder: 'Search pokedex'
    }
  })
  populateTable({
    pokedex: pokedexObj,
    total: (stats) => sortTotalDefault(stats)
  })
}

$('#full').click(() => {
  tableFull.clear()
  populateTable({
    pokedex: pokedexObj,
    total: (stats) => sortTotalDefault(stats)
  })
})
$('#reduced').click(() => {
  tableFull.clear()
  populateTable({
    pokedex: pool,
    total: (stats) => sortTotalDefault(stats)
  })
})

$('#default-sort').click(() => {
  tableFull.rows().every(function () {
    let data = this.data()
    data[4] = data[5] + data[6] + data[7] + data[8] + data[9] + data[10]
    this.data(data)
  }).draw()
})

$('#atk-sort').click(() => {
  tableFull.rows().every(function () {
    let data = this.data()
    data[4] = data[4] - Math.min(data[6], data[8])
    this.data(data)
  }).draw()
})

function populateTable (options) {
  let pokedex = options.pokedex
  $.each(pokedex, function (i, item) {
    let total = 0
    for (let j = 0; j <= 5; j++) total += pokedex[i].stats[j].base_stat
    total = options.total(pokedex[i].stats)

    let name = pokedex[i].species.name
    name = capitalize(name)

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

    tableFull.row.add([
      pokedex[i].id,
      `<a href="https://pokemondb.net/pokedex/${name}">${name}</a>`,
      types,
      `${abilities} ${moves} ${typeLiterals}`,
      total,
      pokedex[i].stats[5].base_stat,
      pokedex[i].stats[4].base_stat,
      pokedex[i].stats[3].base_stat,
      pokedex[i].stats[2].base_stat,
      pokedex[i].stats[1].base_stat,
      pokedex[i].stats[0].base_stat
    ])
  })
  tableFull.draw()
  $('td').addClass('align-middle')
}
