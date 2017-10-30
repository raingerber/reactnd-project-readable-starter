import React from 'react'
import { connect } from 'react-redux'

import AddItem from './add-item'

import { addPost } from '../actions/index'

function onSubmit () {
  const { category, author, title, body } = this.state
  this.props.dispatch(addPost({ category, author, title, body }))
  this.setState({ wasSubmitted: true })
}

function AddPost (props) {
  return (
    <AddItem {...props} type='post' />
  )
}

export default connect(({ categories }) => ({ categories }))(AddPost)
