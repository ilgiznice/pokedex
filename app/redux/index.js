import { combineReducers } from 'redux'
import pokedexState from './pokedex'
import userState from './user'

export default combineReducers({
  pokedex: pokedexState,
  user: userState
})
