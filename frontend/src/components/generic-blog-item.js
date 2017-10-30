import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { formatUnixTimestamp } from '../utils'

import { Button, CaretButton } from './button'

class GenericBlogItem extends Component {
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
            <div>{this.props.title}</div>
          </div>}
          <div className='form-item'>
            <label>Author:</label>
            <div>{this.props.author}</div>
          </div>
          <div className='form-item'>
            <label>Body:</label>
            <div>{this.props.body}</div>
          </div>
          <div className='bottom-panel'>
            <Link className='button small round' to={{
              pathname: `/${this.props.type.toLowerCase()}/${this.props.id}`
            }}>Edit</Link>
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

// TODO have a generic Button type component for styled links

GenericBlogItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  commentCount: PropTypes.number,
  timestamp: PropTypes.number,
  voteScore: PropTypes.number,
  deleted: PropTypes.bool,
  type: PropTypes.string,
  upVoteItem: PropTypes.func.isRequired,
  downVoteItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  useComments: PropTypes.bool,
  useTitle: PropTypes.bool
}

class VoteScoreBadge extends Component {
  constructor (props) {
    super(props)
    this.state = { // just using to add animations when the vote increases or decreases
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
