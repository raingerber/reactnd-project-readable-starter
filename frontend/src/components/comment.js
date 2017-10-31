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
      onCancel={this.props.redirect}
      deleteItem={() => {
        props.dispatch(deleteComment({ id: props.id }))
        this.props.redirect()
      }}
      onSubmit={({ body, author }) => {
        if (props.id) {
          props.dispatch(editComment({ id: props.id, body }))
        } else {
          props.dispatch(addComment({ parentId: props.parentId, body, author }))
        }

        this.props.redirect()
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
