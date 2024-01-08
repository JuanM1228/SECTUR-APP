'use client'
import React, { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
} from '@mui/material'
import Icons from '@/assets/icons'
import PopupSubCategoria from './PopupSubCategoria'

const Subcategoria = ({ title, subpst, }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [idCatalogSelect, setIdCatalogSelect] = useState('')
  const [catalogName, setCatalogName] = useState('')
  const [subPstContent, setSubPstContent] = useState(null);

  
  const onHandleClickCatalog = (idSubCatalog, name, subpst)=> {
    setIdCatalogSelect(idSubCatalog)
    setOpenDialog(true)
    setCatalogName(name)
    setSubPstContent(subpst)
    console.log('selectedId',idSubCatalog)
    console.log('subpstes',subpst)
  }

  const onClose = () => {
    setIdCatalogSelect(null)
    setOpenDialog(false)
  }

  return (
    <Accordion disableGutters={true} className="bg-merinoTransparent  w-full max-w-3xl">
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        className="font-GMX font-bold"
        onClick={() => onHandleClickCatalog(subpst[0].id, title, subpst)}
        >
        Editar: {title}
      </AccordionSummary>
     
      <PopupSubCategoria
        open={openDialog}
        idSubCatalog={idCatalogSelect}
        onClose={onClose}
        catalogName={catalogName}
        subPstContent={subPstContent}
        
        />
    </Accordion>
  )
}

export default Subcategoria
