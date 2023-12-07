'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { STEP_ENUM, TIEMPOS_COMPARTIDOS_INIT_DATA } from '@/utils/constants'

const ubcacionData = [
  { value: 1, title: 'Capital del Edo.' },
  { value: 2, title: 'Cd. Colonial' },
  { value: 3, title: 'Cd. Fronteriza' },
  { value: 4, title: 'Playa Terminal Transporte' },
]

const tipoDeOperacionData = [
  { value: 1, title: 'Tiempo Compartido' },
  { value: 2, title: 'Hotel' },
  { value: 3, title: 'Mixta (T.C. y Hotel)' },
]

const TiemposCompartidos = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(
    dataPst ? dataPst : TIEMPOS_COMPARTIDOS_INIT_DATA,
  )

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallesPST: data })
    console.log(data)
    // TODO: Add validation and next step handler
    // nextStep()
  }

  // TODO: Añadir validación de porcentajes (0 a 100%)

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === STEP_ENUM.DETALLES ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Dropdown
          label="Ubicación"
          name="ubicacionSelected"
          variant="outlined"
          value={
            data.ubicacionSelected ? data.ubicacionSelected : 0 // TODO: default value 0 or null?
          }
          options={ubcacionData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Tipo de operación"
          name="tipoOperacionSelected"
          variant="outlined"
          value={
            data.tipoOperacionSelected ? data.tipoOperacionSelected : 0 // TODO: default value 0 or null?
          }
          options={tipoDeOperacionData}
          onChange={onHandleChange}
        />
        <Input
          label="Nombre Comercial"
          name="nombreComercial"
          onChange={onHandleChange}
        />
        <Input label="Categoría" name="categoria" onChange={onHandleChange} />
        <Input
          label="Mercado Nacional"
          name="mercadoNacional"
          onChange={onHandleChange}
        />
        <Input
          label="Mercado Extranjero"
          name="mercadoExtranjero"
          onChange={onHandleChange}
        />
      </section>
      {/* TODO: Add Servicios adicionales CheckBox */}
      <div className=" flex gap-6 justify-between">
        <Button
          content="Regresar"
          type="button"
          className=" w-full sm:w-auto"
          onClick={backStep}
        />
        <Button
          content="Siguiente"
          type="submit"
          className=" w-full sm:w-auto"
        />
      </div>
    </form>
  )
}

export default TiemposCompartidos
