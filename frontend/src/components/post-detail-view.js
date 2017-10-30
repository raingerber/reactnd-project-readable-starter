import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Post from './post'
import Comment from './comment'
import { Button } from './button'

// TODO combine these two functions
import { getPost, getPostComments } from '../actions/index'

// function PostDetailView (props) {
//   console.error('rendering PostDetailView:', props.match.params.id)
//   return (
//     <div className='post-detail-view'>
//       <Post {...props} />
//     </div>
//   )
// }

class PostDetailView extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    console.error('id:', id)
    this.props.dispatch(getPost({ id }))
    this.props.dispatch(getPostComments({ id }))
  }

  render () {
    console.error('rendering PostDetailView:', this.props)
    return (
      <div className='post-detail-view'>
        {this.props.post && <Post {...this.props.post} />}
        <div className='post-comments'>
          <div className='centered-button-container'>
            <Link className='button small round' to={{
              pathname: '/add-comment',
              state: {
                prevRoute: this.props.location.pathname
              }
            }}>
              Add Comment
            </Link>
          </div>
          {this.props.comments.map((comment) => <Comment key={comment.id} {...comment} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts: { posts }, comments }) => ({
  post: posts[0] || {},
  comments
})

export default connect(mapStateToProps)(PostDetailView)
