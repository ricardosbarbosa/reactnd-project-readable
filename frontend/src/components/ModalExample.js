import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault()
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <a className={this.props.className} href="/" onClick={this.toggle}>{this.props.buttonLabel}</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} > 
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          
        </Modal>
      </div>
    );
  }
}

export default ModalExample;

// <ModalFooter>
//   <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
//   <Button color="secondary" onClick={this.toggle}>Cancel</Button>
// </ModalFooter>