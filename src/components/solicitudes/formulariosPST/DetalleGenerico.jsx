'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'
import TimePickerCustom from '@/components/common/TimePicker'

import dayjs from 'dayjs'
import { validate } from '@/utils/validation'
import { INIT_DETALLE_GENERICO } from '@/utils/constants'

const DetalleGenerico = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : INIT_DETALLE_GENERICO)
  const [error, setError] = useState(INIT_DETALLE_GENERICO)

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallePst: data })
    console.log(data)
    // nextStep()
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]
  console.log(dayjs(data.horaApertura))
  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === 4 ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>
      <Dropdown
        label="Tipo de persona"
        name="tipoPersona"
        variant="outlined"
        value={data.tipoPersona ? data.tipoPersona : 0}
        options={testData}
        onChange={onHandleChange}
      />
      <section className="grid sm:grid-cols-2 gap-6">
        <TimePickerCustom
          label="Hora de apertura"
          name="horaApertura"
          onChange={onHandleChange}
        />

        {data.horaApertura && (
          <TimePickerCustom
            label="Hora de cierre"
            name="horaCierre"
            disabled={data.horaApertura ? false : true}
            minTime={dayjs(data.horaApertura)}
            onChange={onHandleChange}
          />
        )}
      </section>

      <Input
        label="Observaciones Generales"
        name="observacionesGenerales"
        rows={4}
        multiline
        onChange={onHandleChange}
      />

      <Input
        label="Observaciones Específicas"
        name="observacionesEspecificas"
        rows={4}
        multiline
        onChange={onHandleChange}
      />

      <Input
        label="Observaciones Adicionales"
        name="observacionesAdicionales"
        rows={4}
        multiline
        onChange={onHandleChange}
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
