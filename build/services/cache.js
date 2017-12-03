const request = require('request')
const Pokemon = require('../models/pokemon').Model
const logger = require('../config/logger')

async function sendRequest (url, qs = {}) {
  return new Promise((resolve, reject) => {
    const config = {
      url,
      qs
    }
    request.get(config, (err, res, body) => {
      if (err) return reject(err)
      console.log(body)
      try {
        resolve(JSON.parse(body))
      } catch (err) {
        reject(err)
      }
    })
  })
}

async function getPokemonList () {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon'
    const qs = { offset: 940 }
    const pokemonList = await sendRequest(url, qs)
    await Promise.all(pokemonList.results.map(async ({ url }) => {
      const pokemonData = await sendRequest(url)
      const stats = {}
      pokemonData.stats.forEach((stat) => {
        stats[stat.stat.name] = {
          base: stat.base_stat,
          effort: stat.effort
        }
      })
      const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types.map(type => type.type.name),
        height: pokemonData.height,
        weight: pokemonData.weight,
        sprites: {
          front_default: pokemonData.sprites.front_default
        },
        stats: {
          speed: stats.speed,
          specialDefense: stats['special-defense'],
          specialAttack: stats['special-attack'],
          defense: stats.defense,
          attack: stats.attack,
          hp: stats.hp
        }
      }
      await Pokemon.update({ id: pokemonData.id }, pokemon, { upsert: true }).exec()
    }))
  } catch (err) {
    logger.error('cache', err)
  }
}

module.exports = {
  getPokemonList: getPokemonList
}
