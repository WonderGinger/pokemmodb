const $ = require('jquery')
var Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

function loadDex () {
  return fs.readFileAsync('./app/pokedex/pokemmo_min.json')
}

window.onload = () => {
  loadDex().then((pokedex) => {
    console.log(pokedex)
  })
}
