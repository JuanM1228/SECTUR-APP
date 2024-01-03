'use client'

import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { produce } from 'immer'

// MUI Components
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Alert,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
} from '@mui/material'
import { esES } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material'

// Hooks
import { useHttpClient } from '@/hooks/useHttpClient'

// Components
import DatePickerCustom from '@/components/common/DatePicker'
import Button from '@/components/common/Button'
import Table from '@/components/common/Table'
import Input from '@/components/common/Input'

// Utils
import { INIT_DATA_REGISTER_USER, INIT_FILTROS_USER } from '@/utils/constants'
import colors from '@/assets/colors'
import Icons from '@/assets/icons'
import { COLUMNS_TABLE_USUARIOS, OPTIONS_ESTADOS } from '@/utils/columsTables'

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

const EditDeleteSection = ({ onEdit, onDelete, rowData }) => {
  return (
    <div className="flex gap-4">
      <IconButton onClick={() => onEdit(rowData)}>
        <Icons.Edit />
      </IconButton>
      <IconButton onClick={() => onDelete(rowData)}>
        <Icons.Delete />
      </IconButton>
    </div>
  )
}

const MODAL_TYPE = {
  REGISTER: 'REGISTER',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
}

const TYPE = {
  INPUT: 'INPUT',
  USER_INPUT: 'USER_INPUT',
  INIT_DATA: 'INIT_DATA',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  UPDATE_USERS_LIST: 'UPDATE_USERS_LIST',
  // UPDATE_PHOTOS: 'UPDATE_PHOTOS',
  // UPDATE_DOCUMENTS: 'UPDATE_DOCUMENTS',
  // SHOW_ERROR: 'SHOW_ERROR',
  // HIDE_ERROR: 'HIDE_ERROR',
}

const initialState = {
  nombreUsuario: '',
  tipoDeEstado: '',
  tipoRol: '',
  usersList: [],
  subMenuList: [],
  showModal: false,
  modalType: null,
  selectedUserInfo: {
    id: null,
    email: '',
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    birthDate: '',
    phoneNumber: '',
    estados: [],
    submenus: [],
    password: '',
    verifyPassword: '',
  },
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case TYPE.INPUT:
      return produce(state, draftState => {
        draftState[payload.name] = payload.value
      })
    case TYPE.USER_INPUT:
      return produce(state, draftState => {
        draftState.selectedUserInfo[payload.name] = payload.value
      })
    case TYPE.INIT_DATA:
      return produce(state, draftState => {
        draftState.usersList = payload.usersList
        draftState.subMenuList = payload.subMenuList
      })
    case TYPE.UPDATE_USERS_LIST:
      return produce(state, draftState => {
        draftState.usersList = payload.usersList
        draftState.showModal = false
        draftState.modalType = null
        draftState.selectedUserInfo = initialState.selectedUserInfo
      })
    case TYPE.SHOW_MODAL:
      return produce(state, draftState => {
        draftState.showModal = true
        draftState.modalType = payload.modalType
        draftState.selectedUserInfo = payload.userInfo
      })
    case TYPE.HIDE_MODAL:
      return produce(state, draftState => {
        draftState.showModal = false
        draftState.modalType = null
        draftState.selectedUserInfo = initialState.selectedUserInfo
      })
    // case TYPE.UPDATE_PHOTOS:
    //   return produce(state, draftState => {
    //     draftState.photosList = payload.photosList
    //   })
    // case TYPE.UPDATE_DOCUMENTS:
    //   return produce(state, draftState => {
    //     draftState.documentsList = payload.documentsList
    //   })
    // case TYPE.SHOW_ERROR:
    //   return produce(state, draftState => {
    //     draftState.showError = true
    //     draftState.errorMessage = payload.errorMessage
    //   })
    // case TYPE.HIDE_ERROR:
    //   return produce(state, draftState => {
    //     draftState.showError = false
    //     draftState.errorMessage = ''
    //   })
    default:
      throw new Error()
  }
}

