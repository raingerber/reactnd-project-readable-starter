import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextArea extends Component {
  onChange (event) {
    this.props.onChange(event.target.value)
  }

  onSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <textarea
        value={this.props.value}
        onChange={this.onChange.bind(this)}
        rows={this.props.rows}
      />
    )
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.string
}

TextArea.defaultProps = {
  value: '',
  rows: 'auto'
}

export default TextArea
