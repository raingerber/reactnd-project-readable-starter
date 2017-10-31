import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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

function StyledLink (props) {
  let className = 'button small round'
  if (props.className) {
    className += ` ${props.className}`
  }

  return <Link {...props} className={className} />
}

export { Button, CaretButton, StyledLink }
