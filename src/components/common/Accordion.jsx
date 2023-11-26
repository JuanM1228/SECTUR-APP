'use client'
import React from 'react'

import { AccordionDetails, AccordionSummary } from '@mui/material'

import AccordionMUI from '@mui/material/Accordion'

const Accordion = ({
  title,
  icon,
  children,
  classNameAccordion,
  classNameDetails,
}) => {
  return (
    <AccordionMUI className={classNameAccordion}>
      <AccordionSummary expandIcon={icon} className="font-GMX font-bold">
        {title}
      </AccordionSummary>
      <AccordionDetails className={classNameDetails}>
        {children}
      </AccordionDetails>
    </AccordionMUI>
  )
}

export default Accordion
