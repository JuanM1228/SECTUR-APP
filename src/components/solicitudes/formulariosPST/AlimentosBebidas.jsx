'use client'
import React, { useState, useEffect } from 'react'

import Dropdown from '@/components/common/Dropdown'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { getSelectedValues } from '@/utils/common'
import { useHttpClient } from '@/hooks/useHttpClient'
import { INIT_ALIMENTOS_BEBIDAS, STEP_ENUM } from '@/utils/constants'

const AlimentosBebidas = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
  idSolicitud,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(INIT_ALIMENTOS_BEBIDAS)
  const [dataBackend, setDataBackend] = useState({
    subcategoriaData: [],
    tipoServicioData: [],
    espectaculoData: [],
    especialidadesData: [],
    comidaData: [],
    ubicacionData: [],
    serviciosAdicionalesData: [],
  })

  useEffect(() => {
    // if (!dataPst) return
    setData(dataPst)
    console.log('PST', dataPst)
    getDropdownsData()
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/3'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        const {
          ubicacion,
          tiposDeServicio,
          espectaculosAYB,
          especialidadesAYB,
          tiposDeComida,
          serviciosAdicionales,
          SubCategoria,
        } = res.result.data
        setDataBackend({
          subcategoriaData: SubCategoria,
          tipoServicioData: tiposDeServicio,
          espectaculoData: espectaculosAYB,
          especialidadesData: especialidadesAYB,
          comidaData: tiposDeComida,
          ubicacionData: ubicacion,
          serviciosAdicionalesData: serviciosAdicionales,
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

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
    const body = {
      detallesPST: infoObject,
      id_solicitud: idSolicitud,
      tipoPST: register.datosGenerales.tipoPST,
    }
    console.log(body)
    onUpdateDatabase(body)
  }

  if (isLoading && step === STEP_ENUM.DETALLES) {
    return <span className="loader"></span>
  }

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
          value={data?.subcategoria ? data.subcategoria : 0}
          options={dataBackend.subcategoriaData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Tipo de servicio"
          name="tipoDeServicio"
          variant="outlined"
          value={data?.tipoDeServicio ? data.tipoDeServicio : 0}
          options={dataBackend.tipoServicioData}
          onChange={onHandleChange}
        />

        <Dropdown
          label="Ubicación"
          name="ubicacion"
          variant="outlined"
          value={data?.ubicacion ? data.ubicacion : 0}
          options={dataBackend.ubicacionData}
          onChange={onHandleChange}
        />
        {/* <Dropdown
          label="Espectáculo"
          name="espectaculo"
          variant="outlined"
          value={data.espectaculo ? data.espectaculo : 0}
          options={dataBackend.espectaculoData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Especialidades"
          name="especialidades"
          variant="outlined"
          value={data.especialidades ? data.especialidades : 0}
          options={dataBackend.especialidadesData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Tipos de comida"
          name="tiposDeComida"
          variant="outlined"
          value={data.tiposDeComida ? data.tiposDeComida : 0}
          options={dataBackend.comidaData}
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
        /> */}
      </section>

      <Input
        label="Descripción de la ubicación"
        name="descripcionUbicacion"
        rows={4}
        multiline
        onChange={onHandleChange}
        value={data?.descripcionUbicacion}
      />
      {/* <section className="grid sm:grid-cols-2 gap-6">
        <CheckboxForm
          title="Servicios adicionales"
          name="serviciosAdicionalesList"
          options={dataBackend.serviciosAdicionalesData}
          checkedItems={checkedItems.serviciosAdicionalesList}
          handleChange={checkboxHandler}
        />
      </section> */}
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
