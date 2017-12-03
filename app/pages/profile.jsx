import React from 'react'

import NavBar from '../components/navbar'
import Grid from '../components/grid'

export default () => (
  <div className="container">
    <NavBar page="profile" />
    <Grid favorite="true" />
  </div>
)
