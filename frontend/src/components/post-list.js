import React from 'react'

import { connect } from 'react-redux'

import Post from './post'

function PostList ({ posts }) {
  return (
    <div className='post-list'>
      {posts.map(post => <Post key={post.id} {...post} />)}
    </div>
  )
}

export default connect(({ posts }) => ({ posts }))(PostList)
