import React from 'react';
import { Button,  FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import * as ReadApi from '../utils/Api'
import { Field, Form, reduxForm} from 'redux-form'
import { loadPost, addPost, updatePost } from '../actions'
import { connect } from 'react-redux'
import uuid from 'uuid'
import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class FormPost extends React.Component {

  state = {
    categories: []
  }

  componentDidMount() {
    ReadApi.categories().then(categories => {
      this.setState({
        categories
      });
    })
  }

  submit = (values) => {
    console.log('Form was submitted!!');
    const post = {
        id: values.id || uuid().split("-").join(""),
        timestamp: values.timestamp || Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category,
        comments: values.comments || []
    }

    // if(values.id === undefined) {
    //     this.props.addPost(post)
    // } else {
    //     this.props.updatePost(post)
    // }

    // ({ id, timestamp, title, body, author, category, voteScore, commentCount, comments })
    debugger
    console.log(post)

    const {addPost} = this.props
    // id, timestamp, title, body, author, category
    ReadApi.addPost(post.id, post.timestamp, post.title, post.body, post.author, post.category)
        .then(data => {
          console.log({ ...data, voteScore: 0})
          addPost({ ...data})
        })
        .catch(error => {
          alert(error)
        })
      
  }

  render() {
    const { handleSubmit, loadPost, pristine, reset, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)}>

        <Field name="title" component={renderField} type="text" placeholder="Titleeeee" label="Title" />

        <Field name="author" component={renderField} type="text" placeholder="Author" label="Author"/>
        
        <Field name="body" component={renderField} type="textarea" placeholder="Body" label="Body"/>

        <Field name="category" component={renderFieldSelect} type="select" label="Category">
          {this.state.categories.map( (category, index) => (
            <option key={index} value={category.name}>{category.name}</option>
          ))}
        </Field>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Undo Changes
          </button>
        </div>

      </form>
    );
  }
}

const renderField = ({
  input,
  label,
  type,
  name,
  placeholder,
  value,
  meta: { touched, error, warning, ...custom}
}) => (

    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input type={type} name={name} id={name} placeholder={placeholder} {...input} {...custom } />
      {touched &&
        ((error && <FormFeedback>{error}</FormFeedback>) ||
          (warning && <FormText>{warning}</FormText>))}
    </FormGroup>
  
)

const renderFieldSelect = ({
  input,
  label,
  type,
  name,
  placeholder,
  value,
  children,
  meta: { touched, error, warning, ...custom}
}) => (

    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input type={type} name={name} id={name} {...input} {...custom } >
        {children}
      </Input>
    </FormGroup>
  
)




//Post side validation
function validate(values) {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Enter a Title';
    }

    if(values.title && values.title.length > 25) {
        errors.title = 'Too big, max 25 characters';
    }

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Enter an Author';
    }

    if(values.author && values.author.length > 10) {
        errors.author = 'Too big, max 10 characters';
    }

    if(!values.body || values.body.trim() === '') {
        errors.body = 'Enter a Body';
    }

    if(values.body && values.body.length > 50) {
        errors.body = 'Too big, max 50 characters';
    }
    return errors;
}

function warn(values) {
  const warnings = {}
  if (values.title && values.title.length === 25) {
    warnings.title = 'this is a limit :)'
  }
  return warnings
}

FormPost = reduxForm({
  form: 'posform', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
})(FormPost)

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPost: (data) => dispatch(loadPost(data)),
    addPost:  (data) => dispatch(addPost(data)),
    updatePost: (data) => dispatch(updatePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPost)