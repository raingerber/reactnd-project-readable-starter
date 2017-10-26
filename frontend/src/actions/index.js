import * as api from '../api-fetch'

import {
  GET_CATEGORIES,
  GET_CATEGORY_POSTS,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  VOTE_ON_POST,
  EDIT_POST,
  DELETE_POST,
  GET_POST_COMMENTS,
  ADD_COMMENT,
  GET_COMMENT,
  VOTE_ON_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from './types'

// const thunk = (type, requestFn) => (dispatch) => {
//   return requestFn().then(data => dispatch({ type, data }))
// }

const thunk = (type, requestFn) => {
  if (!requestFn) {
    console.log(`requestFn for the "${type}" type is not valid!`)
    return () => ({})
  }

  return (dispatch) => requestFn().then(data => dispatch({ type, data }))
}

export const getCategories = thunk(GET_CATEGORIES, api.getCategories)
export const getCategoryPosts = thunk(GET_CATEGORY_POSTS, api.getCategoryPosts)
export const getPosts = thunk(GET_POSTS, api.getPosts)
export const getPost = thunk(GET_POST, api.getPost)
export const addPost = thunk(ADD_POST, api.addPost)
export const voteOnPost = thunk(VOTE_ON_POST, api.voteOnPost)
export const editPost = thunk(EDIT_POST, api.editPost)
export const deletePost = thunk(DELETE_POST, api.deletePost)
export const getPostComments = thunk(GET_POST_COMMENTS, api.getPostComments)
export const addComment = thunk(ADD_COMMENT, api.addComment)
export const getComment = thunk(GET_COMMENT, api.getComment)
export const voteOnComment = thunk(VOTE_ON_COMMENT, api.voteOnComment)
export const editComment = thunk(EDIT_COMMENT, api.editComment)
export const deleteComment = thunk(DELETE_COMMENT, api.deleteComment)
