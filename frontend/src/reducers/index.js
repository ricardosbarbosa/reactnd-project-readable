import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import 'font-awesome/css/font-awesome.min.css';

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

const category_filter = (state = null, action) => {
  const { type, category_filter } = action
  if (type === ActionTypes.CHANGE_CATEGORY_FILTER) {
    return category_filter
  } 
  return state
}

const order_posts_filter = (state = 'voteScore', action) => {
  const { type, order_posts_filter } = action
  if (type === ActionTypes.CHANGE_ORDER_POSTS_FILTER) {
    return order_posts_filter
  } 
  return state
}


const posts = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.RESET_POSTS: //id, timestamp, title, body, author, category
      return [];
    case ActionTypes.ADD_POST: //id, timestamp, title, body, author, category
      return [
        ...state,
        {
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          body: action.body,
          author: action.author,
          category: action.category,
          commentCount: action.commentCount,
          voteScore: action.voteScore,
          comments: action.comments
        }
      ];

    case ActionTypes.UPDATE_POST: //id, title, body
      return state.map(post => {
        const {title, body} = action
        if (post.id !== action.id) {
          return post
        }

        return {
          ...post,
          title,
          body
        }
      })
    
    case ActionTypes.DELETE_POST: //id
      return state.map(post => {
        if (post.id !== action.id) {
          return post
        }

        return {
          ...post,
          deleted: true,
          comments: post.comments && 
            post.comments.map(comment => {
              return {
                ...comment,
                parentDeleted: true
              }
            })
        }
      })

    case ActionTypes.ADD_COMMENT: //id timestamp body author parentId  deleted, parentDeleted, voteScore
      return state.map(post => {
        if (post.id !== action.parentId) {
          return post
        }
        return {
          ...post,
          commentCount: post.commentCount + 1,
          comments: [
            ...post.comments,
            {
              id: action.id,
              timestamp: action.timestamp,
              body: action.body,
              author: action.author,
              parentId: action.parentId,
              voteScore: action.voteScore,
              deleted: action.deleted,
              parentDeleted: action.parentDeleted,
            }
          ]
        }
      })
    
    case ActionTypes.UPDATE_COMMENT: //id
      return state.map(post => {
        if (post.id !== action.parentId) {
          return post
        }
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== action.id) {
              return comment
            }

            return {
              ...comment,
              timestamp: action.timestamp,
              body: action.body,
            }
          })
        }
      })

    case ActionTypes.DELETE_COMMENT: //id
      return state.map(post => {
        
        if (post.id !== action.parentId) {
          return post
        }

        return {
          ...post,
          commentCount: post.commentCount - 1,
          comments: post.comments.map(comment => {
            if (comment.id !== action.id) {
              return comment
            }
            return {
              ...comment,
              deleted: true
            }
          })
        }
      })

    case ActionTypes.UP_VOTE_POST: //id
      return state.map(post => {

        if (post.id !== action.id) {
          return post
        }
        return {
          ...post,
          voteScore: post.voteScore + 1
        }
      }) 
    case ActionTypes.DOWN_VOTE_POST: //id
      return state.map(post => {
        if (post.id !== action.id) {
          return post
        }

        return {
          ...post,
          voteScore: post.voteScore - 1
        }
      }) 

    case ActionTypes.UP_VOTE_COMMENT: //post_id, comment_id
      return state.map(post => {
        if (post.id !== action.parentId) {
          return post
        }

        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== action.id) {
              return comment
            }

            return {
              ...comment,
              voteScore: comment.voteScore + 1
            }
          })
        }
      }) 
    case ActionTypes.DOWN_VOTE_COMMENT: //post_id, comment_id
      return state.map(post => {

        if (post.id !== action.parentId) {
          return post
        }

        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== action.id) {
              return comment
            }

            return {
              ...comment,
              voteScore: comment.voteScore - 1
            }
          })
        }
      }) 

    // relacionadas ao comportamento
    case ActionTypes.LOAD_POST:
      return {
        post: action.post
      }

    default: 
      return state;
  }
}


const rootReducer = combineReducers({
  errorMessage, 
  category_filter,
  order_posts_filter,
  posts,
  form: formReducer
})

export default rootReducer