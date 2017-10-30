import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

// when using this component, we should pass the current location object as a
// prop so the NavLink components can know when to set their active class name

function CategoryList ({ categories }) {
  return (
    <nav className='breadcrumbs push-center'>
      <label>Categories:</label>
      <ul className='category-list'>
        <li>
          <NavLink exact to='/' activeClassName='active'>all</NavLink>
        </li>
        {categories.map(({ name, path }) => (
          <li key={`${name}${path}`}>
            <NavLink exact to={`/category/${path}`} activeClassName='active'>{name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default connect(({ categories }) => ({ categories }))(CategoryList)
