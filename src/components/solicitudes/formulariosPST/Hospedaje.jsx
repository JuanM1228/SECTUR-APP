'use client'
import React, { useState } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { HOSPEDAJE_INIT_DATA, STEP_ENUM } from '@/utils/constants'
import { getSelectedValues } from '@/utils/common'

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

// TODO: Ask about key data type (string or number)
const alojamientosData = [
  { key: 'id1', value: 'Bungalows' },
  { key: 'id2', value: 'Cabañas' },
  { key: 'id3', value: 'Campamento' },
  { key: 'id4', value: 'Casa de Huéspedes' },
  { key: 'id5', value: 'Hotel' },
  { key: 'id6', value: 'Motel' },
  { key: 'id7', value: 'Suite' },
  { key: 'id8', value: 'Trailer Park' },
  { key: 'id9', value: 'Villas' },
]
const hospedajesData = [
  { key: 'id1', value: 'Negocios' },
  { key: 'id2', value: 'Tránsito' },
  { key: 'id3', value: 'Vacacional' },
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

// TODO: Delete this comment
// crea elementos siguiendo la estructura de alojamientosData, pero cambia las propiedades value por estas:AGENCIA DE VIAJES,AIRE ACONDICIONADO,ALBERCA,ANTENA PARABÓLICA O CABLE,ÁREA DE JUEGOS INFANTILES,ARRENDADORA DE AUTOS,BOUTIQUE,CAMPO DE GOLF,CANCHA DE TENIS,CENTRO EJECUTIVO,CHAPOTEADERO,ESTACIONAMIENTO,FLORERÍA,GIMNASIO,GRUPO DE ANIMADORES,MARINA,REGALOS Y TABAQUERÍA,RENTA DE CABALLOS,RENTA DE EQUIPO PARA DEPORTES ACUÁTICOS,ROOM SERVICE,SALÓN DE BANQUETES Y CONVENCIONES,SALÓN DE BELLEZA,SERVICIO DE LAVANDERÍA Y TINTORERÍA,SERVICIO PARA DISCAPACITADOS,SPA,T.V., Adicionalmente pon todo en minúsuclas excepto en cosas que requieren mayúscula, o sea, cuida la redacción.

const Hospedaje = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(dataPst ? dataPst : HOSPEDAJE_INIT_DATA)

  const [checkedItems, setCheckedItems] = useState({
    tiposDeAlojamientoList: {},
    tiposDeHospedajeList: {},
    serviciosAdicionalesList: {},
  })

  const checkboxHandler = (event, name) => {
    setCheckedItems({
      ...checkedItems,
      [name]: {
        ...checkedItems[name],
        [event.target.name]: event.target.checked,
      },
    })
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const infoObject = {
      ...data,
      tiposDeAlojamientoList: getSelectedValues(
        checkedItems.tiposDeAlojamientoList,
      ),
      tiposDeHospedajeList: getSelectedValues(
        checkedItems.tiposDeHospedajeList,
      ),
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
        <CheckboxForm
          title="Tipos de alojamiento"
          name="tiposDeAlojamientoList"
          options={alojamientosData}
          checkedItems={checkedItems.tiposDeAlojamientoList}
          handleChange={checkboxHandler}
        />
        <CheckboxForm
          title="Tipos de hospedaje"
          name="tiposDeHospedajeList"
          options={hospedajesData}
          checkedItems={checkedItems.tiposDeHospedajeList}
          handleChange={checkboxHandler}
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

export default Hospedaje
