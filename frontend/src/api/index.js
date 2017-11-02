/* globals fetch */

const uuidv4 = require('uuid/v4')

const api = 'http://localhost:3001'

window.localStorage.token = window.localStorage.token || Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': window.localStorage.token,
  'Content-Type': 'application/json'
}

const fetchJson = (url, opts) => fetch(url, opts).then(res => res.json())

const getCategories = () => {
  return fetchJson(`${api}/categories`, { headers })
    .then(({ categories }) => categories)
}

const getCategoryPosts = ({ category }) => {
  return fetchJson(`${api}/${category}/posts`, { headers })
}

const getPosts = () => {
  return fetchJson(`${api}/posts`, { headers })
}

const getPost = ({ id }) => {
  return fetchJson(`${api}/posts/${id}`, { headers })
}

const addPost = ({ category, author, title, body }) => {
  return fetchJson(`${api}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      category,
      author,
      title,
      body
    })
  })
}

const voteOnPost = ({ id, option }) => {
  return fetchJson(`${api}/posts/${id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option
    })
  })
}

const upVotePost = ({ id }) => voteOnPost({ id, option: 'upVote' })

const downVotePost = ({ id }) => voteOnPost({ id, option: 'downVote' })

const editPost = ({ id, title, body }) => {
  return fetchJson(`${api}/posts/${id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    })
  })
}

const deletePost = ({ id }) => {
  return fetchJson(`${api}/posts/${id}`, { headers, method: 'DELETE' })
}

const getPostComments = ({ id }) => {
  return fetchJson(`${api}/posts/${id}/comments`, { headers })
}

const addComment = ({ body, author, parentId }) => {
  return fetchJson(`${api}/comments`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      body,
      author,
      parentId
    })
  })
}

const getComment = ({ id }) => {
  return fetchJson(`${api}/comments/${id}`, { headers })
}

const voteOnComment = ({ id, option }) => {
  return fetchJson(`${api}/comments/${id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option })
  })
}

const upVoteComment = ({ id }) => voteOnComment({ id, option: 'upVote' })

const downVoteComment = ({ id }) => voteOnComment({ id, option: 'downVote' })

const editComment = ({ id, body }) => {
  return fetchJson(`${api}/comments/${id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify({
      timestamp: Date.now(),
      body
    })
  })
}

const deleteComment = ({ id }) => {
  return fetchJson(`${api}/comments/${id}`, {
    headers,
    method: 'DELETE'
  })
}

export {
  getCategories,
  getCategoryPosts,
  getPosts,
  getPost,
  addPost,
  voteOnPost,
  upVotePost,
  downVotePost,
  editPost,
  deletePost,
  getPostComments,
  addComment,
  getComment,
  voteOnComment,
  upVoteComment,
  downVoteComment,
  editComment,
  deleteComment
}
