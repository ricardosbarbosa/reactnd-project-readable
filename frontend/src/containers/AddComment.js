import React, { Component } from 'react';
import { addComment } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AddComment extends Component {
  // handleClick = () => {
  //   const {addComment} = this.props;
  //   
  // }

  render()  {
    let { id, timestamp, body, author, parentId, deleted, parentDeleted, voteScore } = {}
    return (
      <div>
        <input ref={node => {
          author = node
        }} placeholder='author'/>
        <input ref={node => {
          body = node
        }} placeholder='body'/>
        <button onClick={() => {
          
          addComment({ id, timestamp, body, author, parentId, deleted, parentDeleted, voteScore } ) 
          body = author = ''
        }}> 
          Add Comment
        </button>
      </div>
      )
    
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // category_filter: state.category_filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => dispatch(addComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment)