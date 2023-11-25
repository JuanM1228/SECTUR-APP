'use client' // This is a client component 👈🏽

import { useHttpClient } from '@/hooks/useHttpClient'
import React, { useState, useEffect, useCallback } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Pagination } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'
import Colors from '@/assets/colors'

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

const Tramites = () => {
  const { sendRequest, isLoading } = useHttpClient()

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

  console.log('rows', rows)
  console.log('isLoading', isLoading)

  return (
    <div className="w-full flex">
      <div className="w-1/5">
        <p>Búsqueda</p>
        <p>Búsqueda Avanzada</p>

      </div>
      <div className="w-4/5">
        <ThemeProvider theme={theme}>
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
            hideFooterPagination={true} // not sure
            slots={{
              footer: () => (
                <view className="m-4 flex justify-center">
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
            // slotProps={{footer: }}
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
            disableColumnFilter // Not sure
            disableMultipleColumnsSorting // Not sure
            className="h-[calc(100vh-3.5rem)]"
          />
        </ThemeProvider>
      </div>
    </div>
  )
}

export default Tramites
