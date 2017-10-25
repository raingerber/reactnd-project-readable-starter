import { combineReducers } from 'react-redux'

function postReducer (state = {}, action) {
  return state
}

function commentReducer (state = {}, action) {
  return state
}

function categoryReducer (state = {}, action) {
  return state
}

export default combineReducers({
  posts: postReducer,
  comments: commentReducer,
  categories: categoryReducer
})
