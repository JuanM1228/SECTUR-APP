'use client'
import React from 'react'

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid'
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

const CustomToolBar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

const Table = ({ columns, rows, isLoading, className, getRowClassName }) => {
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
        pagination
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        rowSelection={false}
        disableDensitySelector={true}
        disableRowSelectionOnClick={true}
        // autoPageSize={true}
        hideFooterSelectedRowCount={true}
        hideFooterPagination={false}
        slots={{
          toolbar: CustomToolBar,
          // footer: () => (
          //   <view className="m-4 flex justify-center">
          //     {/* TODO: Add dropdown menu to view pages */}
          //     <Pagination
          //       count={10} // The total number of pages.
          //       // page={2} // The current page.
          //       color="primary"
          //       shape="rounded"
          //       onChange={(event, page) => {
          //         //console.log('paginationOnChange: event', event)
          //         //console.log('paginationOnChange: page', page)
          //       }}
          //       // showFirstButton
          //       // showLastButton
          //     />
          //   </view>
          // ),
        }}
        getRowHeight={() => 'auto'}
        onPaginationModelChange={(model, details) => {
          //console.log('onPaginationModelChange: model', model)
          //console.log('onPaginationModelChange: details', details)
        }}
        onSortModelChange={(model, details) => {
          //console.log('onSortModelChange: model', model)
          //console.log('onSortModelChange: details', details)
        }}
        // paginationModel={{ page: 0, pageSize: 5 }}
        loading={isLoading}
        disableColumnFilter
        disableMultipleColumnsSorting
        getRowClassName={getRowClassName}
        className={className}
      />
    </ThemeProvider>
  )
}

export default Table
