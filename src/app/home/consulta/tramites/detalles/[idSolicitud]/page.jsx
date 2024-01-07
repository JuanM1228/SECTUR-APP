'use client'
import React, { useState, useEffect } from 'react'
import { useHttpClient } from '@/hooks/useHttpClient'
import { useAuthStore } from '@/store/auth'
import { useParams, useRouter } from 'next/navigation'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Input from '@/components/common/Input'
import Modal from '@mui/material/Modal'

import Icons from '@/assets/icons'
import Button from '@/components/common/Button'
import { ROLE_ENUM } from '@/utils/constants'

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
  // tipoDeInmueble: null,
  // numEscritura: '',
  // numeroDeRegistro: '',
  observaciones: '',
  documentsList: [],
  picturesList: [],
}

const ACTION = {
  EDIT: 'EDIT',
  REJECT: 'REJECT',
  APPROVE: 'APPROVE',
}

const DetallesDeSolicitud = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const params = useParams()
  const router = useRouter()
  const idSolicitud = params.idSolicitud
  const { profile } = useAuthStore()
  const [data, setData] = useState(initialState)
  const [showRazonRechazo, setShowRazonRechazo] = useState(false)
  const [comentario, setComentario] = useState('')
  const [modal, setModal] = useState({
    show: false,
    title: '',
    content: '',
    action: null,
  })

  const [mediaData, setMediaData] = React.useState({
    documentUrl: null,
    documentType: null,
    show: false,
  })
  const handleClose = () =>
    setMediaData({
      documentUrl: null,
      documentType: null,
      show: false,
    })

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    const url = `/api/registro/detalle-tramite/${idSolicitud}}`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      const {
        datosGenerales,
        domicilio,
        contacto,
        informacionLegal,
        documentsList,
        picturesList,
      } = res.result.data
      console.log(res.result.data)
      setData({
        // Datos Generales
        tipoPST: datosGenerales.tipoPSTName,
        nombreComercial: datosGenerales.nombreComercial,
        razonSocial: datosGenerales.razonSocial,
        rfc: datosGenerales.rfc,
        curp: datosGenerales.curp,
        registroINEGI: datosGenerales.registroINEGI,
        registroAnterior: datosGenerales.registroAnterior,
        // Domicilio
        calle: domicilio.calle,
        colonia: domicilio.coloniaName,
        municipio: domicilio.municipio,
        estado: domicilio.estado,
        codigoPostal: domicilio.codigoPostal,
        latitud: domicilio.latitud,
        longitud: domicilio.longitud,
        // Contacto
        telefono: contacto.telefono,
        celular: contacto.celular,
        email: contacto.email,
        web: contacto.web,
        facebook: contacto.facebook,
        x: contacto.x,
        tiktok: contacto.tiktok,
        instagram: contacto.instagram,
        //Información legal
        nombreDelPropietario: informacionLegal.nombreDelPropietario,
        representanteLegal: informacionLegal.representanteLegal,
        nombreDelSolicitante: informacionLegal.nombreDelSolicitante,
        puestoDelSolicitante: informacionLegal.puestoDelSolicitante,
        fechaIngresoSECTUR: informacionLegal.fechaIngresoSECTUR,
        // tipoDeInmueble: informacionLegal.tipoDeInmueble,
        // numEscritura: informacionLegal.numeroDeEscritura,
        // numeroDeRegistro: informacionLegal.numRegistroDeLaPropiedad,
        observaciones: informacionLegal.observaciones,
        documentsList,
        picturesList,
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const onHandleChange = e => {
    setComentario(e.target.value)
  }

  const onRejectHandler = async rejectComment => {
    console.log(rejectComment, 'rejectComment')
    try {
      const url = '/api/registro/tramite-rechazado'

      const res = await sendRequest(url, {
        method: 'POST',
        body: {
          comentario: rejectComment,
          idSolicitud: Number(idSolicitud),
        },
      })
      if (!res.success) return
      router.push(`/home/tramites`)
    } catch (e) {
      console.log(e)
    }
  }

  const onApproveHandler = async () => {
    const url = `/api/registro/tramite-aprobado/${idSolicitud}`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      router.push(`/home/tramites`)
    } catch (error) {
      console.log('error', error)
    }
  }

  const onEditHandler = async () => {
    console.log('onEditHandler')
    router.push(`/home/tramites/solicitudes/${idSolicitud}`)
  }

  const modalHandler = action => {
    if (action === ACTION.EDIT) {
      setModal({
        show: true,
        title: 'Editar',
        content: '¿Estás seguro de que deseas editar este trámite?',
        action: onEditHandler,
      })
      setShowRazonRechazo(false)
    } else if (action === ACTION.REJECT) {
      setModal({
        show: true,
        title: 'Rechazar',
        content: '¿Estás seguro de que deseas rechazar este trámite?',
        action: onRejectHandler,
      })
      setShowRazonRechazo(true)
    } else if (action === ACTION.APPROVE) {
      setModal({
        show: true,
        title: 'Aceptar',
        content: '¿Estás seguro de que deseas aceptar este trámite?',
        action: onApproveHandler,
      })
      setShowRazonRechazo(false)
    }
  }

  const closeModalHandler = () => {
    setModal({ show: false })
  }

  const openDoumentHandler = (url, type) => {
    setMediaData({ documentUrl: url, documentType: type, show: true })
  }
  console.log(mediaData)
  return (
    <div className="w-full container font-Montserrat">
      <h1 className="font-GMX text-2xl sm:text-3xl font-bold col-span-2 text-center m-4">
        Detalles del trámite del Prestador de Servicios
      </h1>
      <Button
        content="Regresar"
        fullWidth={false}
        onClick={() => router.push(`/home/tramites`)}
        className="mb-4"
      />
      {profile?.role === ROLE_ENUM.ADMIN && (
        <div className="flex gap-4 items-center justify-end mb-4">
          <Button
            content="Editar"
            type="button"
            className=" sm:w-auto  hover:bg-twine"
            onClick={() => modalHandler(ACTION.EDIT)}
            fullWidth={false}
          />
          <Button
            content="Rechazar"
            type="button"
            className=" sm:w-auto hover:bg-bigDipORuby"
            onClick={() => modalHandler(ACTION.REJECT)}
            fullWidth={false}
          />
          <Button
            content="Aceptar"
            type="button"
            className=" sm:w-auto hover:bg-blueDianne"
            onClick={() => modalHandler(ACTION.APPROVE)}
            fullWidth={false}
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
            {/* <p className="font-semibold">
              Número de trámite:{' '}
              <span className="font-normal">{data.numeroDeTramite}</span>
            </p>
            <p className="font-semibold">
              Tipo de trámite:{' '}
              <span className="font-normal">{data.tipoDeTramite}</span>
            </p> */}
            <p className="font-semibold">
              Tipo de PST: <span className="font-normal">{data.tipoPST}</span>
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
              RFC: <span className="font-normal">{data.rfc}</span>
            </p>
            <p className="font-semibold">
              CURP: <span className="font-normal">{data.curp}</span>
            </p>
            <p className="font-semibold">
              Registro INEGI:{' '}
              <span className="font-normal">{data.registroINEGI}</span>
            </p>
            <p className="font-semibold">
              Registro anterior:{' '}
              <span className="font-normal">{data.registroAnterior}</span>
            </p>
            {/* <p className="font-semibold">
              Procedencia del trámite:{' '}
              <span className="font-normal">{data.procedenciaTramite}</span>
            </p>
            <p className="font-semibold">
              Motivo del rechazo:{' '}
              <span className="font-normal">{data.motivoDelRechazo}</span>
            </p> */}
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
              Tiktok: <span className="font-normal">{data.tiktok}</span>
            </p>
            <p className="font-semibold">
              Instagram: <span className="font-normal">{data.instagram}</span>
            </p>
            {/* <p className="font-semibold">
              Instagram: <span className="font-normal">{data.instagram}</span>
            </p>
            <p className="font-semibold">
              TikTok: <span className="font-normal">{data.tiktok}</span>
            </p> */}
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
              <span className="font-normal">{data.nombreDelPropietario}</span>
            </p>
            <p className="font-semibold">
              Nombre del representante legal:{' '}
              <span className="font-normal">{data.representanteLegal}</span>
            </p>
            <p className="font-semibold">
              Nombre del solicitante:{' '}
              <span className="font-normal">{data.nombreDelSolicitante}</span>
            </p>
            <p className="font-semibold">
              Puesto del solicitante:{' '}
              <span className="font-normal">{data.puestoDelSolicitante}</span>
            </p>
            {/* <p className="font-semibold">
              Fecha de solicitud:{' '}
              <span className="font-normal">{data.fechaDeSolicitud}</span>
            </p> */}
            <p className="font-semibold">
              Fecha de ingreso a SECTUR:{' '}
              <span className="font-normal">{data.fechaIngresoSECTUR}</span>
            </p>
            {/* <p className="font-semibold">
              Observaciones:{' '}
              <span className="font-normal">{data.observaciones}</span>
            </p> */}
          </div>
        </section>
        <section className="bg-silver bg-opacity-50 col-span-2 p-4 rounded-md">
          <div className="flex mb-2 gap-1">
            <Icons.Description />
            <h2 className="text-lg font-semibold">Doumentos</h2>
          </div>
          {data.documentsList?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {data.documentsList?.map((item, index) => {
                return (
                  <p className="font-semibold" key={`docId-${index}`}>
                    {`${item.documentName}: `}
                    <span
                      className="font-normal underline cursor-pointer text-blue"
                      onClick={() =>
                        openDoumentHandler(
                          `${process.env.ENV_URL}/${item.documentUrl}`,
                          item.documentType,
                        )
                      }>
                      Ver documento
                    </span>
                  </p>
                )
              })}
            </div>
          ) : (
            <div>
              <p>No hay documentos para mostrar</p>
            </div>
          )}
        </section>
        <section className="bg-silver bg-opacity-50 col-span-2 p-4 rounded-md">
          <div className="flex mb-2 gap-1">
            <Icons.Description />
            <h2 className="text-lg font-semibold">Fotos del establecimiento</h2>
          </div>
          {data.picturesList?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {data.picturesList?.map((item, index) => {
                console.log(`${process.env.ENV_URL}/${item.documentUrl}`)
                return (
                  <p className="font-semibold" key={`docId-${index}`}>
                    {`${item.documentName}: `}
                    <span
                      className="font-normal underline cursor-pointer text-blue"
                      onClick={() =>
                        openDoumentHandler(
                          `${process.env.ENV_URL}/${item.documentUrl}`,
                          item.documentType,
                        )
                      }>
                      Ver foto
                    </span>
                  </p>
                )
              })}
            </div>
          ) : (
            <div>
              <p>No hay fotos para mostrar</p>
            </div>
          )}
        </section>
        <Modal
          open={mediaData.show}
          onClose={handleClose}
          className="flex justify-center items-center">
          <embed
            src={mediaData.documentUrl}
            className="bg-merino flex justify-center items-center"
            type={mediaData.documentType}
            frameBorder="0"
            scrolling="auto"
            height={mediaData.documentType === 'application/pdf' ? '90%' : ''}
            width={
              mediaData.documentType === 'application/pdf' ? '90%' : '40%'
            }></embed>
        </Modal>
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
            {showRazonRechazo && (
              <div className="mt-4">
                <Input
                  label="Razon de rechazo"
                  name="comentario"
                  rows={4}
                  multiline
                  onChange={onHandleChange}
                  value={comentario}
                />
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModalHandler} content="Cancelar" />
          <Button onClick={() => modal.action(comentario)} content="Aceptar" />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DetallesDeSolicitud
