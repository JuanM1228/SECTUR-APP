'use client'
import React, { useState, useEffect } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Input from '@/components/common/Input'
import Dropdown from '@/components/common/Dropdown'
import GraphBar from '@/components/reports/GraphBar'
import DatePickerCustom from '@/components/common/DatePicker'
import Button from '@/components/common/Button'
import DashboardSection from '@/components/reports/DashboardSection'

import { useAuthStore } from '@/store/auth'
import colors from '@/assets/colors'
import { useHttpClient } from '@/hooks/useHttpClient'
import {
  INIT_DATA_GRAPH,
  INIT_FILTROS_DATA,
  STATUS_TRAMITE_DROPDOWN,
  INIT_DATA_KPIS,
} from '@/utils/constants'
import { createTheme, ThemeProvider } from '@mui/material'
import Table from '@/components/common/Table'
import { COLUMNS_TABLE_TRAMITES_ADMIN_DASHBOARD } from '@/utils/columsTables'
const testData = [
  { value: 1, title: 'test1' },
  { value: 2, title: 'test2' },
  { value: 3, title: 'test3' },
]
const theme = createTheme({
  palette: {
    primary: {
      main: colors.bigDipORuby,
    },
    secondary: {
      main: colors.gray,
    },
  },
})

const Reportes = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const { profile } = useAuthStore()
  const [tramites, setTramites] = useState([])
  const [tab, setTab] = useState(0)
  const [showFilters, setShowFilters] = useState(true)
  const [catalogoPST, setCatalogoPST] = useState([])
  const [filtros, setFiltros] = useState(INIT_FILTROS_DATA)
  const [dataGraph, setDataGraph] = useState(INIT_DATA_GRAPH)
  const [kpi, setKpi] = useState(INIT_DATA_KPIS)

  useEffect(() => {
    if (!profile) return
    console.log(profile)
    setFiltros({ ...filtros, idUsuario: profile.id })
    getCatalogoPST()
    getDataDashboard({ ...filtros, idUsuario: profile.id })
  }, [])

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

  const getDataDashboard = async body => {
    try {
      const url = '/api/reportes/obtener-datos'
      const res = await sendRequest(url, {
        method: 'POST',
        body: body,
      })

      if (res.success) {
        setTramites(res.result.data.table)
        setDataGraph(res.result.data.grafica)
        setKpi(res.result.data.kpis)
        console.log(res.result.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setFiltros({ ...filtros, [name]: value })
  }

  const onHandleFiltros = () => {
    console.log(filtros)
    getDataDashboard(filtros)
  }

  const clearFilters = () => {
    setFiltros({ ...INIT_FILTROS_DATA, idUsuario: profile.id })
  }

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <div className="w-full p-4 ">
      <h1 className="font-GMX text-3xl font-bold text-center ">REPORTES</h1>
      <DashboardSection data={kpi} />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-2 flex flex-col gap-3">
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

        <section className="flex  flex-col col-span-12 sm:col-span-10">
          <ThemeProvider theme={theme}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              className="bg-gray bg-opacity-10 rounded">
              <Tab value={0} label="Tabla" />
              <Tab value={1} label="Gráfica" />
            </Tabs>
            <section className="flex justify-center items-center grow">
              {tab === 1 && <GraphBar data={dataGraph} />}
              {tab === 0 && (
                <Table
                  columns={COLUMNS_TABLE_TRAMITES_ADMIN_DASHBOARD}
                  isLoading={isLoading}
                  rows={tramites}
                  className="col-span-1 sm:col-span-10 t-ease h-[calc(80vh-10rem)]"
                />
              )}
            </section>
          </ThemeProvider>
        </section>
      </div>
    </div>
  )
}

export default Reportes
