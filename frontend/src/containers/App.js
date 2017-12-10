import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetErrorMessage } from '../actions'
import Menubar from './Menubar'
import ListPosts from './ListPosts'
import Post from './Post'
import { Route, Redirect, Switch } from 'react-router-dom'


class App extends Component {

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
            <Route exact path="/posts" component={ListPosts} />

            <Route exact path='/posts/:category' render={({ match }) => (
              <ListPosts category={match.params.category}/>
            )}/>
            <Route exact path='/post/:post_id' render={({ match }) => (
              <Post post_id={match.params.post_id}/>
            )}/>

            <Redirect from="/" to="/posts"/>
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


const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorMessage: (data) => dispatch(resetErrorMessage(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
)(App))
