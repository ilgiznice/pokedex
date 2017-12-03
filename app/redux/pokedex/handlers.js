//  @flow

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

type Response = {
  totalItems: number,
  totalPages?: number,
  page: number,
  pageSize: number,
  types?: Array<string>,
  result: Array<Object>
}

export const searchByName = {
  pending: (state: State) => (
    {
      ...state,
      liveSearch: {
        ...state.liveSearch,
        loaded: false
      }
    }
  ),
  success: (state: State, payload: Response) => (
    {
      ...state,
      liveSearch: {
        ...state.liveSearch,
        loaded: true,
        result: payload.result,
        totalItems: payload.totalItems
      }
    }
  ),
  failure: (state: State, payload: string) => (
    {
      ...state,
      err: [...state.err, payload],
      liveSearch: {
        ...state.liveSearch,
        loaded: true
      }
    }
  )
}

export const fetchList = {
  pending: (state: State) => (
    {
      ...state,
      pokemons: {
        ...state.pokemons,
        loaded: false
      }
    }
  ),
  success: (state: State, payload: Response) => (
    {
      ...state,
      pokemons: {
        ...state.pokemons,
        loaded: true,
        page: payload.page,
        pageSize: payload.pageSize,
        types: payload.types,
        result: payload.result,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages
      }
    }
  ),
  failure: (state: State, payload: string) => (
    {
      ...state,
      err: [...state.err, payload],
      pokemons: {
        ...state.pokemons,
        loaded: true
      }
    }
  )
}
