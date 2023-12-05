'use client'
import React, { useState } from 'react'

import Input from '../common/Input'
import Button from '../common/Button'

import { validate } from '@/utils/validation'
import { INIT_CONTACTO, STEP_ENUM } from '@/utils/constants'

const Contacto = ({
  step,
  dataContacto,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataContacto ? dataContacto : INIT_CONTACTO)
  const [error, setError] = useState(INIT_CONTACTO)

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const { hasError, errors } = validate.contactoForm(data)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_CONTACTO)
      setRegister({ ...register, contacto: data })
      nextStep()
    }
  }

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === STEP_ENUM.CONTACTO ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">CONTACTO</h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Teléfono *"
          name="telefono"
          error={error.telefono !== ''}
          helpText={error.telefono}
          onChange={onHandleChange}
        />
        <Input
          label="Correo electrónico *"
          name="email"
          error={error.email !== ''}
          helpText={error.email}
          onChange={onHandleChange}
        />
        <Input label="Celular" name="celular" onChange={onHandleChange} />
        <Input label="Página Web" name="web" onChange={onHandleChange} />
        <Input label="Facebook" name="facebook" onChange={onHandleChange} />
        <Input label="X (Twitter)" name="twitter" onChange={onHandleChange} />
        <Input label="Fax" name="fax" onChange={onHandleChange} />
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

export default Contacto
