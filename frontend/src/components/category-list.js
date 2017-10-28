import React from 'react'
import { connect } from 'react-redux'

function CategoryList ({ categories }) {
  return (
    <div className='category-list'>
      {categories.map(({ name, path }) => (
        <div key={name}>
          <a href={`/${path}`}>{name}</a>
        </div>
      ))}
    </div>
  )
}

export default connect(({ categories }) => ({ categories }))(CategoryList)
