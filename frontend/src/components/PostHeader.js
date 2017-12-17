import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as moment from 'moment'

class PostHeader extends Component {
  render()  {
    const {post, onUpClick, onDownClick} = this.props;
    
    return (
      <div className="infos">
        <div className="info">
          <span>{post.author} - {moment(post.timestamp).fromNow()}</span>
          <span className="tag">{post.category}</span>
        </div>
        <Link className="title" to={`/post/${post.id}`}>{post.title}</Link>
        <div className="comments-count">{post.commentCount} comments</div>
      </div>
    )
  }
}

export default PostHeader