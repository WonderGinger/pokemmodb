
let $ = require('jquery')
$(document).ready(function () {
  $.getJSON('pokedex/pokemmo_min.json', function (json) {
    // console.log(json);
    populateTable(json)
  })
  // var b2w2 = $.getJSON("/pokedex/b2w2.json", function(json){
  //     console.log(json.pokemon_entries);
  // populateTable(fixjson(json.pokemon_entries));
  // let mons = [];
  // let counter = 0;
  // $.getJSON("http://pokeapi.salestock.net/api/v2/pokemon/eevee", function(mon){
  //     mons.push(mon);
  //     console.log(mons);
  //     counter++;
  //     if(counter == 2) {
  //         download(JSON.stringify(mons), "mons.txt", "text");
  //     }
  // });
  // $.getJSON("http://pokeapi.salestock.net/api/v2/pokemon/jolteon", function(mon){
  //     mons.push(mon);
  //     console.log(mons);
  //     counter++;
  //     if(counter == 2) {
  //         download(JSON.stringify(mons), "mons.txt", "text");
  //     }
  // });

  // });
})

function populateTable (json) {
  var data = [
    {
      'id': 507,
      'name': 'herdier',
      'total': 370,
      'hp': 65,
      'atk': 80,
      'def': 65,
      'spa': 35,
      'spd': 65,
      'spe': 60
    }
  ]
  $('#pokedex').bootstrapTable({
    // data: json,
    data: json,
    striped: true,
    pagination: false,
    columns: [{
      field: 'id',
      title: '#',
      align: 'left',
      sortable: true
    }, {
      field: 'name',
      title: 'Name',
      align: 'left',
      sortable: true
    }, {
      field: 'total',
      title: 'Total',
      align: 'center',
      sortable: true,
      order: 'desc'
    }, {
      field: 'hp',
      title: 'HP',
      align: 'center',
      sortable: true,
      order: 'desc'
    }, {
      field: 'atk',
      title: 'Atk',
      align: 'center',
      sortable: true,
      order: 'desc'
    }, {
      field: 'def',
      title: 'Def',
      align: 'center',
      sortable: true,
      order: 'desc'
    }, {
      field: 'spa',
      title: 'SpA',
      align: 'center',
      sortable: true,
      order: 'desc'
    }, {
      field: 'spd',
      title: 'SpD',
      align: 'center',
      sortable: true,
      order: 'desc'
    }, {
      field: 'spe',
      title: 'Spe',
      align: 'center',
      sortable: true,
      order: 'desc'
    }]
  })
}

function fixjson (entries) {
  let pokedex = []
  let counter = 0
  for (i = 0; i < entries.length; i++) {
    let current = entries[i]
    let currentName = current.pokemon_species.name
    $.getJSON('http://pokeapi.salestock.net/api/v2/pokemon/' + currentName, function (json) {
      console.log(json)
      let base_hp = json.stats[5].base_stat
      let base_atk = json.stats[4].base_stat
      let base_def = json.stats[3].base_stat
      let base_spa = json.stats[2].base_stat
      let base_spd = json.stats[1].base_stat
      let base_spe = json.stats[0].base_stat
      let base_total = base_hp + base_atk + base_def + base_spa + base_spd + base_spe

      pokedex.push({
        'id': json.id,
        'name': json.name,
        'total': base_total,
        'hp': base_hp,
        'atk': base_atk,
        'def': base_def,
        'spa': base_spa,
        'spd': base_spd,
        'spe': base_spe
      })
      console.log(pokedex)
      counter++
      console.log(counter + ' / ' + entries.length)
      download(JSON.stringify(pokedex), 'emerald_full.json', 'json')
    })
  }
  return pokedex
}

function download (text, name, type) {
  var a = document.getElementById('a')
  var file = new Blob([text], {type: type})
  a.href = URL.createObjectURL(file)
  a.download = name
}
