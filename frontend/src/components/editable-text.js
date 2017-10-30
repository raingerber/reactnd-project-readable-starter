import React from 'react'
import PropTypes from 'prop-types'

import TextArea from './text-area'

function EditableText ({ editMode, rows, text, onChange }) {
  if (editMode) {
    return (
      <TextArea type='text'
        rows={rows}
        value={text}
        onChange={onChange}
      />
    )
  }

  return <div>{text}</div>
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
