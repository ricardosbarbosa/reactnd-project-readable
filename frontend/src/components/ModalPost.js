import React from 'react';
import {  Modal, ModalHeader, ModalBody, } from 'reactstrap';
import { connect } from 'react-redux'
import FormPost from './FormPost'
import { addPost, updatePost, setPost, toggleModalPost} from '../actions'

class ModalPost extends React.Component {
  
  toggle = (e) => {
    if (e)
      e.preventDefault()
    console.log(this.props)
    this.props.toggleModalPost()
  }

  render() {
    const {parentId, hidden_modal_post} = this.props
    return (
      <div>
        <a className='new-post' href="/" onClick={this.toggle}>New Post</a>
        <Modal isOpen={!hidden_modal_post} toggle={this.toggle} > 
          <ModalHeader toggle={this.toggle}>Post</ModalHeader>
          <ModalBody>
            <FormPost />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.post,
    hidden_modal_post: state.hidden_modal_post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost:  (data) => dispatch(addPost(data)),
    updatePost: (data) => dispatch(updatePost(data)),
    // resetPost: (data) => dispatch(resetPost(data)),
    setPost: (data) => dispatch(setPost(data)),
    toggleModalPost: (data) => dispatch(toggleModalPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPost)