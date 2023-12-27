'use client' 

import { useHttpClient } from '@/hooks/useHttpClient'
import React, { useState, useEffect, useCallback } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Pagination, Select } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'
import { INIT_DATA_REGISTER_USER } from '@/utils/constants'
import DatePickerCustom from '@/components/common/DatePicker'
import colors from '@/assets/colors'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Input from '@/components/common/Input'
import Icons from '@/assets/icons'
import Button from '@mui/material/Button';
import { COLUMNS_TABLE_USUARIOS, OPTIONS_ESTADOS } from '@/utils/columsTables'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton
} from '@mui/material'


const theme = createTheme(
  {
    palette: {
      primary: {
        main: colors.bigDipORuby,
      },
      secondary: {
        main: colors.gray,
      },
    },
  },
  esES,
)


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      submenu="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ m: 2 }}>{children}</Box>}
    </div>
  )

}function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const EditDeleteSection = ({onEdit, onDelete, rowData }) => {
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

const usuarios = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const [value, setValue] = useState(0)
  const [rows, setRows] = useState([])
  const [usuarioModal, setusuarioModal] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [error, setError] = useState(INIT_DATA_REGISTER_USER)
  const [register, setRegister] = useState(INIT_DATA_REGISTER_USER)
  const [selectedsubmenu, setSelectedsubmenu] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [subMenu, setSubMenu] = useState([])
  const [listaEstados, setListEstados] = useState([])
  const [formData, setFormData] = useState({
    id:'',name:'',email:'',submenu:'',estados:'',password:'',paternalSurname:'',maternalSurname:'',
  })
  

    const getInfo = useCallback(async () => {
      noStore() 
      const url =
        '/api/configuration/obtener-usuarios'
      try {
        const res = await sendRequest(url)
        console.log('respuesta', res)
        if (res.success) {
          setRows(res.result.data)
        }
      } catch (error) {
        console.log('error', error)
        // showErrorMessage()
      }
    }, [])
    useEffect(() => {
      getInfo()
    }, [getInfo])
  
    const fetchSubMenus = useCallback(async () => {
     noStore()
     const urlSubMenus = '/api/configuration/catalogo-submenu/1'
     try{
      const res = await sendRequest(urlSubMenus)
      console.log('sub menus', res)
      if(res.success){
        setSubMenu(res.result.data)
      }
     } catch (error){
      console.log('error', error)
     }
    },[])
    useEffect(()=>{
      fetchSubMenus()
    },[fetchSubMenus]) 

  //   const getEstados = useCallback(async () => {
  //     noStore() 
  //     const urlestado = '/api/address/estados/'
  //     try{
  //       const res = await sendRequest(urlestado)
  //       console.log('respuesta estado', res)
  //     if (Array.isArray(res)){
  //       setListaEstados(res)
  //     }
  //   } catch(error) {
  //     console.log('error en GET', error)
  //   }
  //   },[])
  //   useEffect(()=>{
  //   getEstados()
  // },[getEstados])

    const handleChange = (event, newValue) => {
      setValue(newValue)
    }
    
    // console.log('rows', rows)
    // console.log('isLoading', isLoading)

    const onHandleChange = ({ target: { name, value } }) => {
      setRegister((prevRegister) => ({
        ...prevRegister,
        [name]: value,
      }));
    
      const stateMappings = {
        submenu: setSelectedsubmenu,
        estado: setSelectedEstado,
      };
    
      if (stateMappings[name]) {
        stateMappings[name](value);
      }
    
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

    //Registrar Usuario
    const agregarUsuario = async registerUser =>{
      console.log('registrar data', registerUser)
      try{
        const url = '/api/autenticacion/registrar-admin/'
        const res = await sendRequest(url,{
          method: 'POST',
          body: registerUser,
        })
        console.log('API res', res)
        if (res.success){
          
          getInfo();
        }else {
          console.error('Error adding item:', response.error);
        }
      }catch (err){
        console.log('error es',err)
      }
    }
    
    //EditarUsuario
    const editarUsuario = async id =>{
      const url = `/api/autenticacion/registrar-admin`
      console.log('el id edit es', id, formData)
      try{
        const res = await sendRequest(url,{
          method: 'PUT',
          body:formData,
        })
        if (res.success){
          getInfo();
          handleCloseEdit();
        }
      }catch (e){
        console.log(e)
      }
    }

    //Handlers

    const handleEdit = async (formData) => {
      console.log('La data a editar es',formData)
      setFormData({
        id:formData.id,
        name:formData.name,
        email:formData.email, 
        submenu:formData.submenu,
        estados:formData.estados, 
        password:formData.password,
        paternalSurname:formData.paternalSurname,
        maternalSurname:formData.maternalSurname,
      });
      setIsEditModalOpen(true);
    };
    //HandleEditSubmit
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      try {
        if (Object.values(formData).every((value) => value !== '' && value !== null)) {
          await editarUsuario(formData.id);
          getInfo();
        } else {
          console.error('Todos los campos deben estar llenos');
        }
      } catch (err) {
        console.log('Error al editar usuario', err);
      }
    };
    //handlesubmit
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Valida que las casillas no estén vacías
       // if (Object.values(register).every((value) => value !== '' && value !== null)) {
          await agregarUsuario(register);
          getInfo();
          //handleCloseUsuario(true);
          console.log('Submit Exitoso', register);
       // } else {
          console.error('Todos los campos deben estar llenos');
      // }
      } catch (err) {
        console.log('Error al agregar usuario', err);
        // Puedes manejar el error aquí
      }
    };
    
    const handleEditFormChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    //Ventanas Modales Functions
    const handleClickOpenUsuario = () => {
      setusuarioModal(true);
      setIsEditModalOpen(false); // Asegurarse de que no estés en modo edición al abrir el modal de registro
      setRegister(INIT_DATA_REGISTER_USER);
      setSelectedsubmenu([]);
      setSelectedEstado([])
    };
  
    const handleCloseUsuario = () => {
      setusuarioModal(false);
    };

    
    const handleCloseEdit = () => {
      setIsEditModalOpen(false);
    };

    
    
    const handleCloseDelete = () => {
      setDeleteModal(false);
      setUserIdToDelete(null);
    };

    const handleSelectAll = () => {
      if (selectedEstado.length === OPTIONS_ESTADOS.length) {
        // Si todos están seleccionados, deseleccionar todo
        setSelectedEstado([]);
      } else {
        // Si no todos están seleccionados, seleccionar todo
        setSelectedEstado(OPTIONS_ESTADOS.map((option) => option.value));
      }
    };
    const handleSelectAllsubmenu = () => {
      if (selectedsubmenu.length === subMenu.length) {
        // Si todos están seleccionados, deseleccionar todo
        setSelectedsubmenu([]);
      } else {
        // Si no todos están seleccionados, seleccionar todo
        setSelectedsubmenu(subMenu.map((option) => option.id));
      }
    };

      //EliminarUsuario
      const handleClickOpenDelete = (formData) => {
        setFormData({
          id:formData.id,
        });
        console.log('data',formData)
        console.log('data ID',formData.id)
        setUserIdToDelete(formData.id);
        setDeleteModal(true);
      };
    
    const deleteUsuario = async () => {
      try {
        const url = `https://6574aa74b2fbb8f6509c81a7.mockapi.io/api/usuarios/${userIdToDelete}`;
        const res = await sendRequest(url, {
          method: 'DELETE',
          
        });
        if (res.ok) {
          setFormData((prevformData) =>
            prevformData.filter((elemento) => elemento.id !== id)
          );
          
          console.log('Elemento eliminado correctamente');
        } 
        getInfo();
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
      }
      getInfo();
      setDeleteModal(false);
    };

    
  return (
    <div className="w-full flex">
      <ThemeProvider theme={theme}>
        <div className="w-1/5">
          {/* Barra lateral */}
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            centered
            aria-label="basic tabs example">
            <Tab label="Búsqueda" {...a11yProps(0)} />
            <Tab label="Búsqueda rápida" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="nombreUsuario"
              label="Nombre de Usuario"
              variant="outlined"
              onChange={event => {
                // setName(event.target.value);
                console.log(event.target.value)
              }}
            />
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="states"
              label="Estado"
              variant="outlined"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel className = 'font-GMX font-semibold text-sm' htmlFor="Rol">Tipo de Rol</InputLabel>
            <Select
            className = 'font-GMX font-semibold text-sm'
              id="submenu"
              label="Tipo de Rol"
              variant="outlined"
              value=''
              onChange={'handlesubmenuChange'}
              >
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="usuarioPST">Usuario PST</MenuItem>
            </Select>
            </FormControl>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="quickSearch"
              label="Búsqueda Rápida"
              variant="outlined"
              onChange={event => {
                // setName(event.target.value);
                console.log(event.target.value)
              }}
            />
          </TabPanel>
        </div>
        <div className="w-4/5">
          <Button
          className='bg-bigDipORuby text-white py-1 m-2 rounded-md hover:bg-bigDipORuby'
          onClick={handleClickOpenUsuario}Usuario
          > + Registrar Usuario</Button>
          {/* Registrar Usuario modal */}
          <Dialog 
          fullWidth
          open={usuarioModal} 
          onClose={handleCloseUsuario}
          >
        <DialogTitle
         className="font-GMX flex justify-between items-center font-bold">
          Registrar Usuario 
          <Icons.Close className='cursor-pointer' onClick={handleCloseUsuario} >
          </Icons.Close>
        </DialogTitle>
        <DialogContent>
          <form 
          onSubmit={handleSubmit}
          className="grow flex flex-col items-center rounded-e-xl gap-5 p-10 md:p-2">
        <Input
          label="Nombre(s)"
          name="name"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.name !== ''}
          helpText={error.name}
          value={register.name}
        />
        <Input
          label="Apellido Paterno"
          name="paternalSurname"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.paternalSurname !== ''}
          helpText={error.paternalSurname}
          value={register.paternalSurname}
        />
        <Input
          label="Apellido Materno"
          name="maternalSurname"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.maternalSurname !== ''}
          helpText={error.maternalSurname}
          value={register.maternalSurname}
        />
        <DatePickerCustom
          label="Fecha de nacimiento"
          name="birthDate"
          onChange={onHandleChange}
          error={error.birthDate !== ''}
          helpText={error.birthDate}
          value={register.birthDate}
        />
        {/* <Input
          label="phoneNumber"
          name="phoneNumber"
          fullWidth
          IconComponent={Icons.Phone}
          type="number"
          onChange={onHandleChange}
          // error={error.phoneNumber !== ''}
          // helpText={error.phoneNumber}
          value={register.phoneNumber}
        /> */}
        <Input
          label="Email"
          name="email"
          fullWidth
          IconComponent={Icons.Email}
          type="email"
          onChange={onHandleChange}
          error={error.email !== ''}
          helpText={error.email}
          value={register.email}
        />
        <Input
          label="Password"
          name="password"
          fullWidth
          IconComponent={Icons.Lock}
          type="password"
          onChange={onHandleChange}
          error={error.password !== ''}
          helpText={error.password}
          value={register.password}
        />

        <Input
          label="Verificar Contraseña"
          name="verifyPassword"
          fullWidth
          IconComponent={Icons.Lock}
          onChange={onHandleChange}
          error={error.verifyPassword !== ''}
          helpText={error.verifyPassword}
          type="password"
          value={register.verifyPassword}
          />
          <FormControl fullWidth variant="outlined" margin="normal" >
            <InputLabel className = 'font-GMX font-semibold text-sm' htmlFor="Entidad Federativa">Entidad Federativa</InputLabel>
            <Select
            className = 'font-GMX font-semibold text-sm'
              id="estados"
              name='estados'
              label="Entidad Federativa"
              multiple
              variant="outlined"
              value={selectedEstado || []}
              onChange={(e) => {
                onHandleChange(e);
                setSelectedEstado(e.target.value);
              }}
              input={<OutlinedInput id="select-multiple-chip1" label="Entidad Federativa" />}
              renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(Array.isArray(selected) ? selected : [selected]).map((value) => (
              <Chip
                key={value}
                label={OPTIONS_ESTADOS.find((option) => option.value === value)?.title || ''}
              />
            ))}
          </Box>
        )}
      >
        <MenuItem>
      <Checkbox
        indeterminate={selectedEstado.length > 0 && selectedEstado.length < OPTIONS_ESTADOS.length}
        checked={selectedEstado.length === OPTIONS_ESTADOS.length}
        onChange={handleSelectAll}
      />
      <ListItemText primary="Seleccionar Todo" />
    </MenuItem>
    {OPTIONS_ESTADOS.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        <Checkbox checked={selectedEstado.includes(option.value)} />
        <ListItemText primary={option.title} />
      </MenuItem>
        ))}
      </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel className = 'font-GMX font-semibold text-sm' htmlFor="Rol">Tipo de Rol</InputLabel>
            <Select
            className = 'font-GMX font-semibold text-sm'
              id="submenu"
              name='submenu'
              label="Tipo de Rol"
              multiple
              variant="outlined"
              value={selectedsubmenu || []}
              onChange={(e) => {
                onHandleChange(e);
                setSelectedsubmenu(e.target.value);
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
      >
        <MenuItem>
      <Checkbox
        indeterminate={selectedsubmenu.length > 0 && selectedsubmenu.length < subMenu.length}
        checked={selectedsubmenu.length === subMenu.length}
        onChange={handleSelectAllsubmenu}
      />
      <ListItemText primary="Seleccionar Todo" />
    </MenuItem>
              {subMenu.map((menuItem) => (
            <MenuItem key={menuItem.id} value={menuItem.id}>
            <Checkbox checked={selectedsubmenu.includes(menuItem.id)}/>
            <ListItemText primary={menuItem.name} />
            </MenuItem>
           ))}
            </Select>
        </FormControl>
          <Button
          content="Crear Usuario"
          className='bg-bigDipORuby  text-white py-1 m-2 rounded-md hover:bg-bigDipORuby'
          type="submit" 
          > Crear Usuario
          </Button>
        </form>
        </DialogContent>
          </Dialog>
          <DataGrid
            showColumnVerticalBorder={true}
            showCellVerticalBorder={true}
            density="compact"
            // filterMode="server"
            // paginationMode="server"
            // sortingMode="server"
            rows={rows}
            page
            columns={[
              ...COLUMNS_TABLE_USUARIOS ,
              {
                field: 'editSection',
                headerName: 'Editar/Eliminar',
                minWidth: 120,
                type: 'string',
                align: 'center',
                headerAlign: 'center',
                renderCell: params => (
                  <EditDeleteSection
                    rowData={params.row}
                    onEdit={handleEdit}
                    onDelete={handleClickOpenDelete}
                  />
                ),
              },
            ]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            // pageSizeOptions={[5, 10, 15, 20]}
            rowSelection={false}
            disableDensitySelector={true}
            disableRowSelectionOnClick={true}
            // autoPageSize={true}
            hideFooterSelectedRowCount={true}
            hideFooterPagination={true}
            slots={{
              footer: () => (
                <view className="m-4 flex justify-center">
                  {/* TODO: Add dropdown menu to view pages */}
                  <Pagination
                    count={10} // The total number of pages.
                    // page={2} // The current page.
                    color="primary"
                    shape="rounded"
                    onChange={(event, page) => {
                      console.log('paginationOnChange: event', event)
                      console.log('paginationOnChange: page', page)
                    }}
                    // showFirstButton
                    // showLastButton
                  />
                </view>
              ),
            }}
            onPaginationModelChange={(model, details) => {
              console.log('onPaginationModelChange: model', model)
              console.log('onPaginationModelChange: details', details)
            }}
            onSortModelChange={(model, details) => {
              console.log('onSortModelChange: model', model)
              console.log('onSortModelChange: details', details)
            }}
            // paginationModel={{ page: 0, pageSize: 5 }}
            loading={isLoading}
            disableColumnFilter
            disableMultipleColumnsSorting
            className="h-[calc(100vh-3.5rem)]"
          />
          {/* Editar Usuario modal */}
      <Dialog fullWidth open={isEditModalOpen} onClose={handleCloseEdit}>
        <DialogTitle
         className="font-GMX flex justify-between items-center font-bold"
         >
          Editar Usuario <Icons.Close className='cursor-pointer' onClick={handleCloseEdit} >
          </Icons.Close>
          </DialogTitle>
          <form onSubmit={handleEditSubmit}>
        <DialogContent
        className="grow flex flex-col items-center rounded-e-xl gap-5 p-10 md:p-3">
          <Input
            fullWidth
            margin="normal"
            label="Cambiar Nombre(s) del Usuario"
            name='name'
            variant="outlined"
            value={formData.name}
            onChange={handleEditFormChange}
          />
          <Input
          label="Cambiar Apellido Paterno"
          name="paternalSurname"
          fullWidth
          type="text"
          onChange={handleEditFormChange}
          error={error.paternalSurname !== ''}
          helpText={error.paternalSurname}
          value={formData.paternalSurname}
        />

        <Input
          label="Cambiar Apellido Materno"
          name="maternalSurname"
          fullWidth
          type="text"
          onChange={handleEditFormChange}
          error={error.maternalSurname !== ''}
          helpText={error.maternalSurname}
          value={formData.maternalSurname}
        />
          <Input
          label="Cambiar Email"
          name="email"
          fullWidth
          IconComponent={Icons.Email}
          type="email"
          onChange={handleEditFormChange}
          error={error.email !== ''}
          helpText={error.email}
          placeholder={formData.email}
          value={formData.email}
          
        /> 
          <Input
          label="Cambiar Contraseña"
          name="password"
          fullWidth
          IconComponent={Icons.Lock}
          type="password"
          onChange={handleEditFormChange}
          error={error.password !== ''}
          helpText={error.password}
          value={formData.password}
        />

        <Input
          label="Verificar cambio de Contraseña"
          name="verifyPassword"
          fullWidth
          IconComponent={Icons.Lock}
          onChange={handleEditFormChange}
          error={error.verifyPassword !== ''}
          helpText={error.verifyPassword}
          type="password"
          value={formData.verifyPassword}
        />
        <FormControl fullWidth variant="outlined" margin="normal" >
            <InputLabel className = 'font-GMX font-semibold text-sm' htmlFor="Entidad Federativa">Entidad Federativa</InputLabel>
            <Select
            className = 'font-GMX font-semibold text-sm'
              id="estados"
              name='estados'
              label="Entidad Federativa"
              multiple
              variant="outlined"
              value={selectedEstado || [formData.estados]}
              onChange={(e) => {
                onHandleChange(e);
                setSelectedEstado(e.target.value);
              }}
              input={<OutlinedInput id="select-multiple-chip" label="Entidad Federativa" />}
              renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(Array.isArray(selected) ? selected : [selected]).map((value) => (
              <Chip
                key={value}
                label={OPTIONS_ESTADOS.find((option) => option.value === value)?.title || ''}
              />
            ))}
          </Box>
        )}
      >
        <MenuItem>
      <Checkbox
        indeterminate={selectedEstado.length > 0 && selectedEstado.length < OPTIONS_ESTADOS.length}
        checked={selectedEstado.length === OPTIONS_ESTADOS.length}
        onChange={handleSelectAll}
      />
      <ListItemText primary="Seleccionar Todo" />
    </MenuItem>
    {OPTIONS_ESTADOS.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        <Checkbox checked={selectedEstado.includes(option.value)} />
        <ListItemText primary={option.title} />
      </MenuItem>
        ))}
      </Select>
        </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel className = 'font-GMX font-semibold text-sm' htmlFor="Rol">Cambiar Tipo de Rol</InputLabel>
            <Select
            className = 'font-GMX font-semibold text-sm'
              id="submenu"
              name='submenu'
              label="Cambiar Tipo de Rol"
              variant="outlined"
              multiple
              value={formData.submenu || []}
              onChange={(e) => onHandleChange({ target: { name: 'submenu', value: e.target.value } })}
              input={<OutlinedInput label="Tag2" />}
              renderValue={(selected) => selected.join(', ')}
              >
        <MenuItem>
          <Checkbox
          indeterminate={selectedsubmenu.length > 0 && selectedsubmenu.length < subMenu.length}
          checked={selectedsubmenu.length === subMenu.length}
          nChange={handleSelectAllsubmenu}
        />
        <ListItemText primary="Seleccionar Todo" />
        </MenuItem>
              {subMenu.map((menuItem) => (
            <MenuItem key={menuItem.id} value={menuItem.name}>
            <Checkbox checked={selectedsubmenu.includes(menuItem.name)}/>
            <ListItemText primary={menuItem.name} />
            </MenuItem>
           ))}
            </Select>
            </FormControl>
          <Button
          className='bg-bigDipORuby text-white py-1 m-2 rounded-md hover:bg-bigDipORuby'
          type='submit'
          onClick={handleCloseEdit}
          > Editar Usuario</Button>
        </DialogContent>
          </form>
      </Dialog>
      {/* Eliminar Usuario modal */}
      <Dialog open={deleteModal} onClose={handleCloseDelete}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro de que desea eliminar usuario?
        </DialogContentText>
      </DialogContent>
      <div className="flex justify-center ">
        <Button className='bg-bigDipORuby text-white py-1 m-2 rounded-md hover:bg-bigDipORuby' content='Cancelar' onClick={handleCloseDelete} color="primary">
        Cancelar
        </Button>
        <Button className='bg-bigDipORuby text-white py-1 m-2 rounded-md hover:bg-bigDipORuby' content='Aceptar' onClick={deleteUsuario} color="primary">
        Aceptar
        </Button>
      </div>
    </Dialog>
        </div>
      </ThemeProvider>
    </div>
  )
  
  
}

export default usuarios
