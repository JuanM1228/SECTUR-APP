import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

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
    const value = Date(e._d)
    const resp = { target: { name, value } }
    onChange(resp)
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label={label}
          className="w-full"
          format="DD-MM-YYYY"
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

export default DatePickerCustom
