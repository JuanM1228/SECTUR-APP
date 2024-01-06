'use client'
import React, { useState, useEffect } from 'react'

import Input from '@/components/common/Input'
import Resumen from '@/components/home/Resumen'
import Icons from '@/assets/icons'
import Button from '@/components/common/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useHttpClient } from '@/hooks/useHttpClient'
import { createTheme, IconButton, ThemeProvider } from '@mui/material'
import colors from '@/assets/colors'
import Dropdown from '@/components/common/Dropdown'
import { INIT_FILTROS_DATA, OPTIONS_ESTADOS } from '@/utils/constants'
import Table from '@/components/common/Table'
import { COLUMS_CONSULTA_GENERAL } from '@/utils/columsTables'

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
  const router = useRouter()
  const { sendRequest, isLoading } = useHttpClient()

  const [tab, setTab] = useState(0)
  const [filtros, setFiltros] = useState(INIT_FILTROS_DATA)
  const [firstConsulta, setFirstConsulta] = useState(true)
  const [tramitesList, setTramitesList] = useState([])
  const [tramite, setTramite] = useState(null)

  const ReviewButton = params => {
    return (
      <IconButton
        onClick={() => {
          console.log(params)
          getDataFolio(params.row.folioSolicitud)
        }}>
        <Icons.Visibility />
      </IconButton>
    )
  }

  const COLUMS_CONSULTA_GENERAL = [
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
      field: 'folioSolicitud',
      headerName: 'Folio Solicitud',
      minWidth: 90,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'tipoPST',
      headerName: 'Tipo PST',
      minWidth: 180,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nombreComercial',
      headerName: 'Nombre Comercial',
      minWidth: 100,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'calle',
      headerName: 'Calle',
      minWidth: 100,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'colonia',
      headerName: 'Colonia',
      minWidth: 100,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      minWidth: 100,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'municipio',
      headerName: 'Municipio',
      minWidth: 100,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const onHandleChange = ({ target: { name, value } }) => {
    setFiltros({ ...filtros, [name]: value })
  }

  const getDataFolio = async folio => {
    setTramite(null)
    try {
      const url = `/api/registro/detalle-tramite-folio/${folio}`
      const res = await sendRequest(url)
      if (res.success) {
        console.log(res.result.data)
        setTramite(res.result.data)
      }
    } catch (e) {
      console.log(e)
      setTramite(null)
    }
  }

  const getDataTramites = async () => {
    try {
      const url = `/api/places/listaPST?idEstado=${filtros.idEstado}&idMunicipio&idTipoPST&nombreComercial=${filtros.nombreComercial}`
      const res = await sendRequest(url)
      if (res.success) {
        console.log(res.result.data)
        setTramitesList(res.result.data)
      }
    } catch (e) {
      console.log(e)
      setTramite(null)
    }
  }

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
    setFiltros({ ...filtros, folio: '', idEstado: 0, nombreComercial: '' })
    setTramite(null)
    setTramitesList([])
  }

  return (
    <div className="flex flex-col  items-center w-full  gap-4">
      <div className="sm:w-1/2">
        <h2 className="font-GMX text-3xl font-semibold text-center mt-4">
          Consulta de Certificados
        </h2>
        <Button
          content="regresar"
          onClick={() => router.push('/')}
          fullWidth={false}
        />
        <h2 className="font-GMX text-xl font-semibold mt-3">Buscar por:</h2>
        <div className="flex flex-col flex-wrap w-full gap-4 justify-center">
          <ThemeProvider theme={theme}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              className="bg-gray bg-opacity-10 rounded">
              <Tab value={0} label="Folio" />
              <Tab value={1} label="Estado y Nombre Comercial" />
            </Tabs>

            <section className="flex justify-center items-center   mb-5">
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
                    onClick={() => getDataFolio(filtros.folio)}
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
                      options={OPTIONS_ESTADOS}
                      onChange={onHandleChange}
                    />
                  </section>
                  <Button
                    content="Buscar"
                    className="w-full sm:w-auto self-center "
                    onClick={getDataTramites}
                  />
                </div>
              )}
            </section>
          </ThemeProvider>
        </div>

        {tramitesList.length !== 0 && (
          <Table
            columns={COLUMS_CONSULTA_GENERAL}
            isLoading={isLoading}
            rows={tramitesList}
            className="h-screen mb-4"
          />
        )}

        {tramite && <Resumen information={tramite} />}
        {!tramite ||
          (tramitesList.length === 0 && (
            <div className="flex flex-col justify-center items-center text-gray mt-10">
              <Icons.Search className="w-36 h-36 animate-bounce" />
              <p className="font-Montserrat font-semibold text-4xl">
                {firstConsulta
                  ? 'REALIZA UNA CONSULTA'
                  : 'REGISTRO NO EXISTENTE'}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HomePage
