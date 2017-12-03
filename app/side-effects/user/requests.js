//  @flow

import request from 'superagent'
import endpoints from '../../../etc/endpoints'

type Response = Object | string

export const logout = (): Promise<void> => (
  new Promise((resolve, reject) => {
    request
      .post(endpoints.auth.logout.frontend)
      .end((err: string, res: Object) => {
        if (err) return reject(err)
        return resolve()
      })
  })
)

type Params = {
  pokemonId: number
}

export const add = (params: Params): Promise<Response> => (
  new Promise((resolve, reject) => {
    request
      .post(endpoints.addPokemonToFavorite.frontend)
      .send(params)
      .end((err: string, res: Object) => {
        if (err) return reject(err)
        return resolve(res.body)
      })
  })
)

export const remove = (params: Params): Promise<Response> => (
  new Promise((resolve, reject) => {
    request
      .post(endpoints.removePokemonFromFavorite.frontend)
      .send(params)
      .end((err: string, res: Object) => {
        if (err) return reject(err)
        return resolve(res.body)
      })
  })
)
