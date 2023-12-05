'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField, InputAdornment, IconButton } from '@mui/material'

import Icons from '@/assets/icons'
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
  IconComponent = null,
  iconPosition = 'start',
  margin = 'none',
  id,
  focused = true,
  rows = 1,
  multiline = null,
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
        {showPassword ? <Icons.VisibilityOff /> : <Icons.Visibility />}
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
          sx: { ml: IconComponent ? 4.5 : '' },
          shrink,
        }}
        sx={theme => ({
          '& .MuiOutlinedInput-notchedOutline': {
            px: IconComponent ? 5.5 : '',
          },
        })}
        inputProps={{
          className: 'font-GMX font-semibold',
          maxLength: maxLength,
        }}
        className="text-sm"
        label={label}
        color={setColor}
        margin={margin}
        id={id}
        variant={variant}
        error={error}
        helperText={helpText}
        disabled={disabled}
        type={setType()}
        focused={focused}
        size={size}
        rows={rows}
        multiline={multiline}
        fullWidth={fullWidth}
        InputProps={{
          startAdornment: IconComponent && iconPosition === 'start' && (
            <InputAdornment position="start"><IconComponent/></InputAdornment>
          ),
          endAdornment: IconComponent &&
            (iconPosition === 'end' || type === 'password') && (
              <InputAdornment position="end">
                {type === 'password' ? passwordIcon() : <IconComponent/>}
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
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  size: PropTypes.oneOf(['medium', 'small']),
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
}

export default Input
