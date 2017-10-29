import React from 'react'
import { connect } from 'react-redux'

function CategoryList ({ categories }) {
  return (
    <table className='category-list bordered'>
      <thead>
        <tr>
          <th className='w80'>Category</th>
          <th className='w20'># of posts</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(({ name, path }) => (
          <tr key={name}>
            <td className='w80 link-td'>
              <a href={`/${path}`}>{name}</a>
            </td>
            <td className='w20'>
              25
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default connect(({ categories }) => ({ categories }))(CategoryList)
