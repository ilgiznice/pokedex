//  @flow

import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../redux/user/actions'

import './index.scss'

type Props = {
  name: string,
  photo: ?string,
  logout: void => void
}

const Logged = ({ name, photo, logout }: Props) => (
  <div className="logged">
    <img className="avatar" src={photo || '/static/img/user.png'} alt="User photo"/>
    <span className="name">{name}</span>
    <button
      type="button"
      className="btn btn-primary"
      onClick={logout}
    >
      Выйти
    </button>
  </div>
)

const mapStateToProps = state => (
  {
    name: state.user.name,
    photo: state.user.photo
  }
)

const mapDispatchToProps = dispatch => (
  {
    logout: () => dispatch(logout())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logged)
