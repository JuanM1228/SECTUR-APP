'use client'
import React, { useState, useEffect } from 'react'
import { useHttpClient } from '@/hooks/useHttpClient'
import { useAuthStore } from '@/store/auth'
import { useParams, useRouter } from 'next/navigation'
import { EmbedPDF } from '@simplepdf/react-embed-pdf'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Box from '@mui/material/Box'
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import Icons from '@/assets/icons'
import Button from '@/components/common/Button'
import { ROLE_ENUM } from '@/utils/constants'

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '100%',
//   height: '100%',
//   bgcolor: 'background.paper',
//   // border: '2px solid #000',
//   // boxShadow: 24,
//   p: 4,
// }

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
  const [modal, setModal] = useState({
    show: false,
    title: '',
    content: '',
    action: null,
  })

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    const url = `/api/registro/detalle-tramite/${idSolicitud}}`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      const { datosGenerales, domicilio, contacto, informacionLegal } =
        res.result.data
      setData({
        // Datos Generales
        tipoPST: datosGenerales.tipoPST,
        nombreComercial: datosGenerales.nombreComercial,
        razonSocial: datosGenerales.razonSocial,
        rfc: datosGenerales.rfc,
        curp: datosGenerales.curp,
        registroINEGI: datosGenerales.registroINEGI,
        registroAnterior: datosGenerales.registroAnterior,
        // Domicilio
        calle: domicilio.calle,
        colonia: domicilio.colonia,
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
        fax: contacto.fax,
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
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const onRejectHandler = async () => {
    const url = `/api/registro/tramite-revocado/${idSolicitud}`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      router.push(`/home/tramites`)
    } catch (error) {
      console.log('error', error)
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
      {profile?.role === ROLE_ENUM.ADMIN && (
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
              Fax: <span className="font-normal">{data.fax}</span>
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
            <p className="font-semibold">
              Observaciones:{' '}
              <span className="font-normal">{data.observaciones}</span>
            </p>
          </div>
        </section>
        {/* <section className="bg-silver bg-opacity-50 col-span-2 p-4 rounded-md">
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
        </section> */}
        <Button content='Open PDF' onClick={handleOpen}></Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          {/* <Box sx={style}> */}
          {/* <embed
            src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
            type="application/pdf"
            frameBorder="0"
            scrolling="auto"
            height="80%"
            width="80%"
            style={{ display: "block", margin: "0 auto" }}
          ></embed> */}
          <embed
            src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
            type="image/jpg"
            frameBorder="0"
            scrolling="auto"
            height="80%"
            width="80%"
            style={{ display: "block", margin: "0 auto" }}
          ></embed>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          {/* </Box> */}
        </Modal>
        <EmbedPDF>
          <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">
            Opens dummy.pdf
          </a>
        </EmbedPDF>
        <EmbedPDF>
          <a href="https://www.africau.edu/images/default/sample.pdf">
            Opens dummy.pdf 2
          </a>
        </EmbedPDF>
        {/* <embed
    src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
    type="application/pdf"
    frameBorder="0"
    scrolling="auto"
    height="100%"
    width="100%"
></embed> */}
        {/* 
        <EmbedPDF>
          <button>Opens the simplePDF editor</button>
        </EmbedPDF> */}
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
          <Button onClick={modal.action} content="Aceptar" />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DetallesDeSolicitud
