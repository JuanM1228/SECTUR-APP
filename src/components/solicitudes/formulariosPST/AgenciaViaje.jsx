'use client'
import React, { useState, useEffect } from 'react'

import CheckboxForm from '@/components/common/CheckboxForm'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'

import { getSelectedValues } from '@/utils/common'
import { useHttpClient } from '@/hooks/useHttpClient'
import { INIT_AGENCIA_VIAJES, STEP_ENUM } from '@/utils/constants'

const AgenciaViaje = ({
  step,
  dataPst,
  nextStep,
  backStep,
  register,
  setRegister,
  idSolicitud,
}) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [data, setData] = useState(INIT_AGENCIA_VIAJES)
  const [error, setError] = useState(INIT_AGENCIA_VIAJES)
  const [dataBackend, setDataBackend] = useState({
    afiliacionesData: [],
    boletajeData: [],
    subcategoriaData: [],
  })
  const [checkedItems, setCheckedItems] = useState({
    afiliacionesList: {},
  })

  useEffect(() => {
    getDropdownsData()
    if (!dataPst) return
    setData(dataPst)
    //console.log('PST', dataPst)
    if (dataPst.afiliaciones.length !== 0) {
      const objectAfiliaciones = {}
      for (let index = 0; index < dataPst.afiliaciones.length; index++) {
        objectAfiliaciones[dataPst.afiliaciones[index]] = true
      }
      setCheckedItems({ afiliacionesList: objectAfiliaciones })
    }
  }, [])

  const getDropdownsData = async () => {
    const url = '/api/configuration/catalogo-detalle-pst/1'
    try {
      const res = await sendRequest(url)
      //console.log(res)
      if (res.success) {
        const { afiliacion, tipoBoletaje, SubCategoria } = res.result.data
        setDataBackend({
          afiliacionesData: afiliacion,
          boletajeData: tipoBoletaje,
          subcategoriaData: SubCategoria,
        })
      }
    } catch (error) {
      //console.log('error', error)
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
      //console.log(e)
    }
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const infoObject = {
      ...data,
      afiliacionesList: getSelectedValues(checkedItems.afiliacionesList),
    }
    setData(infoObject)
    setRegister({ ...register, detallesPST: infoObject })
    const body = {
      detallesPST: infoObject,
      id_solicitud: idSolicitud,
      tipoPST: register.datosGenerales.tipoPST,
    }
    //console.log(body)
    if (data.subcategoria && infoObject.afiliacionesList.length > 0) {
      onUpdateDatabase(body)
    }
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
      <h1 className="font-GMX font-bold text-2xl">
        Detalle de Prestador de Servicios Turísticos
      </h1>
      <section className="grid sm:grid-cols-2 gap-6">
        <Dropdown
          label="Subcategoría"
          name="subcategoria"
          variant="outlined"
          value={data.subcategoria ? data.subcategoria : 0}
          error={data.subcategoria ? false : true}
          options={dataBackend.subcategoriaData}
          helpText={
            data.subcategoria
              ? ''
              : 'Seleccione una subcategoria para continuar'
          }
          onChange={onHandleChange}
        />
        {/* <Input
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
          options={dataBackend.boletajeData}
          onChange={onHandleChange}
        /> */}
      </section>
      <section className="grid sm:grid-cols-2 gap-6">
        <CheckboxForm
          title="Afiliaciones"
          name="afiliacionesList"
          options={dataBackend.afiliacionesData}
          checkedItems={checkedItems.afiliacionesList}
          handleChange={checkboxHandler}
          helperText={'Seleccione almenos una opcion para continuar'}
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
