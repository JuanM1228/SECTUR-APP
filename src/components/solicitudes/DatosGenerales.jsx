'use client'
import React, { useState, useEffect } from 'react'

import Input from '../common/Input'
import Button from '../common/Button'
import Dropdown from '../common/Dropdown'

import { validate } from '@/utils/validation'
import { INIT_DATOS_GENERALES, STEP_ENUM } from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'

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
  const [catalogoPST, setCatalogoPST] = useState([])
  const { sendRequest, isLoading } = useHttpClient()

  useEffect(() => {
    getCatalogoPST()
  }, [])

  const getCatalogoPST = async () => {
    const url = '/api/configuration/catalogo-pst'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setCatalogoPST(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
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

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  return (
    <form
      className={`container-form-solicitud t-ease ${
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
          options={catalogoPST}
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
          value={data.nombreComercial}
        />
        <Input
          label="RFC *"
          name="rfc"
          error={error.rfc !== ''}
          helpText={error.rfc}
          onChange={onHandleChange}
          maxLength={13}
          value={data.rfc}
        />
        <Input
          label="Registro INEGI"
          name="registroINEGI"
          onChange={onHandleChange}
          value={data.registroINEGI}
        />
        <Input
          label="Registro anterior"
          name="registroAnterior"
          onChange={onHandleChange}
          value={data.registroAnterior}
        />
        <Input
          label="Razón social"
          name="razonSocial"
          onChange={onHandleChange}
          value={data.razonSocial}
        />
        <Input
          label="CURP"
          name="curp"
          onChange={onHandleChange}
          value={data.curp}
        />
      </section>
      <Button
        content="Siguiente"
        type="submit"
        className="w-full sm:w-auto self-end"
      />
    </form>
  )
}

export default DatosGenerales
