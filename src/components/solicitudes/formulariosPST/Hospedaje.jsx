'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { HOSPEDAJE_INIT_DATA, STEP_ENUM } from '@/utils/constants'
import CheckboxForm from '@/components/common/CheckboxForm'

const distioncionData = [
  { value: 1, title: 'Distintivo H' },
  { value: 2, title: 'Distintivo M' },
  { value: 3, title: 'No Aplica' },
  { value: 4, title: 'Punto Limpio' },
  { value: 5, title: 'Tesoros de México' },
]

const scoreData = [
  { value: 1, title: '1 Estrella' },
  { value: 2, title: '2 Estrellas' },
  { value: 3, title: '3 Estrellas' },
  { value: 4, title: '4 Estrellas' },
  { value: 5, title: '5 Estrellas' },
]

const ubicacionData = [
  { value: 1, title: 'Capital del Estado' },
  { value: 2, title: 'Carretera' },
  { value: 3, title: 'Cd. Colonial' },
  { value: 4, title: 'Cd. Fronteriza' },
  { value: 5, title: 'Montaña' },
  { value: 6, title: 'Playa' },
  { value: 7, title: 'Río o Lago' },
  { value: 8, title: 'Terminal Aérea' },
  { value: 9, title: 'Terminal Camionera' },
  { value: 10, title: 'Terminal Ferrea' },
  { value: 11, title: 'Terminal Marítima' },
]

const sampleData = [
  { key: 1, value: 'Bungalows' },
  { key: 2, value: 'Cabañas' },
  { key: 3, value: 'Campamento' },
  { key: 4, value: 'Casa de Huéspedes' },
  { key: 5, value: 'Hotel' },
  { key: 6, value: 'Motel' },
  { key: 7, value: 'Suite' },
  { key: 8, value: 'Trailer Park' },
  { key: 9, value: 'Villas' },
]

const Hospedaje = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : HOSPEDAJE_INIT_DATA)

  const [checkedItems, setCheckedItems] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  })

  const handleChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    })
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallesPST: data })
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
        <Dropdown
          label="Distinción"
          name="distincionSelected"
          variant="outlined"
          value={data.distincionSelected ? data.distincionSelected : 0}
          options={distioncionData}
          onChange={onHandleChange}
        />
        <Input
          label="Porcentaje de mercado nacional"
          name="porcentajeMercadoNacional"
          type="number"
          onChange={onHandleChange}
        />
        <Input
          label="Porcentaje de mercado extranjero"
          name="porcentajeMercadoExtrenjero"
          type="number"
          onChange={onHandleChange}
        />
        <Dropdown
          label="Clasificación Obtenida"
          name="clasificacionObtenidaSelected"
          variant="outlined"
          value={
            data.clasificacionObtenidaSelected
              ? data.clasificacionObtenidaSelected
              : 0
          }
          options={scoreData}
          onChange={onHandleChange}
        />
        <Input
          label="Folio de su clasificación"
          name="folioDeClasificacion"
          onChange={onHandleChange}
        />
        <Dropdown
          label="Ubicación"
          name="ubicacionSelected"
          variant="outlined"
          value={data.ubicacionSelected ? data.ubicacionSelected : 0}
          options={ubicacionData}
          onChange={onHandleChange}
        />
      </section>
      <CheckboxForm
        title="Tipos de alojamiento"
        helperText="Selecciona los tipos de alojamiento que van de acuerdo con el servicio que ofreces"
        options={sampleData}
        checkedItems={checkedItems}
        handleChange={handleChange}
      />
      {/* TODO: Add Tipos de alojamiento CheckBox */}
      {/* TODO: Add Tipos de hospedaje CheckBox */}
      {/* TODO: Add Servicios adicionales CheckBox */}
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

export default Hospedaje
