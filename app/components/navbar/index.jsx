// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Logged from './logged'
import NotLogged from './not_logged'

import './index.scss'

const NavBar = ({ page, isUserLogged }: { page: string, isUserLogged: boolean }) => (
  <ul className="nav nav-tabs">
    <li className={page === 'index' ? 'active' : ''}>
      <Link to="/" href="/">Главная</Link>
    </li>
    <li className={page === 'profile' ? 'active' : ''}>
      <Link to="/profile" href="/profile">Профиль</Link>
    </li>
    <li className="pull-right">
      {isUserLogged ? <Logged /> : <NotLogged />}
    </li>
  </ul>
)

const mapStateToProps = state => (
  {
    isUserLogged: state.user.name !== null
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
)(NavBar)
