//  @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPokemonsConnectedToUser, getUserFavoritePokemons } from '../../services/reselect'
import Item from './item/index.jsx'

import './index.scss'

type Pokemon = {
  id: number,
  name: string,
  types: Array<string>,
  height: number,
  weight: number,
  sprites: {
    front_default: string
  },
  isFavorite: boolean
} 

const Grid = ({ pokemons }: { pokemons: Array<Pokemon> }) => (
  <div className="row grid">
    {pokemons.map((pokemon: Pokemon) => (
      <div className="col-sm-12 col-md-4" key={pokemon.id}>
        <Item pokemon={pokemon} passingChangingPropSoComponentUpdates={pokemon.isFavorite} />
      </div>
    ))}
  </div>
)

const mapStateToProps = (state, ownProps) => (
  {
    pokemons: (() => {
      if (ownProps.favorite) {
        return getUserFavoritePokemons(state)
      }
      return getPokemonsConnectedToUser(state)
    })()
  }
)

const mapDispatchToProps = dispatch => (
  {
    //
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)
