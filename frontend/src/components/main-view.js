import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash.get'

import CategoryList from './category-list'
import SortControls from './sort-controls'
import PostList from './post-list'
import { StyledLink } from './button'

class MainView extends Component { // TODO use pure component?
  render () {
    return (
      <div>
        <CategoryList location={this.props.location} />
        <SortControls />
        <div className='centered-button-container'>
          <StyledLink className='button small round' to={{
            pathname: '/post',
            state: { category: get(this.props, ['match', 'params', 'category'], '') }
          }}>
            Add Post
          </StyledLink>
        </div>
        <PostList />
      </div>
    )
  }
}

export default MainView
