'use client'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import { useHttpClient } from '@/hooks/useHttpClient'
import Input from '@/components/common/Input'
import { CONFIGURATIONS_APP } from '@/utils/constants'
import Cookies from 'js-cookie'

const SketchPicker = dynamic(
  () => import('react-color').then(mod => mod.SketchPicker),
  { ssr: false },
)

const Configurations = () => {
  const [color, setColor] = useState('#FFFFFF')
  const { sendRequest, isLoading } = useHttpClient()
  const [newConfiguration, setNewConfiguration] = useState({
    1: null,
    2: '',
    3: '',
    4: null,
    5: null,
    6: null,
    7: null,
    8: '',
  })
  const [director, setDirector] = useState('')
  const [configuration, setConfiguration] = useState({
    logo_path: null,
    color: null,
    nombre_director: null,
    firma_path: null,
    sello_path: null,
    fondo_path: null,
    seguridad_path: null,
    reportes_path: null,
  })
  const [token, setToken] = useState(Cookies.get('token'))

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    const url = `/api/configuration/system-theme/${token}`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        //console.log(res.result.data)
        setConfiguration(res.result.data)
        setColor(res.result.data.color)
      } else {
      }
    } catch (error) {
      //console.log('error', error)
    }
  }

  const uploadDocumentHandler = async idDocument => {
    const file = newConfiguration[idDocument]
    if (!file) return

    const formData = new FormData()
    formData.append('idDocumento', idDocument)
    formData.append('token', token)
    formData.append('file', file)

    const url = `/api/configuration/system-images`
    try {
      const res = await sendRequest(url, {
        method: 'POST',
        file: formData,
        body: {
          idDocument: idDocument,
        },
      })
      if (!res.success) return
      getInitialData()
    } catch (error) {
      //console.log('error', error)
    }
  }

  const uploadTextToDB = async idDocument => {
    const url = `/api/configuration/system-theme`
    try {
      const res = await sendRequest(url, {
        method: 'POST',
        body: {
          idDocumento: idDocument,
          token: token,
          content: newConfiguration[idDocument],
        },
      })
      if (!res.success) return
      getInitialData()
    } catch (error) {
      //console.log('error', error)
    }
  }

  const changeTextInput = (e, index) => {
    setNewConfiguration({
      ...newConfiguration,
      [index]: e.target.value,
    })
  }

  const changeHexInput = e => {
    setNewConfiguration({
      ...newConfiguration,
      [CONFIGURATIONS_APP.COLOR]: e.hex,
    })
    setColor(e.hex)
  }

  const changePhotoHanlder = (e, key) => {
    e.preventDefault()
    setNewConfiguration({ ...newConfiguration, [key]: e.target.files[0] })
  }
  //console.log(configuration)

  return (
    <div className="container w-full sm:w-1/2 font-Montserra flex flex-col gap-6 p-4">
      <h1 className="font-GMX text-3xl font-bold text-center">
        APARIENCIA Y CONFIGURACIONES
      </h1>

      <h3 className="text-2xl font-semibold">APARIENCIA DE APLICATIVO</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">LOGO</h4>
          <input
            type="file"
            className="font-Montserrat text-xs"
            onChange={e => changePhotoHanlder(e, CONFIGURATIONS_APP.LOGO)}
            accept="image/png, image/jpeg"
          />
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadDocumentHandler(CONFIGURATIONS_APP.LOGO)}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">LOGO ACTUAL</h4>
          <img
            src={`${process.env.ENV_URL}/${configuration.logo_path}`}
            alt="logo"
            className="h-32 w-full object-contain bg-corduroy"
          />
        </section>
      </div>

      <h3 className="text-2xl font-semibold">REPORTES POWER BI</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">PATH REPORTES</h4>
          <Input
            value={newConfiguration[CONFIGURATIONS_APP.REPORTES]}
            onChange={e => changeTextInput(e, CONFIGURATIONS_APP.REPORTES)}
          />
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadTextToDB(CONFIGURATIONS_APP.REPORTES)}
          />
        </section>
        <section className="flex flex-col gap-4  overflow-hidden break-words">
          <h4 className="text-base font-semibold">PATH ACTUAL</h4>
          <p className="text-ellipsis">{configuration.reportes_path}</p>
        </section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">
            COLOR DE BARRA DE NAVEGACIÓN
          </h4>
          <SketchPicker
            color={color}
            onChange={changeHexInput}
            className="self-center"
          />
          {/* <input type="color" /> */}
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadTextToDB(CONFIGURATIONS_APP.COLOR)}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">COLOR ACTUAL</h4>

          <input type="color" value={configuration.color} />
        </section>
      </div>
      <h3 className="text-2xl font-semibold">APARIENCIA DEL CERTIFICADO</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">DIRECTOR</h4>
          <Input
            value={newConfiguration[CONFIGURATIONS_APP.DIRECTOR]}
            onChange={e => changeTextInput(e, CONFIGURATIONS_APP.DIRECTOR)}
          />
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadTextToDB(CONFIGURATIONS_APP.DIRECTOR)}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">DIRECTOR ACTUAL</h4>
          <p>{configuration.nombre_director}</p>
        </section>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">FIRMA</h4>
          <input
            type="file"
            className="font-Montserrat text-xs"
            onChange={e => changePhotoHanlder(e, CONFIGURATIONS_APP.FIRMA)}
            accept="image/png, image/jpeg"
          />
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadDocumentHandler(CONFIGURATIONS_APP.FIRMA)}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">FIRMA ACTUAL</h4>
          <img
            src={`${process.env.ENV_URL}/${configuration.firma_path}`}
            alt="logo"
            className="h-32 w-full object-contain"
          />
        </section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">SELLO</h4>
          <input
            type="file"
            className="font-Montserrat text-xs"
            onChange={e => changePhotoHanlder(e, CONFIGURATIONS_APP.SELLO)}
            accept="image/png, image/jpeg"
          />
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadDocumentHandler(CONFIGURATIONS_APP.SELLO)}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">SELLO ACTUAL</h4>
          <img
            src={`${process.env.ENV_URL}/${configuration.sello_path}`}
            alt="logo"
            className="h-32 w-full object-contain"
          />
        </section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">FONDO</h4>
          <input
            type="file"
            className="font-Montserrat text-xs"
            onChange={e => changePhotoHanlder(e, CONFIGURATIONS_APP.FONDO)}
            accept="image/png, image/jpeg"
          />
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadDocumentHandler(CONFIGURATIONS_APP.FONDO)}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">FONDO ACTUAL</h4>
          <img
            src={`${process.env.ENV_URL}/${configuration.fondo_path}`}
            alt="logo"
            className="h-32 w-full object-contain"
          />
        </section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 pb-4 gap-10 border-b-[1px]  border-b-gray">
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">ELEMENTO DE SEGURIDAD</h4>
          <input
            type="file"
            className="font-Montserrat text-xs"
            onChange={e => changePhotoHanlder(e, CONFIGURATIONS_APP.SEGURIDAD)}
            accept="image/png, image/jpeg"
          />
          <Button
            content="ACTUALIZAR CAMPO"
            onClick={() => uploadDocumentHandler(CONFIGURATIONS_APP.SEGURIDAD)}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h4 className="text-base font-semibold">
            ELEMENTO DE SEGURIDAD ACTUAL
          </h4>
          <img
            src={`${process.env.ENV_URL}/${configuration.seguridad_path}`}
            alt="logo"
            className="h-32 w-full object-contain"
          />
        </section>
      </div>
    </div>
  )
}

export default Configurations
