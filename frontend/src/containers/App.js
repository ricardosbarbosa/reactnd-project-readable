import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetErrorMessage } from '../actions'
import Menubar from './Menubar'
import PostsView from '../views/PostsView'
import PostView from '../views/PostView'
import { Route, Redirect, Switch } from 'react-router-dom'
import { compose } from 'redux'
import * as firebase from 'firebase'

class App extends Component {

  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDNCRRw9roYNP3XJ-iFtlh9d98uZ04UMCk",
      authDomain: "udacityreading.firebaseapp.com",
      databaseURL: "https://udacityreading.firebaseio.com",
      projectId: "udacityreading",
      storageBucket: "udacityreading.appspot.com",
      messagingSenderId: "1098260523335"
      };

    firebase.initializeApp(config);
  }
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
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
          
          <Menubar />
          
        </header>
        <div className="content">
          <Switch>
            <Route exact path="/" component={PostsView} />
            <Route exact path="/:category" component={PostsView} />
            <Route exact path='/:category/:post_id' component={PostView} />
            <Redirect from="/" to="/"/>
          </Switch>
        </div>
        {this.renderErrorMessage()}
        {children}
        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

const mapDispatchToProps = { resetErrorMessage }

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App)
