import React from 'react'
import { connect } from 'react-redux'

import GenericBlogItem from './generic-blog-item'

import { upVotePost, downVotePost, editPost, deletePost } from '../actions/index'

function Post (props) {
  // console.error(props)
  return (
    <GenericBlogItem
      {...props}
      upVoteItem={() => props.dispatch(upVotePost({ id: props.id }))}
      downVoteItem={() => props.dispatch(downVotePost({ id: props.id }))}
      updateItem={(data) => props.dispatch(editPost(Object.assign(data, { id: props.id })))}
      deleteItem={() => props.dispatch(deletePost({ id: props.id }))}
      useComments
      useTitle
      type='post'
    />
  )
}

// TODO make sure that category is getting added

// const mapDispatchToProps = (dispatch, props) => {
//   const { id } = props
//   return {
//     updateItem: (data) => props.dispatch(editPost(Object.assign(data, { id: props.id })))
//     upVoteItem:
//     downVoteItem:
//   }
// }

// ({
//   boundUpdateName: (name) => dispatch(updateName(name))
// })

export default connect()(Post)
