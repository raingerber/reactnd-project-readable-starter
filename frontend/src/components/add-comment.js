import React from 'react'

import AddItem from './add-item'

function AddComment (props) {
  return (
    <AddItem {...props} type='comment' />
  )
}

export default AddComment
