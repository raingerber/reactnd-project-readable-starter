import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BlogItem from './blog-item'

import {
  addPost,
  editPost,
  upVotePost,
  downVotePost,
  deletePost,
  setRedirect
} from '../actions/index'

function Post (props) {
  return (
    <BlogItem
      {...props}
      type='post'
      upVoteItem={() => props.dispatch(upVotePost({ id: props.id }))}
      downVoteItem={() => props.dispatch(downVotePost({ id: props.id }))}
      deleteItem={() => {
        console.error('deletePost')
        // props.dispatch(deletePost({ id: props.id }))
      }}
      onSubmit={({ title, body, author, category }) => {
        console.error('ON SUBMIT')
        if (props.id) {
          props.dispatch(editPost({ id: props.id, title, body }))
          props.dispatch(setRedirect(`/category/${props.category}`))
        } else {
          props.dispatch(addPost({ title, body, author, category }))
        }
      }}
      enableComments
      hasTitle
    />
  )
}

// Post.propTypes = {
// }

// Post.defaultProps = {
// }

// getPost -- use this in the PostDetailView if id is defined but nothing else

// TODO make sure that category is getting added

export default connect()(Post)
