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
import { useHttpClient } from '@/hooks/useHttpClient'

const SectionCatalog = ({ title, catalogs }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [idCatalogSelect, setIdCatalogSelect] = useState(null)
  const [catalogData, setCatalogData] = useState([]);

  const { sendRequest } = useHttpClient();
  
  // const fetchDataByCatalogName = async (name) => {
  //   try {
  //     const res = await sendRequest(`https://6574aa74b2fbb8f6509c81a7.mockapi.io/api/${name}`);
  //     console.log(`API Response for ${name}:`, res);
      
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const onHandleClickCatalog = (idCatalog, catalogName)=> {
    setIdCatalogSelect(idCatalog)
    //fetchDataByCatalogName(catalogName)
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
        catalogName={idCatalogSelect !== null ? catalogs.find(catalog => catalog.id === idCatalogSelect).name : ''}
      />
    </Accordion>
  )
}

export default SectionCatalog
