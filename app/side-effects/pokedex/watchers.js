import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { getPokemonList, getPokemonsByName } from './requests'
import { fetchList, searchByName } from '../../redux/pokedex/actions'

function * actionSearch (action) {
  try {
    const res = yield call(getPokemonsByName, action.payload.name)
    yield put(searchByName.success(res))
  } catch (err) {
    yield put(searchByName.failure(err))
  }
}

function * actionFetch (action) {
  try {
    const res = yield call(getPokemonList, action.payload)
    yield put(fetchList.success(res))
  } catch (err) {
    yield put(fetchList.failure(err))
  }
}

function * watchSearch () {
  yield * takeLatest(searchByName.pending.getType(), actionSearch)
}

function * watchFetch () {
  yield * takeLatest(fetchList.pending.getType(), actionFetch)
}

export default [
  watchSearch,
  watchFetch
]
