'use client'
import React, {useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material'
import Button from '../common/Button'
import Slide from '@mui/material/Slide'
import Icons from '@/assets/icons'
import Table from '../common/Table'
import { COLUMNS_TABLE_SUB_CATALOGOS } from '@/utils/columsTables'
import { useHttpClient } from '@/hooks/useHttpClient'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro de que desea eliminar este elemento?
        </DialogContentText>
      </DialogContent>
      <div className="flex justify-end p-5 ">
        <Button  content='Cancelar' onClick={onClose} />
        <Button  content='Aceptar' onClick={onConfirm}/>
      </div>
    </Dialog>
  );
};

const EditSection = ({ rowData, onEdit, onDelete }) => {
  return (
    <div className="flex gap-4 ">
      <IconButton onClick={() => onEdit(rowData)}>
        <Icons.Edit />
      </IconButton>
      <IconButton onClick={() => onDelete(rowData)}>
        <Icons.Delete />
      </IconButton>
    </div>
  );
};

const PopupSubCategoria = ({ open, onClose, idSubCatalog, catalogName, subPstContent}) => {

  const { sendRequest } = useHttpClient()
  const [data, setData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [content, setContent] = useState('Agregar nuevo campo');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formdata, setFormData] = useState({
    id_catalogo: '',
    name: '',
    estatus: '',
    isActive:-1,
    tipo_especial:-1,
    id_especial:-1
  });

  const toggleInput = () => {
    setContent(showInput ? 'Agregar nuevo campo' : 'Regresar');
    setShowDropdown(!showDropdown);
    setShowInput(!showInput);
    setShowButton(!showButton);
  };

  const fetchDataByCatalogName = async (idSubCatalog) => {
    try {
      const res = await sendRequest(`/api/configuration/catalogo-subcategorias/${idSubCatalog}`);
      console.log(`API Response subcatalogo for ${idSubCatalog}:`, res);
      if(!res.success)return
      setData (res.result.data)
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('idSubCatalog:', idSubCatalog);
    fetchDataByCatalogName(idSubCatalog)
  }, [idSubCatalog])

  //AddCamp
  const addCamp = async (requestData) => {
    console.log('Request Data:', requestData);
    if (!requestData.subPstName) {
      setShowAlert(true);
      console.error('Nombre es obligatorio.');
      return;
    }
    try {
      const response = await sendRequest('/api/configuration/add-catalogo-subcategorias', {
        method: 'POST',
        body: requestData,
      });
      console.log('API Response:', response);

      if (response.success) {
        fetchDataByCatalogName();
      } else {
        console.error('Error adding item:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //Edit camp
 const editCamp = async (idCatalog) => {
  const url =`/api/configuration/update-catalogo-subcategorias`;
  console.log('el id es',idCatalog)
  try {
    const response = await sendRequest(url,{ 
      method: 'POST', 
      body: formdata 
    });

    console.log('API Response:', response.data);
    return response.data;
} catch (err) {
  console.error('Error updating camp:', err);
}
};
  
  const handleEdit = (rowData) => {
    toggleInput();
    console.log('Editing', rowData)
    setFormData({
      id_opcion: rowData.id, 
      name: rowData.nombre,
      estatus: rowData.estatus,
    });
    setSelectedStatus(rowData.estatus);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleInput();

    if (formdata.nombre !== '' && formdata.estatus !== '') {
      const requestData = {
        idPST: idCatalog,
        subPstName: formdata.name,
      };
      const requestEditData = {
        idSubpst: idCatalog,
        subPstName: formdata.nombre,
      };
      try{
        if (isEditing) {
          // Actualiza formdata antes de la edición
          setFormData((prevFormData) => ({
            ...prevFormData,
            estatus: selectedStatus,
          }));
      // Update item
        console.log('Form Data:', formdata);
        console.log('isEditing:', isEditing);
        
        console.log('Form Dataadd:', requestData);
        console.log('Form Data edit:', requestEditData);
       await editCamp(requestData);
      } else {
      // Add new item
        console.log('Form Data:', requestData);
        
       await addCamp(requestData);
      }
      fetchDataByCatalogName(idCatalog);
      setFormData({
        idSubpst: idCatalog,
        subPstName: '',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.error('Agrega nombre y estatus');
  }
  };

  const handleButtonClick = () => {
    toggleInput()
    setFormData({ 
    id_catalogo: '',
    name: '',
    estatus: 'Activo',
    isActive: -1,
    tipo_especial: -1,
    id_especial: -1,
  });
    setIsEditing(false);
  }
 const handleClose = () =>{
  setFormData({ 
    id_catalogo: '',
    name: '',
    estatus: '',
    isActive: -1,
    tipo_especial: -1,
    id_especial: -1,
  });
  setIsEditing(false);
  onClose();
 }
  //Delete Camp
  const handleDelete = (rowData) => {
    console.log('deleting', rowData)
    setItemToDelete(rowData.id);
    setDeleteConfirmationOpen(true);
    console.log('el id a borrar',itemToDelete)
  };
  
  const confirmDelete = async () => {
    try {
      const url = `/api/configuration/delete-catalogo-subcategorias/${itemToDelete}`;
      const response = await sendRequest(url, {
        method: 'DELETE',
        
      });
      
      if (response.success) {
        setData((prevData) =>
        prevData.filter((data) => data.id !== itemToDelete)
        );
        setDeleteConfirmationOpen(false);
        fetchDataByCatalogName(idCatalog);
        } else {
          console.error('Error deleting camp:', response.error);
        }
      } catch (err) {
        console.error('Error deleting camp:', err);
      }
    
  };

  return (
    <>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      >
      <DialogTitle className="font-GMX  flex justify-between items-center font-bold">
        {catalogName}
        <IconButton onClick={onClose} >
        <Icons.Close onClick={handleClose} ></Icons.Close>
        </IconButton> 
      </DialogTitle> 
      <DialogContent className="flex flex-col gap-6">
       <Table
            columns={[
              ...COLUMNS_TABLE_SUB_CATALOGOS ,
                
              {
                field: 'editSection',
                headerName: 'Editar/Eliminar',
                minWidth: 120,
                type: 'string',
                align: 'center',
                headerAlign: 'center',
                renderCell: params => (
                  <EditSection
                    rowData={params.row}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ),
              },
            ]}
            rows={data}
            isLoading={false}
          />
          <Button content={content} onClick={handleButtonClick}/>
       
        <div className="flex flex-row gap-4">
          {showInput &&
           <input 
           type="text" 
           placeholder="Ingrese tipo" 
           className="w-2/5"
           value = {formdata.name}
           onChange={(e)=> setFormData({...formdata, name: e.target.value, estatus: formdata.estatus})}
            />}
          {showButton && <Button type='submit' content='Aceptar'  onClick={handleSubmit}/>}
        </div>
      </DialogContent>
    </Dialog>
    <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={confirmDelete}
        itemName={formdata.name}
      />
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setShowAlert(false)}>
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          sx={{ width: '100%' }}>
          NOMBRE NO PUEDO SER VACIO
        </Alert>
      </Snackbar>
    </>
  )
}

export default PopupSubCategoria
