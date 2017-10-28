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
    // .then(data => ({ categories: data.categories }))
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

const addPost = ({ title, body, author, category }) => {
  console.error('addPost', { title, body, author, category })
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    })
  })
}

const voteOnPost = ({ id, option }) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option
    })
  })
}

const upVotePost = ({ id }) => voteOnPost({ id, option: 'upVote' })

const downVotePost = ({ id }) => voteOnPost({ id, option: 'downVote' })

const editPost = ({ id, title, body }) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      title,
      body
    })
  }).then(() => ({ id, title, body }))
}

const deletePost = ({ id }) => {
  return fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
}

const getPostComments = ({ id }) => {
  return fetchJson(`${api}/posts/${id}/comments`, { headers })
}

const addComment = ({ body, author, parentId }) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers,
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
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option })
  })
}

const editComment = ({ id, body }) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      timestamp: Date.now(),
      body
    })
  })
}

const deleteComment = ({ id }) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
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
  editComment,
  deleteComment
}
