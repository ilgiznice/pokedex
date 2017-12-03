import { fork } from 'redux-saga/effects'
import pokedexSagas from './pokedex/watchers'
import userSagas from './user/watchers'

const sagas = [...pokedexSagas, ...userSagas]

export default function * async () {
  yield sagas.map(saga => fork(saga))
}
