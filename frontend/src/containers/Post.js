import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as ReadApi from '../utils/Api'
import PostHeader from './PostHeader'
import AddComment from './AddComment'
import VoteControl from '../components/VoteControl'
import { addPost,deletePost, resetPosts, upVoteComment, downVoteComment, deleteComment } from '../actions'
import * as moment from 'moment'
class Post extends Component {

  componentWillMount() {
    const {post_id, addPost} = this.props
    ReadApi.post(post_id)
      .then(post => {
        if (post.id !== undefined ) {
          ReadApi.comments(post.id)
            .then(comments => post.comments = comments)
            .then(() => addPost(post))
        }
      })    
  }

  render()  {
    const {posts} = this.props

    if (posts.length <= 0) {
      return <div>Post não existe</div>
    }

    const post = posts[0]

    if (post.deleted === true) {
      return (
          <div>Post não existe</div>
        )
    }
    else {
      return ( 
        <div className="posts"> 
          
          <div className="actions">
            <a href="#" >Edit</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              let {deletePost} = this.props
              ReadApi.deletePost( post.id)
                .then(data => {
                  console.log(data)
                  deletePost({id: post.id} )
                })
              
            }}>Delete</a>
          </div>
          <PostHeader post={post}/>
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
                      const {upVoteComment} = this.props
                      
                      e.preventDefault()
                      
                      ReadApi.voteComment( comment.id, 'upVote')
                        .then(data => {
                          console.log(data)
                          upVoteComment({id: comment.id, parentId: comment.parentId} )
                        })
                        .catch(error => {
                          alert(error)
                        }) 
                    }} 
                    onDownClick={(e) => {
                      e.preventDefault()
                      const {downVoteComment} = this.props
                      ReadApi.voteComment( comment.id, "downVote")
                        .then(data => {
                          console.log(data)
                          downVoteComment({id: comment.id, parentId: comment.parentId} )
                        })
                    }}/>
                  <div className="infos">
                    <div className="info">
                      <span>{comment.author} - {moment(comment.timestamp).fromNow()}</span>
                    </div>
                    <span className="text">
                      {comment.body}
                    </span>
                    <div className="actions">
                      <a href="#" >Edit</a>
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        let {deleteComment} = this.props
                        ReadApi.deleteComment( comment.id)
                        .then(data => {
                          console.log(data)
                          deleteComment({id: comment.id, parentId: comment.parentId} )
                        })
                        
                      }}>Delete</a>
                    </div>
                  </div>
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
    posts: state.posts,
    // post_id: ownProps.post_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setPost: (data) => dispatch(setPost(data))
    resetPosts: (data) => dispatch(resetPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    upVoteComment: (data) => dispatch(upVoteComment(data)),
    downVoteComment: (data) => dispatch(downVoteComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    deletePost: (data) => dispatch(deletePost(data)),
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)