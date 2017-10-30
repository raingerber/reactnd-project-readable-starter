
import React, { Component } from 'react'

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
    let className = 'label badge black vote-badge'
    if (this.state.decreased) {
      className += ' quick-decrease'
    } else if (this.state.increased) {
      className += ' quick-increase'
    }

    return (
      <span className={className} onAnimationEnd={this.resetState.bind(this)}>
        {`${this.props.voteScore} votes`}
      </span>
    )
  }
}

export default VoteScoreBadge
