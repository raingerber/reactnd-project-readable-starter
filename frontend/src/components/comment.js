import React from 'react'
import { connect } from 'react-redux'

import BlogItem from './BlogItem'

import {
  addComment,
  editComment,
  upVoteComment,
  downVoteComment,
  deleteComment
} from '../actions/index'

// this object specifies where the Edit, Save, Delete, and Cancel
// buttons should redirect after they are clicked
const redirects = {
  onEdit: (props) => {
    const type = props.type.toLowerCase()
    return `/${type}/edit/${props.parentId}/${props.id}`
  },
  onSave: (props) => props.parentPost.category ? `/${props.parentPost.category}/${props.parentId}` : '/',
  onDelete: (props) => props.parentPost.category ? `/${props.parentPost.category}/${props.parentId}` : '/',
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

const mapStateToProps = ({ posts: { posts } }, { parentId }) => {
  const parentPost = posts.find((post) => post.id === parentId) || {}
  return { parentPost }
}

export default connect(mapStateToProps)(Comment)
