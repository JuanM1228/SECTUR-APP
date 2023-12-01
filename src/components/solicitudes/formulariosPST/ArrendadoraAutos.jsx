'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { INIT_ARRENDADORA_AUTOS } from '@/utils/constants'

const ArrendadoraAutos = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : INIT_ARRENDADORA_AUTOS)
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
    console.log(data)
    // nextStep()
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]
  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === 4 ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>

      <section className="grid sm:grid-cols-2 gap-6">
        <Dropdown
          label="Tipo de establecimiento"
          name="tipoEstablecimiento"
          variant="outlined"
          value={data.tipoEstablecimiento ? data.tipoEstablecimiento : 0}
          options={testData}
          onChange={onHandleChange}
        />

        <Input
          label="Nombre de la Matriz"
          name="nombreMatriz"
          onChange={onHandleChange}
        />

        <Input label="Domicilio" name="domicilio" onChange={onHandleChange} />

        <Input
          label="Número de sucursales"
          name="numeroSucursales"
          type="number"
          onChange={onHandleChange}
        />

        <Input
          label="Captación nacional %"
          name="captacionNacional"
          type="number"
          onChange={onHandleChange}
        />

        <Input
          label="Captación extrangero %"
          name="captacionExtrangero"
          type="number"
          onChange={onHandleChange}
        />
      </section>

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

export default ArrendadoraAutos
