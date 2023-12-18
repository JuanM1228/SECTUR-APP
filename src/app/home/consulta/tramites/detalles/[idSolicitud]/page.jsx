'use client'
import React, { useState, useEffect } from 'react'
import { useHttpClient } from '@/hooks/useHttpClient'
import { produce } from 'immer'
import { useAuthStore } from '@/store/auth'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Icons from '@/assets/icons'
import Button from '@/components/common/Button'
import { ROLE_ENUM } from '@/utils/constants'

const dummy = {
  // Datos Generales
  numeroDeTramite: '1234567890',
  tipoDeTramite: 'Inscripción',
  tipoDePST: 'Hospedaje',
  nombreComercial: 'Hotel de la Selva',
  RFC: 'HOS-123456-ABC',
  // registroAnterior: 'HOS-123456-ABC', // TODO: Preguntar sobre este dato
  procedenciaTramite: 'Nuevo', // Inscripción, renovación
  RNTFolio: '1234567890', // TODO: Preguntar sobre este dato // Folio certificado de registro
  razonSocial: 'Hotel de la Selva S.A. de C.V.',
  CURP: 'HOS-123456-ABC',
  registroINEGI: 'HOS-123456-ABC',
  estadoDeTramite: 'En proceso', // TODO: Incompleto, en revisión, aceptado, rechazado, revocado
  motivoDelRechazo: '',
  // Domicilio
  calle: 'Calle 1',
  colonia: 'Jardines del Sur',
  municipio: 'Benito Juárez',
  estado: 'Quintana Roo',
  codigoPostal: '77500',
  latitud: '21.161908',
  longitud: '-86.851528',
  // Contacto
  telefono: '9981234567',
  celular: '9981234567', // TODO: Quitar fax del frontend y backend
  email: 'example@test.com',
  web: 'www.hotel.com',
  x: 'hotelejemplo', // TODO: Agregar x al backend
  facebook: 'hotelejemplo',
  tiktok: 'hotelejemplo', // TODO: Agregar tiktok al backend
  instagram: 'hotelejemplo', // TODO: Agregar instagran al backend
  // Información legal
  nombrePropietario: 'Roberto Pérez',
  nombreRepresentanteLegal: 'Roberto Pérez',
  nombreDelSoliciante: 'Roberto Pérez',
  puestoDelSolicitante: 'Laura Pérez',
  fechaDeSolicitud: '2021-10-10',
  fechaIngreso: '2021-10-10',
  // tipoDeInmueble: 1, // TODO: Propio o rentado
  // numeroDeEscritura: '1234567890',
  // vigenciaDelContrato: '2021-10-10',
  // numRegistroDeLaPropiedad: '1234567890',
  // observaciones: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
}

const initialState = {
  // Datos Generales
  tipoPST: null,
  nombreComercial: '',
  rfc: '',
  registroINEGI: '',
  registroAnterior: '',
  razonSocial: '',
  curp: '',
  // Domicilio
  codigoPostal: '',
  estado: '',
  municipio: '',
  colonia: '',
  calle: '',
  latitud: '',
  longitud: '',
  // Contacto
  telefono: '',
  email: '',
  celular: '',
  web: '',
  facebook: '',
  x: '',
  fax: '',
  //Información legal
  nombreDelPropietario: '',
  representanteLegal: '',
  nombreDelSolicitante: '',
  puestoDelSolicitante: '',
  fechaIngresoSECTUR: '',
  tipoDeInmueble: null,
  numEscritura: '',
  numeroDeRegistro: '',
  observaciones: '',
}

const ACTION = {
  EDIT: 'EDIT',
  REJECT: 'REJECT',
  APPROVE: 'APPROVE',
}

