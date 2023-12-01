'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { validate } from '@/utils/validation'
import { INIT_ALIMENTOS_BEBIDAS } from '@/utils/constants'

const AlimentosBebidas = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : INIT_ALIMENTOS_BEBIDAS)
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
          label="Tipo de servicio"
          name="tipoDeServicio"
          variant="outlined"
          value={data.tipoDeServicio ? data.tipoDeServicio : 0}
          options={testData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Espectáculo"
          name="espectaculo"
          variant="outlined"
          value={data.espectaculo ? data.espectaculo : 0}
          options={testData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Especialidades"
          name="especialidades"
          variant="outlined"
          value={data.especialidades ? data.especialidades : 0}
          options={testData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Tipos de comida"
          name="tiposDeComida"
          variant="outlined"
          value={data.tiposDeComida ? data.tiposDeComida : 0}
          options={testData}
          onChange={onHandleChange}
        />

        <Input
          label="Número de cajones"
          name="numeroDeCajones"
          type="number"
          onChange={onHandleChange}
        />

        <Input
          label="Mercado extranjero"
          name="mercadoExtranjero"
          type="number"
          onChange={onHandleChange}
        />

        <Input
          label="Mercado nacional"
          name="mercadoNacional"
          type="number"
          onChange={onHandleChange}
        />

        <Dropdown
          label="Servicios adicionales"
          name="serviciosAdicionales"
          variant="outlined"
          value={data.serviciosAdicionales ? data.serviciosAdicionales : 0}
          options={testData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Ubicación"
          name="ubicacion"
          variant="outlined"
          value={data.ubicacion ? data.ubicacion : 0}
          options={testData}
          onChange={onHandleChange}
        />
      </section>

      <Input
        label="Descripción de la ubicación"
        name="descripcionUbicacion"
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

export default AlimentosBebidas
