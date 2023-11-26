'use client'
import React from 'react'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import Input from '../common/Input'
import Dropdown from '../common/Dropdown'
import Accordion from '../common/Accordion'
import 'leaflet/dist/leaflet.css'
import Icons from '@/assets/icons'
import 'leaflet/dist/leaflet.css'
const Domicilio = () => {
  return (
    <Accordion
      title="DOMICILIO"
      icon={Icons.ExpandMore}
      classNameAccordion="bg-merinoTransparent w-full max-w-6xl"
      classNameDetails="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Código postal *" />
        <Dropdown label="Estado *" variant="outlined" />
        <Dropdown label="Municipio *" variant="outlined" />
        <Input label="Colonia *" />
        <Input label="Calle y número *" />
      </div>

      <h1 className="md:col-span-2 font-GMX font-bold">
        COLOCA TU UBICACIÓN EN EL MAPA
      </h1>
      {/* <MapContainer
        center={[19.42847, -99.12766]}
        zoom={13}
        className="sm:col-span-2 w-full h-[500px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[19.42847, -99.12766]}></Marker>
      </MapContainer> */}
    </Accordion>
  )
}

export default Domicilio
