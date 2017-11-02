import React from 'react'
import { connect } from 'react-redux'

import BlogItem from './BlogItem'

// TODO make '/' the default prevPath

import {
  addComment,
  editComment,
  upVoteComment,
  downVoteComment,
  deleteComment
} from '../actions/index'

const redirects = {
  onEdit: (props) => {
    const type = props.type.toLowerCase()
    return `/${type}/edit/${props.parentId}/${props.id}`
  },
  onSave: (props) => `/post/${props.parentId}`,
  onDelete: (props) => `/post/${props.parentId}`,
  onCancel: (props) => props.prevPath || '/'
}

function Comment (props) {
  const { dispatch, id, parentId } = props
  return (
    <BlogItem
      {...props}
      type='comment'
      redirects={redirects}
      upVoteItem={() => dispatch(upVoteComment({ id }))}
      downVoteItem={() => dispatch(downVoteComment({ id }))}
      deleteItem={() => dispatch(deleteComment({ id }))}
      onSubmit={({ body, author }) => {
        if (id) {
          dispatch(editComment({ id, body }))
        } else {
          dispatch(addComment({ parentId, author, body }))
        }
      }}
      enableCategory={false}
      enableComments={false}
      enableTitle={false}
    />
  )
}

export default connect()(Comment)
