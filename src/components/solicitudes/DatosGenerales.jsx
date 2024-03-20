'use client'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import Input from '../common/Input'
import Button from '../common/Button'
import Dropdown from '../common/Dropdown'
import DatePickerCustom from '../common/DatePicker'

import { validate } from '@/utils/validation'
import { useAuthStore } from '@/store/auth'
import {
  INIT_DATOS_GENERALES,
  STEP_ENUM,
  TIPOS_TRAMITES_DROPDOWN,
  TIPOS_VIALIDAD_DROPDOWN,
  TIPOS_ASENTAMIENTO_DROPDOWN,
} from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import { useRouter } from 'next/navigation'

const DatosGenerales = ({
  step,
  datosGenerales,
  nextStep,
  register,
  setRegister,
  idSolicitud,
  setIdSolicitud,
}) => {
  const router = useRouter()
  const [data, setData] = useState(INIT_DATOS_GENERALES)
  const [error, setError] = useState(INIT_DATOS_GENERALES)
  const [catalogoPST, setCatalogoPST] = useState([])
  const { sendRequest, isLoading } = useHttpClient()
  const { profile } = useAuthStore()

  useEffect(() => {
    getCatalogoPST()
    if (!datosGenerales) return
    setData(datosGenerales)
  }, [datosGenerales])

  const getCatalogoPST = async () => {
    const url = '/api/configuration/catalogo-pst'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setCatalogoPST(res.result.data)
      } else {
      }
    } catch (error) {
      //console.log('error', error)
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
      const body = {
        datosGenerales: data,
        id_user: profile.id,
        id_solicitud: idSolicitud,
      }
      onUpdateDatabase(body)
    }
  }

  const onUpdateDatabase = async body => {
    try {
      const url = '/api/registro/solicitud'

      const res = await sendRequest(url, {
        method: 'POST',
        body: body,
      })
      if (res.success) {
        //console.log(res)
        setIdSolicitud(res.result.data.folio)
        nextStep()
      }
    } catch (e) {
      //console.log(e)
    }
  }

  const onHandleChange = ({ target: { name, value } }) => {
    if (name === 'rfc' || name === 'curp') {
      const valueWithUppercase = value.toUpperCase()
      setData({ ...data, [name]: valueWithUppercase })
      return
    }
    setData({ ...data, [name]: value })
  }

  if (isLoading && step === STEP_ENUM.DATOS_GENERALES) {
    return <span className="loader mt-20"></span>
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
          label="Razón social *"
          name="razonSocial"
          onChange={onHandleChange}
          error={error.razonSocial !== ''}
          helpText={error.razonSocial}
          value={data.razonSocial}
        />
        <Input
          label="CURP"
          name="curp"
          error={error.curp !== ''}
          helpText={error.curp}
          onChange={onHandleChange}
          value={data.curp}
        />
        <Dropdown
          label="Tipo de Trámite *"
          name="tipoTramite"
          variant="outlined"
          value={data.tipoTramite ? data.tipoTramite : 0}
          options={TIPOS_TRAMITES_DROPDOWN}
          error={Boolean(error.tipoTramite)}
          helpText={error.tipoTramite}
          onChange={onHandleChange}
        />
        <Input
          label="Nacionalidad *"
          name="nacionalidad"
          onChange={onHandleChange}
          error={error.nacionalidad !== ''}
          helpText={error.nacionalidad}
          value={data.nacionalidad}
        />
        <Dropdown
          label="Tipo de Vialidad *"
          name="tipoVialidad"
          variant="outlined"
          value={data.tipoVialidad ? data.tipoVialidad : 0}
          options={TIPOS_VIALIDAD_DROPDOWN}
          error={Boolean(error.tipoVialidad)}
          helpText={error.tipoVialidad}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Nombre de asentamiento *"
          name="asentamiento"
          variant="outlined"
          value={data.asentamiento ? data.asentamiento : 0}
          options={TIPOS_ASENTAMIENTO_DROPDOWN}
          error={Boolean(error.asentamiento)}
          helpText={error.asentamiento}
          onChange={onHandleChange}
        />
        <DatePickerCustom
          label="Fecha apertura *"
          name="fechaApertura"
          error={error.fechaApertura !== ''}
          helpText={error.fechaApertura}
          onChange={onHandleChange}
          value={dayjs(data.fechaApertura)}
          maxDate={dayjs()}
          minDate={dayjs().subtract(100, 'year')}
        />
      </section>

      <div className=" flex gap-6 justify-between">
        <Button
          content="Regresar"
          type="button"
          className=" w-full sm:w-auto"
          onClick={() => router.push('/home/tramites/')}
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

export default DatosGenerales
