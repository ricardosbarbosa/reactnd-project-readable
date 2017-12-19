import React from 'react';
import { Button,  FormGroup, Label, Input, FormText, FormFeedback, ModalFooter } from 'reactstrap';
import { Field, reduxForm} from 'redux-form'
import { addPost, updatePost } from '../actions'
import { connect } from 'react-redux'
import uuid from 'uuid'

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class FormPost extends React.Component {

  submit = (values) => {
    const post = {
        id: values.id || uuid().split("-").join(""),
        timestamp: values.timestamp || Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category,
        comments: values.comments || []
    }

    if(values.id === undefined) {
        this.props.addPost(post)
    } else {
        this.props.updatePost(post)
    }

  }

  render() {
    const { handleSubmit, pristine, reset, submitting, category_filter, categories, isNewPost } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)}>

        <Field name="title" component={renderField} type="text" placeholder="Titleeeee" label="Title" />

        <Field name="author" component={renderField} type="text" placeholder="Author" label="Author" disabled={!isNewPost}/>
        
        <Field name="body" component={renderField} type="textarea" placeholder="Body" label="Body"/>

        <Field name="category" component={renderFieldSelect} type="select" label="Category" value={category_filter} disabled={!isNewPost}>
          {categories.map( (category, index) => {
            if (category_filter === category.name) {
              return <option selected key={index} value={category.name} >{category.name}</option>
            }
            else {
              return <option key={index} value={category.name} >{category.name}</option>
            }
          })}
        </Field>

        <ModalFooter>
          <Button color="primary" disabled={pristine || submitting} type="submit">Save</Button>{' '}
          <Button color="secondary" disabled={pristine || submitting} onClick={reset}>Undo Changes</Button>
        </ModalFooter>

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
  disabled,
  meta: { touched, error, warning, ...custom}
}) => (

    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input type={type} name={name} id={name} placeholder={placeholder} {...input} {...custom}  disabled={disabled}/>
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
  disabled,
  meta: { touched, error, warning, ...custom}
}) => (

    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input type={type} name={name} id={name} {...input} {...custom }  disabled={disabled} >
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
  // validate, // <--- validation function given to redux-form
  // warn // <--- warning function given to redux-form
})(FormPost)

const mapStateToProps = (state, ownProps) => {
  let initialValues = {}
  if (state.category_filter) {
    initialValues = state.isNewPost ? {category: state.category_filter} : state.post
  }
  else {
    initialValues = state.isNewPost ? {category: 'react'} : state.post
  }
  return {
    initialValues: initialValues,
    categories: state.categories,
    isNewPost: state.isNewPost,
    category_filter: state.category_filter,
  }
}

const mapDispatchToProps = { addPost, updatePost }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPost)