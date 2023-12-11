import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '../../../components/common/Button'

function completed() {
  return (
    
    <div className=" font-GMX h-screen flex flex-col justify-center items-start sm:items-center">
      <TaskAltIcon style={{fill: "green"}} className="w-24 h-24 text-green-500 animate-bounce"/>
      <strong className="text-4xl font-semibold mb-2">Su tramite ha sido finalizado</strong>
      <p className="text-2xl text-gray-600 mb-4">Lo mantendremos informado acerca del estado.</p>
      <Button content="Regresar a inicio" className=" text-2xl mt-10" fullWidth={false}/>
    </div>
  )
}

export default completed