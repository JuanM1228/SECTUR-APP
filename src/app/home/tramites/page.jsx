'use client'
import React, { useEffect, useState } from 'react'

import DatePickerCustom from '@/components/common/DatePicker'
import Input from '@/components/common/Input'
import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Table from '@/components/common/Table'

import Icons from '@/assets/icons'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import {
  ROLE_ENUM,
  STATUS_TRAMITE,
  INIT_FILTROS_DATA,
  STATUS_TRAMITE_DROPDOWN,
} from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import {
  COLUMNS_TABLE_TRAMITES_ADMIN,
  COLUMNS_TABLE_TRAMITES_USUARIO,
} from '@/utils/columsTables'
import Alert from '@/components/common/Alert'

const PanelSolicitudesUsuario = () => {
  const router = useRouter()
  const { profile } = useAuthStore()
  const { sendRequest, isLoading } = useHttpClient()
  const [tramites, setTramites] = useState([])
  const [showFilters, setShowFilters] = useState(true)
  const [catalogoPST, setCatalogoPST] = useState([])
  const [filtros, setFiltros] = useState(INIT_FILTROS_DATA)
  const [estados, setEstados] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (!profile) return
    console.log(profile)
    setFiltros({ ...filtros, idUsuario: profile.id })
    getTramites(profile.id)
    getCatalogoPST()
    getCatalogoEstados()
  }, [])

  const getTramites = async id => {
    setLoader(true)
    const url = `/api/registro/tramites-usuario/${id}`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setTramites(res.result.data)
        console.log(res.result.data)
        setLoader(false)
      } else {
      }
    } catch (error) {
      console.log('error', error)
      setLoader(false)
    }
  }

  const getCatalogoPST = async () => {
    const url = '/api/configuration/catalogo-pst'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setCatalogoPST(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const getCatalogoEstados = async () => {
    const url = '/api/address/estados'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setEstados(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const getTramitesFiltros = async body => {
    try {
      const url = '/api/registro/tramites-usuario'

      const res = await sendRequest(url, {
        method: 'POST',
        body: body,
      })
      if (res.success) {
        setTramites(res.result.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onNuevaSolicitudHandler = () => {
    router.push('/home/tramites/solicitudes/null')
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setFiltros({ ...filtros, [name]: value })
  }

  const onHandleFiltros = () => {
    console.log(filtros)
    getTramitesFiltros(filtros)
  }

  const clearFilters = () => {
    setFiltros({ ...INIT_FILTROS_DATA, idUsuario: profile.id })
  }

  const contentButton = (
    <span className="flex gap-2" onClick={onNuevaSolicitudHandler}>
      <Icons.Add />
      <p>NUEVA SOLICITUD</p>
    </span>
  )
  const columnsData =
    profile?.role === ROLE_ENUM.ADMIN
      ? COLUMNS_TABLE_TRAMITES_ADMIN
      : COLUMNS_TABLE_TRAMITES_USUARIO

  const getRowClassName = params => {
    const status = params.row.status
    if (profile?.role === ROLE_ENUM.ADMIN) {
      if (status === STATUS_TRAMITE.REVISION)
        return 'bg-[#f1e9da] hover:bg-[#f1e9da]'
    }
    if (profile?.role === ROLE_ENUM.USER) {
      if (status === STATUS_TRAMITE.RECHAZADO)
        return 'bg-[#f1e9da] hover:bg-[#f1e9da]'
    }
    return
  }
  console.log(loader)

  return (
    <div className="flex flex-col gap-2 w-full p-4 ">
      <h1 className="font-GMX text-3xl font-bold text-center">
        MIS SOLICITUDES
      </h1>

      <Button content={contentButton} fullWidth={false} className="self-end" />
      <div className="self-end">
        <Icons.Tune
          onClick={() => setShowFilters(!showFilters)}
          className="cursor-pointer text-gray  "
        />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {showFilters && (
          <div className={`col-span-12 sm:col-span-2 flex flex-col gap-3`}>
            <Input
              label="Fólio de trámite"
              name="folio"
              onChange={onHandleChange}
              value={filtros.folio}
            />
            <Input
              label="Número de trámite"
              name="idTramite"
              onChange={onHandleChange}
              value={filtros.idTramite}
            />
            <Input
              label="Nombre Solicitante"
              name="nombre"
              onChange={onHandleChange}
              value={filtros.nombre}
            />
            <Input
              label="Nombre comercial"
              name="nombreComercial"
              onChange={onHandleChange}
              value={filtros.nombreComercial}
            />
            <Dropdown
              label="Tipo de PST"
              name="idPST"
              variant="outlined"
              value={filtros.idPST}
              options={catalogoPST}
              onChange={onHandleChange}
            />
            <Dropdown
              label="Estado"
              name="idEstado"
              variant="outlined"
              value={filtros.idEstado}
              options={estados}
              onChange={onHandleChange}
            />

            <Dropdown
              label="Estatus"
              name="idStatus"
              variant="outlined"
              value={filtros.idStatus}
              options={STATUS_TRAMITE_DROPDOWN}
              onChange={onHandleChange}
            />

            <p className="font-Montserrat font-semibold">Rango de fechas</p>

            <DatePickerCustom
              label="Inicio"
              name="fechaInicio"
              onChange={onHandleChange}
              value={filtros.fechaInicio}
            />

            <DatePickerCustom
              label="Final"
              name="fechaFinal"
              onChange={onHandleChange}
              value={filtros.fechaFinal}
            />

            <Button content="Aplicar filtros" onClick={onHandleFiltros} />
            <Button content="Limpiar filtros" onClick={clearFilters} />
          </div>
        )}

        <div className="flex justify-center items-center col-span-1 sm:col-span-10 t-ease h-[calc(90vh-10rem)] bg-black">
          {loader ? (
            <span className="loader"></span>
          ) : (
            <Table
              columns={columnsData}
              isLoading={isLoading}
              rows={tramites}
              className=""
              getRowClassName={getRowClassName}
            />
          )}
        </div>

        {tramites.length === 0 && (
          <div className="grow flex justify-center items-center sm:col-span-10 ">
            <h1 className="font-Montserrat font-simibold text-xl">
              POR EL MOMENTO NO CONTIENES SOLICITUDES ACTIVAS
            </h1>
          </div>
        )}
      </div>
      <Alert
        open={showAlert}
        severity="warning"
        onClose={() => setShowAlert(false)}>
        Certificado previamente descargado
      </Alert>
    </div>
  )
}

export default PanelSolicitudesUsuario
