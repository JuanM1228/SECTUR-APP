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
import { ROLE_ENUM, STATUS_TRAMITE } from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import {
  COLUMNS_TABLE_TRAMITES_ADMIN,
  COLUMNS_TABLE_TRAMITES_USUARIO,
} from '@/utils/columsTables'

const { EN_PROCESO, FINALIZADO, RECHAZADO, REVISION } = STATUS_TRAMITE

const PanelSolicitudesUsuario = () => {
  const router = useRouter()
  const { profile } = useAuthStore()
  const { sendRequest, isLoading } = useHttpClient()
  const [tramites, setTramites] = useState([])
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    if (!profile) return
    getTramites(profile.id)
  }, [])

  const getTramites = async id => {
    const url = `/api/registro/tramites-usuario/${id}`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setTramites(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onNuevaSolicitudHandler = () => {
    router.push('/home/tramites/solicitudes/null')
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]

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
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 gap-4 ">
      <h1 className="font-GMX text-3xl font-bold mb-6">MIS SOLICITUDES</h1>

      <Button content={contentButton} fullWidth={false} className="self-end" />
      <div className="sm:hidden self-end">
        <Icons.Tune
          onClick={() => setShowFilters(!showFilters)}
          className="cursor-pointer text-gray  "
        />
      </div>

      {tramites.length !== 0 && (
        <div className="grid grid-cols-1 p-4 sm:grid-cols-12  gap-4  sm:overflow-y-auto">
          {showFilters && (
            <div
              className={` flex flex-col gap-6  col-span-1  sm:col-span-2 min-w-min `}>
              <Input
                label="Número de trámite"
                name="idTramite"
                onChange={onHandleChange}
                value={''}
              />
              <Dropdown
                label="Tipo de PST"
                name="idPST"
                variant="outlined"
                value={0}
                options={testData}
                onChange={onHandleChange}
              />
              <Dropdown
                label="Estado"
                name="idEstado"
                variant="outlined"
                value={0}
                options={testData}
                onChange={onHandleChange}
              />

              <Dropdown
                label="Estatus"
                name="idStatus"
                variant="outlined"
                value={0}
                options={testData}
                onChange={onHandleChange}
              />

              <p className="font-Montserrat font-semibold">Rango de fechas</p>

              <DatePickerCustom
                label="Inicio"
                name="fechaInicio"
                onChange={onHandleChange}
                value={''}
              />

              <DatePickerCustom
                label="Final"
                name="fechaFin"
                onChange={onHandleChange}
                value={''}
              />

              <Button content="Aplicar filtros" />
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
