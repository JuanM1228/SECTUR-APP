'use client'
import React, { useState } from 'react'

import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

import Input from '../common/Input'
import Dropdown from '../common/Dropdown'

import { INIT_DATA_DOMICILIO } from '@/utils/constants'

import Images from '@/assets/images'
import 'leaflet/dist/leaflet.css'

const Domicilio = ({ step, dataDomicilio, nextStep }) => {
  const [data, setData] = useState(
    dataDomicilio ? dataDomicilio : INIT_DATA_DOMICILIO,
  )
  console.log(data)

  const [error, setError] = useState(INIT_DATA_DOMICILIO)

  const myIcon = new Icon({
    iconUrl: '/location.png',
    iconSize: [25, 35],
  })

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng)
        const { lat, lng } = e.latlng

        setData({ ...data, latitud: lat, longitud: lng })
      },
    })
    return null
  }

  const testData = [
    { value: 1, title: 'test1' },
    { value: 2, title: 'test2' },
    { value: 3, title: 'test3' },
  ]
  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === 1 ? '' : 'hide'
      }`}>
      <h1 className="font-GMX font-bold text-2xl">DOMICILIO</h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input label="Código postal *" />
        <Input label="Estado" disabled />
        <Input label="Municipio" disabled />
        <Dropdown label="Colonia *" variant="outlined" />

        <Input label="Calle y número *" />
      </div>

      <h1 className="md:col-span-2 font-GMX font-bold">
        COLOCA TU UBICACIÓN EN EL MAPA
      </h1>

      <MapContainer
        center={[19.42847, -99.12766]}
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
        <LocationFinderDummy />
      </MapContainer>
    </form>
  )
}

export default Domicilio
