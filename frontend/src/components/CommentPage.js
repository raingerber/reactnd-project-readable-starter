import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'

import Comment from './Comment'

import { getComment } from '../actions/index'

class CommentPage extends Component {
  componentDidMount () {
    this.props.id && this.getComment(this.props.id)
  }

  getComment (id) {
    this.props.dispatch(getComment({ id })).then(({ data }) => {
      data.error && this.redirect()
    })
  }

  redirect () {
    this.props.history.push(this.props.prevPath || '/')
  }

  render () {
    return (
      <div className='comment-detail-view'>
        <Loader loaded={!!this.props.comment}>
          {this.props.comment &&
            <Comment
              {...this.props.comment}
              editMode
            />}
        </Loader>
      </div>
    )
  }
}

const mapStateToProps = ({ comments, prevPath }, { id, parentId }) => {
  const comment = id ? comments.find((comment) => comment.id === id) : { parentId }
  return { id, comment, prevPath }
}

export default connect(mapStateToProps)(CommentPage)
