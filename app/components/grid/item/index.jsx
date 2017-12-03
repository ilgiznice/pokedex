//  @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { update } from '../../../redux/pokedex/actions'
import { addToFavorite, removeFromFavorite } from '../../../redux/user/actions'

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
  isFavorite: boolean,
  loaded: boolean
}

const makeNameFirstLetterUpperCase = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

type Props = {
  pokemon: Pokemon,
  isUserLogged: boolean,
  add: number => void,
  remove: number => void
}

const Item = ({ pokemon, isUserLogged, add, remove }: Props) => (
  <div className="item">
    <img src={pokemon.sprites.front_default} alt="Pokemon photo" />
    {
      isUserLogged && (
        <span>
          {
            pokemon.isFavorite
              ?
              <i
                className="fa fa-star fa-2x favorite active"
                aria-hidden="true"
                onClick={() => remove(pokemon.id)}
              />
              :
              <i
                className="fa fa-star fa-2x favorite"
                aria-hidden="true"
                onClick={() => add(pokemon.id)}
              />
          }
        </span>
      )
    }
    <Link to={`/pokemon/${pokemon.id}`} href={`/pokemon/${pokemon.id}`}>
      <h3 className="name">{makeNameFirstLetterUpperCase(pokemon.name)}</h3>
    </Link>
    <h4 className="types">
      {pokemon.types.join(', ')}
    </h4>
    <h5 className="height">{pokemon.height} cm.</h5>
    <h5 className="weight">{pokemon.weight} g.</h5>
  </div>
)

const mapStateToProps = (state: Object) => (
  {
    isUserLogged: state.user.name !== null
  }
)

const mapDispatchToProps = (dispatch: () => void) => (
  {
    add: (id: number) => dispatch(addToFavorite.pending(id)),
    remove: (id: number) => dispatch(removeFromFavorite.pending(id))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
