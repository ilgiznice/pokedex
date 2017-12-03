//  @flow

type State = {
  err: Array<string>,
  name: string,
  photo: string,
  favoritePokemons: Array<number>
}

type Response = {
  name: string,
  favoritePokemons: Array<number>
}

export const favorites = {
  success: (state: State, payload: Response) => (
    {
      ...state,
      ...payload
    }
  ),
  failure: (state: State, payload: string) => (
    {
      ...state,
      err: [...state.err, payload]
    }
  )
}
