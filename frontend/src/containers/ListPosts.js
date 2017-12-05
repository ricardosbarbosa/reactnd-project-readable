import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import { resetErrorMessage, addPost, addComment, resetPosts } from '../actions'

class ListPosts extends Component {

  componentDidMount() {

    
  }
  
  render()  {
    const {posts} = this.props
    return (
        <div className="posts">
           {posts.map( (post) => (
              <PostHeader key={post.id} post={post}/>
            ))}
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    category_filter: state.category_filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setCategory: (data) => dispatch(setCategory(data))
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)