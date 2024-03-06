'use client'
import React, { useState, useEffect } from 'react'

import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'

import { STEP_ENUM, TIEMPOS_COMPARTIDOS_INIT_DATA } from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import { getSelectedValues } from '@/utils/common'

const TiemposCompartidos = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
  idSolicitud,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(TIEMPOS_COMPARTIDOS_INIT_DATA)
  const [checkedItems, setCheckedItems] = useState({
    serviciosAdicionalesList: {},
  })
  const [dataBackend, setDataBackend] = useState({
    ubcacionData: [],
    tipoDeOperacionData: [],
    serviciosData: [],
  })

  useEffect(() => {
    // if (!dataPst) return
    setData(dataPst)
    console.log('PST', dataPst)
    getDropdownsData()
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/15'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        const { serviciosAdicionales, ubicacion, tipoDeOperacion } =
          res.result.data
        setDataBackend({
          ubcacionData: ubicacion,
          tipoDeOperacionData: tipoDeOperacion,
          serviciosData: serviciosAdicionales,
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

  const onUpdateDatabase = async body => {
    try {
      const url = '/api/registro/solicitud'
      const res = await sendRequest(url, {
        method: 'POST',
        body: body,
      })
      if (res.success) {
        nextStep()
      }
    } catch (e) {
      console.log(e)
    }
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
    const body = {
      detallesPST: infoObject,
      id_solicitud: idSolicitud,
      tipoPST: register.datosGenerales.tipoPST,
    }
    console.log(body)
    if (data?.tipoOperacionSelected) {
      onUpdateDatabase(body)
    }
  }

  // TODO: Añadir validación de porcentajes (0 a 100%)

  if (isLoading && step === STEP_ENUM.DETALLES) {
    return <span className="loader"></span>
  }

  return (
    <form
      className={`container-form-solicitud t-ease ${
        step === STEP_ENUM.DETALLES ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">
        Detalle de Prestador de Servicios Turísticos
      </h1>
      <section className="grid sm:grid-cols-2 gap-6">
        {/* <Dropdown
          label="Ubicación"
          name="ubicacionSelected"
          variant="outlined"
          value={
            data.ubicacionSelected ? data.ubicacionSelected : 0 // TODO: default value 0 or null?
          }
          options={dataBackend.ubcacionData}
          onChange={onHandleChange}
        /> */}
        <Dropdown
          label="Tipo de operación"
          name="tipoOperacionSelected"
          variant="outlined"
          value={
            data?.tipoOperacionSelected ? data.tipoOperacionSelected : 0 // TODO: default value 0 or null?
          }
          options={dataBackend.tipoDeOperacionData}
          onChange={onHandleChange}
          error={data?.tipoOperacionSelected ? false : true}
          helpText={
            data?.tipoOperacionSelected
              ? ''
              : 'Seleccione un tipo de operacion para continuar'
          }
        />
        {/* <Input
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
        /> */}
      </section>

      {/* <CheckboxForm
        title="Servicios adicionales"
        name="serviciosAdicionalesList"
        options={dataBackend.serviciosData}
        checkedItems={checkedItems.serviciosAdicionalesList}
        handleChange={checkboxHandler}
      /> */}

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
