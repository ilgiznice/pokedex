const pokedex = require('../services/pokedex')
const markup = require('../services/markup')
const { defaultPageSize, defaultPage } = require('../../etc/pagination')

async function getIndexRequest ({ req, res }) {
  try {
    const pageSize = parseInt(req.cookies.pageSize, 10) || defaultPageSize
    const pokemons = await pokedex.getPokemonList({ pageSize, page: defaultPage })
    const types = await pokedex.getPokemonTypes()
    const state = { pokemons, types }
    if (req.session && req.session.user) {
      const { name, photo, favoritePokemons } = req.session.user
      state.user = { name, photo, favoritePokemons }
    }
    res.status(200).send(markup(state))
  } catch (err) {
    res.status(500).send('There was an error rendering index page')
  }
}

exports.getIndexRequest = getIndexRequest
