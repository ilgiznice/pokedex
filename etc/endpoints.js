module.exports = {
  pokemonList: {
    frontend: '/api/pokemons',
    backend: '/pokemons'
  },
  pokemonsByName: {
    frontend: name => `/api/pokemons/name/${name}`,
    backend: '/pokemons/name/:name'
  },
  pokemonById: {
    frontend: id => `/api/pokemon/${id}`,
    backend: '/pokemon/:id'
  },
  addPokemonToFavorite: {
    frontend: '/api/user/add/pokemon',
    backend: '/user/add/pokemon'
  },
  removePokemonFromFavorite: {
    frontend: '/api/user/remove/pokemon',
    backend: '/user/remove/pokemon'
  },
  auth: {
    logout: {
      frontend: '/auth/logout',
      backend: '/logout'
    },
    facebook: {
      request: '/facebook',
      response: '/facebook/callback'
    },
    google: {
      request: '/google',
      response: '/google/callback'
    },
    vk: {
      request: '/vk',
      response: '/vk/callback'
    }
  }
}
