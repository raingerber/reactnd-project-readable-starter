import React from 'react'
import { connect } from 'react-redux'

import BlogItem from './BlogItem'

import {
  addPost,
  editPost,
  upVotePost,
  downVotePost,
  deletePost
} from '../actions/index'

const redirects = {
  onEdit: (props) => {
    const type = props.type.toLowerCase()
    return `/${type}/edit/${props.id}`
  },
  onSave: (props, state) => {
    return `/category/${state.category}`
  },
  onDelete: (props) => '/',
  onCancel: (props) => props.prevPath || '/'
}

function Post (props) {
  const { dispatch, id } = props
  return (
    <BlogItem
      {...props}
      type='post'
      redirects={redirects}
      upVoteItem={() => dispatch(upVotePost({ id }))}
      downVoteItem={() => dispatch(downVotePost({ id }))}
      deleteItem={() => dispatch(deletePost({ id }))}
      onSubmit={({ title, body, author, category }) => {
        if (id) {
          dispatch(editPost({ id, title, body }))
        } else {
          dispatch(addPost({ title, body, author, category }))
        }
      }}
      enableCategory
      enableComments
      enableTitle
    />
  )
}

export default connect()(Post)
