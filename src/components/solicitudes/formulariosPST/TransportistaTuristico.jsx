'use client'
import React, { useState, useEffect } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { useHttpClient } from '@/hooks/useHttpClient'
import { STEP_ENUM, TRANSPORTISTA_TURISTICO_INIT_DATA } from '@/utils/constants'

const TransportistaTuristico = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(
    dataPst ? dataPst : TRANSPORTISTA_TURISTICO_INIT_DATA,
  )
  const [dataBackend, setDataBackend] = useState({
    subcategoriaData: [],
    tipoServicioData: [],
    tiposDeEstablecimientosData: [],
  })

  useEffect(() => {
    getDropdownsData()
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/17'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        const { tiposDeEstablecimientos, serviciosOfrecidos, SubCategoria } =
          res.result.data
        setDataBackend({
          subcategoriaData: SubCategoria,
          tipoServicioData: serviciosOfrecidos,
          tiposDeEstablecimientosData: tiposDeEstablecimientos,
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setRegister({ ...register, detallesPST: data })
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
        {/* <Dropdown
          label="Tipo de establecimiento"
          name="tipoEstablecimientoSelected"
          variant="outlined"
          value={
            data.tipoEstablecimientoSelected
              ? data.tipoEstablecimientoSelected
              : 0 // TODO: default value 0 or null?
          }
          options={dataBackend.tiposDeEstablecimientosData}
          onChange={onHandleChange}
        />
        <Dropdown
          label="Servicio ofrecido"
          name="tipoServicioSelected"
          variant="outlined"
          value={
            data.tipoServicioSelected ? data.tipoServicioSelected : 0 // TODO: default value 0 or null?
          }
          options={dataBackend.tipoServicioData}
          onChange={onHandleChange}
        />
        <Input
          label="Numero de sucurales"
          type="number"
          name="numSucursales"
          onChange={onHandleChange}
          value={data.numSucursales}
        />
        <Input
          label="Categoría"
          name="categoria"
          onChange={onHandleChange}
          value={data.categoria}
        />
        <Input
          label="Nombre de la matriz"
          name="nombreMatriz"
          onChange={onHandleChange}
          value={data.nombreMatriz}
        />
        <Input
          label="Dirección de la matriz"
          name="direcionMatriz"
          onChange={onHandleChange}
          value={data.direcionMatriz}
        />
        <Input
          label="Número de guías"
          type="number"
          name="numDeGuias"
          onChange={onHandleChange}
          value={data.numDeGuias}
        /> */}
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

export default TransportistaTuristico
