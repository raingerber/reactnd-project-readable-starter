import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function CategoryList ({ categories }) {
  return (
    <nav className='breadcrumbs push-center'>
      <label>Categories:</label>
      <ul className='category-list'>
        <li>
          <NavLink to='/' activeClassName='active'>all</NavLink>
        </li>
        {categories.map(({ name, path }) => (
          <li key={`${name}${path}`}>
            <NavLink to={`/category/${path}`} activeClassName='active'>{name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// TODO get NavLink to work

export default connect(({ categories }) => ({ categories }))(CategoryList)
