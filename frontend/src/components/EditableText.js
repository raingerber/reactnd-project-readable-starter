import React from 'react'
import PropTypes from 'prop-types'

import TextArea from './TextArea'

function EditableText ({ editMode, rows, text, onChange }) {
  return (
    editMode ? (
      <TextArea type='text'
        rows={rows}
        value={text}
        onChange={onChange}
      />
    ) : (
      <div>{text}</div>
    )
  )
}

EditableText.propTypes = {
  text: PropTypes.string,
  editMode: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

EditableText.defaultProps = {
  text: '',
  editMode: false
}

export default EditableText
