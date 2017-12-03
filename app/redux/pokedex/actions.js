import { createAction } from 'redux-act'

export const searchByName = {
  pending: createAction('Search pokemons by name'),
  success: createAction('Pokemons for live-search were fetched'),
  failure: createAction('There was an error searching pokemons by name')
}

export const fetchList = {
  pending: createAction('Fetch N page of pokemons'),
  success: createAction('Page with pokemons was fetched'),
  failure: createAction('There was an error fetching pokemons')
}
