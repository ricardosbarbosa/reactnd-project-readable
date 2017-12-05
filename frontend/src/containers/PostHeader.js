import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PostHeader extends Component {

  handleClick = () => {
    const {post, setPost} = this.props;
    setPost({post: post}) 
  }

  render()  {
    const {post} = this.props;
    
    return (
      <div key={post.id} className="post">
        <div className="vote-control">
          <button className="upVote">+</button>
          <span className="votes">{post.voteScore} votes</span>
          <button className="downVote">-</button>
        </div>
        <div className="infos">
          <div className="info">
            <span>{post.author} {post.timestamp}</span>
            <span className="tag">{post.category}</span>
          </div>
          <span className="title">
          <Link to={`/post/${post.id}`} onClick={() => {this.props.setPost({post: post}) }}>{post.title}</Link>
          </span>
          <div className="comments-count">
            {post.commentCount} comments
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
    // setPost: (data) => dispatch(setPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeader)