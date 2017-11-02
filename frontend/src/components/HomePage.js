import React from 'react'
import { connect } from 'react-redux'

import CategoryList from './CategoryList'
import SortControls from './SortControls'
import { PostList } from './ItemList'
import { StyledLink } from './Button'

// I'm passing the category via the StyledLink so that I
// can use it as the default selection for the controlled
// <select> component on the /post page - it's not strictly
// necessary though
function HomePage (props) {
  return (
    <div className='home-page'>
      <CategoryList location={props.location} />
      {props.hasPosts &&
        <SortControls />}
      <div className='centered-button-container'>
        <StyledLink to={{
          pathname: '/post/edit',
          state: { category: props.category }
        }}>
          Add Post
        </StyledLink>
      </div>
      <PostList />
    </div>
  )
}

const mapStateToProps = ({ posts: { posts } }) => {
  return { hasPosts: !!posts.length }
}

export default connect(mapStateToProps)(HomePage)
