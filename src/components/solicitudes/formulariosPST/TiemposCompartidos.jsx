'use client'
import React, { useState } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { STEP_ENUM, TIEMPOS_COMPARTIDOS_INIT_DATA } from '@/utils/constants'
import { getSelectedValues } from '@/utils/common'

const ubcacionData = [
  { value: 1, title: 'Capital del Edo.' },
  { value: 2, title: 'Cd. Colonial' },
  { value: 3, title: 'Cd. Fronteriza' },
  { value: 4, title: 'Playa Terminal Transporte' },
]

const tipoDeOperacionData = [
  { value: 1, title: 'Tiempo Compartido' },
  { value: 2, title: 'Hotel' },
  { value: 3, title: 'Mixta (T.C. y Hotel)' },
]

const serviciosData = [
  { key: 'id1', value: 'Agencia de Viajes' },
  { key: 'id2', value: 'Aire Acondicionado' },
  { key: 'id3', value: 'Alberca' },
  { key: 'id4', value: 'Antena Parabólica o Cable' },
  { key: 'id5', value: 'Área de Juegos Infantiles' },
  { key: 'id6', value: 'Arrendadora de Autos' },
  { key: 'id7', value: 'Boutique' },
  { key: 'id8', value: 'Campo de Golf' },
  { key: 'id9', value: 'Cancha de Tenis' },
  { key: 'id10', value: 'Centro Ejecutivo' },
  { key: 'id11', value: 'Chapoteadero' },
  { key: 'id12', value: 'Estacionamiento' },
  { key: 'id13', value: 'Florería' },
  { key: 'id14', value: 'Gimnasio' },
  { key: 'id15', value: 'Grupo de Animadores' },
  { key: 'id16', value: 'Marina' },
  { key: 'id17', value: 'Regalos y Tabaquería' },
  { key: 'id18', value: 'Renta de Caballos' },
  { key: 'id19', value: 'Renta de Equipo para Deportes Acuáticos' },
  { key: 'id20', value: 'Room Service' },
  { key: 'id21', value: 'Salón de Banquetes y Convenciones' },
  { key: 'id22', value: 'Salón de Belleza' },
  { key: 'id23', value: 'Servicio de Lavandería y Tintorería' },
  { key: 'id24', value: 'Servicio para Discapacitados' },
  { key: 'id25', value: 'Spa' },
  { key: 'id26', value: 'T.V.' },
]

const TiemposCompartidos = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(
    dataPst ? dataPst : TIEMPOS_COMPARTIDOS_INIT_DATA,
  )
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
          label="Ubicación"
          name="ubicacionSelected"
          variant="outlined"
          value={
            data.ubicacionSelected ? data.ubicacionSelected : 0 // TODO: default value 0 or null?
          }
          options={ubcacionData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Tipo de operación"
          name="tipoOperacionSelected"
          variant="outlined"
          value={
            data.tipoOperacionSelected ? data.tipoOperacionSelected : 0 // TODO: default value 0 or null?
          }
          options={tipoDeOperacionData}
          onChange={onHandleChange}
        />
        <Input
          label="Nombre Comercial"
          name="nombreComercial"
          onChange={onHandleChange}
          value={data.nombreComercial}
        />
        <Input
          label="Categoría"
          name="categoria"
          onChange={onHandleChange}
          value={data.categoria}
        />
        <Input
          label="Mercado Nacional"
          name="mercadoNacional"
          onChange={onHandleChange}
          value={data.mercadoNacional}
        />
        <Input
          label="Mercado Extranjero"
          name="mercadoExtranjero"
          onChange={onHandleChange}
          value={data.mercadoExtranjero}
        />
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

export default TiemposCompartidos
