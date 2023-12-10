'use client'
import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'

const TimePickerCustom = ({
  label = '',
  name = '',
  variant = 'outlined',
  error = false,
  helpText = '',
  disabled = false,
  color,
  ampm = true,
  size = 'small',
  minTime = null,
  maxTime = null,
  onChange = () => {},
  defaultValue = '',
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

  const onHandleChange = e => {
    const value = e
    try {
      const resp = { target: { name, value } }
      onChange(resp)
      console.log(resp)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          defaultValue={defaultValue}
          label={label}
          ampm={ampm}
          minTime={minTime}
          maxTime={maxTime}
          className="w-full"
          disabled={disabled}
          onChange={onHandleChange}
          slotProps={{
            field: {
              className: 'font-GMX',
              InputProps: { className: 'font-GMX font-semibold' },
            },
            textField: {
              variant: variant,
              name: name,
              size: size,
              error: error,
              helperText: helpText,
              InputLabelProps: {
                className: 'font-GMX font-semibold text-sm',
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default TimePickerCustom
