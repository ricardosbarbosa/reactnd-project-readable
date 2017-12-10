import React, { Component } from 'react';
import { changeCategoryFilter, addPost, resetPosts } from '../actions'
import { connect } from 'react-redux'
import Menu from '../components/Menu'
import * as ReadApi from '../utils/Api'

class CategoryMenu extends Component {

  componentDidMount() {
    // store.subcribe()
  }

  render()  {
    const {filter, category_filter, changeCategoryFilter} = this.props;
    
    if (filter === category_filter) {
      return <span className="menu active">{filter}</span>
    }
    else {
      return (
        <Menu 
          ative={filter === category_filter} 
          text={filter}
          to={`/posts/${filter}`}
          onClick={(e) => {
            // e.preventDefault()
            //1 muda a categoria na store
            changeCategoryFilter({category_filter: filter})
            const {addPost, resetPosts} = this.props
            //2 reset the posts
            resetPosts()
            //3 consulta os posts
            ReadApi.postsBy(filter).then(posts => {
                console.log(posts)
                posts.map(post => 
                  addPost(post)
                )
              })
            
          }}
        />
      )
    }
  
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
)(CategoryMenu)