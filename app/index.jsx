import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//  PAGES
import Index from './pages/index'
import Profile from './pages/profile'
import Detailed from './pages/detailed'

//  Redux
import reducers from './redux'
import sagas from './side-effects'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

const initialState = window.__INITIAL_STATE__
const state = store.getState()
state.pokedex.pokemons = { ...state.pokemons, ...initialState.pokemons }
state.pokedex.types = initialState.types
if (initialState.user) {
  state.user = { ...state.user, ...initialState.user }
}

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/profile" component={Profile} />
        <Route path="/pokemon/:id" component={Detailed} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
)
