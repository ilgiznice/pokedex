//  @flow

import request from 'superagent'
import CacheModule from 'cache-service-cache-module'
import CachePlugin from 'superagent-cache-plugin'
import endpoints from '../../../etc/endpoints'

const cache = new CacheModule({ storage: 'local', defaultExpiration: 24 * 60 * 60 })
const superagent_cache = CachePlugin(cache)

type Response = Object | string

type Params = {
  pageSize: number,
  page: number,
  types?: Array<string> | string
}

export const getPokemonList = ({ pageSize, page, types }: Params): Promise<Response> => (
  new Promise((resolve, reject) => {
    if (types && types instanceof Array) types = types.join(',')
    const query = {
      pageSize,
      page,
      types
    }
    request
      .get(endpoints.pokemonList.frontend)
      .query(query)
      .use(superagent_cache)
      .end((err: string, res: Object) => {
        if (err) return reject(err)
        return resolve(res.body)
      })
  })
)

export const getPokemonsByName = (name: string): Promise<Response> => (
  new Promise((resolve, reject) => {
    request
      .get(endpoints.pokemonsByName.frontend(name))
      .use(superagent_cache)
      .end((err: string, res: Object) => {
        if (err) return reject(err)
        return resolve(res.body)
      })
  })
)
