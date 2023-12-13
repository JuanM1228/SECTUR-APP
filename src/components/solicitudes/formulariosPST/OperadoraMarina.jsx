'use client'
import React, { useState, useEffect } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { OPERADORA_MARINA_INIT_DATA, STEP_ENUM } from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import { getSelectedValues } from '@/utils/common'

const OperadoraMarina = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(
    dataPst ? dataPst : OPERADORA_MARINA_INIT_DATA,
  )
  const [dataBackend, setDataBackend] = useState({
    espacioDeFondoData: [],
    espacioDeAtraqueData: [],
    serviciosAdicionalesData: [],
    instalacionesOfrecidasData: [],
  })

  const [checkedItems, setCheckedItems] = useState({
    serviciosAdicionalesList: {},
    instalacionesList: {},
  })

  useEffect(() => {
    getDropdownsData()
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/12'
    try {
      const res = await sendRequest(url)
      console.log(res)
      if (res.success) {
        const {
          serviciosAdicionales,
          espacioDeFondo,
          espacioDeAtraque,
          instalacionesOfrecidas,
        } = res.result.data
        setDataBackend({
          espacioDeFondoData: espacioDeFondo,
          espacioDeAtraqueData: espacioDeAtraque,
          serviciosAdicionalesData: serviciosAdicionales,
          instalacionesOfrecidasData: instalacionesOfrecidas,
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

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
      className={`container-form-solicitud t-ease ${
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
          options={dataBackend.espacioDeAtraqueData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Número de espacios de fondo"
          name="espaciosFondoSelected"
          variant="outlined"
          value={
            data.espaciosFondoSelected ? data.espaciosFondoSelected : 0 // TODO: default value 0 or null?
          }
          options={dataBackend.espacioDeFondoData}
          onChange={onHandleChange}
        />
      </section>
      <section className="flex flex-col">
        <CheckboxForm
          title="Instalaciones ofrecidas"
          name="instalacionesList"
          options={dataBackend.instalacionesOfrecidasData}
          checkedItems={checkedItems.instalacionesList}
          handleChange={checkboxHandler}
        />
        <CheckboxForm
          title="Servicios adicionales"
          name="serviciosAdicionalesList"
          options={dataBackend.serviciosAdicionalesData}
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
