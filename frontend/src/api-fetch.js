const uuidv4 = require('uuid/v4')

const api = 'http://localhost:3001'

localStorage.token = localStorage.token || Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': localStorage.token,
  'Content-Type': 'application/json'
}

const fetchJson = (url, opts) => fetch(url, opts).then(res => res.json())

export const getCategories = () => {
  return fetchJson(`${api}/categories`, { headers })
}

export const getCategoryPosts = (category) => {
  return fetchJson(`${api}/${category}/posts`, { headers })
}

export const getPosts = () => {
  return fetchJson(`${api}/posts`, { headers })
}

export const addPost = (title, body, author, category) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: {
      id: uuidv4(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    }
  })
}

export const getPost = (id) => {
  return fetchJson(`${api}/posts/${id}`, { headers })
}

export const voteOnPost = (id, option) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: {
      option
    }
  })
}

export const editPost = (id, title, body) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers,
    body: {
      title,
      body
    }
  })
}

export const deletePost = (id) => {
  return fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
}

export const getPostComments = (id) => {
  return fetchJson(`${api}/posts/${id}/comments`, { headers })
}

export const addComment = (body, author, parentId) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: {
      id: uuidv4(),
      timestamp: Date.now(),
      body,
      author,
      parentId
    }
  })
}

export const getComment = (id) => {
  return fetchJson(`${api}/comments/${id}`, { headers })
}

export const voteOnComment = (id, option) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body: { option }
  })
}

export const editComment = (id, body) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers,
    body: {
      timestamp: Date.now(),
      body
    }
  })
}

export const deleteComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
}
