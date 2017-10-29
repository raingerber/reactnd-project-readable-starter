import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { formatUnixTimestamp } from '../utils'

import EditableText from './editable-text'

class GenericBlogItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false, // TODO move this to the store
      title: props.title,
      body: props.body
    }
  }

  saveChanges () {
    this.props.updateItem({
      title: this.state.title,
      body: this.state.body
    })
  }

  removeChanges () {
    this.setState({
      title: this.props.title,
      body: this.props.body,
      editMode: false
    })
  }

  updateTitle (title) {
    this.setState({ title })
  }

  updateBody (body) {
    this.setState({ body })
  }

  setEditMode (editMode) {
    this.setState({ editMode })
  }

  onSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <div className={this.state.editMode ? 'editing' : ''}>
        <form className='form' onSubmit={this.onSubmit.bind(this)}>
          <fieldset>
            <legend>{`${this.props.type} from ${formatUnixTimestamp(Date.now())}`}</legend>
            {this.props.useTitle && <div className='form-item'>
              <label>Title:</label>
              <EditableText
                text={this.state.title}
                editMode={this.state.editMode}
                onChange={this.updateTitle.bind(this)}
              />
            </div>}
            <div>
              <div className='form-item'>
                <label>Body:</label>
                <EditableText
                  text={this.state.body}
                  editMode={this.state.editMode}
                  onChange={this.updateBody.bind(this)}
                />
              </div>
              <div className='button-group'>
                {this.state.editMode && (
                  <button className='button' onClick={this.saveChanges.bind(this)}>Save</button>
                )}
                {this.state.editMode && (
                  <button className='button' onClick={this.removeChanges.bind(this)}>Remove Changes</button>
                )}
                {!this.state.editMode && (
                  <button className='button' onClick={this.setEditMode.bind(this, true)}>Edit</button>
                )}
                <button className='button'>Delete</button>
                <RoundButton onClick={this.props.upVoteItem}>
                  <span className='button-text'>Up</span>
                  <span className='caret up' />
                </RoundButton>
                <RoundButton onClick={this.props.downVoteItem}>
                  <span className='button-text'>Down</span>
                  <span className='caret down' />
                </RoundButton>
              </div>
              <div>
                <span>Votes:</span>
                <span className='label badge black'>
                  {this.props.voteScore}
                </span>
              </div>
              <div>
                <span>Comments:</span>
                <span className='label badge black'>
                  {this.props.commentCount}
                </span>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

GenericBlogItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  commentCount: PropTypes.number,
  timestamp: PropTypes.number,
  voteScore: PropTypes.number,
  deleted: PropTypes.bool,
  type: PropTypes.string,
  updateItem: PropTypes.func.isRequired,
  upVoteItem: PropTypes.func.isRequired,
  downVoteItem: PropTypes.func.isRequired,
  useTitle: PropTypes.bool
}

function RoundButton ({ onClick, children }) {
  return <button className='button primary round outline' onClick={onClick}>{children}</button>
}

export default GenericBlogItem
