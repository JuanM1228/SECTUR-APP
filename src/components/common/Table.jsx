'use client'
import React from 'react'

import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import colors from '@/assets/colors'

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

const Table = ({ columns, rows, isLoading }) => {
  return (
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
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        // pageSizeOptions={[5, 10, 15, 20]}
        rowSelection={false}
        disableDensitySelector={true}
        disableRowSelectionOnClick={true}
        // autoPageSize={true}
        hideFooterSelectedRowCount={true}
        hideFooterPagination={false}
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
        className="w-full"
      />
    </ThemeProvider>
  )
}

export default Table
