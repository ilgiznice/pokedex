const Pokemon = require('../models/pokemon')
const User = require('../models/user')
const logger = require('../config/logger')

const pokemonsCount = {}

async function getPokemonsCount ({ alias = 'total', condition = null }) {
  try {
    if (pokemonsCount[alias]) return pokemonsCount[alias]
    pokemonsCount[alias] = await Pokemon.count(condition)
    return pokemonsCount[alias]
  } catch (err) {
    logger.error(err)
    throw new Error('There was an error counting pokemons')
  }
}

async function getPokemonList ({ pageSize, page, types }) {
  try {
    const queryParams = { pageSize, page }
    if (types && types.length) {
      queryParams.condition = { types: { $in: types } }
    }
    const result = await Pokemon.all(queryParams)
    const countParams = {}
    if (types) {
      countParams.alias = types.sort().join(',')
      countParams.condition = queryParams.condition
    }
    const totalItems = await getPokemonsCount(countParams)
    return {
      page,
      pageSize,
      types,
      result,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize)
    }
  } catch (err) {
    logger.error('getPokemonList', err)
    throw new Error('There was an error getting pokemons')
  }
}

async function getPokemonsByName ({ name }) {
  try {
    const regex = new RegExp(name.toLowerCase())
    const condition = { name: { $regex: regex } }
    const result = await Pokemon.all({ condition })
    const totalItems = await getPokemonsCount({ alias: regex, condition })
    return {
      result,
      totalItems
    }
  } catch (err) {
    logger.error('getPokemonsByName', err)
    throw new Error('There was an error getting pokemons by name')
  }
}

let typesCache = []

async function getPokemonTypes () {
  try {
    if (typesCache.length) return typesCache
    const types = await Pokemon.types()
    typesCache = types
      .reduce((prev, curr) => [...prev, ...curr.types], [])
      .filter((type, i, self) => self.indexOf(type) === i)
      .sort()
    return typesCache
  } catch (err) {
    logger.error('getPokemonTypes', err)
    throw new Error('There was an error getting pokemon types')
  }
}

async function getPokemonById (id) {
  try {
    const pokemon = await Pokemon.get(id)
    return pokemon
  } catch (err) {
    logger.error('getPokemonById', err)
    throw new Error('There was an error getting pokemon by id')
  }
}

async function addFavoritePokemon ({ userId, pokemonId }) {
  try {
    const userCollection = await User.get(userId)
    const user = userCollection[0]
    user.favoritePokemons = [...user.favoritePokemons, pokemonId]
    await User.update(user)
    return user
  } catch (err) {
    logger.error('addFavoritePokemon', err)
    throw new Error('There was an error adding pokemon to your favorites')
  }
}

async function removeFavoritePokemon ({ userId, pokemonId }) {
  try {
    const userCollection = await User.get(userId)
    const user = userCollection[0]
    user.favoritePokemons = user.favoritePokemons.filter(id => id !== pokemonId)
    await User.update(user)
    return user
  } catch (err) {
    logger.error('removeFavoritePokemon', err)
    throw new Error('There was an error removing pokemon from your favorites')
  }
}

module.exports = {
  getPokemonList: getPokemonList,
  getPokemonsByName: getPokemonsByName,
  getPokemonTypes: getPokemonTypes,
  getPokemonById: getPokemonById,
  addFavoritePokemon: addFavoritePokemon,
  removeFavoritePokemon: removeFavoritePokemon
}
