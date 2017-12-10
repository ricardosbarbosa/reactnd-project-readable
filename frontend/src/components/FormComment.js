import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class FormComment extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="body">Comment</Label>
          <Input type="textarea" name="body" id="body" />
        </FormGroup>

        <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" id="author" placeholder="Author" />
        </FormGroup>
      </Form>
    );
  }
}

export default FormComment