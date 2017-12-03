//  @flow

const pokedex = require('../services/pokedex')
const { defaultPageSize, defaultPage } = require('../../etc/pagination')

type Request = {
  req: {
    query: {
      pageSize: number,
      page: number,
      types: string | Array<string>,
    },
    params: {
      name: string,
      id: number | string
    },
    body: {
      pokemonId: number
    },
    session: Object
  },
  res: Object
}

async function getPokemonsRequest ({ req: { query: { pageSize, page, types } }, res }: Request) {
  try {
    pageSize = parseInt(pageSize, 10) || defaultPageSize
    page = parseInt(page, 10) || defaultPage
    if (types && typeof types === 'string') {
      types = types.split(',')
    }
    const pokemonList = await pokedex.getPokemonList({ pageSize, page, types })
    res.status(200).json(pokemonList)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getPokemonsByNameRequest ({ req: { params: { name } }, res }: Request) {
  try {
    const pokemonList = await pokedex.getPokemonsByName({ name })
    res.status(200).json(pokemonList)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getPokemonByIdRequest ({ req: { params: { id } }, res }: Request) {
  try {
    id = parseInt(id, 10) || 1
    const pokemon = await pokedex.getPokemonById(id)
    res.status(200).send(pokemon)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addPokemonToFavoriteRequest ({ req, res }: Request) {
  try {
    if (!req.session.user) return res.status(401).send('User is not authorized')
    if (!req.body.pokemonId) return res.status(400).send('Pokemon id is not specified')
    const userId = req.session.user.id
    const pokemonId = req.body.pokemonId
    const user = await pokedex.addFavoritePokemon({ userId, pokemonId })
    req.session.user = user
    const { name, photo, favoritePokemons } = user
    res.status(200).json({ name, photo, favoritePokemons })
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removePokemonFromFavoriteRequest ({ req, res }: Request) {
  try {
    if (!req.session.user) return res.status(401).send('User is not authorized')
    if (!req.body.pokemonId) return res.status(400).send('Pokemon id is not specified')
    const userId = req.session.user.id
    const pokemonId = req.body.pokemonId
    const user = await pokedex.removeFavoritePokemon({ userId, pokemonId })
    req.session.user = user
    const { id, name, favoritePokemons } = user
    res.status(200).json({ id, name, favoritePokemons })
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getPokemonsRequest = getPokemonsRequest
exports.getPokemonsByNameRequest = getPokemonsByNameRequest
exports.getPokemonByIdRequest = getPokemonByIdRequest
exports.addPokemonToFavoriteRequest = addPokemonToFavoriteRequest
exports.removePokemonFromFavoriteRequest = removePokemonFromFavoriteRequest
