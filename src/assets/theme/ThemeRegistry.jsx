'use client'

import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NextAppDirEmotionCacheProvider } from './EmotionCache'
import { themeOptions } from './ThemeMUI'

const theme = createTheme(themeOptions)

export default function ThemeRegistry({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
