'use client'
import React, { useState } from 'react'

import Input from '../common/Input'
import Button from '../common/Button'
import Dropdown from '../common/Dropdown'

import { validate } from '@/utils/validation'
import { INIT_DATOS_GENERALES, STEP_ENUM } from '@/utils/constants'

const DatosGenerales = ({
  step,
  datosGenerales,
  nextStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(
    datosGenerales ? datosGenerales : INIT_DATOS_GENERALES,
  )
  const [error, setError] = useState(INIT_DATOS_GENERALES)

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const { hasError, errors } = validate.datosGeneralesForm(data)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_DATOS_GENERALES)
      setRegister({ ...register, datosGenerales: data })
      nextStep()
    }
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === STEP_ENUM.DATOS_GENERALES ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DATOS GENERALES</h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Dropdown
          label="Tipo PST *"
          name="tipoPST"
          variant="outlined"
          value={data.tipoPST ? data.tipoPST : 0}
          options={testData}
          error={Boolean(error.tipoPST)}
          helpText={error.tipoPST}
          onChange={onHandleChange}
        />
        <Input
          label="Nombre comercial *"
          name="nombreComercial"
          error={error.nombreComercial !== ''}
          helpText={error.nombreComercial}
          onChange={onHandleChange}
        />
        <Input
          label="RFC *"
          name="rfc"
          error={error.rfc !== ''}
          helpText={error.rfc}
          onChange={onHandleChange}
          maxLength={13}
        />
        <Input
          label="Registro INEGI"
          name="registroINEGI"
          onChange={onHandleChange}
        />
        <Input
          label="Registro anterior"
          name="registroAnterior"
          onChange={onHandleChange}
        />
        <Input
          label="Razón social"
          name="razonSocial"
          onChange={onHandleChange}
        />
        <Input label="CURP" name="curp" onChange={onHandleChange} />
      </section>
      <Button
        content="Siguiente"
        type="submit"
        className=" w-full sm:w-auto self-end"
      />
    </form>
  )
}

export default DatosGenerales
