import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import Button from './Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

function Stepper({ steps }) {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <MobileStepper
      variant="progress"
      steps={steps}
      position="static"
      activeStep={activeStep}
      className="min self-center"
      nextButton={
        <Button
          variant="text"
          fullWidth={false}
          content="Siguiente"
          onClick={handleNext}
          disabled={activeStep === steps - 1}
        />
      }
      backButton={
        <Button
          variant="text"
          fullWidth={false}
          content="Regresar"
          onClick={handleBack}
          disabled={activeStep === 0}
        />
      }
    />
  )
}

export default Stepper
