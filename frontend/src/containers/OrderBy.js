import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeOrderPostsFilter, addPost, resetPosts } from '../actions'

class OrderBy extends Component {

  handleClick = (event) => {

    this.props.changeOrderPostsFilter({order_posts_filter: event.target.value}) 
  }

  render()  {
    const { order_posts_filter, text, active, to, onClick } = this.props;

    return (
      <div>
        <select id="role" name="role" class="form-control" value={order_posts_filter} onChange={this.handleClick}>
              <option value='voteScore' >Vote Score</option>
              <option value='timestamp'>Created at</option>
          </select>
      </div>
    )
    
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    order_posts_filter: state.order_posts_filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeOrderPostsFilter: (data) => dispatch(changeOrderPostsFilter(data)),
    // resetPosts: (data) => dispatch(resetPosts(data)),
    // addPost: (data) => dispatch(addPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBy)