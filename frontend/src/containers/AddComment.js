import React, { Component } from 'react';
import { addComment } from '../actions'
import { connect } from 'react-redux'
import uuid from 'uuid'
import * as ReadApi from '../utils/Api'
import ModalExample from '../components/ModalExample'
import FormComment from '../components/FormComment'

class AddComment extends Component {
  
  render()  {
    let author
    let body
    let { parentId, addComment, id, authorValue, bodyValue} = this.props
    return (
      <div>
        <ModalExample buttonLabel="New Comment" title="Comment">
          <FormComment parentId={parentId} />
        </ModalExample>
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