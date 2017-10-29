import { combineReducers } from 'redux'

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
  VOTE_ON_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/types'

const addPost = (posts, post) => posts.concat(post) // TODO sort this array

const updatePost = (posts, id, data) => posts.map(post => (
  post.id === id ? Object.assign({}, post, data) : post
))

const deletePost = (posts, id) => posts.filter(post => post.id !== id)

function postReducer (state = [], action) {
  if (action.type === GET_POSTS) {
    return action.data
  }

  if (action.type === GET_POST) {
    return [action.data]
  }

  if (action.type === GET_CATEGORY_POSTS) {
    return state
  }

  if (action.type === ADD_POST) {
    return addPost(state, action.data)
  }

  if (action.type === UP_VOTE_POST) {
    return updatePost(state, action.data.id, action.data)
  }

  if (action.type === DOWN_VOTE_POST) {
    return updatePost(state, action.data.id, action.data)
  }

  if (action.type === EDIT_POST) {
    return updatePost(state, action.data.id, action.data)
  }

  if (action.type === DELETE_POST) {
    return deletePost(state, action.data.id)
  }

  if (action.type === GET_POST_COMMENTS) {
    return state
  }

  return state
}

function commentReducer (state = {}, action) {
  if (action.type === ADD_COMMENT) {
    return state
  }

  if (action.type === GET_COMMENT) {
    return state
  }

  if (action.type === VOTE_ON_COMMENT) {
    return state
  }

  if (action.type === EDIT_COMMENT) {
    return state
  }

  if (action.type === DELETE_COMMENT) {
    return state
  }

  return state
}

function categoryReducer (state = [], action) {
  if (action.type === GET_CATEGORIES) {
    return action.data
  }

  return state
}

export default combineReducers({
  posts: postReducer,
  comments: commentReducer,
  categories: categoryReducer
})
