'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { STEP_ENUM, TRANSPORTISTA_TURISTICO_INIT_DATA } from '@/utils/constants'

const subcategoriaData = [
  { value: 1, title: 'Embarcación menor de recreo' },
  { value: 2, title: 'Transporte terrestre' },
  { value: 3, title: 'Transporte aéreo' },
]

const tipoServicioData = [
  { value: 1, title: 'Transportadora' },
  { value: 2, title: 'Transportadora Matriz' },
  { value: 3, title: 'Transportadora Sucursal' },
]

const servicioOfrecidoData = [
  { value: 1, title: 'Sin Guía de Turistas' },
  { value: 2, title: 'Exclusivo' },
  { value: 3, title: 'Contrato' },
  { value: 4, title: 'Con Guía de Turistas' },
]

const TransportistaTuristico = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(
    dataPst ? dataPst : TRANSPORTISTA_TURISTICO_INIT_DATA,
  )

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallesPST: data })
    console.log(data)
    // TODO: Add validation and next step handler
    nextStep()
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
        <Dropdown
          label="Subcategoría"
          name="subcategoria"
          variant="outlined"
          value={
            data.subcategoria ? data.subcategoria : 0 // TODO: default value 0 or null?
          }
          options={subcategoriaData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Tipo de establecimiento"
          name="tipoEstablecimientoSelected"
          variant="outlined"
          value={
            data.tipoEstablecimientoSelected
              ? data.tipoEstablecimientoSelected
              : 0 // TODO: default value 0 or null?
          }
          options={tipoServicioData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Servicio ofrecido"
          name="tipoServicioSelected"
          variant="outlined"
          value={
            data.tipoServicioSelected ? data.tipoServicioSelected : 0 // TODO: default value 0 or null?
          }
          options={servicioOfrecidoData}
          onChange={onHandleChange}
        />
        <Input
          label="Numero de sucurales"
          type="number"
          name="numSucursales"
          onChange={onHandleChange}
          value={data.numSucursales}
        />
        <Input
          label="Categoría"
          name="categoria"
          onChange={onHandleChange}
          value={data.categoria}
        />
        <Input
          label="Nombre de la matriz"
          name="nombreMatriz"
          onChange={onHandleChange}
          value={data.nombreMatriz}
        />
        <Input
          label="Dirección de la matriz"
          name="direcionMatriz"
          onChange={onHandleChange}
          value={data.direcionMatriz}
        />
        <Input
          label="Número de guías"
          type="number"
          name="numDeGuias"
          onChange={onHandleChange}
          value={data.numDeGuias}
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

export default TransportistaTuristico
