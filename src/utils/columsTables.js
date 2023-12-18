import Button from '@/components/common/Button'
import React from 'react'
import Icons from '@/assets/icons'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'

const EditButton = params => {
  const router = useRouter()
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

export const COLUMNS_TABLE_TRAMITES_USUARIO = [
  {
    field: 'delete',
    headerName: '',
    minWidth: 80,
    type: 'bool',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => {
      return (
        <IconButton onClick={() => console.log(params)}>
          <Icons.Delete />
        </IconButton>
      )
    },
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
  },
  {
    field: 'folioSolicitud',
    headerName: 'Folio Solicitud',
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
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
  },
  {
    field: 'folioSolicitud',
    headerName: 'Folio Solicitud',
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
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
