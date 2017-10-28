import React from 'react'

import { connect } from 'react-redux'

import Post from './item'

function PostList ({ posts }) {
  return (
    <div className='post-list'>
      {posts.map(post => <Post key={post.id} {...post} />)}
    </div>
  )
}

export default connect(({ posts }) => ({ posts }))(PostList)
