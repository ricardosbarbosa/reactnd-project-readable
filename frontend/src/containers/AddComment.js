import React, { Component } from 'react';
import { addComment } from '../actions'
import { connect } from 'react-redux'
import uuid from 'uuid'
import ModalComment from '../components/ModalComment'
import FormComment from '../components/FormComment'

class AddComment extends Component {
  
  render()  {
    let author
    let body
    let { parentId, addComment, id, authorValue, bodyValue} = this.props
    return (
        <ModalComment parentId={parentId}/>
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