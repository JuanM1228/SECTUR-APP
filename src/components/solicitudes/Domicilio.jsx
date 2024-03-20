'use client'
import React, { useState, useEffect } from 'react'

import { Icon } from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  LayerGroup,
  LayersControl,
} from 'react-leaflet'

import Button from '../common/Button'
import Input from '../common/Input'
import Dropdown from '../common/Dropdown'

import { INIT_DATA_DOMICILIO, STEP_ENUM } from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import { validate } from '@/utils/validation'
import { useAuthStore } from '@/store/auth'
import 'leaflet/dist/leaflet.css'
import '@/styles/leaflet.css'

const Domicilio = ({
  step,
  dataDomicilio,
  nextStep,
  backStep,
  register,
  setRegister,
  idSolicitud,
  coloniaActual,
  setColoniaActual,
}) => {
  const [data, setData] = useState(INIT_DATA_DOMICILIO)
  const [colonias, setColonias] = useState([])
  const [error, setError] = useState(INIT_DATA_DOMICILIO)
  const { sendRequest, isLoading } = useHttpClient()
  const [coordenadas, setCoordenadas] = useState(null)
  const { profile } = useAuthStore()

  useEffect(() => {
    if (!dataDomicilio) return
    setData(dataDomicilio)
    if (data.codigoPostal && data.codigoPostal) {
      locationHandler(data.codigoPostal)
    }
  }, [dataDomicilio, step])

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

  const SetViewOnClick = ({ coords }) => {
    const map = useMap()
    map.setView(coords, map.getZoom())
    map.flyTo({ lat: coords[0], lng: coords[1] }, 15)
    return null
  }

  const locationHandler = async () => {
    try {
      const url = '/api/address/colonias'
      const res = await sendRequest(url, {
        method: 'POST',
        body: { codigo: data.codigoPostal, id_user: profile.id },
      })
      if (res.success) {
        const info = res.result.data
        setData({
          ...data,
          estado: info.estado,
          municipio: info.municipio,
          idEstado: info.id_estado,
          idMunicipio: info.id_municipio,
        })
        setColonias(info.colonias)
        setCoordenadas([info.lat, info.lon])
      }
    } catch (e) {
      //console.log(e)
    }
  }

  const onHandleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
    if (name === 'colonia') {
      const objectColonia = colonias.find(colonia => colonia.value === value)
      //console.log(objectColonia.title)
      setColoniaActual(objectColonia.title)
    }
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
    const { hasError, errors } = validate.domicilioForm(data)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_DATA_DOMICILIO)
      setRegister({ ...register, domicilio: data })
      const body = {
        domicilio: data,
        id_solicitud: idSolicitud,
      }
      //console.log(body)
      onUpdateDatabase(body)
    }
  }

  if (isLoading && step === STEP_ENUM.DOMICILIO) {
    return <span className="loader mt-20"></span>
  }

  return (
    <form
      className={`container-form-solicitud t-ease ${
        step === STEP_ENUM.DOMICILIO ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DOMICILIO</h1>

      <section className="flex flex-wrap sm:flex-nowrap gap-4">
        <Input
          label="Código postal *"
          type="number"
          maxLength={5}
          name="codigoPostal"
          value={data.codigoPostal}
          error={Boolean(error.codigoPostal)}
          helpText={error.codigoPostal}
          onChange={onHandleChange}
        />

        <Button
          content="Buscar"
          type="button"
          className=" w-full sm:w-auto shrink"
          onClick={locationHandler}
        />
      </section>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input label="Estado" value={data.estado} disabled />

        <Input label="Municipio" value={data.municipio} disabled />

        <Dropdown
          label="Colonia *"
          name="colonia"
          variant="outlined"
          value={data.colonia ? data.colonia : 0}
          options={colonias}
          error={Boolean(error.colonia)}
          helpText={error.colonia}
          onChange={onHandleChange}
        />

        <Input
          label="Calle *"
          name="calle"
          error={error.calle !== ''}
          helpText={error.calle}
          onChange={onHandleChange}
          value={data.calle}
        />
        <Input
          label="Número exterior *"
          name="numExterior"
          error={Boolean(error.numExterior)}
          helpText={error.numExterior}
          onChange={onHandleChange}
          value={data.numExterior}
        />
        <Input
          label="Número interior"
          name="numInterior"
          error={Boolean(error.numInterior)}
          onChange={onHandleChange}
          value={data.numInterior}
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

        <Button
          content="Quitar pin"
          type="button"
          className=" w-full sm:w-auto shrink"
          onClick={() => setData({ ...data, latitud: null, longitud: null })}
        />
      </section>

      <MapContainer
        center={
          data.latitud
            ? [data.latitud, data.longitud]
            : coordenadas
            ? coordenadas
            : [19.42847, -99.12766]
        }
        zoom={13}
        className="sm:col-span-2 w-full h-[500px] bg-bigDipORuby">
        <LayersControl>
          <LayersControl.BaseLayer name="Google Map Satélite">
            <LayerGroup>
              <TileLayer
                attribution="Google Maps Satellite"
                url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}&poi=false"
              />
              <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}&poi=false" />
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Google Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
              //attribution="Google Maps"
              //url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}&poi=false"
            />
          </LayersControl.BaseLayer>
          {/*  <LayersControl.BaseLayer name="Google Map etiquetas">
            <LayerGroup>
              <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}&poi=false"
              />
            </LayerGroup>
          </LayersControl.BaseLayer>*/}
        </LayersControl>
        {data.latitud && data.longitud && (
          <Marker
            position={[data.latitud, data.longitud]}
            icon={myIcon}
            alt="location"></Marker>
        )}
        <LocationMap />
        <SetViewOnClick
          coords={
            data.latitud
              ? [data.latitud, data.longitud]
              : coordenadas
              ? coordenadas
              : [19.42847, -99.12766]
          }
        />
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
