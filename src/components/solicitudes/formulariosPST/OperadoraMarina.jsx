'use client'
import React, { useState } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { OPERADORA_MARINA_INIT_DATA, STEP_ENUM } from '@/utils/constants'
import { getSelectedValues } from '@/utils/common'

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

const serviciosData = [
  { key: 'id1', value: 'Hotel' },
  { key: 'id2', value: 'Locales' },
  { key: 'id3', value: 'Restaurante' },
  { key: 'id4', value: 'Supermecado' },
]

const instalacionesData = [
  { key: 'id1', value: 'Agua potable' },
  { key: 'id2', value: 'Alumbrado general' },
  { key: 'id3', value: 'Eliminación de aguas residuales' },
  { key: 'id4', value: 'Equipo contra incendio' },
  { key: 'id5', value: 'Radiocomunicación' },
  { key: 'id6', value: 'Rampa para barda y botadura' },
  { key: 'id7', value: 'Recolección de basura y desechos' },
  { key: 'id8', value: 'Sanitario' },
  { key: 'id9', value: 'Señales de entrada y salida' },
  { key: 'id10', value: 'Suministro de combustible y lubricantes' },
  { key: 'id11', value: 'Suministro de energía eléctrica' },
  { key: 'id12', value: 'Taller de mantenimiento' },
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

  const [checkedItems, setCheckedItems] = useState({
    serviciosAdicionalesList: {},
    instalacionesList: {},
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
      instalacionesList: getSelectedValues(checkedItems.instalacionesList),
    }
    setRegister({ ...register, detallesPST: infoObject })
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
        <Input
          label="Superficie terrestre (metros)"
          name="superficieTerrestre"
          type="number"
          onChange={onHandleChange}
          value={data.superficieTerrestre}
        />
        <Input
          label="Superficie total (metros)"
          name="superficieTotal"
          type="number"
          onChange={onHandleChange}
          value={data.superficieTotal}
        />
        <Input
          label="Superficie acuática (metros)"
          name="superficieAcuatica"
          type="number"
          onChange={onHandleChange}
          value={data.superficieAcuatica}
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
      <section className="grid sm:grid-cols-2 gap-6">
        <CheckboxForm
          title="Instalaciones ofrecidas"
          name="instalacionesList"
          options={instalacionesData}
          checkedItems={checkedItems.instalacionesList}
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

export default OperadoraMarina
