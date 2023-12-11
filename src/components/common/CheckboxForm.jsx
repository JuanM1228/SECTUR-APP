'use client'
import React from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

import colors from '@/assets/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.bigDipORuby,
    },
    secondary: {
      main: colors.gray,
    },
  },
  typography: {
    fontFamily: ['GMX'], // TODO: Verify it with Juan
  },
})

const CheckboxForm = props => {
  const {
    title = '',
    helperText = '',
    options,
    checkedItems,
    handleChange,
    name,
  } = props

  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset" variant="standard" className="my-4">
        {title && (
          <FormLabel
            component="legend"
            className="font-GMX text-lg font-bold text-black">
            {title}
          </FormLabel>
        )}
        <FormGroup className="grid grid-cols-1 sm:grid-cols-2">
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={checkedItems[option.value] || false}
                  onChange={e => handleChange(e, name)}
                  name={option.value}
                />
              }
              label={option.title}
            />
          ))}
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </ThemeProvider>
  )
}

CheckboxForm.propTypes = {
  title: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  checkedItems: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default CheckboxForm
