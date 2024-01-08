'use client'
import React from 'react'
import StepperMUI from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Colors from '@/assets/colors'
const steps = [
  'Datos Generales',
  'Domicilio',
  'Contacto',
  'Información Legal',
  'Detalle PST',
]

const Stepper = ({ activeStep }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.bigDipORuby,
      },
      secondary: {
        main: Colors.gray,
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <StepperMUI
        activeStep={activeStep}
        alternativeLabel
        className="font-Montserrat w-full">
        {steps.map(label => (
          <Step key={label} className="font-Montserrat">
            <StepLabel className="font-Montserrat">{label}</StepLabel>
          </Step>
        ))}
      </StepperMUI>
    </ThemeProvider>
  )
}

export default Stepper
