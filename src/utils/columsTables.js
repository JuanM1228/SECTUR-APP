import Button from '@/components/common/Button'
import React from 'react'
import Icons from '@/assets/icons'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useHttpClient } from '@/hooks/useHttpClient'
import { STATUS_INFO } from './constants'
import { divIcon } from 'leaflet'

const DeleteButton = params => {
  const { sendRequest, isLoading } = useHttpClient()
  const onUpdateDatabase = async idSolicitud => {
    try {
      const url = `/api/registro/tramite-revocado/${idSolicitud}`
      const res = await sendRequest(url)
      if (res.success) {
        window.location.reload(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <IconButton onClick={() => onUpdateDatabase(params.id)}>
      <Icons.Delete />
    </IconButton>
  )
}

const ListEstados = arrayEstados => {
  //console.log(arrayEstados)
  return (
    <div>
      {arrayEstados.map(estado => (
        <p>{estado}</p>
      ))}
    </div>
  )
}

export const EditButton = params => {
  const router = useRouter()
  console.log(params)
  if (params.row.status === 4) return
  return (
    <IconButton
      onClick={() => router.push(`/home/tramites/solicitudes/${params.id}`)}>
      <Icons.Edit />
    </IconButton>
  )
}

const ReviewButton = params => {
  const router = useRouter()
  return (
    <IconButton
      onClick={() =>
        router.push(`/home/consulta/tramites/detalles/${params.id}`)
      }>
      <Icons.Visibility />
    </IconButton>
  )
}

const StatusBadge = params => {
  return <p>{STATUS_INFO[params.row.status]}</p>
}

const FolioBadge = params => {
  return (
    <a href={`${process.env.ENV_URL}/${params.row.pathFolioSolicitud}`}>
      {params.row.folioSolicitud}
    </a>
  )
}

export const COLUMNS_TABLE_TRAMITES_USUARIO = [
  {
    field: 'delete',
    headerName: '',
    minWidth: 80,
    type: 'bool',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => DeleteButton(params),
  },
  {
    field: 'edit',
    headerName: '',
    minWidth: 80,
    type: 'bool',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => EditButton(params),
  },
  {
    field: 'review',
    headerName: '',
    minWidth: 80,
    type: 'bool',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => ReviewButton(params),
  },
  {
    field: 'fechaSolicitud',
    headerName: 'Fecha de Solicitud',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    valueGetter: params => new Date(params.row.fechaSolicitud),
  },
  {
    field: 'id',
    headerName: 'No. Trámite',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => StatusBadge(params),
  },
  {
    field: 'observaciones',
    headerName: 'Observaciones',
    minWidth: 300,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'folioSolicitud',
    headerName: 'Folio Solicitud',
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => FolioBadge(params),
  },
  {
    field: 'tipoPST',
    headerName: 'PST',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'nombreComercial',
    headerName: 'Nombre Comercial',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'razonSocial',
    headerName: 'Razón Social',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'calle',
    headerName: 'Calle y Número',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'colonia',
    headerName: 'Colonia',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'estado',
    headerName: 'Estado',
    minWidth: 120,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'municipio',
    headerName: 'Municipio',
    minWidth: 120,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
]

export const COLUMNS_TABLE_TRAMITES_ADMIN = [
  {
    field: 'review',
    headerName: '',
    minWidth: 80,
    type: 'bool',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => ReviewButton(params),
  },
  {
    field: 'nombreUsuario',
    headerName: 'Usuario',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'fechaSolicitud',
    headerName: 'Fecha de Solicitud',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    valueGetter: params => new Date(params.row.fechaSolicitud),
  },
  {
    field: 'id',
    headerName: 'No. Trámite',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => StatusBadge(params),
  },
  {
    field: 'observaciones',
    headerName: 'Observaciones',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'folioSolicitud',
    headerName: 'Folio Solicitud',
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => FolioBadge(params),
  },
  {
    field: 'tipoPST',
    headerName: 'PST',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'nombreComercial',
    headerName: 'Nombre Comercial',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'razonSocial',
    headerName: 'Razón Social',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'calle',
    headerName: 'Calle y Número',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'colonia',
    headerName: 'Colonia',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'estado',
    headerName: 'Estado',
    minWidth: 120,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'municipio',
    headerName: 'Municipio',
    minWidth: 120,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
]

export const COLUMNS_TABLE_TRAMITES_ADMIN_DASHBOARD = [
  {
    field: 'review',
    headerName: '',
    minWidth: 80,
    type: 'bool',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => ReviewButton(params),
  },
  {
    field: 'id',
    headerName: 'No. Trámite',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nombreDelSolicitante',
    headerName: 'Nombre del Solicitante',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'fechaSolicitud',
    headerName: 'Fecha de Solicitud',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    valueGetter: params => new Date(params.row.fechaSolicitud),
  },
  {
    field: 'fechaAceptacion',
    headerName: 'Fecha de Aceptación',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    valueGetter: params =>
      params.row.fechaAceptacion ? new Date(params.row.fechaAceptacion) : '',
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => StatusBadge(params),
  },
  {
    field: 'observaciones',
    headerName: 'Observaciones',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'folioSolicitud',
    headerName: 'Folio Solicitud',
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => FolioBadge(params),
  },
  {
    field: 'tipoPST',
    headerName: 'PST',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'nombreComercial',
    headerName: 'Nombre Comercial',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'razonSocial',
    headerName: 'Razón Social',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'calle',
    headerName: 'Calle y Número',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'colonia',
    headerName: 'Colonia',
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'estado',
    headerName: 'Estado',
    minWidth: 120,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'municipio',
    headerName: 'Municipio',
    minWidth: 120,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
]

export const COLUMNS_TABLE_CATALOGOS = [
  {
    field: 'id',
    headerName: 'Número',
    minWidth: 90,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nombre',
    headerName: 'Tipo',
    minWidth: 180,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'estatus',
    headerName: 'Estatus',
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
]

export const COLUMNS_TABLE_USUARIOS = [
  {
    field: 'id',
    headerName: 'No. Usuario',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'name',
    headerName: 'Nombre',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'paternalSurname',
    headerName: 'Apellido Paterno',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'maternalSurname',
    headerName: 'Apellido Materno',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },

  // {
  //   field: 'phoneNumber',
  //   headerName: 'No. Telefono',
  //   minWidth: 140,
  //   type: 'number',
  //   align: 'left',
  //   headerAlign: 'center',
  // },
  {
    field: 'email',
    headerName: 'Correo electronico',
    minWidth: 180,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'submenu',
    headerName: 'Permisos',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'estados',
    headerName: 'Estados',
    minWidth: 140,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => ListEstados(params.row.estados),
  },
]

export const OPTIONS_ESTADOS = [
  { value: 1, title: 'Aguascalientes' },
  { value: 2, title: 'Baja California' },
  { value: 3, title: 'Baja California Sur' },
  { value: 4, title: 'Campeche' },
  { value: 5, title: 'Coahuila de Zaragoza' },
  { value: 6, title: 'Colima' },
  { value: 7, title: 'Chiapas' },
  { value: 8, title: 'Chihuahua' },
  { value: 9, title: 'Ciudad de Mexico' },
  { value: 10, title: 'Durango' },
  { value: 11, title: 'Guanajuato' },
  { value: 12, title: 'Guerrero' },
  { value: 13, title: 'Hidalgo' },
  { value: 14, title: 'Jalisco' },
  { value: 15, title: 'México' },
  { value: 16, title: 'Michoacán de Ocampo' },
  { value: 17, title: 'Morelos' },
  { value: 18, title: 'Nayarit' },
  { value: 19, title: 'Nuevo León' },
  { value: 20, title: 'Oaxaca' },
  { value: 21, title: 'Puebla' },
  { value: 22, title: 'Querétaro' },
  { value: 23, title: 'Quintana Roo' },
  { value: 24, title: 'San Luis Potosí' },
  { value: 25, title: 'Sinaloa' },
  { value: 26, title: 'Sonora' },
  { value: 27, title: 'Tabasco' },
  { value: 28, title: 'Tamaulipas' },
  { value: 29, title: 'Tlaxcala' },
  { value: 30, title: 'Veracruz de Ignacio de la Llave' },
  { value: 31, title: 'Yucatán' },
  { value: 32, title: 'Zacatecas' },
]
