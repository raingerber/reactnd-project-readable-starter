import React from 'react'
import PropTypes from 'prop-types'

function Button (props) {
  return (
    <button
      className={'button small round' + (props.outline ? ' outline secondary' : '')}
      disabled={props.disabled}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}

function CaretButton (props) {
  return (
    <button
      className={'button small round caret-button' + (props.outline ? ' outline secondary' : '')}
      disabled={props.disabled}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export { Button, CaretButton }
