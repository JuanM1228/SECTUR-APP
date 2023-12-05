'use client'
import React, { useState } from 'react'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from '@mui/material'

import Icons from '@/assets/icons'
import PopupCatalog from './PopupCatalog'

const SectionCatalog = ({ title, catalogs }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [idCatalogSelect, setIdCatalogSelect] = useState(null)

  const onHandleClickCatalog = idCatalog => {
    setIdCatalogSelect(idCatalog)
    setOpenDialog(true)
  }

  const onClose = () => {
    setIdCatalogSelect(null)
    setOpenDialog(false)
  }

  return (
    <Accordion className="bg-merinoTransparent w-full max-w-3xl">
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        className="font-GMX font-bold">
        {title}
      </AccordionSummary>
      <AccordionDetails className="flex flex-col">
        {catalogs.map(catalog => {
          const CustomIcon = Icons[catalog.icon]
          return (
            <ListItemButton
              key={catalog.id}
              className="flex"
              onClick={() => onHandleClickCatalog(catalog.id)}>
              <ListItemAvatar>
                <Avatar>
                  <CustomIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ className: 'font-Montserrat' }}
                primary={catalog.name}
              />
            </ListItemButton>
          )
        })}
      </AccordionDetails>
      <PopupCatalog
        open={openDialog}
        idCatalog={idCatalogSelect}
        onClose={onClose}
      />
    </Accordion>
  )
}

export default SectionCatalog
