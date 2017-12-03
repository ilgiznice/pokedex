import React from 'react'

import './index.scss'

const NotLogged = () => (
  <div className="not-logged">
    <a className="link" href="/auth/vk">
      <i className="fa fa-vk medium" aria-hidden="true" />
    </a>
    <a className="link" href="/auth/facebook">
      <i className="fa fa-facebook medium" aria-hidden="true" />
    </a>
    <a className="link" href="/auth/google">
      <i className="fa fa-google medium" aria-hidden="true" />
    </a>
  </div>
)

export default NotLogged
