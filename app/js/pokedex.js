const $ = require('jquery')
var Pokedex = require('pokedex-promise-v2')
var Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
var pokedex150to237 = []
var jsonEntries
let options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  timeout: 600 * 1000
}
var P = new Pokedex(options)

function loadDex () {
  return fs.readFileAsync('./app/pokedex/pokemmo_min.json')
}
function getMon (id) {
  P.getPokemonByName(id)
    .then(function (response) {
      console.log(response)
      pokedex150to237.push(response)
      return response
    })
    .catch(function (error) {
      console.log('There was an ERROR: ', error)
    })
}

function getDex (entries) {
  let promises = []
  let i = 1
  let end = 75
  for (let entry of entries.slice(150)) {
    promises.push(getMon(entry.id))
    i++
    if (i > end) return Promise.all(promises)
  }
  return Promise.all(promises)
}

var doneWriting = false
window.onload = () => {
  if (doneWriting) return
  loadDex().then((data) => {
    let pokemmoMin = JSON.parse(data)
    console.log(pokemmoMin)
    jsonEntries = pokemmoMin

    console.log('dex length: ', pokemmoMin.length)
    // try { fs.openSync('./app/pokedex/pokemmo_full.txt', 'wx') } catch (e) { console.log(e) }

    getDex(pokemmoMin).then((pokedex) => {
      console.log(pokedex)
      // pokedex1to75 = pokedex
      doneWriting = true
    }, (err) => {
      throw err
    })
  }, (err) => {
    throw err
  })
}

function saveDex () {
  fs.writeFile('./app/pokedex/pokedex150-237.txt', JSON.stringify(pokedex150to237), (err) => { console.log('Failed to save', err) })
}
