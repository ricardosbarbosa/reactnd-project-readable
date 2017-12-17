import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoryMenu from './CategoryMenu'
import Menu from '../components/Menu'
import { changeCategoryFilter, loadCategories, loadPosts } from '../actions'
// import { Link } from 'react-router-dom'
import ModalPost from '../components/ModalPost'
import FormPost from '../components/FormPost'

class Menubar extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render()  {
    const {category_filter, categories, loadPosts, changeCategoryFilter} = this.props
    return (
      <div>
        <ModalPost />
        <div className="Menubar">
            <Menu to={`/posts/`} text='Home' active={category_filter === null} 
              onClick={() => {
                changeCategoryFilter({category_filter: null})
                loadPosts(null)
              }}
            />
            {categories.map( (category, index) => (
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
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategoryFilter: (data) => dispatch(changeCategoryFilter(data)),
    loadCategories: (data) => dispatch(loadCategories(data)),
    loadPosts: (data) => dispatch(loadPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menubar)