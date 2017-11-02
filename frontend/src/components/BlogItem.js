import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash.get'

import EditableText from './EditableText'
import CounterPanel from './CounterPanel'
import { StyledLink } from './Button'

import { formatUnixTimestamp } from '../utils'

class BlogItem extends Component {
  constructor (props) {
    super(props)
    this.state = this.getItemFields(props)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.editMode) {
      this.setState(this.getItemFields(nextProps))
    }
  }

  getItemFields (data = {}) {
    const category = data.category || get(this.props.categories, [0, 'name']) || ''
    const { author = '', title = '', body = '' } = data
    return { category, author, title, body }
  }

  resetItemFields () {
    this.setState(this.getItemFields(this.props))
  }

  onSubmit (event, submitItem) {
    if (submitItem && this.props.onSubmit) {
      this.props.onSubmit(this.getItemFields(this.state))
    }
  }

  render () {
    const isNewItem = !this.props.id
    const editMode = this.props.editMode
    const legend = isNewItem
      ? `new ${this.props.type}`
      : `${this.props.type} from ${formatUnixTimestamp(this.props.timestamp)}`
    return (
      <div className={'blog-item' + (editMode ? ' edit-mode' : '')}>
        {!editMode &&
          <CounterPanel
            increment={this.props.upVoteItem}
            decrement={this.props.downVoteItem}
            count={this.props.voteScore}
          />}
        <form className='form post-form' onSubmit={this.onSubmit.bind(this)}>
          <fieldset>
            <legend>{legend}</legend>
            {this.props.enableCategory &&
              <div className='form-item'>
                <label>Category:</label>
                {editMode ? (
                  <select
                    value={this.state.category}
                    onChange={(event) => this.setState({ category: event.target.value })}>
                    {this.props.categories.map(({ name, path }) => {
                      return <option key={`${name}${path}`}>{name}</option>
                    })}
                  </select>
                ) : (
                  <div>{this.props.category}</div>
                )}
              </div>}
            {this.props.enableTitle &&
              <div className='form-item'>
                <label>Title:</label>
                <EditableText
                  rows='1'
                  text={this.state.title}
                  editMode={editMode}
                  onChange={(title) => this.setState({ title })}
                />
              </div>}
            <div className='form-item'>
              <label>Author:</label>
              <EditableText
                rows='1'
                text={this.state.author}
                editMode={editMode && isNewItem}
                onChange={(author) => this.setState({ author })}
              />
            </div>
            <div className='form-item'>
              <label>Body:</label>
              <EditableText
                rows='3'
                text={this.state.body}
                editMode={editMode}
                onChange={(body) => this.setState({ body })}
              />
            </div>
            <div className='bottom-panel'>
              {editMode &&
                <StyledLink
                  to={this.props.redirects.onSave(this.props, this.state)}
                  onClick={(event) => this.onSubmit(event, true)}>
                  Save
                </StyledLink>}
              {editMode &&
                <StyledLink
                  to={this.props.redirects.onCancel(this.props)}
                  onClick={this.resetItemFields.bind(this)}>
                  Cancel
                </StyledLink>}
              {!editMode && !isNewItem &&
                <StyledLink to={this.props.redirects.onEdit(this.props)}>
                  Edit
                </StyledLink>}
              {!isNewItem &&
                <StyledLink
                  to={this.props.redirects.onDelete(this.props)}
                  onClick={this.props.deleteItem}>
                  Delete
                </StyledLink>}
              {this.props.enableComments &&
                <StyledLink to={`/post/${this.props.id}`} className='comments-button'>
                  {`Comments (${this.props.commentCount || 0})`}
                </StyledLink>}
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

BlogItem.defaultProps = {
  enableCategory: false,
  enableComments: false,
  enableTitle: false
}

export default connect(({ categories, prevPath }) => ({ categories, prevPath: prevPath || '/' }))(BlogItem)
