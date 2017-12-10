import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import OrderBy from './OrderBy'
import * as ReadApi from '../utils/Api'
import { changeCategoryFilter, addPost, resetPosts } from '../actions'

class ListPosts extends Component {

  componentDidMount() {
    const {category, addPost, resetPosts} = this.props
    if (category === undefined || category === 'home' ) {
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
    }
    else {
      this.props.changeCategoryFilter({category_filter: category})
      const {addPost, resetPosts} = this.props
      //2 reset the posts
      resetPosts()
      //3 consulta os posts
      ReadApi.postsBy(category).then(posts => {
          console.log(posts)
          posts.map(post => 
            addPost(post)
          )
        })
    }
  }
  
  render()  {
    const {posts, order_posts_filter} = this.props
    return (
        <div className="posts">
          <OrderBy />
          {posts.filter((post) => !post.deleted)
            .sort((a, b) => a[order_posts_filter] < b[order_posts_filter])
            // .sort((a, b) => a.[order_posts_filter] > b.voteScore)
            .map( (post) => (
            <PostHeader key={post.id} post={post}/>
          ))}
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    order_posts_filter: state.order_posts_filter
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
)(ListPosts)