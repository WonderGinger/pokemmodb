const fs = require('fs')
var pokedexFull = require('./app/pokedex/pokemmo_full.json')
var customNames = require('./app/pokedex/custom_names.json')
var pokedexReduced
var customPool = []
$(document).ready(function () {
  // pokedexReduced = trimDex(pokedexFull)
  // fillPool(pokedexReduced)
  // fs.writeFileSync('./app/pokedex/pokemmo_min.json', JSON.stringify(pokedexReduced))
  // fs.writeFileSync('./app/pokedex/custom_pool.json', JSON.stringify(customPool))
})

function trimDex (pokedex) {
  for (let entry of pokedex) {
    trimEntry(entry)
  }
  return pokedex
}

function trimEntry (entry) {
  for (let move of entry.moves) {
    delete move.version_group_details
    delete move.move.url
  }
}

function fillPool (pokedex) {
  for (let drop of customNames) {
    addDrop(drop)
  }
}

function addDrop (name) {
  for (let entry of pokedexFull) {
    if (entry.name === name) {
      customPool.push(entry)
    }
  }
}
