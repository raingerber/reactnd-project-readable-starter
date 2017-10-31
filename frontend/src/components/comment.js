import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BlogItem from './blog-item'

import {
  addComment,
  editComment,
  upVoteComment,
  downVoteComment,
  deleteComment
} from '../actions/index'

function Comment (props) {
  return (
    <BlogItem
      {...props}
      type='comment'
      upVoteItem={() => props.dispatch(upVoteComment({ id: props.id }))}
      downVoteItem={() => props.dispatch(downVoteComment({ id: props.id }))}
      deleteItem={() => props.dispatch(deleteComment({ id: props.id }))}
      onSubmit={({ body, author }) => {
        if (props.id) {
          props.dispatch(editComment({ id: props.id, body }))
        } else {
          console.error({ parentId: props.parentId, body, author })
          props.dispatch(addComment({ parentId: props.parentId, body, author }))
        }
      }}
      enableComments={false}
      hasTitle={false}
    />
  )
}

// Comment.propTypes = {
// }

// Comment.defaultProps = {
// }

export default connect()(Comment)
