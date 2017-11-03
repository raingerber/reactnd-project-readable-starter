import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'

import Post from './Post'
import { CommentList } from './ItemList'
import { StyledLink } from './Button'

import { getPost, getPostComments } from '../actions/index'

class PostPage extends Component {
  componentDidMount () {
    this.props.id && this.getPost(this.props.id)
  }

  getPost (id) {
    this.props.dispatch(getPost({ id }))
    this.props.dispatch(getPostComments({ id }))
  }

  postIsLoaded (post) {
    return !this.props.id || !!Object.keys(post || {}).length
  }

  redirect () {
    this.props.history.push(this.props.prevPath || '/')
  }

  render () {
    return (
      <div className='post-detail-view'>
        {this.postIsLoaded(this.props.post) ? (
          <Loader loaded={!!this.props.post}>
            {this.props.post &&
              <Post
                {...this.props.post}
                editMode={this.props.editMode}
              />}
            {this.props.post && this.props.id &&
              <div style={{ marginTop: '2em' }}>
                <div className='centered-button-container'>
                  <StyledLink to={{ pathname: `/comment/edit/${this.props.id}` }}>
                    Add Comment
                  </StyledLink>
                </div>
                <CommentList parentId={this.props.id} />
              </div>}
          </Loader>
        ) : (
          <div className='text-center'>
            There was no post found with the ID <i>{this.props.id}.</i>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ posts: { posts }, prevPath }, { id, category }) => {
  const post = id ? posts.find((post) => post.id === id) : { category }
  return { id, post, prevPath }
}

export default connect(mapStateToProps)(PostPage)
