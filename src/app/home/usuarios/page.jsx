'use client'

import { useHttpClient } from '@/hooks/useHttpClient'
import React, { useState, useEffect, useCallback } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
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
import Table from '@/components/common/Table'
import {
  INIT_DATA_REGISTER_USER,
  INIT_FILTROS_USER_DATA,
} from '@/utils/constants'
import DatePickerCustom from '@/components/common/DatePicker'
import colors from '@/assets/colors'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Input from '@/components/common/Input'
import Icons from '@/assets/icons'
import Button from '@/components/common/Button'
import { COLUMNS_TABLE_USUARIOS, OPTIONS_ESTADOS } from '@/utils/columsTables'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material'
import { validate } from '@/utils/validation'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

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
}

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

const Usuarios = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const [value, setValue] = useState(0)
  const [rows, setRows] = useState([])
  const [usuarioModal, setusuarioModal] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState(null)
  const [error, setError] = useState(INIT_DATA_REGISTER_USER)
  const [register, setRegister] = useState(INIT_DATA_REGISTER_USER)
  const [selectedSubMenu, setSelectedSubMenu] = useState([])
  const [selectedEstado, setSelectedEstado] = useState([])
  const [usuariosFiltros, setUsuariosFiltros] = useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [tipoRol, setTipoRol] = useState('')
  const [tipoDeEstado, setTipoDeEstado] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [filtros, setFiltros] = useState(INIT_FILTROS_USER_DATA)
  const [subMenu, setSubMenu] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    submenus: [],
    estados: [],
    password: '',
    paternalSurname: '',
    maternalSurname: '',
  })

  const fetchSubMenus = useCallback(async () => {
    noStore()
    const urlSubMenus = '/api/configuration/catalogo-submenu/0'
    try {
      const res = await sendRequest(urlSubMenus)
      console.log('sub menus', res)
      if (res.success) {
        setSubMenu(res.result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])
  useEffect(() => {
    fetchSubMenus()
  }, [fetchSubMenus])

  const getUsuariosFiltros = async body => {
    try {
      const url = '/api/configuration/buscar-usuarios'

      const res = await sendRequest(url, {
        method: 'POST',
        body: body,
      })
      if (res.success) {
        setRows(res.result.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getInfo = useCallback(async () => {
    noStore()
    const token = Cookies.get('token')
    const url = `/api/configuration/obtener-usuarios/${token}`
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

  const handleChange = event => {
    const { id, value } = event.target

    setRegister(prevRegister => ({
      ...prevRegister,
      [id]: value,
    }))
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setRegister(prevRegister => ({
      ...prevRegister,
      [name]: value,
    }))

    const stateMappings = {
      submenu: setSelectedSubMenu,
      estado: setSelectedEstado,
    }

    if (stateMappings[name]) {
      stateMappings[name](value)
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const onHandleFiltroChange = (name, value) => {
    const token = Cookies.get('token')
    setFiltros(prevFiltros => ({ ...prevFiltros, [name]: value, token: token }))
  }

  const onHandleFiltros = () => {
    console.log(filtros)
    getUsuariosFiltros(filtros)
  }

  const clearFilters = () => {
    setFiltros({ ...INIT_FILTROS_USER_DATA })
    getInfo()
  }
  //Registrar Usuario
  const agregarUsuario = async registerUser => {
    console.log('registrar data', registerUser)
    try {
      const url = '/api/autenticacion/registrar-admin/'
      const res = await sendRequest(url, {
        method: 'POST',
        body: registerUser,
      })
      console.log('API res', res)
      if (res.success) {
        getInfo()
      } else {
        console.error('Error adding item:', response.error)
      }
    } catch (err) {
      console.log('error es', err)
    }
  }

  //EditarUsuario
  const editarUsuario = async id => {
    const url = `/api/autenticacion/actualizar-admin`
    console.log('el id edit es', id, formData)

    try {
      const res = await sendRequest(url, {
        method: 'POST',
        body: formData,
      })
      if (res.success) {
        getInfo()
        handleCloseEdit()
      }
    } catch (e) {
      console.log(e)
    }
  }

  //Handlers

  const handleEdit = async formData => {
    console.log('La data a editar es', formData)
    console.log('El estado a editar es', formData.estados)
    console.log('El submenu a editar es', formData.submenus)

    const submenuIds = formData.submenus.map(submenuObj => submenuObj.idSubmenu)
    const estadosIds = formData.estados.map(submenuObj => submenuObj.id)
    const uniqueEstados = estadosIds.reduce((acc, estado) => {
      if (!acc.find(e => e.id === estado.id)) {
        acc.push(estado)
      }
      return acc
    }, [])
    setFormData({
      id_user: formData.id,
      name: formData.name,
      email: formData.email,
      submenus: submenuIds,
      estados: uniqueEstados,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      paternalSurname: formData.paternalSurname,
      maternalSurname: formData.maternalSurname,
    })
    setIsEditModalOpen(true)
  }

  //HandleEditSubmit
  const handleEditSubmit = async e => {
    e.preventDefault()
    try {
      await editarUsuario(formData.id)
      getInfo()
    } catch (err) {
      console.log('Error al editar usuario', err)
    }
  }
  //handlesubmit
  const handleSubmit = async e => {
    e.preventDefault()
    const { hasError, errors } = validate.registerForm(register)
    try {
      if (
        Object.values(register).every(
          value => value !== '' && value !== null,
        ) &&
        !hasError
      ) {
        setError(INIT_DATA_REGISTER_USER)
        await agregarUsuario(register)
        getInfo()
        setusuarioModal(false)
        console.log('email', typeof register.email)
        console.log('Submit Exitoso', register)
      } else {
        setShowAlert(true)
        setError(errors)
        console.error('Todos los campos deben estar llenos', errors)
      }
    } catch (err) {
      setShowAlert(true)
      console.log('Error al agregar usuario', err)
    }
  }

  const handleEditFormChange = e => {
    const { name, value } = e.target

    if (name === 'estados') {
      setSelectedEstado(value) // Actualiza el estado de la selección de estado
    }

    setFormData({ ...formData, [name]: value })
  }

  //Ventanas Modales Functions
  const handleClickOpenUsuario = () => {
    setusuarioModal(true)
    setIsEditModalOpen(false) // Asegurarse de que no estés en modo edición al abrir el modal de registro
    setRegister(INIT_DATA_REGISTER_USER)
    setSelectedSubMenu([])
    setSelectedEstado([])
  }

  const handleCloseUsuario = () => {
    setusuarioModal(false)
  }

  const handleCloseEdit = () => {
    setIsEditModalOpen(false)
  }

  const handleCloseDelete = () => {
    setDeleteModal(false)
    setUserIdToDelete(null)
  }

  const handleSelectAll = () => {
    const allEstadoIds = OPTIONS_ESTADOS.map(option => option.value)

    setSelectedEstado(prevSelectedEstado => {
      const areAllSelected = prevSelectedEstado.length === allEstadoIds.length

      const updatedSelectedEstado = areAllSelected
        ? [] // Si todos están seleccionados, deseleccionar todo
        : allEstadoIds // Si no todos están seleccionados, seleccionar todo

      onHandleChange({
        target: { name: 'estados', value: updatedSelectedEstado },
      })

      return updatedSelectedEstado
    })
  }
  const handleSelectAllSubMenu = () => {
    setSelectedSubMenu(prevSelectedSubMenu => {
      const allSubMenuIds = subMenu.map(option => option.id)
      const areAllSelected = prevSelectedSubMenu.length === allSubMenuIds.length

      const updatedSelectedSubMenu = areAllSelected
        ? [] // Si todos están seleccionados, deseleccionar todo
        : allSubMenuIds // Si no todos están seleccionados, seleccionar todo

      onHandleChange({
        target: { name: 'submenus', value: updatedSelectedSubMenu },
      })

      return updatedSelectedSubMenu
    })
  }

  //EliminarUsuario
  const handleClickOpenDelete = formData => {
    setFormData({
      id: formData.id,
    })
    console.log('data', formData)
    console.log('data ID', formData.id)
    setUserIdToDelete(formData.id)
    setDeleteModal(true)
  }

  const deleteUsuario = async () => {
    try {
      const url = `/api/autenticacion/eliminar-user/${userIdToDelete}`
      const res = await sendRequest(url, {
        method: 'DELETE',
      })
      if (res.ok) {
        setFormData(prevformData =>
          prevformData.filter(elemento => elemento.id !== id),
        )

        console.log('Usuario eliminado correctamente')
      }
      getInfo()
    } catch (error) {
      console.error('Error al eliminar Usuario:', error)
    }
    getInfo()
    setDeleteModal(false)
  }

  return (
    <div className="w-full p-4 ">
      <div className="grid grid-cols-12 gap-4">
        <ThemeProvider theme={theme}>
          <div className="col-span-12 sm:col-span-2 flex flex-col gap-3">
            {/* Barra lateral */}
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              centered
              aria-label="basic tabs example">
              <Tab label="Búsqueda" />
            </Tabs>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Input
                fullWidth
                type="text"
                margin="normal"
                id="name"
                label="Nombre"
                variant="outlined"
                value={filtros.name}
                onChange={e => onHandleFiltroChange('name', e.target.value)}
              />

              <Input
                fullWidth
                type="text"
                margin="normal"
                id="id"
                label="Numero de Usuario"
                variant="outlined"
                value={filtros.id}
                onChange={e => onHandleFiltroChange('id', e.target.value)}
              />
              <Input
                fullWidth
                type="text"
                margin="normal"
                id="estados"
                label="Entidad Federativa"
                variant="outlined"
                value={filtros.estados}
                onChange={e => onHandleFiltroChange('estados', e.target.value)}
              />
              <Input
                fullWidth
                type="email"
                margin="normal"
                id="email"
                label="Correo electronico"
                variant="outlined"
                value={filtros.email}
                onChange={e => onHandleFiltroChange('email', e.target.value)}
              />
              <div className="mb-2">
                <Button content="Aplicar filtros" onClick={onHandleFiltros} />
              </div>
              <Button content="Limpiar filtros" onClick={clearFilters} />
            </TabPanel>
          </div>
          <section className="flex  flex-col col-span-12 sm:col-span-10">
            <div className="w-1/3">
              <Button
                content="Registrar Usuario"
                className=""
                onClick={handleClickOpenUsuario}
              />
            </div>
            {/* Registrar Usuario modal */}
            <Dialog fullWidth open={usuarioModal} onClose={handleCloseUsuario}>
              <DialogTitle className="font-GMX flex justify-between items-center font-bold">
                Registrar Usuario
                <Icons.Close
                  className="cursor-pointer"
                  onClick={handleCloseUsuario}></Icons.Close>
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
                    maxDate={dayjs()}
                    minDate={dayjs().subtract(100, 'year')}
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
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      className="font-GMX font-semibold"
                      htmlFor="estados">
                      Entidad Federativa
                    </InputLabel>
                    <Button
                      variant="text"
                      content="Seleccionar todo"
                      onClick={handleSelectAll}
                    />
                    <Select
                      className="font-GMX font-semibold"
                      id="estados"
                      name="estados"
                      label="Entidad Federativa"
                      multiple
                      variant="outlined"
                      value={
                        selectedEstado ||
                        OPTIONS_ESTADOS.map(option => option.value)
                      }
                      onChange={e => {
                        console.log('Selected Estado:', e.target.value)
                        onHandleChange(e)
                        setSelectedEstado(e.target.value)
                      }}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip2"
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
                  <FormControl fullWidth variant="outlined">
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
                        setSelectedSubMenu(e.target.value)
                      }}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip1"
                          label="Permisos"
                        />
                      }
                      renderValue={selected => (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(Array.isArray(selected)
                            ? selected
                            : [selected]
                          ).map(id => (
                            <Chip
                              key={id}
                              label={
                                subMenu.find(option => option.id === id)
                                  ?.name || ''
                              }
                            />
                          ))}
                        </Box>
                      )}>
                      {subMenu.map(menuItem => (
                        <MenuItem key={menuItem.id} value={menuItem.id}>
                          <Checkbox
                            checked={selectedSubMenu.includes(menuItem.id)}
                          />
                          <ListItemText primary={menuItem.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      variant="text"
                      content="Seleccionar todo"
                      onClick={handleSelectAllSubMenu}
                    />
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
              {isLoading ? (
                <span className="loader col-span-1"></span>
              ) : (
                <Table
                  rows={rows}
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
                          onEdit={handleEdit}
                          onDelete={handleClickOpenDelete}
                        />
                      ),
                    },
                  ]}
                />
              )}
            </section>
            {/* Editar Usuario modal */}
            <Dialog fullWidth open={isEditModalOpen} onClose={handleCloseEdit}>
              <DialogTitle className="font-GMX flex justify-between items-center font-bold">
                Editar Usuario{' '}
                <Icons.Close
                  className="cursor-pointer"
                  onClick={handleCloseEdit}></Icons.Close>
              </DialogTitle>
              <form onSubmit={handleEditSubmit}>
                <DialogContent className="grow flex flex-col items-center rounded-e-xl gap-5 p-10 md:p-3">
                  <Input
                    fullWidth
                    margin="normal"
                    label="Cambiar Nombre(s) del Usuario"
                    name="name"
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
                    //error={error.paternalSurname !== ''}
                    helpText={error.paternalSurname}
                    value={formData.paternalSurname || ''}
                  />

                  <Input
                    label="Cambiar Apellido Materno"
                    name="maternalSurname"
                    fullWidth
                    type="text"
                    onChange={handleEditFormChange}
                    //error={error.maternalSurname !== ''}
                    helpText={error.maternalSurname}
                    value={formData.maternalSurname || ''}
                  />
                  <Input
                    label="Correo Electronico"
                    name="email"
                    fullWidth
                    disabled
                    type="email"
                    onChange={handleEditFormChange}
                    //error={error.maternalSurname !== ''}
                    //helpText={error.maternalSurname}
                    value={formData.email}
                  />

                  <Input
                    label="Cambiar Contraseña"
                    name="password"
                    fullWidth
                    IconComponent={Icons.Lock}
                    type="password"
                    onChange={handleEditFormChange}
                    //error={error.password !== ''}
                    helpText={error.password}
                    value={formData.password}
                  />

                  <Input
                    label="Verificar cambio de Contraseña"
                    name="verifyPassword"
                    fullWidth
                    IconComponent={Icons.Lock}
                    onChange={handleEditFormChange}
                    // error={error.verifyPassword !== ''}
                    helpText={error.verifyPassword}
                    type="password"
                    value={formData.verifyPassword}
                  />

                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      className="font-GMX font-semibold text-sm"
                      htmlFor="estados">
                      Cambiar Estado
                    </InputLabel>
                    <Button
                      variant="text"
                      content="Seleccionar todo"
                      onClick={handleSelectAll}
                    />
                    <Select
                      className="font-GMX font-semibold text-sm"
                      id="estados"
                      name="estados"
                      label="Cambiar Estado"
                      multiple
                      variant="outlined"
                      value={formData.estados}
                      onChange={handleEditFormChange}
                      input={<OutlinedInput label="Tag2" />}
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
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      className="font-GMX font-semibold text-sm"
                      htmlFor="submenus">
                      Cambiar Permisos
                    </InputLabel>
                    <Select
                      className="font-GMX font-semibold text-sm"
                      id="submenus"
                      name="submenus"
                      label="Cambiar Tipo de Rol"
                      variant="outlined"
                      multiple
                      value={formData.submenus}
                      onChange={e => {
                        onHandleChange(e)
                        setSelectedSubMenu(e.target.value)
                      }}
                      input={<OutlinedInput label="Tag2" />}
                      renderValue={selected => (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(Array.isArray(selected)
                            ? selected
                            : [selected]
                          ).map(id => (
                            <Chip
                              key={id}
                              label={
                                subMenu.find(option => option.id === id)
                                  ?.name || ''
                              }
                            />
                          ))}
                        </Box>
                      )}>
                      {subMenu.map(menuItem => (
                        <MenuItem key={menuItem.id} value={menuItem.id}>
                          <Checkbox
                            checked={selectedSubMenu.includes(menuItem.id)}
                          />
                          <ListItemText primary={menuItem.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      variant="text"
                      content="Seleccionar todo"
                      onClick={handleSelectAllSubMenu}
                    />
                  </FormControl>
                  <Button
                    content="Editar Usuario"
                    className=" text-white py-1 m-2 rounded-md"
                    type="submit"
                    onClick={handleCloseEdit}
                  />
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
              <div className="flex justify-center m-4 gap-4">
                <Button
                  className=" text-white py-1 m-2 rounded-md"
                  content="Cancelar"
                  onClick={handleCloseDelete}
                  color="primary"
                />
                <Button
                  className=" text-white py-1 m-2 rounded-md "
                  content="Aceptar"
                  onClick={deleteUsuario}
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
          USUARIO DUPLICADO O TODOS LOS CAMPOS DEBEN ESTAR LLENOS
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Usuarios
