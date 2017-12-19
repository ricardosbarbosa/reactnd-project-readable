import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostHeader from '../components/PostHeader'
import { upVotePost, downVotePost, loadPosts, toggleModalPost, deletePost, isNewPost, setPost, favorite, reading} from '../actions'
import { compose } from 'redux'
import { getVisiblePostsOrderedBy } from '../selectors'

class PostHeaderContainer extends Component {

  render()  {
    const {post,  upVotePost, downVotePost, history, isNewPost, deletePost, toggleModalPost, setPost, favorite, reading} = this.props
    return (
      <PostHeader
        post={post} 
        onDeleteClick={(e) => {
            e.preventDefault();
            deletePost({id: post.id} )
            history.push('/')
          }} 
        onEditClick={(e) => {
          e.preventDefault();
          setPost(post.id)
          isNewPost(false)
          toggleModalPost()
        }}
        onUpClick={(e) => {
          e.preventDefault()
          upVotePost({id: post.id} )
        }} 
        onDownClick={(e) => {
          e.preventDefault()
          downVotePost({id: post.id} )
        }}

        onFavoriteClick={(e) => {
          e.preventDefault()
          favorite(post)
        }} 
        onReadLaterClick={(e) => {
          e.preventDefault()
          reading(post)
        }}
      />
          
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = { upVotePost, downVotePost, isNewPost, toggleModalPost, deletePost, setPost, favorite, reading}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PostHeaderContainer)