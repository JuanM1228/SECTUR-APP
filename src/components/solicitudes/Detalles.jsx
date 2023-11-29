'use client'
import React, { useState } from 'react'

import Input from '../common/Input'
import Button from '../common/Button'
import Dropdown from '../common/Dropdown'

import { validate } from '@/utils/validation'
import { INIT_DATOS_GENERALES } from '@/utils/constants'

const Detalles = ({
  step,
  datosGenerales,
  nextStep,
  backStep,
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
        step === 4 ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLES PST</h1>
      <section className="grid sm:grid-cols-2 gap-6"></section>
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

export default Detalles
