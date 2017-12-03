import React from 'react'

import NavBar from '../components/navbar'
import Actions from '../components/actions'
import Grid from '../components/grid'
import Pagination from '../components/pagination'

export default () => (
  <div className="container">
    <NavBar page="index" />
    <Actions />
    <Grid />
    <Pagination />
  </div>
)
