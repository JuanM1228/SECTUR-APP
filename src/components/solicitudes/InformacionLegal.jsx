'use client'
import React, { useState } from 'react'

import Input from '../common/Input'
import Button from '../common/Button'

import { validate } from '@/utils/validation'
import { INIT_INFO_LEGAL } from '@/utils/constants'

const InformacionLegal = ({
  step,
  dataInformacionLegal,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(
    dataInformacionLegal ? dataInformacionLegal : INIT_INFO_LEGAL,
  )
  const [error, setError] = useState(INIT_INFO_LEGAL)

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const { hasError, errors } = validate.infoLegalForm(data)
    console.log(errors)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_INFO_LEGAL)
      setRegister({ ...register, informacionLegal: data })
      nextStep()
    }
  }

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === 3 ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">INFORMACIÓN LEGAL</h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Nombre del propietario *"
          name="nombreDelPropietario"
          error={error.nombreDelPropietario !== ''}
          helpText={error.nombreDelPropietario}
          onChange={onHandleChange}
        />
        <Input
          label="Nombre del Representante Legal *"
          name="representanteLegal"
          error={error.representanteLegal !== ''}
          helpText={error.representanteLegal}
          onChange={onHandleChange}
        />
        <Input
          label="Nombre del solicitante *"
          name="nombreDelSolicitante"
          error={error.nombreDelSolicitante !== ''}
          helpText={error.nombreDelSolicitante}
          onChange={onHandleChange}
        />
        <Input
          label="Puesto del solicitante *"
          name="puestoDelSolicitante"
          error={error.puestoDelSolicitante !== ''}
          helpText={error.puestoDelSolicitante}
          onChange={onHandleChange}
        />
        {/* TODO: Update dates into date component instead of Text Input */}
        <Input
          label="Fecha de solicitud"
          name="fechaDeSolicitud"
          onChange={onHandleChange}
        />
        <Input
          label="Fecha de ingreso a SECTUR"
          name="fechaIngresoSECTUR"
          onChange={onHandleChange}
        />
        {/* TODO: Update input into dropdown component instead of Text Input */}
        <Input
          label="Tipo de inmueble"
          name="tipoDeInmueble"
          onChange={onHandleChange}
        />
        <Input
          label="Número de escritura"
          name="numEscritura"
          onChange={onHandleChange}
        />
        <Input
          label="Vigencia del contrato"
          name="vigenciaContrato"
          onChange={onHandleChange}
        />
        <Input
          label="Número de registro"
          name="numeroDeRegistro"
          onChange={onHandleChange}
        />
        <Input
          label="Observaciones"
          name="observaciones"
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

export default InformacionLegal
