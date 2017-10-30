import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UPDATE_POST_SORT } from '../actions/types'
// TODO make a pure component
class SortControls extends Component {
  onChange (key, event) {
    const data = Object.assign({
      sortKey: this.props.sortKey,
      sortOrder: this.props.sortOrder
    }, { [key]: event.target.value })
    // console.error('sortItems:', data)
    this.props.dispatch({ type: UPDATE_POST_SORT, data })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <div className='sort-controls'>
        <form className='form' onSubmit={this.handleSubmit.bind(this)}>
          <label>Sort By:</label>
          <div>
            <div className='form-item'>
              <select className='small'
                value={this.props.sortKey}
                onChange={this.onChange.bind(this, 'sortKey')}>
                <option value='votes'>Votes</option>
                <option value='timestamp'>Timestamp</option>
                <option value='title'>Title</option>
              </select>
            </div>
            <div className='form-item'>
              <select className='small'
                value={this.props.sortOrder}
                onChange={this.onChange.bind(this, 'sortOrder')}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ posts: { sortKey, sortOrder } }) => ({ sortKey, sortOrder })

export default connect(mapStateToProps)(SortControls)