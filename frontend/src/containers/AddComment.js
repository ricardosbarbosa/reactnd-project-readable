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
        <ModalExample buttonLabel="New Post">
          <FormComment />
        </ModalExample>
        <input ref={node => {
          author = node
        }} placeholder='author'/>
        <input ref={node => {
          body = node
        }} placeholder='body'/>
        <button onClick={(e) => {
          e.preventDefault()

          let id = uuid().split("-").join("")
          // debugger
          ReadApi.addComment(id, author.value, body.value, parentId)
                      .then(data => {
                        console.log({ ...data, voteScore: 0})
                        addComment(
                          { ...data, 
                            voteScore: 0,
                            deleted: false,
                            parentDeleted: false,
                          })
                      })
                      .catch(error => {
                        alert(error)
                      })
          body.value = ''
          author.value = ''
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