'use client'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import Input from '../common/Input'
import Button from '../common/Button'
import DatePickerCustom from '../common/DatePicker'

import { validate } from '@/utils/validation'
import { INIT_INFO_LEGAL, STEP_ENUM } from '@/utils/constants'

const InformacionLegal = ({
  step,
  dataInformacionLegal,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(INIT_INFO_LEGAL)
  const [error, setError] = useState(INIT_INFO_LEGAL)
  useEffect(() => {
    if (!dataInformacionLegal) return
    setData(dataInformacionLegal)
  }, [dataInformacionLegal])

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    // TODO: Add dates validation. Now hasError is true due date validation is not implemented
    const { hasError, errors } = validate.infoLegalForm(data)
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
      className={`container-form-solicitud t-ease ${
        step === STEP_ENUM.INFO_LEGAL ? '' : 'hide'
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
          value={data.nombreDelPropietario}
        />
        <Input
          label="Nombre del Representante Legal *"
          name="representanteLegal"
          error={error.representanteLegal !== ''}
          helpText={error.representanteLegal}
          onChange={onHandleChange}
          value={data.representanteLegal}
        />
        <Input
          label="Nombre del solicitante *"
          name="nombreDelSolicitante"
          error={error.nombreDelSolicitante !== ''}
          helpText={error.nombreDelSolicitante}
          onChange={onHandleChange}
          value={data.nombreDelSolicitante}
        />
        <Input
          label="Puesto del solicitante *"
          name="puestoDelSolicitante"
          error={error.puestoDelSolicitante !== ''}
          helpText={error.puestoDelSolicitante}
          onChange={onHandleChange}
          value={data.puestoDelSolicitante}
        />
        <DatePickerCustom
          label="Fecha de solicitud *"
          name="fechaDeSolicitud"
          error={error.fechaDeSolicitud !== ''}
          helpText={error.fechaDeSolicitud}
          onChange={onHandleChange}
          value={dayjs(data.fechaDeSolicitud)}
        />
        <DatePickerCustom
          label="Fecha de ingreso a SECTUR *"
          name="fechaIngresoSECTUR"
          error={error.fechaIngresoSECTUR !== ''}
          helpText={error.fechaIngresoSECTUR}
          onChange={onHandleChange}
          value={dayjs(data.fechaIngresoSECTUR)}
        />
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
