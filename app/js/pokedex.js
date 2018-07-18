const $ = require('jquery')
require('bootstrap')
var dt = require('datatables.net-bs4')(window, $)
var pokedexObj = require('./app/pokedex/pokemmo_min.json')
var pool = require('./app/pokedex/custom_pool.json')

$(document).ready(function () {
  populateTable(pool)
  // populateTable(pokedexObj)
})

function populateTable (pokedex) {
  console.log(pokedex)
  var trHTML = ''
  // $('#table').empty()
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
      // HIDDEN COLUMNS FOR SEARCHING [ 3, 4 ]
      '</td><td class="align-middle">' + abilities + '</td>' +
      '</td><td class="align-middle">' + moves + '</td>' +

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
  $('#table').DataTable({
    'dom': 'lfrtip',
    'paging': false,
    'columnDefs': [
      { 'orderSequence': ['desc'], 'targets': [ 3, 4, 5, 6, 7, 8, 9 ] },
      {
        'targets': [ 3 ],
        'visible': false
      },
      {
        'targets': [ 4 ],
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
