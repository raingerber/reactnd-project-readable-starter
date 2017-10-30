import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CategoryList from './category-list'
import SortControls from './sort-controls'
import PostList from './post-list'

import { getCategoryPosts, getPosts } from '../actions/index'

class MainView extends Component {
  constructor (props) {
    super(props)
    console.error('MainView: constructor')
  }

  getCategory () {
    return this.props.match.params.category
  }

  requestPosts () {
    const category = this.getCategory()
    if (category) {
      this.props.dispatch(getCategoryPosts({ category }))
    } else {
      this.props.dispatch(getPosts())
    }
  }

  render () {
    // console.error('MainView: render:', this.requestPosts())
    return (
      <div>
        <CategoryList location={this.props.location} />
        <SortControls />
        <div className='centered-button-container'>
          <Link className='button small round' to={{
            pathname: '/post',
            state: {
              prevRoute: this.props.location.pathname,
              category: this.getCategory()
            }
          }}>
            Add Post
          </Link>
        </div>
        <PostList />
      </div>
    )
  }
}
// TODO have default category passed to select from the dropdown
export default connect(({ posts: { posts } }) => ({ posts }))(MainView)
