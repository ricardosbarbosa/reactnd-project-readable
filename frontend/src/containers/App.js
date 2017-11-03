import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import * as ReadApi from '../utils/Api'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetErrorMessage } from '../actions'

class App extends Component {

  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  state = {
    categories: ["a","b", "c"]
  }

  componentDidMount() {
    console.log("ok")
    debugger
    ReadApi.categories().then(categories => {
      console.log(categories)
      this.setState({
        categories
      });
    })
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        <button onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </p>
    )
  }

  render() {
    // const { children, inputValue } = this.props
    const { children } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderErrorMessage()}
        {children}
        <ol>
        {this.state.categories.map( (category, index) => (
          <li key={index} > {category.name} </li>
        ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default withRouter(connect(mapStateToProps, {
  resetErrorMessage
})(App))
