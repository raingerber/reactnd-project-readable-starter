import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextArea extends Component {
  constructor (props) {
    super(props)
    this.state = { value: props.value }
  }

  onChange (event) {
    this.setState({ value: event.target.value })
  }

  onSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <textarea
        value={this.state.value}
        rows={this.props.rows}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}

TextArea.propTypes = {
  rows: PropTypes.number,
  value: PropTypes.string
}

TextArea.defaultProps = {
  value: ''
}

export default TextArea
