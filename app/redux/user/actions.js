import { createAction } from 'redux-act'

export const addToFavorite = {
  pending: createAction('Add pokemon to favorites', (id) => ({ pokemonId: id })),
  success: createAction('Pokemon was added to your favorites'),
  failure: createAction('There was an error adding pokemon to favorites')
}

export const removeFromFavorite = {
  pending: createAction('Remove pokemon from favorites', (id) => ({ pokemonId: id })),
  success: createAction('Pokemon was removed from your favorites'),
  failure: createAction('There was an error removing pokemon from favorites')
}

export const logout = createAction('Logout user')
