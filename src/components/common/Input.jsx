'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField, InputAdornment, IconButton } from '@mui/material'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'

const Input = ({
  label = '',
  name = '',
  variant = 'outlined',
  error = false,
  helpText = '',
  disabled = false,
  type = 'text',
  color,
  maxLength = 500,
  size = 'small',
  fullWidth = true,
  icon = null,
  iconPosition = 'start',
  focused = true,
  onChange = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [shrink, setShrink] = useState(true)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.gray,
      },
      secondary: {
        main: color ? color : Colors.gray,
      },
    },
  })

  const passwordIcon = () => {
    return (
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        // onMouseDown={handleMouseDownPassword}
        edge="end">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    )
  }

  const setType = () => {
    if (type !== 'password') return type
    return showPassword ? 'text' : 'password'
  }

  let setColor = error ? 'error' : ''
  setColor = color ? 'secondary' : 'primary'
  return (
    <ThemeProvider theme={theme}>
      <TextField
        name={name}
        onFocus={() => setShrink(true)}
        onBlur={e => setShrink(!!e.target.value)}
        InputLabelProps={{
          className: 'font-GMX font-semibold text-sm',
          sx: { ml: icon ? 4.5 : '' },
          shrink,
        }}
        sx={theme => ({
          '& .MuiOutlinedInput-notchedOutline': {
            px: icon ? 5.5 : '',
          },
        })}
        inputProps={{
          className: 'font-GMX font-semibold',
          maxLength: maxLength,
        }}
        className="text-sm"
        label={label}
        color={setColor}
        variant={variant}
        error={error}
        helperText={helpText}
        disabled={disabled}
        type={setType()}
        focused={focused}
        size={size}
        fullWidth={fullWidth}
        InputProps={{
          startAdornment: icon && iconPosition === 'start' && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: icon &&
            (iconPosition === 'end' || type === 'password') && (
              <InputAdornment position="end">
                {type === 'password' ? passwordIcon() : icon}
              </InputAdornment>
            ),
        }}
        onChange={onChange}
      />
    </ThemeProvider>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  helpText: PropTypes.string,
  color: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
  size: PropTypes.oneOf(['medium', 'small']),
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
}

export default Input
