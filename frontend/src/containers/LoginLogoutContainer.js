import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoginLogout from '../components/LoginLogout'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { loginFirebase, logoutFirebase } from '../actions'

class LoginLogoutContainer extends Component {

  handleLogin = (e) => {
    e.preventDefault();
    const {loginFirebase} = this.props
    loginFirebase()
  }

  handleLogout = (e) => {
    e.preventDefault();
    const {logoutFirebase} = this.props
    logoutFirebase()
  }

  render()  {
    const { user } = this.props;
    return <LoginLogout user={user} onClickLogin={this.handleLogin} onClickLogout={this.handleLogout} /> 
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = { loginFirebase, logoutFirebase }


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LoginLogoutContainer)