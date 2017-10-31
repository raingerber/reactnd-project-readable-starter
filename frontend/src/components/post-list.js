import React from 'react'

import { connect } from 'react-redux'

import Post from './post'

function PostList ({ posts }) {
  return posts.length ? (
    <div className='post-list'>
      {posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  ) : (
    <div className='text-block text-center'>
      <i>No posts here yet!</i>
    </div>
  )
}

export default connect(({ posts: { posts } }) => ({ posts }))(PostList)
