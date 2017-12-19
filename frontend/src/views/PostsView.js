import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostHeader from '../components/PostHeader'
import OrderBy from '../components/OrderBy'
import { changeCategoryFilter, changeOrderPostsFilter, upVotePost, downVotePost, loadPosts, toggleModalPost, deletePost, isNewPost, setPost} from '../actions'
import { compose } from 'redux'
import { getVisiblePostsOrderedBy } from '../selectors'

class PostsView extends Component {

  componentDidMount() {
    const {loadPosts, changeCategoryFilter, match, categories, history} = this.props
    
    const checkCategories = categories.filter((category) => {
      if (category.name === match.params.category) {
        return category
      }
    })

    if(checkCategories && checkCategories.length){   
       // not empty 
       changeCategoryFilter({category_filter: match.params.category})
       loadPosts(match.params.category)
    } else {
       // empty
       changeCategoryFilter({category_filter: null})
       loadPosts(null)
       history.push("/")
    }
    
  }
  
  render()  {
    const {posts, order_posts_filter, changeOrderPostsFilter, upVotePost, downVotePost, history, isNewPost, deletePost, toggleModalPost,setPost} = this.props
    return (
        <div className="postss">
        
          <OrderBy 
            value={order_posts_filter}
            options={[{name: 'Vote Score', value: 'voteScore'},{name: 'Created at', value: 'timestamp'}]}
            onChangeClick={(event) => {changeOrderPostsFilter({order_posts_filter: event.target.value}) }}
          />
          <div className="posts">
            {posts.map( (post) => (
              <PostHeader 
                key={post.id} 
                post={post} 
                onDeleteClick={(e) => {
                    e.preventDefault();
                    deletePost({id: post.id} )
                    history.push('/')
                  }} 
                onEditClick={(e) => {
                  e.preventDefault();
                  setPost(post.id)
                  isNewPost(false)
                  toggleModalPost()
                }}
                onUpClick={(e) => {
                  e.preventDefault()
                  upVotePost({id: post.id} )
                }} 
                onDownClick={(e) => {
                  e.preventDefault()
                  downVotePost({id: post.id} )
                }}
                />
            ))}
          </div>
         
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // posts: state.posts.filter((post) => !post.deleted).sort((a, b) => a[ownProps.order_posts_filter] < b[ownProps.order_posts_filter]),
    posts: getVisiblePostsOrderedBy(state),
    categories: state.categories,
    order_posts_filter: state.order_posts_filter,
    category_filter: state.category_filter,
  }
}

const mapDispatchToProps = {loadPosts, changeCategoryFilter, changeOrderPostsFilter, upVotePost, downVotePost, isNewPost, toggleModalPost, deletePost, setPost}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PostsView)