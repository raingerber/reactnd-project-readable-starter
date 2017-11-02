import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UPDATE_POST_SORT } from '../actions/types'

const SORT_KEYS = [{
  displayKey: 'Votes',
  sortKey: 'voteScore'
}, {
  displayKey: 'Timestamp',
  sortKey: 'timestamp'
}, {
  displayKey: 'Title',
  sortKey: 'title'
}]

class SortControls extends Component {
  onChange (key, event) {
    const data = Object.assign({
      sortKey: this.props.sortKey,
      sortOrder: this.props.sortOrder
    }, { [key]: event.target.value })
    this.props.dispatch({ type: UPDATE_POST_SORT, data })
  }

  onSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <div className='sort-controls'>
        <form className='form' onSubmit={this.onSubmit.bind(this)}>
          <label>Sort By:</label>
          <div className='form-items'>
            <div className='form-item'>
              <select className='small'
                value={this.props.sortKey}
                onChange={this.onChange.bind(this, 'sortKey')}>
                {SORT_KEYS.map((data) => (
                  <option key={data.sortKey} value={data.sortKey}>{data.displayKey}</option>
                ))}
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
