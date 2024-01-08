'use client'
import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,

} from '@mui/material';
import Icons from '@/assets/icons';
import PopupSubCategoria from './PopupSubCategoria';
import Button from '../common/Button';

const SubCategoria = ({ title, catalogs,idCatalog,idSubcategoria }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [idCatalogSelect, setIdCatalogSelect] = useState('');
  const [catalogName, setCatalogName] = useState('');

  const onHandleClickCatalog = (idCatalog, name) => {
    setIdCatalogSelect(idCatalog);
    setOpenDialog(true);
    setCatalogName(name);
    console.log('selectedId', idCatalog);
  };

  const onClose = () => {
    setIdCatalogSelect(null);
    setOpenDialog(false);
  };

  return (
    <Accordion className="bg-merinoTransparent w-full max-w-3xl">
  <AccordionSummary
    expandIcon={<Icons.ExpandMore />}
    className="font-GMX font-bold">
    {title}
  </AccordionSummary>
       <Button content='Editar Subcategoría' onClick={() => onHandleClickCatalog(idCatalog, title, catalogs)} />
  <PopupSubCategoria
    open={openDialog}
    idCatalog={idCatalogSelect}
    onClose={onClose}
    catalogName={catalogName}
  />
</Accordion>

  
  );
};

export default SubCategoria;
