'use client'
import React from 'react'
import PropTypes from 'prop-types'

import BadgeMUI from '@mui/material/Badge'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'

const Badge = ({
  content = '',
  max = 999,
  variant = 'standard',
  color = null,
  vertical = 'top',
  horizontal = 'right',
  children = null,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.persianPlum,
      },
      secondary: color,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <BadgeMUI
        anchorOrigin={{ vertical, horizontal }}
        badgeContent={content}
        color={color ? 'secondary' : 'primary'}
        max={max}
        variant={variant}>
        {children}
      </BadgeMUI>
    </ThemeProvider>
  )
}

Badge.propTypes = {
  max: PropTypes.number,
  content: PropTypes.any,
  children: PropTypes.any,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['standard, dot']),
  vertical: PropTypes.oneOf(['top', 'bottom']),
  horizontal: PropTypes.oneOf(['right', 'left']),
}

export default Badge
