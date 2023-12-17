'use client'
import React from 'react'
import PropTypes from 'prop-types'

import ButtonMUI from '@mui/material/Button'

const Button = ({
  className = '',
  fullWidth = true,
  content = '',
  type = 'button',
  disabled = false,
  variant = 'contained',
  autoFocus = false,
  startIcon = null,
  onClick = () => {},
}) => {
  const colorButton = disabled
    ? ''
    : 'bg-bigDipORuby text-white hover:bg-bigDipORuby'
  return (
    <ButtonMUI
      autoFocus={autoFocus}
      variant={variant}
      fullWidth={fullWidth}
      type={type}
      startIcon={startIcon}
      className={`${colorButton} ${className} font-GMX font-bold`}
      disabled={disabled}
      onClick={onClick}>
      {content}
    </ButtonMUI>
  )
}

Button.propTypes = {
  content: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button
