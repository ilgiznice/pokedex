//  @flow

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import jquery from 'jquery'
import { searchByName } from '../../../redux/pokedex/actions'

import './index.scss'

type Pokemon = {
  id: number,
  name: string,
  sprites: {
    front_default: string
  }
}

type Props = {
  pokemons: Array<Pokemon>,
  search: string => void
}

/**
 * Hide live-search if clicked outside of it
 */
jquery(document).click((e) => {
  const liveSearchContainer = jquery('.actions-search')[0]
  let node = e.target
  while (node != null) {
    if (node === liveSearchContainer) {
      return true
    }
    node = node.parentNode
  }
  jquery('.live-search').removeClass('active')
})

const makeNameFirstLetterUpperCase = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

const Search = ({ pokemons, search }: Props) => (
  <div className="col-sm-12 col-md-6 actions-search">
    <div className="row">
      <div className="col-sm-12">
        <form className="" role="search">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type a pokemon name"
              onFocus={() => {
                jquery('.live-search').addClass('active')
              }}
              onChange={(e) => {
                const value = e.target.value
                search(value)
              }}
            />
          </div>
        </form>
      </div>
      <div className={`live-search ${pokemons.length && 'active'}`}>
        {pokemons.map((pokemon: Pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} href={`/pokemon/${pokemon.id}`}>
            <div className="item">
              <img src={pokemon.sprites.front_default} alt="Pokemon image" height="70" />
              <span>{makeNameFirstLetterUpperCase(pokemon.name)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
)

const mapStateToProps = state => (
  {
    pokemons: state.pokedex.liveSearch.result
  }
)

const mapDispatchToProps = dispatch => (
  {
    search: name => dispatch(searchByName.pending({ name }))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
