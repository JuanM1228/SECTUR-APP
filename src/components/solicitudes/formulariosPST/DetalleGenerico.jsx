'use client'
import React, { useState, useEffect } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'
import TimePickerCustom from '@/components/common/TimePicker'

import dayjs from 'dayjs'
import { useHttpClient } from '@/hooks/useHttpClient'
import { INIT_DETALLE_GENERICO, STEP_ENUM } from '@/utils/constants'

const DetalleGenerico = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(dataPst ? dataPst : INIT_DETALLE_GENERICO)
  const [dateStart, setDateStart] = useState(null)
  const [tipoDePersona, setTipoPersona] = useState([])

  useEffect(() => {
    getDropdownsData()
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/2'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        console.log('detalle generico', res.result.data)
        setTipoPersona(res.result.data.tipoDePersona)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
    if (name === 'horaApertura') {
      setDateStart(value)
    }
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallesPST: data })
    console.log(data)
    nextStep()
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]
  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === STEP_ENUM.DETALLES ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>

      <Dropdown
        label="Subcategoría"
        name="subcategoria"
        variant="outlined"
        value={data.subcategoria ? data.subcategoria : 0}
        options={testData}
        onChange={onHandleChange}
      />

      <Dropdown
        label="Tipo de persona"
        name="tipoPersona"
        variant="outlined"
        value={data.tipoPersona ? data.tipoPersona : 0}
        options={tipoDePersona}
        onChange={onHandleChange}
      />

      <section className="grid sm:grid-cols-2 gap-6">
        <TimePickerCustom
          label="Hora de apertura"
          name="horaApertura"
          defaultValue={dayjs(data.horaApertura)}
          ampm={false}
          onChange={onHandleChange}
        />

        <TimePickerCustom
          label="Hora de cierre"
          name="horaCierre"
          defaultValue={dayjs(data.horaCierre)}
          ampm={false}
          disabled={dateStart ? false : true}
          minTime={dayjs(dateStart)}
          onChange={onHandleChange}
        />
      </section>

      <Input
        label="Observaciones Generales"
        name="observacionesGenerales"
        rows={4}
        multiline
        onChange={onHandleChange}
        value={data.observacionesGenerales}
      />

      <Input
        label="Observaciones Específicas"
        name="observacionesEspecificas"
        rows={4}
        multiline
        onChange={onHandleChange}
        value={data.observacionesEspecificas}
      />

      <Input
        label="Observaciones Adicionales"
        name="observacionesAdicionales"
        rows={4}
        multiline
        onChange={onHandleChange}
        value={data.observacionesAdicionales}
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

export default DetalleGenerico
