import React, { useCallback, useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material'

import Button from '../common/Button'
import Slide from '@mui/material/Slide'
import Icons from '@/assets/icons'
import Table from '../common/Table'
import { COLUMNS_TABLE_CATALOGOS } from '@/utils/columsTables'
import { useHttpClient } from '@/hooks/useHttpClient'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro de que desea eliminar <strong>"{itemName}"</strong>?
        </DialogContentText>
      </DialogContent>
      <div className="flex justify-end p-5">
        <Button className='mr-4' content='Cancelar' onClick={onClose} color="primary">
        </Button>
        <Button content='Aceptar' onClick={onConfirm} color="primary">
        </Button>
      </div>
    </Dialog>
  );
};

const API = 'https://6574aa74b2fbb8f6509c81a7.mockapi.io/api/catalogos' 

const EditSection = ({ rowData, onEdit, onDelete }) => {
  return (
    <div className="flex gap-4">
      <IconButton onClick={() => onEdit(rowData)}>
        <Icons.Edit />
      </IconButton>
      <IconButton onClick={() => onDelete(rowData)}>
        <Icons.Delete />
      </IconButton>
    </div>
  );
};

const PopupCatalog = ({ open, onClose, catalogName  }) => {
  const { sendRequest } = useHttpClient()
  const [data, setData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [content, setContent] = useState('Agregar nuevo campo');
  const [selectedStatus, setSelectedStatus] = useState('Activo');
  const [isEditing, setIsEditing] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formdata, setFormData] = useState({
    id: '',
    name: '',
    status: '',
  });

  const toggleInput = () => {
    setContent(showInput ? 'Agregar nuevo campo' : 'Regresar');
    setShowDropdown(!showDropdown);
    setShowInput(!showInput);
    setShowButton(!showButton);
  };

  const getInfo = useCallback(async () => {
    try {
      const res = await sendRequest(API)
      console.log('respuesta', res)
      if (res) {
        setData(res)
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [sendRequest])

  useEffect(() => {
    getInfo()
  }, [getInfo])


  //AddCamp
  const addCamp = async (data) => {
    try {
      const response = await sendRequest(API, {
        method: 'POST', 
        body: data
      });
      console.log('API Response:', response.data);
      console.log('respuestas', response)

       getInfo();
     } catch (e) {
       console.log(e)
     }
     
   }

  //Edit camp
 const editCamp = async (data) => {
  console.log('Edit Camp Data:', data);
  const url =`${API}/${data.id}`;
  try {
    const options = { method: 'PUT', body: data };
    const response = await sendRequest(url, options);

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
      id: rowData.id,
      name: rowData.name,
      status: rowData.status,
    });
    setSelectedStatus(rowData.status);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleInput()
    if (formdata.name !== '' && formdata.status !== '') {
      
      if (isEditing) {
        // Update item
        console.log('Form Data:', formdata);
        console.log('isEditing:', isEditing);
        await editCamp({ ...formdata, status: selectedStatus });
      } else {
        // Add new item
        await addCamp({ ...formdata, status: selectedStatus });
      }
      getInfo();
      setFormData({ name: '', status: '', id: '' });
      setIsEditing(false);
    } else {
      console.error('Agrega nombre y estatus');
    }
  };

  const handleButtonClick = () => {
    toggleInput()
    setFormData({ name: '', status: '', id: '' });
    setIsEditing(false);
  }
 
  //Delete Camp
  const handleDelete = (rowData) => {
    setItemToDelete(rowData);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    setDeleteConfirmationOpen(false);
    if (itemToDelete) {
      const url = `${API}/${itemToDelete.id}`;
      try {
        const options = { method: 'DELETE' };
        await sendRequest(url, options);
        setData((prevData) =>
          prevData.filter((item) => item.id !== itemToDelete.id)
        );
      } catch (err) {
        console.error('Error deleting camp:', err);
      }
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
        
        <span>{catalogName}</span>
        <IconButton onClick={onClose} >
        <Icons.Close onClick={handleButtonClick} ></Icons.Close>
        </IconButton> 
      </DialogTitle> 
      <DialogContent className="flex flex-col gap-6">
        <DialogContentText>
        <Table
            columns={[
              ...COLUMNS_TABLE_CATALOGOS(catalogName) ,

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
        </DialogContentText>
        <div className="flex flex-row gap-4">
          {showInput &&
           <input 
           type="text" 
           placeholder="Ingrese tipo de alojamiento" 
           className="w-2/5"
           value = {formdata.name}
           onChange={(e)=> setFormData({...formdata, name: e.target.value, status: selectedStatus})}
            />}
          {showDropdown && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-1/5"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          )}
          {showButton && <Button type='submit' content='Aceptar' className="w-1/4 " onClick={handleSubmit} ></Button>}
        </div>
        <Button content={content}  onClick={handleButtonClick}/>
      </DialogContent>
    </Dialog>
    <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete ? itemToDelete.name : ''}
      />
    </>
  )
}

export default PopupCatalog
