import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoryMenu from './CategoryMenu'
import Menu from '../components/Menu'
import * as ReadApi from '../utils/Api'
import { changeCategoryFilter, addPost, resetPosts } from '../actions'
// import { Link } from 'react-router-dom'
import ModalExample from '../components/ModalExample'
import FormPost from '../components/FormPost'
class Menubar extends Component {

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

  render()  {
    const {addPost, category_filter, resetPosts} = this.props
    return (
      <div>
        <ModalExample buttonLabel="New Post">
          <FormPost />
        </ModalExample>
        <div className="Menubar">
            <Menu 
              active={category_filter === 'home'} 
              text='Home'
              to={`/posts/`}
              onClick={(e) => {
                // e.preventDefault()
                //1 muda a categoria na store
                this.props.changeCategoryFilter({category_filter: 'home'})
                
                //2 reset the posts
                resetPosts()
                //3 consulta os posts
                ReadApi.posts().then(posts => {
                  console.log(posts)
                  posts.map(post => 
                    addPost(post)
                  )
                }) 
              }}
            />
            {this.state.categories.map( (category, index) => (
              <CategoryMenu filter={category.name} key={index} >{category.name} </CategoryMenu>
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category_filter: state.category_filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategoryFilter: (data) => dispatch(changeCategoryFilter(data)),
    resetPosts: (data) => dispatch(resetPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menubar)