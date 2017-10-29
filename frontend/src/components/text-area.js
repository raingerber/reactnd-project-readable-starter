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
        rows={this.props.rows}
        value={this.props.value}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}

TextArea.propTypes = {
  rows: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

TextArea.defaultProps = {
  value: ''
}

export default TextArea
