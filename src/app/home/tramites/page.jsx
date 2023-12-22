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

const { EN_PROCESO, FINALIZADO, RECHAZADO, REVISION } = STATUS_TRAMITE

const testData = [
  { value: 1, title: 'test1' },
  { value: 2, title: 'test2' },
  { value: 3, title: 'test3' },
]

const PanelSolicitudesUsuario = () => {
  const router = useRouter()
  const { profile } = useAuthStore()
  const { sendRequest, isLoading } = useHttpClient()
  const [tramites, setTramites] = useState([])
  const [showFilters, setShowFilters] = useState(true)
  const [catalogoPST, setCatalogoPST] = useState([])
  const [filtros, setFiltros] = useState(INIT_FILTROS_DATA)

  useEffect(() => {
    if (!profile) return
    setFiltros({ ...filtros, idUsuario: profile.id })
    getTramites(profile.id)
    getCatalogoPST()
  }, [])

  const getTramites = async id => {
    const url = `/api/registro/tramites-usuario/${id}`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setTramites(res.result.data)
        console.log(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
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
    profile.role === ROLE_ENUM.ADMIN
      ? COLUMNS_TABLE_TRAMITES_ADMIN
      : COLUMNS_TABLE_TRAMITES_USUARIO
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]  gap-4 ">
      <h1 className="font-GMX text-3xl font-bold ">MIS SOLICITUDES</h1>

      <Button content={contentButton} fullWidth={false} className="self-end" />
      <div className="sm:hidden self-end">
        <Icons.Tune
          onClick={() => setShowFilters(!showFilters)}
          className="cursor-pointer text-gray  "
        />
      </div>

      {tramites.length !== 0 && (
        <div className="grid grid-cols-1 px-4 py-2 sm:grid-cols-12  gap-4  sm:overflow-y-auto">
          {showFilters && (
            <div
              className={` flex flex-col gap-6  col-span-1  sm:col-span-2 min-w-min `}>
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
                options={testData}
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
          <Table
            columns={columnsData}
            isLoading={isLoading}
            rows={tramites}
            className="col-span-1 sm:col-span-10 t-ease"
          />
        </div>
      )}
      {tramites.length === 0 && (
        <div className="grow flex justify-center items-center ">
          <h1 className="font-Montserrat font-simibold text-xl">
            POR EL MOMENTO NO CONTIENES SOLICITUDES ACTIVAS
          </h1>
        </div>
      )}
    </div>
  )
}

export default PanelSolicitudesUsuario
