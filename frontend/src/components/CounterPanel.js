import React, { Component } from 'react'

import { CaretButton } from './Button'

function CounterPanel ({ increment, decrement, count }) {
  return (
    <div className='counter-panel'>
      <CaretButton onClick={increment} outline>
        <span className='caret up' />
      </CaretButton>
      <CaretButton onClick={decrement} outline>
        <span className='caret down' />
      </CaretButton>
      <CounterBadge count={count} />
    </div>
  )
}

class CounterBadge extends Component {
  constructor (props) {
    super(props)
    // using state to add animations when the vote increases or decreases
    // this is not in the project requirements, so I didn't bother trying
    // to use redux (which wouldn't really make sense here anyway)
    this.state = {
      decreased: false,
      increased: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const decreased = (nextProps.count < this.props.count)
    const increased = (nextProps.count > this.props.count)
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
        {`${this.props.count} votes`}
      </span>
    )
  }
}

export default CounterPanel
