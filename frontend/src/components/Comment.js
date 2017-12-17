import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as moment from 'moment'

class Comment extends Component {
  render()  {
    const {comment, onDeleteClick, onEditClick} = this.props;
    
    return (
      <div className="infos">
        <div className="info">
          <span>{comment.author} - {moment(comment.timestamp).fromNow()}</span>
        </div>

        <span className="text">
          {comment.body}
        </span>

        <div className="actions">
          <a href="#" onClick={onEditClick}>Edit</a>
          <a href="#" onClick={onDeleteClick}>Delete</a>
        </div>
        
      </div>
    )
  }
}

export default Comment