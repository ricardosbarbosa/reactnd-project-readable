
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const CHANGE_CATEGORY_FILTER = 'CHANGE_CATEGORY_FILTER'
export const CHANGE_ORDER_POSTS_FILTER = 'CHANGE_ORDER_POSTS_FILTER'

//posts
export const RESET_POSTS = 'RESET_POSTS'
export const ADD_POST = 'ADD_POST' //id, timestamp, title, body, author, category
export const UPDATE_POST = 'UPDATE_POST' //id, title, body, author, category
export const DELETE_POST = 'DELETE_POST' //id

//comments
export const ADD_COMMENT = 'ADD_COMMENT' //id timestamp body author parentId
export const UPDATE_COMMENT = 'UPDATE_COMMENT' //id
export const DELETE_COMMENT = 'DELETE_COMMENT' //id

//votes
export const UP_VOTE_POST = 'UP_VOTE_POST' //id
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST' //id
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT' //post_id, comment_id
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT' //post_id, comment_id


// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})

export function changeCategoryFilter({ category_filter }) {
  return {
    type: CHANGE_CATEGORY_FILTER,
    category_filter,
  }
}

export function changeOrderPostsFilter({ order_posts_filter }) {
  return {
    type: CHANGE_ORDER_POSTS_FILTER,
    order_posts_filter,
  }
}

//posts
export function resetPosts () {
  return {
    type: RESET_POSTS
  }
}

export function addPost ({ id, timestamp, title, body, author, category, voteScore, commentCount, comments }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    commentCount,
    comments
  }
}

export function updatePost ({ id, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id
  }
}

//coments
// export const ADD_COMMENT = 'ADD_COMMENT' //id timestamp body author parentId
// export const UPDATE_COMMENT = 'UPDATE_COMMENT' //id
// export const DELETE_COMMENT = 'DELETE_COMMENT' //id
export function addComment({ id, timestamp, body, author, parentId, deleted, parentDeleted, voteScore }) {
  return {
    type: ADD_COMMENT,
    id, 
    timestamp, 
    body, 
    author, 
    parentId,
    deleted,
    parentDeleted,
    voteScore
  }
}

export function updateComment({ id, timestamp, body, parenteId }) {
  return {
    type: UPDATE_COMMENT,
    id, 
    timestamp, 
    body
  }
}

export function deleteComment({ id, parenteId }) {
  return {
    type: DELETE_COMMENT,
    id
  }
}


//VOTES
// export const UP_VOTE_POST = 'UP_VOTE_POST' //id
// export const DOWN_VOTE_POST = 'DOWN_VOTE_POST' //id
// export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT' //post_id, comment_id
// export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT' //post_id, comment_id


export function upVotePost({ id, option }) { //"upVote" ou "downVote"
  return {
    type: UP_VOTE_POST,
    id,
    option
  }
}
export function downVotePost({ id, option }) { 
  return {
    type: DOWN_VOTE_POST,
    id,
    option
  }
}
export function upVoteComment({ id, option }) { //"upVote" ou "downVote"
  return {
    type: UP_VOTE_COMMENT,
    id,
    option
  }
}
export function downVoteComment({ id, option }) { 
  return {
    type: DOWN_VOTE_COMMENT,
    id,
    option
  }
}



























