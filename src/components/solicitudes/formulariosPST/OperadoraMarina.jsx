'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { OPERADORA_MARINA_INIT_DATA, STEP_ENUM } from '@/utils/constants'

const espaciosData = [
  { value: 1, title: '0 hasta 31 pies' },
  { value: 2, title: '32 hasta 41 pies' },
  { value: 3, title: '42 hasta 51 pies' },
  { value: 4, title: '52 hasta 61 pies' },
  { value: 5, title: '62 hasta 71 pies' },
  { value: 6, title: '72 hasta 81 pies' },
  { value: 7, title: '82 hasta 91 pies' },
  { value: 8, title: '92 hasta 101 pies' },
  { value: 9, title: 'Más de 102 pies' },
]

const OperadoraMarina = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(
    dataPst ? dataPst : OPERADORA_MARINA_INIT_DATA,
  )
  const [dateStart, setDateStart] = useState(null)

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
    if (name === 'horaApertura') {
      setDateStart(value)
    }
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallePst: data })
    console.log(data)
    // TODO: Add validation and next step handler
    // nextStep()
  }

  // TODO: Añadir validación de porcentajes (0 a 100%)

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === STEP_ENUM.DETALLES ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>

      <section className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Superficie terrestre (metros)"
          name="superficieTerrestre"
          type="number"
          onChange={onHandleChange}
        />
        <Input
          label="Superficie total (metros)"
          name="superficieTotal"
          type="number"
          onChange={onHandleChange}
        />
        <Input
          label="Superficie acuática (metros)"
          name="superficieAcuatica"
          type="number"
          onChange={onHandleChange}
        />
        <Dropdown
          label="Número de espacios de atraque"
          name="espaciosAtraqueSelected"
          variant="outlined"
          value={
            data.espaciosAtraqueSelected ? data.espaciosAtraqueSelected : 0 // TODO: default value 0 or null?
          }
          options={espaciosData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Número de espacios de fondo"
          name="espaciosFondoSelected"
          variant="outlined"
          value={
            data.espaciosFondoSelected ? data.espaciosFondoSelected : 0 // TODO: default value 0 or null?
          }
          options={espaciosData}
          onChange={onHandleChange}
        />
      </section>
      {/* TODO: Add Servicios adicionales CheckBox */}
      {/* TODO: Add instalaciones ofrecidas checkbox */}
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

export default OperadoraMarina
