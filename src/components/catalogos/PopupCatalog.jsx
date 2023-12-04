import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material'
import Button from '../common/Button'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import Slide from '@mui/material/Slide'
import Icons from '@/assets/icons'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs }
}

const editionSection = () => {
  return (
    <div className="flex gap-4">
      <IconButton><Icons.Edit/></IconButton>
      <IconButton><Icons.Delete/></IconButton>
    </div>
  )
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, editionSection()),
  createData('Ice cream sandwich', 237, 9.0, editionSection()),
  createData('Eclair', 262, 16.0, editionSection()),
  createData('Cupcake', 305, 3.7, editionSection()),
  createData('Gingerbread', 356, 16.0, editionSection()),
]

const PopupCatalog = ({ idCatalog, open, onClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}>
      <DialogTitle>Tipo de alojamiento</DialogTitle>
      <DialogContent className="flex flex-col gap-6">
        <DialogContentText>
          <TableContainer component={Paper}>
            <Table className="w-max" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
        <Button content="Agregar nuevo campo" />
      </DialogContent>
    </Dialog>
  )
}

export default PopupCatalog
