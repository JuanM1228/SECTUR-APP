'use client'
import React, { useState } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { INIT_ALIMENTOS_BEBIDAS, STEP_ENUM } from '@/utils/constants'
import { getSelectedValues } from '@/utils/common'

const ubicacionData = [
  { value: 1, title: 'Ninguno' },
  { value: 2, title: 'Hotel' },
  { value: 3, title: 'Museo' },
  { value: 4, title: 'Terminal de transportes' },
  { value: 5, title: 'Zona arqueológica' },
]
const tipoServicioData = [
  { value: 1, title: 'Autoservicio' },
  { value: 2, title: 'En mesa' },
  { value: 3, title: 'Mixto' },
]
const espectaculoData = [
  { value: 1, title: 'Ninguno' },
  { value: 2, title: 'Mixto' },
  { value: 3, title: 'Música grabada' },
  { value: 4, title: 'Música viva' },
]
const especialidadesData = [
  { value: 1, title: 'Aves' },
  { value: 2, title: 'Carnes' },
  { value: 3, title: 'Mixta' },
  { value: 4, title: 'Pescados y mariscos' },
  { value: 5, title: 'Vegetariana' },
  { value: 6, title: 'Otra' },
]
const comidaData = [
  { value: 1, title: 'Ninguno' },
  { value: 2, title: 'Comercial' },
  { value: 3, title: 'Internacional' },
  { value: 4, title: 'País o Regional' },
]

const serviciosData = [
  { key: 'id1', value: 'Aire acondicionado' },
  { key: 'id2', value: 'Área de recepción' },
  { key: 'id3', value: 'Estacionamiento' },
  { key: 'id4', value: "Maitre d'" },
  { key: 'id5', value: 'Reservaciones' },
  { key: 'id6', value: 'Valet de estacionamiento' },
]

const AlimentosBebidas = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : INIT_ALIMENTOS_BEBIDAS)

  const [checkedItems, setCheckedItems] = useState({
    serviciosAdicionalesList: {},
  })

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const checkboxHandler = (event, name) => {
    setCheckedItems({
      ...checkedItems,
      [name]: {
        ...checkedItems[name],
        [event.target.name]: event.target.checked,
      },
    })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const infoObject = {
      ...data,
      serviciosAdicionalesList: getSelectedValues(
        checkedItems.serviciosAdicionalesList,
      ),
    }
    setRegister({ ...register, detallesPST: infoObject })
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
        step === STEP_ENUM.DETALLES ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DETALLE PST</h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Dropdown
          label="Subcategoría"
          name="subcategoria"
          variant="outlined"
          value={data.subcategoria ? data.subcategoria : 0}
          options={tipoServicioData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Tipo de servicio"
          name="tipoDeServicio"
          variant="outlined"
          value={data.tipoDeServicio ? data.tipoDeServicio : 0}
          options={tipoServicioData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Espectáculo"
          name="espectaculo"
          variant="outlined"
          value={data.espectaculo ? data.espectaculo : 0}
          options={espectaculoData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Especialidades"
          name="especialidades"
          variant="outlined"
          value={data.especialidades ? data.especialidades : 0}
          options={especialidadesData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Tipos de comida"
          name="tiposDeComida"
          variant="outlined"
          value={data.tiposDeComida ? data.tiposDeComida : 0}
          options={comidaData}
          onChange={onHandleChange}
        />
        <Input
          label="Número de cajones"
          name="numeroDeCajones"
          type="number"
          onChange={onHandleChange}
          value={data.numeroDeCajones}
        />
        <Input
          label="Mercado extranjero"
          name="mercadoExtranjero"
          type="number"
          onChange={onHandleChange}
          value={data.mercadoExtranjero}
        />
        <Input
          label="Mercado nacional"
          name="mercadoNacional"
          type="number"
          onChange={onHandleChange}
          value={data.mercadoNacional}
        />
        <Dropdown
          label="Ubicación"
          name="ubicacion"
          variant="outlined"
          value={data.ubicacion ? data.ubicacion : 0}
          options={ubicacionData}
          onChange={onHandleChange}
        />
      </section>

      <Input
        label="Descripción de la ubicación"
        name="descripcionUbicacion"
        rows={4}
        multiline
        onChange={onHandleChange}
        value={data.descripcionUbicacion}
      />
      <section className="grid sm:grid-cols-2 gap-6">
        <CheckboxForm
          title="Servicios adicionales"
          name="serviciosAdicionalesList"
          options={serviciosData}
          checkedItems={checkedItems.serviciosAdicionalesList}
          handleChange={checkboxHandler}
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

export default AlimentosBebidas
