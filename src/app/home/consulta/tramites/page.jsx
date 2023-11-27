'use client' // This is a client component 👈🏽

import { useHttpClient } from '@/hooks/useHttpClient'
import React, { useState, useEffect, useCallback } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Pagination } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'
import Colors from '@/assets/colors'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Input from '@/components/common/Input'

const theme = createTheme(
  {
    palette: {
      primary: {
        main: Colors.bigDipORuby,
      },
      secondary: {
        main: Colors.gray,
      },
    },
  },
  esES,
)

const columns = [
  {
    field: 'id',
    headerName: 'No. Trámite',
    minWidth: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tipoPST',
    headerName: 'Tipo de Prestador',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'tipoDeTramite',
    headerName: 'Trámite Realizado',
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
    headerName: 'Calle',
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
  {
    field: 'folioRNT',
    headerName: 'Folio RNT',
    minWidth: 100,
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
    field: 'fechaRecepcionInstancia',
    headerName: 'Recepción SECTUR',
    minWidth: 170,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    valueGetter: params => new Date(params.row.fechaRecepcionInstancia),
  },
  {
    field: 'fechaAceptacion',
    headerName: 'Recepción Ventanilla',
    minWidth: 160,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    valueGetter: params => new Date(params.row.fechaAceptacion),
  },
  {
    field: 'tipoProcedencia',
    headerName: 'Procedencia del Trámite',
    minWidth: 180,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'estadoCaptura',
    headerName: 'Estado del Trámite',
    minWidth: 140,
    type: 'string',
    align: 'left',
    headerAlign: 'center',
  },
]

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ m: 2 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Tramites = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const [value, setValue] = useState(0)
  const [rows, setRows] = useState([])

  const getInfo = useCallback(async () => {
    noStore() // Todo: verify it with Juan
    const url =
      'https://655fb7d0879575426b45b311.mockapi.io/api/tramitesEnProceso'
    try {
      const res = await sendRequest(url)
      console.log('respuesta', res)
      if (res) {
        setRows(res)
      }
    } catch (error) {
      console.log('error', error)
      // showErrorMessage()
    }
  }, [])

  useEffect(() => {
    getInfo()
  }, [getInfo])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  console.log('rows', rows)
  console.log('isLoading', isLoading)

  return (
    <div className="w-full flex">
      <ThemeProvider theme={theme}>
        <div className="w-1/5">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            centered
            aria-label="basic tabs example">
            <Tab label="Búsqueda" {...a11yProps(0)} />
            <Tab label="Búsqueda rápida" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Input
              fullWidth
              type="number"
              margin="normal"
              id="idTramite"
              label="Número de Trámite"
              variant="outlined"
              onChange={event => {
                // setName(event.target.value);
                console.log(event.target.value)
              }}
            />
            {/* TODO: Add initial date and end date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <view>
                <p className="flex-none mr-4 font-GMX text-gray text-sm">Rango de fechas</p>
                <view className="flex flex-row gap-4">
                  <DatePicker className="flex-1" />
                  <DatePicker className="flex-1" />
                </view>
              </view>
            </LocalizationProvider>
            {/* TODO: Add dropdown and static data (or backend data) instead of text inputs */}
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="estado"
              label="Estado"
              variant="outlined"
            />
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="faseTramite"
              label="Fase del trámite"
              variant="outlined"
            />
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="nombreComercial"
              label="Nombre Comercial"
              variant="outlined"
            />
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="tipoPST"
              label="Tipo PST"
              variant="outlined"
            />
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="tipoDeTramite"
              label="Tipo de Trámite"
              variant="outlined"
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Input
              fullWidth
              type="search"
              margin="normal"
              id="quickSearch"
              label="Búsqueda Rápida"
              variant="outlined"
              onChange={event => {
                // setName(event.target.value);
                console.log(event.target.value)
              }}
            />
          </TabPanel>
        </div>
        <div className="w-4/5">
          <DataGrid
            showColumnVerticalBorder={true}
            showCellVerticalBorder={true}
            density="compact"
            // filterMode="server"
            // paginationMode="server"
            // sortingMode="server"
            rows={rows}
            page
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            // pageSizeOptions={[5, 10, 15, 20]}
            rowSelection={false}
            disableDensitySelector={true}
            disableRowSelectionOnClick={true}
            // autoPageSize={true}
            hideFooterSelectedRowCount={true}
            hideFooterPagination={true}
            slots={{
              footer: () => (
                <view className="m-4 flex justify-center">
                  {/* TODO: Add dropdown menu to view pages */}
                  <Pagination
                    count={10} // The total number of pages.
                    // page={2} // The current page.
                    color="primary"
                    shape="rounded"
                    onChange={(event, page) => {
                      console.log('paginationOnChange: event', event)
                      console.log('paginationOnChange: page', page)
                    }}
                    // showFirstButton
                    // showLastButton
                  />
                </view>
              ),
            }}
            onPaginationModelChange={(model, details) => {
              console.log('onPaginationModelChange: model', model)
              console.log('onPaginationModelChange: details', details)
            }}
            onSortModelChange={(model, details) => {
              console.log('onSortModelChange: model', model)
              console.log('onSortModelChange: details', details)
            }}
            // paginationModel={{ page: 0, pageSize: 5 }}
            loading={isLoading}
            disableColumnFilter
            disableMultipleColumnsSorting
            className="h-[calc(100vh-3.5rem)]"
          />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Tramites
