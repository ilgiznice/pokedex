import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { logout, add, remove } from './requests'
import { logout as logoutAction, addToFavorite, removeFromFavorite } from '../../redux/user/actions'


function * actionLogout () {
  try {
    yield call(logout)
    window.location = '/'
  } catch (err) {
    alert('There was an error logging out')
  }
}

function * actionAdd (action) {
  try {
    const res = yield call(add, action.payload)
    yield put(addToFavorite.success(res))
  } catch (err) {
    yield put(addToFavorite.failure(err))
  }
}

function * actionRemove (action) {
  try {
    const res = yield call(remove, action.payload)
    yield put(removeFromFavorite.success(res))
  } catch (err) {
    yield put(removeFromFavorite.failure(err))
  }
}

function * watchLogout () {
  yield * takeLatest(logoutAction.getType(), actionLogout)
}

function * watchAdd () {
  yield * takeEvery(addToFavorite.pending.getType(), actionAdd)
}

function * watchRemove () {
  yield * takeEvery(removeFromFavorite.pending.getType(), actionRemove)
}

export default [
  watchLogout,
  watchAdd,
  watchRemove
]
