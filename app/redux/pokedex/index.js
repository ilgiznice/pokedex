//  @flow

import { createReducer } from 'redux-act'
import * as actions from './actions'
import * as handlers from './handlers'
import { defaultPage, defaultPageSize } from '../../../etc/pagination'

type State = {
  err: Array<string>,
  types: Array<string>,
  liveSearch: {
    loaded: boolean,
    result: Array<Object>,
    totalItems: number
  },
  pokemons: {
    loaded: boolean,
    result: Array<Object>,
    types: Array<string>,
    page: number,
    pageSize: number,
    totalItems: number,
    totalPages: number
  }
}

const defaultReducer: State = {
  err: [],
  types: [],
  liveSearch: {
    loaded: true,
    result: [],
    totalItems: 0
  },
  pokemons: {
    loaded: true,
    result: [],
    types: [],
    page: defaultPage,
    pageSize: defaultPageSize,
    totalItems: 0,
    totalPages: 1
  }
}

export default createReducer({
  [actions.searchByName.pending]: handlers.searchByName.pending,
  [actions.searchByName.success]: handlers.searchByName.success,
  [actions.searchByName.failure]: handlers.searchByName.failure,
  [actions.fetchList.pending]: handlers.fetchList.pending,
  [actions.fetchList.success]: handlers.fetchList.success,
  [actions.fetchList.failure]: handlers.fetchList.failure
}, defaultReducer)
