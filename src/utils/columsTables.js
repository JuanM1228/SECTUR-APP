import Button from '@/components/common/Button'
import React from 'react'

import Icons from '@/assets/icons'
import { IconButton, Checkbox } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useHttpClient } from '@/hooks/useHttpClient'
import { STATUS_INFO, TIPOS_TRAMITES_OBJETO } from './constants'
import Cookies from 'js-cookie'

const role = Cookies.get('role')

const DeleteButton = params => {
  const { sendRequest, isLoading } = useHttpClient()
  const onUpdateDatabase = async idSolicitud => {
    try {
      const url = `/api/registro/tramite-revocado/${idSolicitud}`
      const res = await sendRequest(url)
      if (res.success) {
        window?.location?.reload(true)
      }
    } catch (e) {
      //console.log(e)
    }
  }

  return (
    <IconButton onClick={() => onUpdateDatabase(params.id)}>
      <Icons.Delete />
    </IconButton>
  )
}

const ListEstados = ({ arrayEstados }) => {
  if (!arrayEstados || arrayEstados.length === 0) {
    return (
      <select disabled>
        <option>Sin asignación</option>
      </select>
    )
  }
  ////console.log('array estados',arrayEstados)
  return (
    <select>
      {arrayEstados.map((estados, id) => (
        <option key={id} value={estados.name}>
          {estados.name}
        </option>
      ))}
    </select>
  )
}

const ListPermisos = ({ arrayPermisos }) => {
  if (!arrayPermisos || arrayPermisos.length === 0) {
    return (
      <select disabled>
        <option>Sin asignación</option>
      </select>
    )
  }
  // //console.log('array permisos',arrayPermisos)
  return (
    <select>
      {arrayPermisos.map((submenu, path) => (
        <option key={path} value={submenu.idSubmenu}>
          {submenu.submenu}
        </option>
      ))}
    </select>
  )
}

export const EditButton = params => {
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

const StatusBadge = params => {
  return <p>{STATUS_INFO[params.row.status]}</p>
}

const StatusTramites = params => {
  return (
    <p className="break-words ">
      {TIPOS_TRAMITES_OBJETO[params.row.tipoTramite]}
    </p>
  )
}

const FolioBadge = params => {
  const handleDownload = async () => {
    try {
      const pdfUrl = `${process.env.ENV_URL}/documentos/certificados/${params.row.folioSolicitud}.pdf`
      //console.log(pdfUrl)

      const response = await fetch(pdfUrl)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const blob = await response.blob()

      // Crea un enlace para descargar el blob
      const url = window?.URL?.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${params.row.folioSolicitud}`
      document.body.appendChild(link)
      link.click()

      // Limpia el enlace y la URL creada
      document.body.removeChild(link)
      window?.URL?.revokeObjectURL(url)
    } catch (error) {
      console.error('Hubo un problema con la petición Fetch:', error)
    }
  }

  return (
    params.row.folioSolicitud && (
      <Button content="Descargar certificado" onClick={handleDownload} />
    )
  )
}

const FolioBadgeUsuario = params => {
  const { sendRequest, isLoading } = useHttpClient()

  const isDownloaded = async () => {
    try {
      const url = `/api/registro/certificado-descargado/${params.row.id}`
      const res = await sendRequest(url)
      if (res.success) {
        return res.result.descargado
      }
    } catch (e) {
      //console.log(e)
      return false
    }
  }

  const onButtonClick = async () => {
    const download = await isDownloaded()
    if (download) {
      alert('Certificado descargado previamente')
      return
    }

    handleDownload()
  }

  const handleDownload = async () => {
    try {
      const pdfUrl = `${process.env.ENV_URL}/documentos/certificados/${params.row.folioSolicitud}.pdf`

      const response = await fetch(pdfUrl)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const blob = await response.blob()

      // Crea un enlace para descargar el blob
      const url = window?.URL?.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${params.row.folioSolicitud}`
      document.body.appendChild(link)
      link.click()

      // Limpia el enlace y la URL creada
      document.body.removeChild(link)
      window?.URL?.revokeObjectURL(url)
    } catch (error) {
      console.error('Hubo un problema con la petición Fetch:', error)
    }
  }

  return (
    params.row.folioSolicitud && (
      <Button content="Descargar certificado" onClick={onButtonClick} />
    )
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
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  // {
  //   field: '-',
  //   headerName: 'certificado',
  //   minWidth: 250,
  //   type: 'string',
  //   align: 'center',
  //   headerAlign: 'center',
  //   renderCell: params => FolioBadgeUsuario(params),
  // },
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
    field: 'userName',
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
    field: 'tipoTramite',
    headerName: 'Tipo de Trámite',
    minWidth: 300,
    type: 'string',
    align: 'start',
    headerAlign: 'center',
    renderCell: params => StatusTramites(params),
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
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
 role == 10 ?{
    field: '-',
    headerName: 'certificado',
    minWidth: 250,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => FolioBadge(params),
  } : '',
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
  /*{
    field: 'folioSolicitud',
    headerName: 'Folio Solicitud',
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => FolioBadge(params),
  },*/
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
    minWidth: 100,
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

  {
    field: 'email',
    headerName: 'Correo electronico',
    minWidth: 300,
    type: 'email',
    align: 'left',
    headerAlign: 'center',
    renderCell: params => (
      <div style={{ color: '#888' }}>{params.row.email}</div>
    ),
  },
  {
    field: 'submenus',
    headerName: 'Permisos',
    minWidth: 250,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    renderCell: params => <ListPermisos arrayPermisos={params.row.submenus} />,
  },
  {
    field: 'estados',
    headerName: 'Estados',
    minWidth: 250,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    renderCell: params => <ListEstados arrayEstados={params.row.estados} />,
  },
  {
    field: 'subadmin',
    headerName: 'Sub Administrador',
    minWidth: 140,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    renderCell: params => (
      <div style={{ color: '#888' }}>
        {' '}
        <Checkbox checked={params.row.subadmin == 1} />
      </div>
    ),
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
