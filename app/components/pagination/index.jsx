//  @flow

import React from 'react'
import { connect } from 'react-redux'
import { fetchList } from '../../redux/pokedex/actions'

import './index.scss'

const getNearestPages = (page: number, totalPages: number) => {
  const pages = []
  if (page - 2 > 1) pages.push(page - 2)
  if (page - 1 > 1) pages.push(page - 1)
  if (page !== 1 && page !== totalPages) pages.push(page)
  if (page + 1 < totalPages) pages.push(page + 1)
  if (page + 2 < totalPages) pages.push(page + 2)
  return pages
}

type Props = {
  currentPage: number,
  totalPages: number,
  fetch: number => void
}

const Pagination = ({ currentPage, totalPages, fetch }: Props) => {
  if (totalPages === 1) return null
  const pages: Array<number> = getNearestPages(currentPage, totalPages)
  const firstPageDots: boolean = pages[0] > 2
  const lastPageDots: boolean = pages[pages.length - 1] < totalPages - 1
  const isPageActive = (page: number): string => currentPage === page ? 'active' : ''
  return (
    <div className="pagination">
      <ul>
        <li
          className={`page first-page ${isPageActive(1)}`}
        >
          <a
            href="javascript:void(0)"
            onClick={() => {
              if (currentPage !== 1) fetch(1)
            }}
          >1</a>
        </li>
        {firstPageDots && <li className="page dots" />}
        {pages.map((page: number) => (
          <li
            className={`page ${isPageActive(page)}`} key={page}
          >
            <a
              href="javascript:void(0)"
              onClick={() => {
                if (currentPage !== page) fetch(page)
              }}
            >{page}</a>
          </li>
        ))}
        {lastPageDots && <li className="page dots" />}
        <li
          className={`page last-page ${isPageActive(totalPages)}`}
        >
          <a
            href="javascript:void(0)"
            onClick={() => {
              if (currentPage !== totalPages) fetch(totalPages)
            }}
          >{totalPages}</a>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = state => (
  {
    currentPage: state.pokedex.pokemons.page,
    totalPages: state.pokedex.pokemons.totalPages,
    pageSize: state.pokedex.pokemons.pageSize,
    types: state.pokedex.pokemons.types
  }
)

const mapDispatchToProps = dispatch => (
  {
    fetch: (pageSize, types) => page => dispatch(fetchList.pending({ pageSize, page, types }))
  }
)

const mergeProps = (stateProps, dispatchProps) => (
  {
    currentPage: stateProps.currentPage,
    totalPages: stateProps.totalPages,
    fetch: dispatchProps.fetch(stateProps.pageSize, stateProps.types)
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Pagination)
