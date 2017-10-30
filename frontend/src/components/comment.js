import React from 'react'
import { connect } from 'react-redux'

import GenericBlogItem from './generic-blog-item'

import { upVoteComment, downVoteComment, deleteComment } from '../actions/index'

function Comment (props) {
  // console.error(props)
  return (
    <GenericBlogItem
      {...props}
      upVoteItem={() => props.dispatch(upVoteComment({ id: props.id }))}
      downVoteItem={() => props.dispatch(downVoteComment({ id: props.id }))}
      deleteItem={() => props.dispatch(deleteComment({ id: props.id }))}
      useComments={false}
      useTitle={false}
      type='comment'
    />
  )
}

export default connect()(Comment)
