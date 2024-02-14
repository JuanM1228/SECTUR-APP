'use client'
import React, { useState, useEffect } from 'react'

import Input from '../common/Input'
import Button from '../common/Button'

import { useHttpClient } from '@/hooks/useHttpClient'
import { validate } from '@/utils/validation'
import { INIT_CONTACTO, STEP_ENUM } from '@/utils/constants'

const Contacto = ({
  step,
  dataContacto,
  nextStep,
  backStep,
  register,
  setRegister,
  idSolicitud,
}) => {
  const [data, setData] = useState(INIT_CONTACTO)
  const [error, setError] = useState(INIT_CONTACTO)
  const { sendRequest, isLoading } = useHttpClient()

  useEffect(() => {
    if (!dataContacto) return
    setData(dataContacto)
  }, [dataContacto])

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onUpdateDatabase = async body => {
    try {
      const url = '/api/registro/solicitud'
      const res = await sendRequest(url, {
        method: 'POST',
        body: body,
      })
      if (res.success) {
        nextStep()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const { hasError, errors } = validate.contactoForm(data)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_CONTACTO)
      setRegister({ ...register, contacto: data })
      const body = {
        contacto: data,
        id_solicitud: idSolicitud,
      }
      onUpdateDatabase(body)
    }
  }

  if (isLoading && step === STEP_ENUM.CONTACTO) {
    return <span className="loader"></span>
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
          maxLength={10}
          helpText={error.telefono}
          onChange={onHandleChange}
          value={data.telefono}
          type="number"
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
          error={error.celular !== ''}
          helpText={error.celular}
          onChange={onHandleChange}
          value={data.celular}
        />
        <Input
          label="Página Web"
          name="web"
          error={error.web !== ''}
          onChange={onHandleChange}
          value={data.web}
        />
        <Input
          label="Facebook"
          name="facebook"
          error={error.facebook !== ''}
          onChange={onHandleChange}
          value={data.facebook}
        />
        <Input
          label="X (Twitter)"
          name="x"
          error={error.x !== ''}
          onChange={onHandleChange}
          value={data.x}
        />
        <Input
          label="Tiktok"
          name="tiktok"
          error={error.tiktok !== ''}
          onChange={onHandleChange}
          value={data.tiktok}
        />
        <Input
          label="Instagram"
          name="instagram"
          onChange={onHandleChange}
          value={data.instagram}
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
