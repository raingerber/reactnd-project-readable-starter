import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import get from 'lodash.get'

import TextArea from './text-area'
import { Button } from './button'

class ItemEditor extends Component {
  constructor (props) {
    super(props)
    // state is mainly used for controlled components
    this.state = Object.assign(this.getItemFields(props.item), { wasSubmitted: false })
  }

  getItemFields (item = {}) {
    const {
      category = get(this.props, ['categories', 0, 'name'], ''), // ONLY IF CATEGORIES ARE SUPPORTED
      author = '',
      title = '', // ONLY if useTitle is true
      body = ''
    } = item
    return { category, author, title, body }
  }

  componentDidMount () {
    if (this.props.id && !this.props.item) {
      this.props.dispatch(this.props.getItem({ id: this.props.id }))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.item && nextProps.item) {
      this.setState(this.getItemFields(nextProps.item))
    }
  }

  getPrevRoute () {
    return get(this, ['props', 'location', 'state', 'prevRoute'], '/')
  }

  getLegend () {
    if (this.props.type) {
      return this.props.id ? `edit ${this.props.type}` : `new ${this.props.type}`
    }

    return ''
  }

  onSubmit (event) {
    // TODO clean up this code
    event.preventDefault()
    let { category, author, title, body } = this.getItemFields(this.state)
    body = body.trim()
    author = author.trim()
    title = title.trim()
    category = category.trim()
    console.error(category, author, title, body)
    if (
      !body ||
      !author ||
      (this.props.useTitle && !title) ||
      (this.props.categories && !category)
    ) {
      window.alert('You left something blank!')
      return
    }

    this.props.onSubmit({ category, author, title, body })
    this.setState({ wasSubmitted: true })
  }

  render () {
    if (this.state.wasSubmitted) {
      return <Redirect to={this.getPrevRoute()} />
    }

    return (
      <Loader loaded={!this.props.id || !!this.props.item}>
        <form className='form' onSubmit={this.onSubmit.bind(this)}>
          <fieldset>
            <legend>{this.getLegend()}</legend>
            {this.props.categories && <div className='form-item'>
              <label>Category:</label>
              <select
                value={this.state.category}
                onChange={(event) => this.setState({ category: event.target.value })}>
                {this.props.categories.map(({ name, path }) => {
                  return <option key={`${name}${path}`}>{name}</option>
                })}
              </select>
            </div>}
            {this.props.useTitle && <div className='form-item'>
              <label>Title:</label>
              <TextArea
                value={this.state.title}
                onChange={(title) => this.setState({ title })}
                rows='1'
              />
            </div>}
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
      </Loader>
    )
  }
}

ItemEditor.propTypes = {
  getItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  useTitle: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  item: PropTypes.object,
  categories: PropTypes.array
}

export default connect(({ categories }) => ({ categories }))(ItemEditor)
