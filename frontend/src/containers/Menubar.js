import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoryMenu from './CategoryMenu'
import Menu from '../components/Menu'
import { changeCategoryFilter, loadCategories, loadPosts } from '../actions'
import ModalPost from '../components/ModalPost'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

class Menubar extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render()  {
    const {category_filter, categories, loadPosts, changeCategoryFilter, history} = this.props
    return (
      <div>
        <ModalPost />
        <div className="Menubar">
            <Menu to={`/`} active={category_filter === null} 
              onClick={(e) => {
                e.preventDefault()
                changeCategoryFilter({category_filter: null})
                loadPosts(null)
                history.push("/")
              }}
            >
            Home
            </Menu>
            {categories.map( (category, index) => (
              <CategoryMenu filter={category.name} key={index} >{category.name}</CategoryMenu>
            ))}
            <Menu to={`/`} text='Home' active={category_filter === 'favorites'} 
              onClick={(e) => {
                e.preventDefault()
                changeCategoryFilter({category_filter: 'favorites'})
                loadPosts('favorites')
                history.push("/favorites")
              }}>
              <span className="fa fa-star-o" />
            </Menu>

            <Menu to={`/`} text='Home' active={category_filter === 'reading-list'} 
              onClick={(e) => {
                e.preventDefault()
                changeCategoryFilter({category_filter: 'reading-list'})
                loadPosts('reading-list')
                history.push("/reading-list")
              }}>
              <span className="fa fa-bookmark-o" />
            </Menu>
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

const mapDispatchToProps = { changeCategoryFilter, loadCategories, loadPosts }


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Menubar)