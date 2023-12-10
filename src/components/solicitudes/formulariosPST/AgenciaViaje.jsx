'use client'
import React, { useState } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'
import DatePickerCustom from '@/components/common/DatePicker'

import { INIT_AGENCIA_VIAJES, STEP_ENUM } from '@/utils/constants'
import { getSelectedValues } from '@/utils/common'

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
  const [checkedItems, setCheckedItems] = useState({
    afiliacionesList: {},
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
      afiliacionesList: getSelectedValues(checkedItems.afiliacionesList),
    }
    setRegister({ ...register, detallesPST: infoObject })
    // nextStep()
  }

  const boletajeData = [
    { value: 1, title: 'Ninguno' },
    { value: 2, title: 'Doméstico' },
    { value: 3, title: 'Internacional' },
  ]

  const afiliacionesData = [
    { key: 'id1', value: 'AMAV' },
    { key: 'id2', value: 'ASTA' },
    { key: 'id3', value: 'COTAL' },
    { key: 'id4', value: 'FUAV' },
    { key: 'id5', value: 'IATA' },
    { key: 'id6', value: 'OTURMEX' },
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
          options={boletajeData}
          onChange={onHandleChange}
        />
        <Input
          label="Nombre de notario"
          name="nombreNotario"
          onChange={onHandleChange}
          value={data.nombreNotario}
        />
        <Input
          label="Número de acta constitutiva"
          name="numeroActaConstitutiva"
          type="number"
          onChange={onHandleChange}
          value={data.numeroActaConstitutiva}
        />
        <Input
          label="Número de notaría"
          name="numeroNotaria"
          type="number"
          onChange={onHandleChange}
          value={data.numeroNotaria}
        />
        <Input
          label="Lugar de expedición"
          name="lugarExpedicion"
          onChange={onHandleChange}
          value={data.lugarExpedicion}
        />
        <DatePickerCustom
          label="Fecha de emisión del acta"
          name="fechaEmisionActa"
          onChange={onHandleChange}
          value={data.fechaEmisionActa}
        />
        <Dropdown
          label="Boletaje"
          name="boletaje"
          variant="outlined"
          value={data.boletaje ? data.boletaje : 0}
          options={boletajeData}
          onChange={onHandleChange}
        />
      </section>
      <section className="grid sm:grid-cols-2 gap-6">
        <CheckboxForm
          title="Afiliaciones"
          name="afiliacionesList"
          options={afiliacionesData}
          checkedItems={checkedItems.afiliacionesList}
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

export default AgenciaViaje
