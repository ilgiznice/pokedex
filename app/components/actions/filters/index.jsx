import React from 'react'
import FilterTypes from './filter-types/index.jsx'
import FilterPages from './filter-pages/index.jsx'

import './index.scss'

export default () => (
  <div className="col-sm-12 col-md-6 filters">
    <FilterTypes />
    <FilterPages />
  </div>
)
