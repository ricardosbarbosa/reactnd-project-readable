import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostHeader from './PostHeader'

class ListPosts extends Component {

  componentDidMount() {

    
  }
  
  render()  {
    const {posts} = this.props
    return (
        <div className="posts">
           {posts.filter((post) => !post.deleted).map( (post) => (
              <PostHeader key={post.id} post={post}/>
            ))}
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
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