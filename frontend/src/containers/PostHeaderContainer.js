import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostHeader from '../components/PostHeader'
import { upVotePost, downVotePost, loadPosts, toggleModalPost, deletePost, isNewPost, setPost, favoritesFirebase, readingFirebase} from '../actions'
import { compose } from 'redux'
import { getVisiblePostsOrderedBy } from '../selectors'
import * as firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'


class PostHeaderContainer extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.firebaseRef = firebase.database().ref("items");
    this.firebaseRef.push({
      text: this.state.text
    });
    
  }

  render()  {
    const {user, post,  upVotePost, downVotePost, history, isNewPost, deletePost, toggleModalPost, setPost, favoritesFirebase, readingFirebase} = this.props
    return (
      <PostHeader   
         post={post}  
         user={user}     
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
           favoritesFirebase(user, post)    
         }}    
         onReadLaterClick={(e) => {    
           e.preventDefault()    
           readingFirebase(user, post)   
         }}    
       />
          
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favorites: state.favorites,
    user: state.user
  }
}

const mapDispatchToProps = { upVotePost, downVotePost, isNewPost, toggleModalPost, deletePost, setPost, favoritesFirebase, readingFirebase}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PostHeaderContainer)