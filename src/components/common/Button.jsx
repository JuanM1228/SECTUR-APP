'use client'
import React from 'react'
import PropTypes from 'prop-types'

import ButtonMUI from '@mui/material/Button'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'

const Button = ({
  className = '',
  fullWidth = true,
  content = '',
  type = 'button',
  disabled = false,
  onClick = () => {},
}) => {
  const colorButton = disabled
    ? ''
    : 'bg-bigDipORuby text-white hover:bg-bigDipORuby'
  return (
    <ButtonMUI
      variant="contained"
      fullWidth={fullWidth}
      type={type}
      className={`${colorButton} ${className} font-GMX font-bold`}
      disabled={disabled}
      onClick={onClick}>
      {content}
    </ButtonMUI>
  )
}

Button.propTypes = {
  title: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button
