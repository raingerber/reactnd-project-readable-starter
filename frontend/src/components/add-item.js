import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import get from 'lodash.get'

import TextArea from './text-area'
import { Button } from './button'

import { addPost } from '../actions/index'

class AddItem extends Component {
  constructor (props) {
    super(props)
    this.state = { // state is used for controlled components
      category: '',
      author: '',
      title: '',
      body: ''
    }
  }

  getCategory () {
    return get(this, ['props', 'location', 'state', 'category'], '')
  }

  getPrevRoute () {
    return get(this, ['props', 'location', 'state', 'prevRoute'], '/')
  }

  onSubmit (event) {
    event.preventDefault()
    const { category, author, title, body } = this.state
    this.props.dispatch(addPost({ category, author, title, body }))
    this.setState({ wasSubmitted: true })
  }

  render () {
    if (this.state.wasSubmitted) {
      return <Redirect to={this.getPrevRoute()} />
    }

    return (
      <div>
        <form className='form' onSubmit={this.onSubmit.bind(this)}>
          <fieldset>
            <legend>{this.props.type ? `new ${this.props.type}` : ''}</legend>
            {this.props.categories && <div className='form-item'>
              <label>Category:</label>
              <select value={this.getCategory()}>
                {this.props.categories.map(({ name, path }) => {
                  return <option key={`${name}${path}`}>{name}</option>
                })}
              </select>
            </div>}
            <div className='form-item'>
              <label>Title:</label>
              <TextArea
                value={this.state.title}
                onChange={(title) => this.setState({ title })}
                rows='1'
              />
            </div>
            <div className='form-item'>
              <label>Author:</label>
              <TextArea
                value={this.state.author}
                onChange={(author) => this.setState({ author })}
                rows='1'
              />
            </div>
            <div className='form-item'>
              <label>Body:</label>
              <TextArea
                value={this.state.body}
                onChange={(body) => this.setState({ body })}
                rows='3'
              />
            </div>
            <div className='centered-button-container'>
              <Button onClick={this.onSubmit.bind(this)}>Submit</Button>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

// AddItem.propTypes = {
//   rows: PropTypes.string,
//   value: PropTypes.string,
//   onChange: PropTypes.func.isRequired
// }

export default AddItem
