'use client'
import React, { useState, useEffect } from 'react'

import Input from '@/components/common/Input'
import Resumen from '@/components/home/Resumen'
import Icons from '@/assets/icons'
import Button from '@/components/common/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { useAuthStore } from '@/store/auth'

import { useHttpClient } from '@/hooks/useHttpClient'
import { createTheme, ThemeProvider } from '@mui/material'
import colors from '@/assets/colors'
import Dropdown from '@/components/common/Dropdown'
import { INIT_FILTROS_DATA, ROLE_ENUM } from '@/utils/constants'
import Table from '@/components/common/Table'
import {
  COLUMNS_TABLE_TRAMITES_ADMIN,
  COLUMNS_TABLE_TRAMITES_USUARIO,
} from '@/utils/columsTables'

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

const HomePage = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const profile = useAuthStore(state => state.profile)
  console.log(profile)
  const [estados, setEstados] = useState([])
  const [tab, setTab] = useState(0)
  const [filtros, setFiltros] = useState(INIT_FILTROS_DATA)
  const [data, setData] = useState(null)
  const [firstConsulta, setFirstConsulta] = useState(true)
  const [tramites, setTramites] = useState([])

  useEffect(() => {
    if (!profile) return
    console.log(profile)
    setFiltros({ ...filtros, idUsuario: profile.id })
    getCatalogoEstados()
  }, [])

  const onHandleChange = ({ target: { name, value } }) => {
    setFiltros({ ...filtros, [name]: value })
  }

  const getCatalogoEstados = async () => {
    const url = '/api/address/estados'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setEstados(res.result.data)
        console.log(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onHandleFiltros = () => {
    console.log(filtros)
    getTramitesFiltros(filtros)
    setFirstConsulta(false)
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

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
    setFiltros({ ...filtros, folio: '', idEstado: 0, nombreComercial: '' })
  }

  const columnsData = COLUMNS_TABLE_TRAMITES_ADMIN

  return (
    <div className="flex flex-col  items-center w-full  gap-4">
      <div className="sm:w-1/2">
        <h2 className="font-GMX text-3xl font-semibold text-center mt-4">
          Consulta de Certificados
        </h2>
        <h2 className="font-GMX text-xl font-semibold">Buscar por:</h2>
        <div className="flex flex-col flex-wrap w-full gap-4 justify-center">
          <ThemeProvider theme={theme}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              className="bg-gray bg-opacity-10 rounded">
              <Tab value={0} label="Folio" />
              <Tab value={1} label="Estado y Nombre Comercial" />
            </Tabs>

            <section className="flex justify-center items-center  ">
              {tab === 0 && (
                <div className="flex flex-wrap sm:flex-nowrap gap-4 w-3/4">
                  <Input
                    label="Folio"
                    name="folio"
                    IconComponent={Icons.QrCode}
                    onChange={onHandleChange}
                    value={filtros.folio}
                  />
                  <Button
                    content="Buscar"
                    className="w-full sm:w-auto h-auto "
                    onClick={onHandleFiltros}
                  />
                </div>
              )}
              {tab === 1 && (
                <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4 w-3/4 ">
                  <section className="flex flex-col gap-4  w-full">
                    <Input
                      label="Nombre comercial"
                      name="nombreComercial"
                      onChange={onHandleChange}
                      value={filtros.nombreComercial}
                    />
                    <Dropdown
                      label="Estado"
                      name="idEstado"
                      variant="outlined"
                      value={filtros.idEstado}
                      options={estados}
                      onChange={onHandleChange}
                    />
                  </section>
                  <Button
                    content="Buscar"
                    className="w-full sm:w-auto self-center "
                    onClick={onHandleFiltros}
                  />
                </div>
              )}
            </section>
          </ThemeProvider>
        </div>

        {tramites.length !== 0 && (
          <Table
            columns={columnsData}
            isLoading={isLoading}
            rows={tramites}
            className="col-span-1 sm:col-span-10 t-ease h-[calc(40vh-10rem)]"
          />
        )}

        {/* {data && <Resumen information={data} />} */}
        {tramites.length === 0 && (
          <div className="flex flex-col justify-center items-center text-gray mt-10">
            <Icons.Search className="w-36 h-36 animate-bounce" />
            <p className="font-Montserrat font-semibold text-4xl">
              {firstConsulta ? 'REALIZA UNA CONSULTA' : 'REGISTRO NO EXISTENTE'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
