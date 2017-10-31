import * as api from '../api/index'

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
  DELETE_COMMENT,
  SET_REDIRECT,
  SAVE_PREV_PATH
} from './types'

const thunk = (type, requestFn) => (params) => (dispatch) => {
  return requestFn(params).then(data => dispatch({ type, data }))
}

export const getCategories = thunk(GET_CATEGORIES, api.getCategories)
export const getCategoryPosts = thunk(GET_CATEGORY_POSTS, api.getCategoryPosts)
export const getPosts = thunk(GET_POSTS, api.getPosts)
export const getPost = thunk(GET_POST, api.getPost)
export const addPost = thunk(ADD_POST, api.addPost)
export const upVotePost = thunk(UP_VOTE_POST, api.upVotePost)
export const downVotePost = thunk(DOWN_VOTE_POST, api.downVotePost)
export const editPost = thunk(EDIT_POST, api.editPost)
export const deletePost = thunk(DELETE_POST, api.deletePost)
export const getPostComments = thunk(GET_POST_COMMENTS, api.getPostComments)
export const addComment = thunk(ADD_COMMENT, api.addComment)
export const getComment = thunk(GET_COMMENT, api.getComment)
export const upVoteComment = thunk(VOTE_ON_COMMENT, api.upVoteComment)
export const downVoteComment = thunk(VOTE_ON_COMMENT, api.downVoteComment)
export const editComment = thunk(EDIT_COMMENT, api.editComment)
export const deleteComment = thunk(DELETE_COMMENT, api.deleteComment)

export const setRedirect = (redirect) => ({ type: SET_REDIRECT, redirect })
export const savePrevPath = (prevPath) => ({ type: SAVE_PREV_PATH, prevPath })
