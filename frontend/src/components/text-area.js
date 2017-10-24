import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextArea extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (event) {
    this.setState({ value: event.target.value })
  }

  onSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render () {
    return (
      <div className='form-item'>
        <form onSubmit={this.onSubmit}>
          <label>
            <textarea value={this.state.value} onChange={this.onChange} rows={this.props.rows}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

TextArea.propTypes = {
  rows: PropTypes.number,
  onSubmit: PropTypes.func.isRequired
}

TextArea.defaultProps = {
  rows: 6
}

export default TextArea
