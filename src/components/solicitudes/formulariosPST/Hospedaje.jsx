'use client'
import React, { useState, useEffect } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { HOSPEDAJE_INIT_DATA, STEP_ENUM } from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import { getSelectedValues } from '@/utils/common'

// TODO: Ask about key data type (string or number)
const Hospedaje = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(dataPst ? dataPst : HOSPEDAJE_INIT_DATA)
  const [dataBackend, setDataBackend] = useState({
    subcategoriaData: [],
    distioncionData: [],
    scoreData: [],
    ubicacionData: [],
    alojamientosData: [],
    hospedajesData: [],
    serviciosData: [],
  })

  useEffect(() => {
    getDropdownsData()
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/9'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        const {
          distintivos,
          clasificacion,
          tiposDeAlojamiento,
          tipoDeHotel,
          ubicaciones,
          serviciosAdicionales,
          SubCategoria,
        } = res.result.data
        setDataBackend({
          subcategoriaData: SubCategoria,
          distioncionData: distintivos,
          scoreData: clasificacion,
          ubicacionData: ubicaciones,
          alojamientosData: tiposDeAlojamiento,
          hospedajesData: tipoDeHotel,
          serviciosData: serviciosAdicionales,
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

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
        <Dropdown
          label="Subcategoría"
          name="subcategoria"
          variant="outlined"
          value={data.subcategoria ? data.subcategoria : 0}
          options={dataBackend.subcategoriaData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Distinción"
          name="distincionSelected"
          variant="outlined"
          value={data.distincionSelected ? data.distincionSelected : 0}
          options={dataBackend.distioncionData}
          onChange={onHandleChange}
        />
        <Input
          label="Porcentaje de mercado nacional"
          name="porcentajeMercadoNacional"
          type="number"
          onChange={onHandleChange}
          value={
            data.porcentajeMercadoNacional ? data.porcentajeMercadoNacional : 0
          }
        />
        <Input
          label="Porcentaje de mercado extranjero"
          name="porcentajeMercadoExtrenjero"
          type="number"
          onChange={onHandleChange}
          value={
            data.porcentajeMercadoExtrenjero
              ? data.porcentajeMercadoExtrenjero
              : 0
          }
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
          options={dataBackend.scoreData}
          onChange={onHandleChange}
        />
        <Input
          label="Folio de su clasificación"
          name="folioDeClasificacion"
          onChange={onHandleChange}
          value={data.folioDeClasificacion ? data.folioDeClasificacion : 0}
        />
        <Dropdown
          label="Ubicación"
          name="ubicacionSelected"
          variant="outlined"
          value={data.ubicacionSelected ? data.ubicacionSelected : 0}
          options={dataBackend.ubicacionData}
          onChange={onHandleChange}
        />
      </section>
      <div className="flex flex-col">
        <CheckboxForm
          title="Tipos de alojamiento"
          name="tiposDeAlojamientoList"
          options={dataBackend.alojamientosData}
          checkedItems={checkedItems.tiposDeAlojamientoList}
          handleChange={checkboxHandler}
        />
        <CheckboxForm
          title="Tipos de hospedaje"
          name="tiposDeHospedajeList"
          options={dataBackend.hospedajesData}
          checkedItems={checkedItems.tiposDeHospedajeList}
          handleChange={checkboxHandler}
        />
        <CheckboxForm
          title="Servicios adicionales"
          name="serviciosAdicionalesList"
          options={dataBackend.serviciosData}
          checkedItems={checkedItems.serviciosAdicionalesList}
          handleChange={checkboxHandler}
        />
      </div>
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
