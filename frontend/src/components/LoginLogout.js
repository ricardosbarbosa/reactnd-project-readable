import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class LoginLogout extends Component {

  render()  {
    const { user, onClickLogout, onClickLogin } = this.props;
    
    if (user) {
      return (
        <div>
          <span>{user.displayName}</span>
          <a onClick={onClickLogout}> Logout </a>
        </div>
      )
    }
    else {
      return (
        <a onClick={onClickLogin}>Login</a>
      )
    }
  }
}

export default LoginLogout