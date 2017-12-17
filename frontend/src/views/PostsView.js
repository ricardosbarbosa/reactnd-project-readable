import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PostHeader from '../components/PostHeader'
import VoteControl from '../components/VoteControl'
import OrderBy from '../components/OrderBy'

import { changeCategoryFilter, changeOrderPostsFilter, upVotePost, downVotePost, loadPosts } from '../actions'

class PostsView extends Component {

  componentDidMount() {
    const {loadPosts, changeCategoryFilter, match} = this.props
    changeCategoryFilter({category_filter: match.params.category})
    loadPosts(match.params.category)
  }
  
  render()  {
    const {posts, order_posts_filter, changeOrderPostsFilter, upVotePost, downVotePost} = this.props
    return (
        <div className="postss">
        
          <OrderBy 
            value={order_posts_filter}
            options={[{name: 'Vote Score', value: 'voteScore'},{name: 'Created at', value: 'timestamp'}]}
            onChangeClick={(event) => {changeOrderPostsFilter({order_posts_filter: event.target.value}) }}
          />
          <div className="posts">
            {posts.filter((post) => !post.deleted)
            .sort((a, b) => a[order_posts_filter] < b[order_posts_filter])
            .map( (post) => (
              <div className='post' >
                <VoteControl voteScore={post.voteScore} 
                  onUpClick={(e) => {
                      e.preventDefault()
                      upVotePost({id: post.id} )
                    }} 
                    onDownClick={(e) => {
                      e.preventDefault()
                      downVotePost({id: post.id} )
                    }}
                    />
                <PostHeader key={post.id} post={post}/>
              </div>
            ))}
          </div>
         
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    order_posts_filter: state.order_posts_filter,
    category_filter: state.category_filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategoryFilter: (data) => dispatch(changeCategoryFilter(data)),
    changeOrderPostsFilter: (data) => dispatch(changeOrderPostsFilter(data)),
    upVotePost: (data) => dispatch(upVotePost(data)),
    downVotePost: (data) => dispatch(downVotePost(data)),
    loadPosts: (data) => dispatch(loadPosts(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsView))