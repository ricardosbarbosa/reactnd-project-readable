import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoryMenu from './CategoryMenu'
import Menu from '../components/Menu'
import * as ReadApi from '../utils/Api'
import { changeCategoryFilter, resetErrorMessage, addPost, addComment, resetPosts } from '../actions'

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
    return (
        <div className="Menubar">
            <Menu 
              active={this.props.category_filter === null} 
              text='Home'
              to={`/posts/`}
              onClick={(e) => {
                e.preventDefault()
                //1 muda a categoria na store
                this.props.changeCategoryFilter({category_filter: null})
                const {addPost, category_filter, resetPosts} = this.props
                //2 reset the posts
                this.props.resetPosts()
                //3 consulta os posts
                ReadApi.posts().then(posts => {
                  console.log(posts)
                  posts.map(post => {
                    this.props.addPost(post)
                  })
                }) 
              }}
            />
            {this.state.categories.map( (category, index) => (
              <CategoryMenu filter={category.name} key={index} >{category.name} </CategoryMenu>
            ))}
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