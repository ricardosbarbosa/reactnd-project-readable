import { createSelector } from 'reselect'

const getOrderByFilter = (state) => state.order_posts_filter
const getPosts = (state) => state.posts

export const getVisiblePosts = createSelector(
  [ getPosts ],
  ( posts) => {
    return posts.filter((post) => !post.deleted)
  }
)

export const getVisiblePostsOrderedBy = createSelector(
  [ getOrderByFilter, getVisiblePosts ],
  ( order_posts_filter, posts ) => {
    return posts.sort((a, b) => a[order_posts_filter] < b[order_posts_filter])
  }
)

const getComments = (state) => state.post.comments

export const getVisibleComments = createSelector(
  [ getComments ],
  ( comments) => {
    return comments.filter((comment) => !comment.deleted).sort((a, b) => a.voteScore < b.voteScore)
  }
)