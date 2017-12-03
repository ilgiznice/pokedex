//  @flow

import { createSelector } from 'reselect'

const getPokemons: Object => Array<Object> = state => state.pokedex.pokemons.result
const getFavoritePokemons: Object => Array<number> = state => state.user.favoritePokemons

export const getPokemonsConnectedToUser = createSelector(
  getPokemons,
  getFavoritePokemons,
  (pokemons: Array<Object>, favoritePokemons: Array<number>) => pokemons.map((pokemon: Object) => {
    pokemon.isFavorite = false
    if (favoritePokemons.includes(pokemon.id)) {
      pokemon.isFavorite = true
    }
    return pokemon
  })
)

export const getUserFavoritePokemons = createSelector(
  getPokemons,
  getFavoritePokemons,
  (pokemons: Array<Object>, favoritePokemons: Array<number>) => pokemons.filter((pokemon: Object) => {
    return favoritePokemons.includes(pokemon.id)
  })
)
