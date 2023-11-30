'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'
import DatePickerCustom from '@/components/common/DatePicker'

import { validate } from '@/utils/validation'
import { INIT_AGENCIA_VIAJES } from '@/utils/constants'

const AgenciaViaje = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : INIT_AGENCIA_VIAJES)
  const [error, setError] = useState(INIT_AGENCIA_VIAJES)

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallePst: data })
    // nextStep()
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
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Nombre de notario"
          name="nombreNotario"
          onChange={onHandleChange}
        />

        <Input
          label="Número de acta constitutiva"
          name="numeroActaConstitutiva"
          type="number"
          onChange={onHandleChange}
        />

        <Input
          label="Número de notaría"
          name="numeroNotaria"
          type="number"
          onChange={onHandleChange}
        />

        <Input
          label="Lugar de expedición"
          name="lugarExpedicion"
          onChange={onHandleChange}
        />

        <DatePickerCustom
          label="Fecha de emisión del acta"
          name="fechaEmisionActa"
          onChange={onHandleChange}
        />

        <Dropdown
          label="Afiliaciones"
          name="afiliaciones"
          variant="outlined"
          value={data.afiliaciones ? data.afiliaciones : 0}
          options={testData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Boletaje"
          name="boletaje"
          variant="outlined"
          value={data.boletaje ? data.boletaje : 0}
          options={testData}
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

export default AgenciaViaje