const Usuarios = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [error, setError] = useState('')
  const [register, setRegister] = useState(INIT_DATA_REGISTER_USER)
  const [selectedSubMenu, setselectedSubMenu] = useState([])
  const [selectedEstado, setSelectedEstado] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [selectedSubMenuNames, setSelectedSubMenuNames] = useState([])

  const onHandleChange = ({ target: { name, value } }) => {
    dispatch({ type: TYPE.INPUT, payload: { name, value } })
  }

  const onHandleUserInfo = ({ target: { name, value } }) => {
    console.log('onHandleUserInfo', name, value)
    dispatch({ type: TYPE.USER_INPUT, payload: { name, value } })
  }

  useEffect(() => {
    initDataHandler()
  }, [])

  const initDataHandler = async () => {
    const urls = [
      '/api/configuration/obtener-usuarios',
      '/api/configuration/catalogo-submenu/0',
    ]
    const requests = urls.map(url => sendRequest(url))
    Promise.all(requests)
      .then(res => {
        console.log(res)
        const usersList = res[0].result.data
        const subMenuList = res[1].result.data
        dispatch({
          type: TYPE.INIT_DATA,
          payload: { usersList, subMenuList },
        })
      })
      .catch(err => console.log(err))
  }

  const updateUsersList = async () => {
    const url = '/api/configuration/obtener-usuarios'
    const res = await sendRequest(url)
    if (!res.success) return
    dispatch({
      type: TYPE.UPDATE_USERS_LIST,
      payload: { usersList: res.result.data },
    })
  }

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue)
  //   }

  //   const onHandleChange = ({ target: { name, value } }) => {
  //     setRegister((prevRegister) => ({
  //       ...prevRegister,
  //       [name]: value,
  //     }));

  //     const onHandleFilterChange = ({ target: { name, value } }) => {
  //       setFiltros({ ...filtros, [name]: value })
  //     }
  //     const onHandleFiltros = () => {
  //       console.log(filtros)
  //       //getTramitesFiltros(filtros) llama la api para el filtro
  //     }

  //     const clearFilters = () => {
  //       setFiltros({ ...INIT_DATA_REGISTER_USER})
  //     }

  //     const stateMappings = {
  //       submenu: setselectedSubMenu,
  //       estado: setSelectedEstado,
  //     };

  //     if (stateMappings[name]) {
  //       stateMappings[name](value);
  //     }

  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }));
  //   };

  //   //Registrar Usuario
  //   const agregarUsuario = async registerUser =>{
  //     console.log('registrar data', registerUser)
  //     try{
  //       const url = '/api/autenticacion/registrar-admin/'
  //       const res = await sendRequest(url,{
  //         method: 'POST',
  //         body: registerUser,
  //       })
  //       console.log('API res', res)
  //       if (res.success){

  //         getInfo();
  //       }else {
  //         console.error('Error adding item:', response.error);
  //       }
  //     }catch (err){
  //       console.log('error es',err)
  //     }
  //   }

  //   //EditarUsuario
  //   const editarUsuario = async id =>{
  //     const url = `/api/autenticacion/actualizar-admin`
  //     console.log('el id edit es', id, formData)

  //     try{
  //       const res = await sendRequest(url,{
  //         method: 'POST',
  //         body:formData,
  //       })
  //       if (res.success){
  //         getInfo();
  //         handleCloseEdit();
  //       }
  //     }catch (e){
  //       console.log(e)
  //     }
  //   }

  //   //Handlers

  //   const handleEdit = async (formData) => {
  //     console.log('La data a editar es',formData)
  //     console.log('El estado a editar es',formData.estados)
  //     console.log('El submenu a editar es',formData.submenus)
  //     const submenuIds = formData.submenus.map((submenuObj) => submenuObj.idSubmenu);
  //     const estadosIds = formData.estados.map((submenuObj) => submenuObj.id);
  //     setFormData({
  //       id_user:formData.id,
  //       name:formData.name,
  //       email:formData.email,
  //       submenus:submenuIds,
  //       estados:estadosIds,
  //       phoneNumber:formData.phoneNumber,
  //       password:formData.password,
  //       paternalSurname:formData.paternalSurname,
  //       maternalSurname:formData.maternalSurname,
  //     });
  //     setIsEditModalOpen(true);
  //   };
  //   //HandleEditSubmit
  //   const handleEditSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       //if (Object.values(formData).every((value) => value !== '' && value !== null)) {
  //         await editarUsuario(formData.id);
  //         getInfo();
  //     //  } else {
  //      //   console.error('Todos los campos deben estar llenos');
  //      // }
  //     } catch (err) {
  //       console.log('Error al editar usuario', err);
  //     }
  //   };
  //handlesubmit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Valida que las casillas no estén vacías
  //     if (Object.values(register).every((value) => value !== '' && value !== null)) {
  //       await agregarUsuario(register);
  //       getInfo();
  //       handleCloseUsuario(true);
  //       console.log('Submit Exitoso', register);
  //    } else {
  //     setShowAlert(true)
  //       console.error('Todos los campos deben estar llenos');
  //    }
  //   } catch (err) {
  //     setShowAlert(true)
  //     console.log('Error al agregar usuario', err);

  //   }
  // };

  // const handleEditFormChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === 'estados') {
  //     setSelectedEstado(value); // Actualiza el estado de la selección de estado
  //   }

  //   setFormData({ ...formData, [name]: value });
  // };

  //Ventanas Modales Functions
  // const handleClickOpenUsuario = () => {
  //   setusuarioModal(true);
  //   setIsEditModalOpen(false); // Asegurarse de que no estés en modo edición al abrir el modal de registro
  //   setRegister(INIT_DATA_REGISTER_USER);
  //   setselectedSubMenu([]);
  //   setSelectedEstado([])
  // };

  // const handleCloseUsuario = () => {
  //   setusuarioModal(false);
  // };

  // const handleCloseEdit = () => {
  //   setIsEditModalOpen(false);
  // };

  // const handleCloseDelete = () => {
  //   setDeleteModal(false);
  //   setUserIdToDelete(null);
  // };

  // const handleSelectAll = () => {
  //   if (selectedEstado.length === OPTIONS_ESTADOS.length) {
  //     // Si todos están seleccionados, deseleccionar todo
  //     setSelectedEstado([]);
  //   } else {
  //     // Si no todos están seleccionados, seleccionar todo
  //     setSelectedEstado(OPTIONS_ESTADOS.map((option) => option.value));
  //   }
  // };
  // const handleSelectAllsubmenu = () => {
  //   if (selectedSubMenu.length === state.subMenuList.length) {
  //     setselectedSubMenu([]);
  //   } else {
  //     setselectedSubMenu(state.subMenuList.map((option) => option.id));
  //   }
  // };

  const onDeleteUserHandler = async () => {
    dispatch({ type: TYPE.HIDE_MODAL })
    if (!state?.selectedUserInfo?.id) return
    const userId = state.selectedUserInfo.id
    try {
      const url = `/api/autenticacion/eliminar-user/${userId}`
      const res = await sendRequest(url, { method: 'DELETE' })
      if (!res.success) return
      updateUsersList()
      console.log('Usuario eliminado correctamente')
    } catch (error) {
      console.error('Error al eliminar Usuario:', error)
    }
  }

  // Modal Handlers

  const onRegisterUserModal = () => {
    dispatch({
      type: TYPE.SHOW_MODAL,
      payload: { modalType: MODAL_TYPE.REGISTER },
    })
  }

  const onEditUserModal = userInfo => {
    console.log('userInfo', userInfo)
    dispatch({
      type: TYPE.SHOW_MODAL,
      payload: { modalType: MODAL_TYPE.EDIT, userInfo },
    })
  }
  const openDeleteUserModal = userInfo => {
    dispatch({
      type: TYPE.SHOW_MODAL,
      payload: { modalType: MODAL_TYPE.DELETE, userInfo },
    })
  }

  const onCloseModalHandler = () => {
    dispatch({ type: TYPE.HIDE_MODAL })
  }

  return (
    <div className="w-full p-4 ">
      <div className="grid grid-cols-12 gap-4">
        <ThemeProvider theme={theme}>
          <div className="col-span-12 sm:col-span-2 flex flex-col gap-3">
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="nombreUsuario"
              label="Nombre de Usuario"
              variant="outlined"
              value={state.nombreUsuario}
              name="nombreUsuario"
              onChange={onHandleChange}
            />
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="states"
              label="Entidad Federativa"
              variant="outlined"
              value={state.tipoDeEstado}
              name="tipoDeEstado"
              onChange={onHandleChange}
            />
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="permisos"
              label="Tipo de Permisos"
              variant="outlined"
              value={state.tipoRol}
              name="tipoRol"
              onChange={onHandleChange}
            />
            <Button
              content="Buscar Usuario"
              // onClick={handleChange}
            />
          </div>
          <section className="flex  flex-col col-span-12 sm:col-span-10">
            <div className="w-1/3">
              <Button
                content="Registrar Usuario"
                className=""
                onClick={onRegisterUserModal}
                Usuario
              />
            </div>
            {/* Registrar Usuario modal */}
            <Dialog
              fullWidth
              onClose={onCloseModalHandler}
              open={state.showModal && state.modalType === MODAL_TYPE.REGISTER}>
              <DialogTitle className="font-GMX flex justify-between items-center font-bold">
                Registrar Usuario
                <Icons.Close
                  onClick={onCloseModalHandler}
                  className="cursor-pointer"></Icons.Close>
              </DialogTitle>
              <DialogContent>
                <form
                  // onSubmit={handleSubmit}
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
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel
                      className="font-GMX font-semibold text-sm"
                      htmlFor="Entidad Federativa">
                      Entidad Federativa
                    </InputLabel>
                    <Select
                      className="font-GMX font-semibold text-sm"
                      id="estados"
                      name="estados"
                      label="Entidad Federativa"
                      multiple
                      variant="outlined"
                      value={selectedEstado || []}
                      onChange={e => {
                        onHandleChange(e)
                        setSelectedEstado(e.target.value)
                      }}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip1"
                          label="Entidad Federativa"
                        />
                      }
                      renderValue={selected => (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(Array.isArray(selected)
                            ? selected
                            : [selected]
                          ).map(value => (
                            <Chip
                              key={value}
                              label={
                                OPTIONS_ESTADOS.find(
                                  option => option.value === value,
                                )?.title || ''
                              }
                            />
                          ))}
                        </Box>
                      )}>
                      <MenuItem>
                        <Checkbox
                          indeterminate={
                            selectedEstado.length > 0 &&
                            selectedEstado.length < OPTIONS_ESTADOS.length
                          }
                          checked={
                            selectedEstado.length === OPTIONS_ESTADOS.length
                          }
                          // onChange={handleSelectAll}
                        />
                        <ListItemText primary="Seleccionar Todo" />
                      </MenuItem>
                      {OPTIONS_ESTADOS.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          <Checkbox
                            checked={selectedEstado.includes(option.value)}
                          />
                          <ListItemText primary={option.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel
                      className="font-GMX font-semibold text-sm"
                      htmlFor="Permisos">
                      Permisos
                    </InputLabel>
                    <Select
                      className="font-GMX font-semibold text-sm"
                      id="submenus"
                      name="submenus"
                      label="Permisos"
                      multiple
                      variant="outlined"
                      value={selectedSubMenu || []}
                      onChange={e => {
                        onHandleChange(e)

                        // Update the state with the selected submenu IDs
                        setselectedSubMenu(e.target.value)

                        // Update the state with the selected submenu names
                        const selectedNames = state.subMenuList
                          .filter(menuItem =>
                            e.target.value.includes(menuItem.id),
                          )
                          .map(menuItem => menuItem.name)

                        setSelectedSubMenuNames(selectedNames)
                      }}
                      renderValue={() => selectedSubMenuNames.join(', ')}>
                      <MenuItem>
                        <Checkbox
                          indeterminate={
                            selectedSubMenu.length > 0 &&
                            selectedSubMenu.length < state.subMenuList.length
                          }
                          checked={
                            selectedSubMenu.length === state.subMenuList.length
                          }
                          // onChange={handleSelectAllsubmenu}
                        />
                        <ListItemText primary="Seleccionar Todo" />
                      </MenuItem>
                      {state.subMenuList.map(menuItem => (
                        <MenuItem key={menuItem.id} value={menuItem.id}>
                          <Checkbox
                            checked={selectedSubMenu.includes(menuItem.id)}
                          />
                          <ListItemText primary={menuItem.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    content="Crear Usuario"
                    className=" text-white py-1 m-2 rounded-md "
                    type="submit"
                  />
                </form>
              </DialogContent>
            </Dialog>
            <section className="flex justify-center items-center grow">
              <Table
                rows={state.usersList}
                isLoading={isLoading}
                pagination
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                columns={[
                  ...COLUMNS_TABLE_USUARIOS,
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
                        onEdit={() => onEditUserModal(params.row)}
                        onDelete={() => openDeleteUserModal(params.row)}
                      />
                    ),
                  },
                ]}
              />
            </section>
            {/* Editar Usuario modal */}
            <Dialog
              fullWidth
              open={state.showModal && state.modalType === MODAL_TYPE.EDIT}
              onClose={onCloseModalHandler}>
              <DialogTitle className="font-GMX flex justify-between items-center font-bold">
                Editar Usuario{' '}
                <Icons.Close
                  className="cursor-pointer"
                  onClick={onCloseModalHandler}></Icons.Close>
              </DialogTitle>
              <form
              // onSubmit={handleEditSubmit}
              >
                <DialogContent className="grow flex flex-col items-center rounded-e-xl gap-5 p-10 md:p-3">
                  <Input
                    fullWidth
                    margin="normal"
                    label="Cambiar Nombre(s) del Usuario"
                    name="name"
                    variant="outlined"
                    value={state.selectedUserInfo.name}
                    onChange={onHandleUserInfo}
                  />
                  <Input
                    label="Cambiar Apellido Paterno"
                    name="paternalSurname"
                    fullWidth
                    type="text"
                    onChange={onHandleUserInfo}
                    error={error.paternalSurname !== ''}
                    helpText={error.paternalSurname}
                    value={state.selectedUserInfo.paternalSurname}
                  />
                  <Input
                    label="Cambiar Apellido Materno"
                    name="maternalSurname"
                    fullWidth
                    type="text"
                    onChange={onHandleUserInfo}
                    error={error.maternalSurname !== ''}
                    helpText={error.maternalSurname}
                    value={state.selectedUserInfo.maternalSurname}
                  />
                  <Input
                    label="Cambiar Contraseña"
                    name="password"
                    fullWidth
                    IconComponent={Icons.Lock}
                    type="password"
                    error={error.password !== ''}
                    helpText={error.password}
                    value={state.selectedUserInfo.password}
                    onChange={onHandleUserInfo}
                  />
                  <Input
                    label="Verificar cambio de Contraseña"
                    name="verifyPassword"
                    fullWidth
                    IconComponent={Icons.Lock}
                    error={error.verifyPassword !== ''}
                    helpText={error.verifyPassword}
                    type="password"
                    value={state.selectedUserInfo.verifyPassword}
                    onChange={onHandleUserInfo}
                  />

                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel
                      className="font-GMX font-semibold text-sm"
                      htmlFor="Entidad Federativa">
                      Cambiar Entidad Federativa
                    </InputLabel>
                    <Select
                      className="font-GMX font-semibold text-sm"
                      id="estado"
                      name="estados"
                      label="Cambiar Entidad Federativa"
                      multiple
                      variant="outlined"
                      value={state.selectedUserInfo.estados}
                      onChange={onHandleUserInfo}
                      input={<OutlinedInput label="Tag2" />}
                      renderValue={selected =>
                        selected
                          .map(
                            value =>
                              OPTIONS_ESTADOS.find(
                                option => option.value === value,
                              )?.title || '',
                          )
                          .join(', ')
                      }>
                      <MenuItem>
                        <Checkbox
                          indeterminate={
                            selectedEstado.length > 0 &&
                            selectedEstado.length < OPTIONS_ESTADOS.length
                          }
                          checked={
                            selectedEstado.length === OPTIONS_ESTADOS.length
                          }
                          // onChange={handleSelectAll}
                        />
                        <ListItemText primary="Seleccionar Todo" />
                      </MenuItem>

                      {OPTIONS_ESTADOS.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          <Checkbox
                            checked={selectedEstado.includes(option.value)}
                          />
                          <ListItemText primary={option.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel
                      className="font-GMX font-semibold text-sm"
                      htmlFor="Rol">
                      Cambiar Permisos
                    </InputLabel>
                    <Select
                      className="font-GMX font-semibold text-sm"
                      id="submenus"
                      name="submenus"
                      label="Cambiar Tipo de Rol"
                      variant="outlined"
                      multiple
                      value={state.selectedUserInfo.submenus}
                      onChange={onHandleUserInfo}
                      input={<OutlinedInput label="Tag2" />}
                      renderValue={selected =>
                        selected
                          .map(
                            value =>
                              state.subMenuList.find(
                                menuItem => menuItem.id === value,
                              )?.name || '',
                          )
                          .join(', ')
                      }>
                      <MenuItem>
                        <Checkbox
                          indeterminate={
                            selectedSubMenu.length > 0 &&
                            selectedSubMenu.length < state.subMenuList.length
                          }
                          checked={
                            selectedSubMenu.length === state.subMenuList.length
                          }
                          // onChange={handleSelectAllsubmenu}
                        />
                        <ListItemText primary="Seleccionar Todo" />
                      </MenuItem>
                      {state.subMenuList.map(menuItem => (
                        <MenuItem key={menuItem.id} value={menuItem.id}>
                          <Checkbox
                            checked={selectedSubMenu.includes(menuItem.id)}
                          />
                          <ListItemText primary={menuItem.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    content="Editar Usuario"
                    className=" text-white py-1 m-2 rounded-md"
                    type="submit"
                    // onClick={onEditUserHandler}
                  />
                </DialogContent>
              </form>
            </Dialog>
            {/* Eliminar Usuario modal */}
            <Dialog
              open={state.showModal && state.modalType === MODAL_TYPE.DELETE}
              onClose={onCloseModalHandler}>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  ¿Está seguro de que desea eliminar usuario?
                </DialogContentText>
              </DialogContent>
              <div className="flex justify-center m-4 gap-4">
                <Button
                  className=" text-white py-1 m-2 rounded-md"
                  content="Cancelar"
                  onClick={onCloseModalHandler}
                  color="primary"
                />
                <Button
                  className=" text-white py-1 m-2 rounded-md "
                  content="Aceptar"
                  onClick={onDeleteUserHandler}
                  color="primary"
                />
              </div>
            </Dialog>
          </section>
        </ThemeProvider>
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setShowAlert(false)}>
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          sx={{ width: '100%' }}>
          TODOS LOS CAMPOS DEBEN ESTAR LLENOS
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Usuarios
