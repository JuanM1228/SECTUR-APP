'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'

const Dropdown = ({
  title = '',
  options = [],
  value = 0,
  setValue = () => {},
  color = null,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.bigDipORuby,
      },
      secondary: {
        main: color ? color : Colors.gray,
      },
    },
  })

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <FormControl
        variant="standard"
        fullWidth
        size="small"
        color={color ? 'secondary' : 'primary'}>
        <InputLabel id={title} className="font-brandonRegular ">
          {title}
        </InputLabel>
        <Select
          className="font-brandonRegular "
          labelId={title}
          value={value}
          label={title}
          onChange={handleChange}>
          {options.map(option => (
            <MenuItem
              key={`${option.title}-${option.value}}`}
              className="font-brandonRegular"
              value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
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
