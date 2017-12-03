//  @flow

import React from 'react'
import jquery from 'jquery'
import Select2 from 'react-select2-wrapper'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { defaultPageSize, allowedPageSizes } from '../../../../../etc/pagination'
import { fetchList } from '../../../../redux/pokedex/actions'

import 'react-select2-wrapper/css/select2.min.css'
import './index.scss'

type Props = {
  pageSize: number,
  changePageSize: number => void
}

const FilterPages = ({ pageSize, changePageSize }: Props) => (
  <div className="filter-pages">
    <Select2
      defaultValue={Cookies.get('pageSize') || defaultPageSize}
      data={allowedPageSizes}
      onSelect={(e) => {
        const selectedPageSize = e.params.data.text
        Cookies.set('pageSize', selectedPageSize)
        changePageSize(selectedPageSize)
      }}
      options={
        {
          placeholder: 'Pokemons on page',
          width: 230,
          height: 38
        }
      }
    />
  </div>
)

const mapStateToProps = state => (
  {
    pageSize: state.pokedex.pokemons.pageSize,
    types: state.pokedex.pokemons.types
  }
)

const mapDispatchToProps = dispatch => (
  {
    changePageSize: (page: number, types: Array<string>) => (pageSize: number) => dispatch(fetchList.pending({ page, pageSize, types }))
  }
)

const mergeProps = (stateProps, dispatchProps) => (
  {
    pageSize: stateProps.pageSize,
    changePageSize: dispatchProps.changePageSize(1, stateProps.types)
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FilterPages)
