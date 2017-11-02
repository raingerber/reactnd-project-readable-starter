import { combineReducers } from 'redux'
import sortOn from 'sort-on'
import get from 'lodash.get'
import {
  GET_CATEGORIES,
  GET_CATEGORY_POSTS,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  EDIT_POST,
  DELETE_POST,
  GET_POST_COMMENTS,
  ADD_COMMENT,
  GET_COMMENT,
  VOTE_ON_COMMENT, // TODO have two versions of this?
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPDATE_POST_SORT,
  SAVE_PREV_PATH
} from '../actions/types'

const addItem = (items, item) => {
  return items.concat(item) // TODO sort this array
}

const updateItem = (items, id, data) => items.map((item) => {
  return item.id === id ? Object.assign({}, item, data) : item
})

const deleteItem = (items, id) => {
  return items.filter((item) => item.id !== id)
}

const sortItems = (items, sortKey, sortOrder) => {
  return sortOn(items, sortOrder === 'asc' ? sortKey : `-${sortKey}`)
}

function hasError (action) {
  return !!get(action, ['data', 'error'])
}

function postReducer (state = [], action) {
  if (hasError(action)) {
    return []
  }

  if (action.type === GET_POSTS) {
    return action.data
  }

  if (action.type === GET_POST) {
    return [action.data]
  }

  if (action.type === GET_CATEGORY_POSTS) {
    return action.data
  }

  if (action.type === ADD_POST) {
    return addItem(state, action.data)
  }

  if (action.type === UP_VOTE_POST) {
    return updateItem(state, action.data.id, action.data)
  }

  if (action.type === DOWN_VOTE_POST) {
    return updateItem(state, action.data.id, action.data)
  }

  if (action.type === EDIT_POST) {
    return updateItem(state, action.data.id, action.data)
  }

  if (action.type === DELETE_POST) {
    return deleteItem(state, action.data.id)
  }
}

function commentReducer (state = [], action) {
  if (hasError(action)) {
    return []
  }

  if (action.type === ADD_COMMENT) {
    return addItem(state, action.data)
  }

  if (action.type === GET_POST_COMMENTS) {
    return action.data
  }

  if (action.type === GET_COMMENT) {
    return [action.data]
  }

  if (action.type === VOTE_ON_COMMENT) {
    return updateItem(state, action.data.id, action.data)
  }

  if (action.type === EDIT_COMMENT) {
    return updateItem(state, action.data.id, action.data)
  }

  if (action.type === DELETE_COMMENT) {
    return deleteItem(state, action.data.id)
  }

  return state
}

function sortedPostReducer (state = { sortKey: 'voteScore', sortOrder: 'desc', posts: [] }, action) {
  if (action.type === UPDATE_POST_SORT) {
    const { sortKey, sortOrder } = action.data
    const posts = sortItems(state.posts, sortKey, sortOrder)
    return { sortKey, sortOrder, posts }
  }

  let posts = postReducer(state.posts, action)

  if (posts) {
    const { sortKey, sortOrder } = state
    posts = sortItems(posts, sortKey, sortOrder).filter((post) => !post.deleted)
    return { sortKey, sortOrder, posts }
  }

  return state
}

function sortedCommentReducer (state, action) {
  const comments = commentReducer(state, action)
  return sortItems(comments, 'voteScore', 'desc').filter((comment) => !comment.parentDeleted)
}

function categoryReducer (state = [], action) {
  if (hasError(action)) {
    return []
  }

  if (action.type === GET_CATEGORIES) {
    return action.data
  }

  return state
}

function prevPathReducer (state = '', action) {
  if (action.type === SAVE_PREV_PATH) {
    return action.prevPath
  }

  return state
}

export default combineReducers({
  posts: sortedPostReducer,
  comments: sortedCommentReducer,
  categories: categoryReducer,
  prevPath: prevPathReducer
})