const DetallesDeSolicitud = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const { profile } = useAuthStore()
  const [data, setData] = useState(initialState)
  const [modal, setModal] = useState({
    show: false,
    title: '',
    content: '',
    action: null,
  })
  console.log('myData', data)

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    const url = `http://34.29.98.230:3002/api/registro/detalle-tramite/256`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      const { datosGenerales, domicilio, contacto, informacionLegal } =
        res.result.data
      setData({
        // Datos Generales
        tipoPST: datosGenerales.tipoPST,
        nombreComercial: datosGenerales.nombreComercial,
        rfc: datosGenerales.rfc,
        registroINEGI: datosGenerales.registroINEGI,
        registroAnterior: datosGenerales.registroAnterior,
        razonSocial: datosGenerales.razonSocial,
        curp: datosGenerales.curp,
        // Domicilio
        codigoPostal: domicilio.codigoPostal,
        estado: domicilio.estado,
        municipio: domicilio.municipio,
        colonia: domicilio.colonia,
        calle: domicilio.calle,
        latitud: domicilio.latitud,
        longitud: domicilio.longitud,
        // Contacto
        telefono: contacto.telefono,
        email: contacto.email,
        celular: contacto.celular,
        web: contacto.web,
        facebook: contacto.facebook,
        x: contacto.x,
        fax: contacto.fax,
        //Información legal
        nombreDelPropietario: informacionLegal.nombreDelPropietario,
        representanteLegal: informacionLegal.nombreRepresentanteLegal,
        nombreDelSolicitante: informacionLegal.nombreDelSoliciante,
        puestoDelSolicitante: informacionLegal.puestoDelSolicitante,
        fechaIngresoSECTUR: informacionLegal.fechaIngreso,
        tipoDeInmueble: informacionLegal.tipoDeInmueble,
        numEscritura: informacionLegal.numeroDeEscritura,
        numeroDeRegistro: informacionLegal.numRegistroDeLaPropiedad,
        observaciones: informacionLegal.observaciones,
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const onRejectHandler = async () => {
    console.log('onRejectHandler')
  }

  const onApproveHandler = async () => {
    console.log('onApproveHandler')
  }

  const onEditHandler = async () => {
    console.log('onEditHandler')
  }

  const modalHandler = action => {
    if (action === ACTION.EDIT) {
      setModal({
        show: true,
        title: 'Editar',
        content: '¿Estás seguro de que deseas editar este trámite?',
        action: onEditHandler,
      })
    } else if (action === ACTION.REJECT) {
      setModal({
        show: true,
        title: 'Rechazar',
        content: '¿Estás seguro de que deseas rechazar este trámite?',
        action: onRejectHandler,
      })
    } else if (action === ACTION.APPROVE) {
      setModal({
        show: true,
        title: 'Aceptar',
        content: '¿Estás seguro de que deseas aceptar este trámite?',
        action: onApproveHandler,
      })
    }
  }

  const closeModalHandler = () => {
    setModal({ show: false })
  }

  return (
    <div className="w-full container font-Montserrat">
      <h1 className="font-GMX text-2xl sm:text-3xl font-bold col-span-2 text-center m-4">
        Detalles del trámite del Prestador de Servicios
      </h1>
      {profile.role === ROLE_ENUM.ADMIN && (
        <div className="flex gap-4 items-center justify-end mb-4">
          <Button
            content="Editar"
            type="button"
            className=" w-full sm:w-auto bg-twine hover:bg-twine"
            onClick={() => modalHandler(ACTION.EDIT)}
          />
          <Button
            content="Rechazar"
            type="button"
            className=" w-full sm:w-auto bg-bigDipORuby hover:bg-bigDipORuby"
            onClick={() => modalHandler(ACTION.REJECT)}
          />
          <Button
            content="Aceptar"
            type="button"
            className=" w-full sm:w-auto bg-blueDianne hover:bg-blueDianne"
            onClick={() => modalHandler(ACTION.APPROVE)}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <section className="bg-silver bg-opacity-50 col-span-2 p-4 rounded-md">
          <div className="flex mb-2 gap-1">
            <Icons.Description />
            <h2 className="text-lg font-semibold">
              Datos generales del prestador de servicios
            </h2>
          </div>
          <div>
            <p className="font-semibold">
              Número de trámite:{' '}
              <span className="font-normal">{data.numeroDeTramite}</span>
            </p>
            <p className="font-semibold">
              Tipo de trámite:{' '}
              <span className="font-normal">{data.tipoDeTramite}</span>
            </p>
            <p className="font-semibold">
              Tipo de PST: <span className="font-normal">{data.tipoDePST}</span>
            </p>
            <p className="font-semibold">
              Nombre comercial:{' '}
              <span className="font-normal">{data.nombreComercial}</span>
            </p>
            <p className="font-semibold">
              Razón social:{' '}
              <span className="font-normal">{data.razonSocial}</span>
            </p>
            <p className="font-semibold">
              RFC: <span className="font-normal">{data.RFC}</span>
            </p>
            <p className="font-semibold">
              CURP: <span className="font-normal">{data.CURP}</span>
            </p>
            <p className="font-semibold">
              Registro INEGI:{' '}
              <span className="font-normal">{data.registroINEGI}</span>
            </p>
            <p className="font-semibold">
              Procedencia del trámite:{' '}
              <span className="font-normal">{data.procedenciaTramite}</span>
            </p>
            <p className="font-semibold">
              Motivo del rechazo:{' '}
              <span className="font-normal">{data.motivoDelRechazo}</span>
            </p>
          </div>
        </section>
        <section className="bg-silver bg-opacity-50 p-4 rounded-md col-span-2 sm:col-span-1">
          <div className="flex mb-2 gap-1">
            <Icons.Home />
            <h2 className="text-lg font-semibold">Domicilio</h2>
          </div>
          <div>
            <p className="font-semibold">
              Calle y número: <span className="font-normal">{data.calle}</span>
            </p>
            <p className="font-semibold">
              Colonia: <span className="font-normal">{data.colonia}</span>
            </p>
            <p className="font-semibold">
              Municipio: <span className="font-normal">{data.municipio}</span>
            </p>
            <p className="font-semibold">
              Estado: <span className="font-normal">{data.estado}</span>
            </p>
            <p className="font-semibold">
              Código postal:{' '}
              <span className="font-normal">{data.codigoPostal}</span>
            </p>
            <p className="font-semibold">
              Latitud: <span className="font-normal">{data.latitud}</span>
            </p>
            <p className="font-semibold">
              Longitud: <span className="font-normal">{data.longitud}</span>
            </p>
          </div>
        </section>
        <section className="bg-silver bg-opacity-50 p-4 rounded-md col-span-2 sm:col-span-1">
          <div className="flex mb-2 gap-1">
            <Icons.Phone />
            <h2 className="text-lg font-semibold">Contacto</h2>
          </div>
          <div>
            <p className="font-semibold">
              Teléfono: <span className="font-normal">{data.telefono}</span>
            </p>
            <p className="font-semibold">
              Celular: <span className="font-normal">{data.celular}</span>
            </p>
            <p className="font-semibold">
              Correo electrónico:{' '}
              <span className="font-normal">{data.email}</span>
            </p>
            <p className="font-semibold">
              Página web: <span className="font-normal">{data.web}</span>
            </p>
            <p className="font-semibold">
              Facebook: <span className="font-normal">{data.facebook}</span>
            </p>
            <p className="font-semibold">
              Instagram: <span className="font-normal">{data.instagram}</span>
            </p>
            <p className="font-semibold">
              TikTok: <span className="font-normal">{data.tiktok}</span>
            </p>
            <p className="font-semibold">
              X: <span className="font-normal">{data.x}</span>
            </p>
          </div>
        </section>
        <section className="bg-silver bg-opacity-50 col-span-2 p-4 rounded-md">
          <div className="flex mb-2 gap-1">
            <Icons.Gavel />
            <h2 className="text-lg font-semibold">Información legal</h2>
          </div>
          <div>
            <p className="font-semibold">
              Nombre del propietario:{' '}
              <span className="font-normal">{data.nombrePropietario}</span>
            </p>
            <p className="font-semibold">
              Nombre del representante legal:{' '}
              <span className="font-normal">
                {data.nombreRepresentanteLegal}
              </span>
            </p>
            <p className="font-semibold">
              Nombre del solicitante:{' '}
              <span className="font-normal">{data.nombreDelSoliciante}</span>
            </p>
            <p className="font-semibold">
              Puesto del solicitante:{' '}
              <span className="font-normal">{data.puestoDelSolicitante}</span>
            </p>
            <p className="font-semibold">
              Fecha de solicitud:{' '}
              <span className="font-normal">{data.fechaDeSolicitud}</span>
            </p>
            <p className="font-semibold">
              Fecha de ingreso a SECTUR:{' '}
              <span className="font-normal">{data.fechaIngreso}</span>
            </p>
          </div>
        </section>
        <section className="bg-silver bg-opacity-50 col-span-2 p-4 rounded-md">
          <h2 className="text-lg font-semibold">
            Datos generales del prestador de servicios
          </h2>
          <div>
            <p className="font-semibold">
              AAAAAAAAAA: <span className="font-normal">{data.AAAAAAAAAA}</span>
            </p>
            <p className="font-semibold">
              AAAAAAAAAA: <span className="font-normal">{data.AAAAAAAAAA}</span>
            </p>
          </div>
        </section>
      </div>
      <Dialog
        open={modal.show}
        onClose={closeModalHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{modal.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modal.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModalHandler} content="Cancelar" />
          <Button
            onClick={modal.action}
            content="Aceptar"
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DetallesDeSolicitud
