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
        rows={this.props.rows}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  rows: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

TextArea.defaultProps = {
  value: '',
  rows: 'auto'
}

export default TextArea
