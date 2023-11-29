'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'

const Dropdown = ({
  label = '',
  name = '',
  error = false,
  fullWidth = true,
  options = [],
  value = '',
  helpText = '',
  onChange = () => {},
  size = 'small',
  variant = 'standard',
  focused = true,
  disabled = false,
  color = null,
}) => {
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

  let setColor = error ? 'error' : ''
  setColor = color ? 'secondary' : 'primary'
  return (
    <ThemeProvider theme={theme}>
      <FormControl
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        focused={focused}
        color={setColor}>
        <InputLabel
          id={label}
          className={`font-GMX font-bold text-sm ${error ? 'text-error' : ''}`}>
          {label}
        </InputLabel>
        <Select
          name={name}
          inputProps={{ className: 'font-GMX font-semibold' }}
          className="font-GMX"
          labelId={label}
          value={value}
          label={label}
          error={error}
          defaultValue=""
          onChange={e => onChange(e)}>
          {options.map(option => (
            <MenuItem
              key={`${option.title}-${option.value}}`}
              className="font-GMX"
              value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText className={error ? 'text-error' : ''}>
          {helpText}
        </FormHelperText>
      </FormControl>
    </ThemeProvider>
  )
}

Dropdown.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  setValue: PropTypes.func,
}

export default Dropdown
