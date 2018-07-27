const $ = require('jquery')
require('bootstrap')
var dt = require('datatables.net-bs4')(window, $)
var pokedexObj = require('./app/pokedex/pokemmo_min.json')
var pool = require('./app/pokedex/custom_pool.json')
var table

$(document).ready(function () {
  // populateTable(pool)
  populateTable(pokedexObj)
})

function populateTable (pokedex) {
  console.log(pokedex)
  var trHTML = ''
  $.each(pokedex, function (i, item) {
    let total = 0
    for (j = 0; j <= 5; j++) {
      total += pokedex[i].stats[j].base_stat
    }
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
    trHTML += '<tr><td class="align-middle">' + pokedex[i].id +
      '</td><td class="align-middle">' + `<a href="https://pokemondb.net/pokedex/${name}">${name}</a>` + '</td>' +
      '</td><td class="align-middle">' + types + '</td>' +
      // HIDDEN COLUMN FOR SEARCHING [ 3 ]
      '</td><td>' + abilities + moves + typeLiterals + '</td>' +

      '</td><td class="align-middle">' + total + '</td>' +
      '</td><td class="align-middle">' + pokedex[i].stats[5].base_stat + '</td>' +
      '</td><td class="align-middle">' + pokedex[i].stats[4].base_stat + '</td>' +
      '</td><td class="align-middle">' + pokedex[i].stats[3].base_stat + '</td>' +
      '</td><td class="align-middle">' + pokedex[i].stats[2].base_stat + '</td>' +
      '</td><td class="align-middle">' + pokedex[i].stats[1].base_stat + '</td>' +
      '</td><td class="align-middle">' + pokedex[i].stats[0].base_stat + '</td>' +

      '</tr>'
  })
  $('#table').append(`<tbody>${trHTML}</tbody>`)
  table = $('#table').DataTable({
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
}

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function sortDex (data) {
  data.sort((a, b) => {
    return a.id - b.id
  })
}
