import React from 'react'
import { connect } from 'react-redux'

import GenericBlogItem from './generic-blog-item'

import { upVotePost, downVotePost, deletePost } from '../actions/index'

function Post (props) {
  // console.error(props)
  return (
    <GenericBlogItem
      {...props}
      upVoteItem={() => props.dispatch(upVotePost({ id: props.id }))}
      downVoteItem={() => props.dispatch(downVotePost({ id: props.id }))}
      deleteItem={() => props.dispatch(deletePost({ id: props.id }))}
      useComments
      useTitle
      type='post'
    />
  )
}

// TODO make sure that category is getting added

export default connect()(Post)
