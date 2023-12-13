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
      className={`container-form-solicitud t-ease ${
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
          value={data.telefono}
        />
        <Input
          label="Correo electrónico *"
          name="email"
          error={error.email !== ''}
          helpText={error.email}
          onChange={onHandleChange}
          value={data.email}
        />
        <Input
          label="Celular"
          name="celular"
          onChange={onHandleChange}
          value={data.celular}
        />
        <Input
          label="Página Web"
          name="web"
          onChange={onHandleChange}
          value={data.web}
        />
        <Input
          label="Facebook"
          name="facebook"
          onChange={onHandleChange}
          value={data.facebook}
        />
        <Input
          label="X (Twitter)"
          name="twitter"
          onChange={onHandleChange}
          value={data.twitter}
        />
        <Input
          label="Fax"
          name="fax"
          onChange={onHandleChange}
          value={data.fax}
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

export default Contacto
