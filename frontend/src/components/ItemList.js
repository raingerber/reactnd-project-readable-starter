import React from 'react'
import { connect } from 'react-redux'

import Post from './Post'
import Comment from './Comment'

function ItemList ({ items, type, Item }) {
  return items.length ? (
    <div className={`${type}-list`}>
      {items.map((item) => <Item key={item.id} {...item} />)}
    </div>
  ) : (
    <div className='text-block text-center'>
      <i>{`No ${type}s here yet!`}</i>
    </div>
  )
}

const mapPostStateToProps = ({ posts: { posts } }) => {
  return { type: 'post', Item: Post, items: posts } // TODO filter by category?
}

const PostList = connect(mapPostStateToProps)(ItemList)

const mapCommentStateToProps = ({ comments }, { parentId }) => {
  comments = comments.filter((comment) => comment.parentId === parentId)
  return { type: 'comment', Item: Comment, items: comments }
}

const CommentList = connect(mapCommentStateToProps)(ItemList)

export { ItemList, PostList, CommentList }
