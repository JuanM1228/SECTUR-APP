'use client'
import React, { useState } from 'react'

import Input from '../common/Input'
import Dropdown from '../common/Dropdown'
import Accordion from '../common/Accordion'

import Icons from '@/assets/icons'
import Button from '../common/Button'

const DatosGenerales = ({ step, datosGenerales }) => {
  const [data, setData] = useState({
    tipoPST: '',
    nombreComercial: '',
    RFC: '',
    registroINEGI: '',
    registroAnterior: '',
    razonSocial: '',
    CURP: '',
  })
  const onHandleChange = ({ target: { name, value } }) => {
    console.log(name, value)
    setData({ ...data, [name]: value })
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === 0 ? '' : 'hide'
      }`}>
      <h1 className="font-GMX font-bold text-2xl">DATOS GENERALES</h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Dropdown
          label="Tipo PST *"
          name="tipoPST"
          variant="outlined"
          value={data.tipoPST}
          options={testData}
          onChange={onHandleChange}
        />
        <Input
          label="Nombre comercial *"
          name="nombreComercial"
          onChange={onHandleChange}
        />
        <Input label="RFC *" name="RFC" onChange={onHandleChange} />
        <Input
          label="Registro INEGI"
          name="registroINEGI"
          onChange={onHandleChange}
        />
        <Input
          label="Registro anterior"
          name="registroAnterior"
          onChange={onHandleChange}
        />
        <Input
          label="Razón social"
          name="razonSocial"
          onChange={onHandleChange}
        />
        <Input label="CURP" name="CURP" onChange={onHandleChange} />
      </section>
      <Button content="Siguiente" className=" w-full sm:w-auto self-end" />
    </form>
  )
}

export default DatosGenerales
