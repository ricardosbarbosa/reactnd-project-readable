import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as ReadApi from '../utils/Api'
import PostHeader from './PostHeader'
import AddComment from './AddComment'

class Post extends Component {

  state = {
    comments: [],
    post: {}
  }

  componentDidMount() {
    const {post_id} = this.props

    console.log(post_id)
    ReadApi.post(post_id).then(post => {
      console.log(post)
      this.setState({
        post
      });
    })

    ReadApi.comments(post_id).then(comments => {
      console.log(comments)
      this.setState({
        comments
      });
    })
  }

  render()  {
    const {post} = this.state
    return (
      <div className="posts">
        <PostHeader post={post}/>
        
        <div className="body">
          {post.body}
          <div className="comments">
            <AddComment />
            {this.state.comments.map( (comment, index) => (
              
              <div key={comment.id} className="comment">
                <div className="vote-control">
                  <button className="upVote">+</button>
                  <span className="votes">1 votes</span>
                  <button className="downVote">-</button>
                </div>
                <div className="infos">
                  <div className="info">
                    <span>{comment.author} {comment.timestamp}</span>
                  </div>
                  <span className="text">
                    {comment.body}
                  </span>
                </div>
              </div>


            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: ownProps.post
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
)(Post)