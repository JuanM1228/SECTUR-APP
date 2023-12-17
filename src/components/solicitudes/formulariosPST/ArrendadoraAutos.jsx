'use client'
import React, { useState, useEffect } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { useHttpClient } from '@/hooks/useHttpClient'
import { INIT_ARRENDADORA_AUTOS, STEP_ENUM } from '@/utils/constants'

const ArrendadoraAutos = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(dataPst ? dataPst : INIT_ARRENDADORA_AUTOS)
  const [tiposDeEstablecimientosData, setTiposDeEstablecimientosData] =
    useState([])

  useEffect(() => {
    getDropdownsData()
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/4'
    try {
      const res = await sendRequest(url)
      if (res.success) {
        const { tiposDeEstablecimientos } = res.result.data
        setTiposDeEstablecimientosData(tiposDeEstablecimientos)
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
    nextStep()
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
          label="Tipo de establecimiento"
          name="tipoEstablecimiento"
          variant="outlined"
          value={data.tipoEstablecimiento ? data.tipoEstablecimiento : 0}
          options={tiposDeEstablecimientosData}
          onChange={onHandleChange}
        />

        <Input
          label="Nombre de la Matriz"
          name="nombreMatriz"
          onChange={onHandleChange}
          value={data.nombreMatriz}
        />

        <Input
          label="Domicilio"
          name="domicilio"
          onChange={onHandleChange}
          value={data.domicilio}
        />

        <Input
          label="Número de sucursales"
          name="numeroSucursales"
          type="number"
          onChange={onHandleChange}
          value={data.numeroSucursales}
        />

        <Input
          label="Captación nacional %"
          name="captacionNacional"
          type="number"
          onChange={onHandleChange}
          value={data.captacionNacional}
        />

        <Input
          label="Captación extrangero %"
          name="captacionExtrangero"
          type="number"
          onChange={onHandleChange}
          value={data.captacionExtrangero}
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

export default ArrendadoraAutos
