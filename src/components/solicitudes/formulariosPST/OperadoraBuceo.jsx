'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { INIT_OPERADORA_BUCEO, STEP_ENUM } from '@/utils/constants'

const establecimientoData = [
  { value: 1, title: 'Operadora' },
  { value: 2, title: 'Operadora Matriz' },
]

const OperadoraBuceo = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : INIT_OPERADORA_BUCEO)
  const [dateStart, setDateStart] = useState(null)

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
    if (name === 'horaApertura') {
      setDateStart(value)
    }
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallePst: data })
    // TODO: Add validation and next step handler
    console.log(data)
    // nextStep()
  }

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === STEP_ENUM.DETALLES ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>

      <section className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Nombre de la Matriz"
          name="nombreMatriz"
          onChange={onHandleChange}
        />
        <Input label="Domicilio" name="domicilio" onChange={onHandleChange} />
        <Input
          label="Teléfono"
          name="telefono"
          type="number"
          onChange={onHandleChange}
        />
        <Dropdown
          label="Tipo de establecimiento"
          name="tipoEstablecimiento"
          variant="outlined"
          value={data.tipoEstablecimiento ? data.tipoEstablecimiento : 0}
          options={establecimientoData}
          onChange={onHandleChange}
        />
        <Input
          label="Número de sucursales"
          name="numeroSucursales"
          type="number"
          onChange={onHandleChange}
        />
      </section>
      <Input
        label="Asociaciones a las que está afiliado"
        name="afiliaciones"
        rows={4}
        multiline
        onChange={onHandleChange}
      />
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

export default OperadoraBuceo
