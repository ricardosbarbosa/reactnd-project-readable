import React from 'react';
import {  Modal, ModalHeader, ModalBody, } from 'reactstrap';
import { connect } from 'react-redux'
import FormComment from './FormComment'
import { addComment, updateComment, resetComment, setComment} from '../actions'

class ModalComment extends React.Component {
  
  toggle = (e) => {
    if (e)
      e.preventDefault()
    console.log(this.props)
    this.props.setComment(null)
  }

  render() {
    const {parentId, hidden_modal_comment} = this.props
    return (
      <div>
        <a className={this.props.className} href="/" onClick={this.toggle}>New Comment</a>
        <Modal isOpen={!hidden_modal_comment} toggle={this.toggle} > 
          <ModalHeader toggle={this.toggle}>Comment</ModalHeader>
          <ModalBody>
            <FormComment parentId={parentId} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.comment,
    hidden_modal_comment: state.hidden_modal_comment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment:  (data) => dispatch(addComment(data)),
    updateComment: (data) => dispatch(updateComment(data)),
    resetComment: (data) => dispatch(resetComment(data)),
    setComment: (data) => dispatch(setComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalComment)