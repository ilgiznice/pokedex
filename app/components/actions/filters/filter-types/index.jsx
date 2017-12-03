//  @flow

import React from 'react'
import jquery from 'jquery'
import Select2 from 'react-select2-wrapper'
import { connect } from 'react-redux'
import { fetchList, manageTypes } from '../../../../redux/pokedex/actions'

import 'react-select2-wrapper/css/select2.min.css'
import './index.scss'

type Props = {
  types: Array<string>,
  selectedTypes: Array<string>,
  fetch: Array<string> => void,
  addType: string => void,
  removeType: string => void
}

const FilterTypes = ({ types, selectedTypes, fetch, addType, removeType }: Props) => (
  <div className="filter-types">
    <Select2
      multiple
      defaultValue={selectedTypes}
      data={types}
      onSelect={(e) => {
        const selectedType = e.params.data.text
        fetch([...selectedTypes, selectedType])
      }}
      onUnselect={(e) => {
        const unselectedType = e.params.data.text
        fetch(selectedTypes.filter(type => type !== unselectedType))
      }}
      options={
        {
          placeholder: 'Filter by types',
          width: 300
        }
      }
    />
  </div>
)

const mapStateToProps = state => (
  {
    pageSize: state.pokedex.pokemons.pageSize,
    types: state.pokedex.types,
    selectedTypes: state.pokedex.pokemons.types
  }
)

const mapDispatchToProps = dispatch => (
  {
    fetch: (page: number, pageSize: number) => (types: Array<string>) => dispatch(fetchList.pending({ page, pageSize, types })),
    addType: (type: string) => dispatch(manageTypes.add(type)),
    removeType: (type: string) => dispatch(manageTypes.remove(type))
  }
)

const mergeProps = (stateProps, dispatchProps) => (
  {
    types: stateProps.types,
    selectedTypes: stateProps.selectedTypes,
    fetch: dispatchProps.fetch(1, stateProps.pageSize),
    addType: dispatchProps.addType,
    removeType: dispatchProps.removeType
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FilterTypes)
