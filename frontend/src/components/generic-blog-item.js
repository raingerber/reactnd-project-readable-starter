import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { formatUnixTimestamp } from '../utils'

import { Button, CaretButton } from './button'
import EditableText from './editable-text'

class GenericBlogItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false, // TODO move this to the store
      title: props.title, // used for controlled component
      body: props.body // used for controlled component
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
      <form className='form post-form' onSubmit={this.onSubmit.bind(this)}>
        <fieldset>
          <legend>{`${this.props.type} from ${formatUnixTimestamp(Date.now())}`}</legend>
          <div className='vote-panel'>
            <CaretButton onClick={this.props.upVoteItem} outline>
              <span className='caret up' />
            </CaretButton>
            <CaretButton onClick={this.props.downVoteItem} outline>
              <span className='caret down' />
            </CaretButton>
            <VoteScoreBadge voteScore={this.props.voteScore} />
          </div>
          {this.props.useTitle && <div className='form-item'>
            <label>Title:</label>
            <EditableText
              rows='1'
              text={this.state.title}
              editMode={this.state.editMode}
              onChange={this.updateTitle.bind(this)}
            />
          </div>}
          <div className='form-item'>
            <label>Body:</label>
            <EditableText
              rows='3'
              text={this.state.body}
              editMode={this.state.editMode}
              onChange={this.updateBody.bind(this)}
            />
          </div>
          <div className='bottom-panel'>
            {this.state.editMode && (
              <Button onClick={this.saveChanges.bind(this)}>Save</Button>
            )}
            {this.state.editMode && (
              <Button onClick={this.removeChanges.bind(this)}>Cancel</Button>
            )}
            {!this.state.editMode && (
              <Button onClick={this.setEditMode.bind(this, true)}>Edit</Button>
            )}
            <Button onClick={this.props.deleteItem}>Delete</Button>
            {this.props.useComments &&
              <Link to={`/category/${this.props.category}/${this.props.id}`} className='button small round comments-button'>
                {`Comments (${this.props.commentCount})`}
              </Link>
            }
          </div>
        </fieldset>
      </form>
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
  deleteItem: PropTypes.func.isRequired,
  useComments: PropTypes.bool,
  useTitle: PropTypes.bool
}

class VoteScoreBadge extends Component {
  constructor (props) {
    super(props)
    this.state = {
      decreased: false,
      increased: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const decreased = (nextProps.voteScore < this.props.voteScore)
    const increased = (nextProps.voteScore > this.props.voteScore)
    this.setState({ decreased, increased })
  }

  resetState () {
    this.setState({
      decreased: false,
      increased: false
    })
  }

  render () {
    const className = 'label badge black vote-badge' + (
      this.state.decreased ? ' quick-decrease' : this.state.increased ? ' quick-increase' : ''
    )

    return (
      <span className={className} onAnimationEnd={this.resetState.bind(this)}>
        {`${this.props.voteScore} votes`}
      </span>
    )
  }
}

export default GenericBlogItem
