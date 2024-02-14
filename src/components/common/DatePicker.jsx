import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'

const DatePickerCustom = ({
  label = '',
  name = '',
  variant = 'outlined',
  error = false,
  helpText = '',
  disabled = false,
  color,
  size = 'small',
  value = '',
  maxDate = null,
  minDate = null,
  onChange = () => {},
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
    const value = new Date(e.$d)
    const resp = { target: { name, value } }
    onChange(resp)
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          className="w-full"
          format="DD-MM-YYYY"
          value={value}
          disabled={disabled}
          onChange={onHandleChange}
          maxDate={maxDate}
          minDate={minDate}
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

export default DatePickerCustom
