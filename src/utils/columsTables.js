import Button from '@/components/common/Button'
import React from 'react'
import Icons from '@/assets/icons'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useHttpClient } from '@/hooks/useHttpClient'
import { STATUS_INFO } from './constants'

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

export const EditButton = params => {
  const router = useRouter()
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
    <a href={`http://172.16.100.47:3002/${params.row.pathFolioSolicitud}`}>
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
    field: 'id',
    headerName: 'No. Trámite',
    minWidth: 120,
    type: 'string',
    align: 'center',
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
