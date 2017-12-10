import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import VoteControl from '../components/VoteControl'
import { upVotePost, downVotePost, deletePost } from '../actions'
import * as ReadApi from '../utils/Api'
import * as moment from 'moment'

class PostHeader extends Component {

  handleClick = () => {
    const {post, setPost} = this.props;
    setPost({post: post}) 
  }


  render()  {
    const {post} = this.props;
    
    return (
      <div key={post.id} className="post">
        <VoteControl 
          voteScore={post.voteScore} 
          onUpClick={(e) => {
            const {post, upVotePost} = this.props
            
            e.preventDefault()
            
            ReadApi.votePost( post.id, 'upVote')
              .then(data => {
                console.log(data)
                upVotePost({id: post.id} )
              })
              .catch(error => {
                alert(error)
              }) 
          }} 
          onDownClick={(e) => {
            e.preventDefault()
            const {post, downVotePost} = this.props
            ReadApi.votePost( post.id, "downVote")
              .then(data => {
                console.log(data)
                downVotePost({id: post.id} )
              })
          }}/>
        <div className="infos">
          <div className="info">
            <span>{post.author} - {moment(post.timestamp).fromNow()}</span>
            <span className="tag">{post.category}</span>
          </div>
          <span className="title">
          <Link to={`/post/${post.id}`} onClick={() => {this.props.setPost({post: post}) }}>{post.title}</Link>
          </span>
          <div className="comments-count">
            {post.commentCount} comments
          </div>
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upVotePost: (data) => dispatch(upVotePost(data)),
    downVotePost: (data) => dispatch(downVotePost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeader)