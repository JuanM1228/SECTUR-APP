'use client'
import React, { useState } from 'react'

import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

import Button from '../common/Button'
import Input from '../common/Input'
import Dropdown from '../common/Dropdown'

import { INIT_DATA_DOMICILIO, STEP_ENUM } from '@/utils/constants'
import { validate } from '@/utils/validation'
import 'leaflet/dist/leaflet.css'

const Domicilio = ({
  step,
  dataDomicilio,
  nextStep,
  backStep,
  register,
  setRegister,
}) => {
  const [data, setData] = useState(
    dataDomicilio ? dataDomicilio : INIT_DATA_DOMICILIO,
  )

  const [error, setError] = useState(INIT_DATA_DOMICILIO)
  const myIcon = new Icon({
    iconUrl: '/location.png',
    iconSize: [25, 35],
  })

  const LocationMap = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setData({ ...data, latitud: lat, longitud: lng })
      },
    })
    return null
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const { hasError, errors } = validate.domicilioForm(data)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_DATA_DOMICILIO)
      setRegister({ ...register, domicilio: data })
      nextStep()
    }
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]
  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === STEP_ENUM.DOMICILIO ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DOMICILIO</h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Código postal *"
          name="codigoPostal"
          error={Boolean(error.codigoPostal)}
          helpText={error.codigoPostal}
          onChange={onHandleChange}
        />

        <Input label="Estado" disabled />

        <Input label="Municipio" disabled />

        <Dropdown
          label="Colonia *"
          name="colonia"
          variant="outlined"
          value={data.colonia ? data.colonia : 0}
          options={testData}
          error={Boolean(error.colonia)}
          helpText={error.colonia}
          onChange={onHandleChange}
        />

        <Input
          label="Calle y número *"
          name="calle"
          error={error.calle !== ''}
          helpText={error.calle}
          onChange={onHandleChange}
        />
      </div>

      <section className="flex justify-between flex-wrap gap-6">
        <h1 className="md:col-span-2 font-GMX font-bold">
          COLOCA TU UBICACIÓN EN EL MAPA
        </h1>

        {error.latitud && (
          <h1 className="md:col-span-2 font-GMX font-bold text-error">
            HAZ CLICK EN EL MAPA PARA SELECCIONAR UNA UBICACIÓN
          </h1>
        )}
      </section>

      <MapContainer
        center={
          data.latitud ? [data.latitud, data.longitud] : [19.42847, -99.12766]
        }
        zoom={13}
        className="sm:col-span-2 w-full h-[500px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.latitud && (
          <Marker
            position={[data.latitud, data.longitud]}
            icon={myIcon}
            alt="location"></Marker>
        )}
        <LocationMap />
      </MapContainer>

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

export default Domicilio
