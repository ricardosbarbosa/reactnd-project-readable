import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostHeader from '../components/PostHeader'
import AddComment from '../containers/AddComment'
import VoteControl from '../components/VoteControl'
import Comment from '../components/Comment'
import {  deletePost, upVoteComment, downVoteComment, deleteComment, setPost,upVotePost, downVotePost, setComment} from '../actions'
import * as moment from 'moment'
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import {withRouter} from "react-router-dom";

class PostView extends Component {

  componentDidMount() {
    const {loadPosts, changeCategoryFilter, match, setPost} = this.props
    setPost(match.params.post_id)
  }

  render()  {
    const {post, history, location, dispatch, downVotePost, upVotePost} = this.props


    if ( post === null || post === undefined || post.deleted === true ) {
      // history.push("/posts")
      return null
    }
    else {
      return ( 
        <div className="posts"> 
          <div className="actions">
            <a href="#" >Edit</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              let {deletePost, history} = this.props
              deletePost({id: post.id} )
              history.push('/')
            }}>Delete</a>
          </div>

          <div className="post">
            <VoteControl voteScore={post.voteScore} 
              onUpClick={(e) => {
                e.preventDefault()
                upVotePost({id: post.id} )
              }} 
              onDownClick={(e) => {
                e.preventDefault()
                downVotePost({id: post.id} )
              }}
            />
            <PostHeader post={post}/>
          </div>

          <div className="body">
            {post.body}
            <div className="comments">
              <AddComment parentId={post.id}/>
              
              {post.comments
                .filter( c => !c.deleted)
                .sort((a, b) => a.voteScore < b.voteScore)
                .map( (comment, index) => (
                
                <div key={comment.id} className="comment">
                  <VoteControl 
                    voteScore={comment.voteScore} 
                    onUpClick={(e) => {
                      e.preventDefault()
                      this.props.upVoteComment({id: comment.id, parentId: comment.parentId} )
                    }} 
                    onDownClick={(e) => {
                      e.preventDefault()
                      this.props.downVoteComment({id: comment.id, parentId: comment.parentId} )
                    }}/>

                  <Comment comment={comment} 
                      onEditClick={(e) => {
                        e.preventDefault();
                        const {setComment } = this.props
                        setComment(comment)
                      }}
                      onDeleteClick={(e) => {
                        e.preventDefault();
                        const {deleteComment, history} = this.props
                        deleteComment({id: comment.id, parentId: comment.parentId} )
                      }}/>
                </div>

              ))}
            </div>
          </div>
        </div>
      )
    }
    
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upVoteComment: (data) => dispatch(upVoteComment(data)),
    downVoteComment: (data) => dispatch(downVoteComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    setPost: (data) => dispatch(setPost(data)),
    upVotePost: (data) => dispatch(upVotePost(data)),
    downVotePost: (data) => dispatch(downVotePost(data)),
    setComment: (data) => dispatch(setComment(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView))