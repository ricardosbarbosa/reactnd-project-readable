import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetErrorMessage } from '../actions'
import Menubar from './Menubar'
import ListPosts from './ListPosts'
import Post from './Post'
import { Route } from 'react-router-dom'
import * as ReadApi from '../utils/Api'

class App extends Component {

  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  componentDidMount() {
    // const {addPost, addComment} = this.props

    // ReadApi.posts().then(posts => {
    //   console.log(posts)
    //   Promise.all(
    //     posts.map(post => {
    //       debugger
    //       ReadApi.comments(post.id)
    //         .then(comments => post.comments = comments)
    //         .then(() => addPost(post))
          
    //     })
    //   )
        
    // })
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
          
            <Link to="newpost">NewPost</Link>
            <Menubar />
          
        </header>
        <div className="content">
          <Route exact path="/posts" component={ListPosts} />

          <Route exact path="/posts/:category" component={ListPosts}  />

          <Route exact path="/posts/new" component={ListPosts} />

          <Route exact path='/post/:post_id' render={({ match }) => (
            <Post post_id={match.params.post_id}/>
          )}/>
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
