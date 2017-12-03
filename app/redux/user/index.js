//  @flow

import { createReducer } from 'redux-act'
import * as actions from './actions'
import * as handlers from './handlers'

type State = {
  err: Array<string>,
  id: ?number,
  name: ?string,
  photo?: string,
  favoritePokemons: Array<number>
}

const defaultState: State = {
  err: [],
  id: null,
  name: null,
  favoritePokemons: []
}

export default createReducer({
  [actions.addToFavorite.success]: handlers.favorites.success,
  [actions.addToFavorite.failure]: handlers.favorites.failure,
  [actions.removeFromFavorite.success]: handlers.favorites.success,
  [actions.removeFromFavorite.failure]: handlers.favorites.failure
}, defaultState)
