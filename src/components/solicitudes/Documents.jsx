'use client'
import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { useHttpClient } from '@/hooks/useHttpClient'
import { produce } from 'immer'

import { Alert, IconButton, Snackbar } from '@mui/material'
import Button from '../common/Button'
import Icons from '@/assets/icons'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import ButtonMUI from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'

import {
  MAX_PHOTO_LENGTH,
  STEP_ENUM,
  PST_INFO,
  TIPOS_ASENTAMIENTO_OBJETO,
  TIPOS_VIALIDAD_OBJETO,
  TIPOS_TRAMITES_OBJETO,
} from '@/utils/constants'
import colors from '@/assets/colors'
import { formatoUnico } from '@/utils/formatoUnico'

const TYPE = {
  INIT_DATA: 'INIT_DATA',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  UPDATE_PHOTOS: 'UPDATE_PHOTOS',
  UPDATE_DOCUMENTS: 'UPDATE_DOCUMENTS',
  SHOW_ERROR: 'SHOW_ERROR',
  HIDE_ERROR: 'HIDE_ERROR',
}

const FILE_TYPE = {
  DOCUMENT: 'DOCUMENT',
  PHOTO: 'PHOTO',
}

const initialState = {
  documentsList: [],
  photosList: [],
  showModal: false,
  showError: false,
  errorMessage: '',
  selectedDoc: {
    documentId: null,
    documentName: null,
    fileType: null,
  },
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case TYPE.SHOW_MODAL:
      return produce(state, draftState => {
        draftState.showModal = true
        draftState.selectedDoc.documentId = payload.documentId
        draftState.selectedDoc.documentName = payload.documentName
        draftState.selectedDoc.fileType = payload.fileType
      })
    case TYPE.HIDE_MODAL:
      return produce(state, draftState => {
        draftState.showModal = false
        draftState.selectedDoc.documentId = null
        draftState.selectedDoc.documentName = null
        draftState.selectedDoc.fileType = null
      })
    case TYPE.INIT_DATA:
      return produce(state, draftState => {
        draftState.photosList = payload.photosList
        draftState.documentsList = payload.documentsList
      })
    case TYPE.UPDATE_PHOTOS:
      return produce(state, draftState => {
        draftState.photosList = payload.photosList
      })
    case TYPE.UPDATE_DOCUMENTS:
      return produce(state, draftState => {
        draftState.documentsList = payload.documentsList
      })
    case TYPE.SHOW_ERROR:
      return produce(state, draftState => {
        draftState.showError = true
        draftState.errorMessage = payload.errorMessage
      })
    case TYPE.HIDE_ERROR:
      return produce(state, draftState => {
        draftState.showError = false
        draftState.errorMessage = ''
      })
    default:
      throw new Error()
  }
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  color: colors.bigDipORuby,
})

const Documents = props => {
  const {
    step,
    nextStep,
    backStep,
    pstId,
    solicitudId,
    coloniaActual,
    register,
  } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const { sendRequest, isLoading } = useHttpClient()
  const showScreen = step === STEP_ENUM.DOCUMENTOS

  useEffect(() => {
    if (!pstId || !solicitudId) return
    initDataHandler()
  }, [pstId, solicitudId])

  const initDataHandler = async () => {
    const urls = [
      `/api/registro/solicitud-documents/?pstId=${pstId}&solicitudId=${solicitudId}`,
      `/api/registro/solicitud-images/?solicitudId=${solicitudId}`,
    ]
    const requests = urls.map(url => sendRequest(url))
    Promise.all(requests)
      .then(res => {
        console.log(res)
        const documentsList = res[0].result.data
        const photosList = res[1].result.data
        dispatch({
          type: TYPE.INIT_DATA,
          payload: { documentsList, photosList },
        })
      })
      .catch(err => console.log(err))
  }

  // Modal related functions
  const handleClickOpen = (documentId, documentName, fileType) => {
    dispatch({
      type: TYPE.SHOW_MODAL,
      payload: { documentId, documentName, fileType },
    })
  }

  const getFormatoUnico = () => {
    const registroPrueba = {
      tipo_pst: PST_INFO[register.datosGenerales.tipoPST].name,
      nobre_comercial: register.datosGenerales.nombreComercial,
      razon_social: register.datosGenerales.razonSocial,
      RFC: register.datosGenerales.rfc,
      codigi_postal: String(register.domicilio.codigoPostal),
      calle: register.domicilio.calle,
      no_int: register.domicilio.numInterior
        ? register.domicilio.numInterior
        : '',
      no_ext: register.domicilio.numExterior
        ? register.domicilio.numExterior
        : '',
      municipio: register.domicilio.municipio,
      estado: register.domicilio.estado,
      localidad: coloniaActual,
      telefono: register.contacto.telefono,
      mail: register.contacto.email,
      web: register.contacto.web,
      facebook: register.contacto.facebook,
      twitter: register.contacto.x,
      propietario: register.informacionLegal.nombreDelPropietario,
      tipoDeTramite: TIPOS_TRAMITES_OBJETO[register.datosGenerales.tipoTramite],
      nacionalidad: register.datosGenerales.nacionalidad,
      tipoDeVialidad:
        TIPOS_VIALIDAD_OBJETO[register.datosGenerales.tipoVialidad],
      tipoDeAsentamiento:
        TIPOS_ASENTAMIENTO_OBJETO[register.datosGenerales.asentamiento],
      fechaDeApertura: dayjs(register.datosGenerales.fechaApertura).format(
        'DD-MM-YYYY',
      ),
    }
    console.log(register)
    console.log(registroPrueba)
    formatoUnico(registroPrueba)
  }

  const handleClose = () => {
    dispatch({ type: TYPE.HIDE_MODAL })
  }

  // Documents related functions
  const updateDocumentsList = async () => {
    const url = `/api/registro/solicitud-documents/?pstId=${pstId}&solicitudId=${solicitudId}`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      dispatch({
        type: TYPE.UPDATE_DOCUMENTS,
        payload: { documentsList: res.result.data },
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const uploadDocumentHandler = async (e, id) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('idSolicitud', solicitudId)
    formData.append('documentTypeId', id)
    formData.append('file', file)
    const url = `/api/registro/solicitud-documents/`
    try {
      const res = await sendRequest(url, {
        method: 'POST',
        file: formData,
      })
      if (!res.success) return
      updateDocumentsList()
    } catch (error) {
      console.log('error', error)
    }
  }

  const removeDocumentHandler = async documentId => {
    const url = `/api/registro/solicitud-documents/${documentId}`
    try {
      const res = await sendRequest(url, { method: 'DELETE' })
      if (!res.success) return
      dispatch({ type: TYPE.HIDE_MODAL })
      updateDocumentsList()
    } catch (error) {
      console.log('error', error)
    }
  }

  // Photos related functions
  const updatePhotosList = async () => {
    const url = `/api/registro/solicitud-images/?solicitudId=${solicitudId}`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      dispatch({
        type: TYPE.UPDATE_PHOTOS,
        payload: { photosList: res.result.data },
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const uploadPhotoHandler = async e => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('idSolicitud', solicitudId)
    formData.append('file', file)
    const url = `/api/registro/solicitud-images`
    try {
      const res = await sendRequest(url, {
        method: 'POST',
        file: formData,
      })
      if (!res.success) return
      updatePhotosList()
    } catch (error) {
      console.log('error', error)
    }
  }

  const removePhotoHandler = async photoId => {
    const url = `/api/registro/solicitud-images/${photoId}`
    try {
      const res = await sendRequest(url, { method: 'DELETE' })
      if (!res.success) return
      dispatch({ type: TYPE.HIDE_MODAL })
      updatePhotosList()
    } catch (error) {
      console.log('error', error)
    }
  }

  const removeFileHandler = async fileId => {
    const { fileType } = state.selectedDoc
    if (fileType === FILE_TYPE.DOCUMENT) {
      removeDocumentHandler(fileId)
    } else if (fileType === FILE_TYPE.PHOTO) {
      removePhotoHandler(fileId)
    }
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const { documentsList, photosList } = state
    // Validate if there are documents available
    if (documentsList?.length === 0) return
    // Validate if all documents are uploaded
    const isAllDocumentsUploaded = documentsList.every(
      item => item.documentId !== null,
    )
    if (!isAllDocumentsUploaded) {
      dispatch({
        type: TYPE.SHOW_ERROR,
        payload: {
          errorMessage: 'Por favor sube todos los documentos requeridos',
        },
      })
      return
    }
    // Validate if there is at least one photo
    if (photosList?.length === 0) {
      dispatch({
        type: TYPE.SHOW_ERROR,
        payload: {
          errorMessage: 'Por favor sube al menos una foto',
        },
      })
      return
    }
    nextStep()
  }
  const { documentsList, selectedDoc, showModal, photosList } = state

  if (isLoading && step === STEP_ENUM.DOCUMENTOS) {
    return <span className="loader"></span>
  }

  return (
    <>
      <form
        className={`container-form-solicitud t-ease ${
          showScreen ? '' : 'hide'
        }`}
        onSubmit={onSubmitHandler}>
        <div className="flex justify-between">
          <h1 className="font-GMX font-bold text-2xl">DOCUMENTOS</h1>
          <Button
            fullWidth={false}
            className="bg-seaGreen"
            content="Descargar formato único para firma y envío"
            onClick={getFormatoUnico}
          />
        </div>
        {documentsList.map(item => {
          return (
            <div key={`i-${item.id}`} className="border-b border-silver pb-4">
              <h2 className="font-GMX font-bold">
                {item.nombre_completo}
                <span className="text-error"> *</span>
              </h2>
              <h3 className="font-GMX text-gray text-sm">{item.descripcion}</h3>
              {item.documentId ? (
                <div className="flex items-center mt-2">
                  <Icons.Check className="text-seaGreen mr-1" />
                  <p className="font-GMX text-gray text-sm grow">
                    {item.documentName}
                  </p>
                  <IconButton
                    onClick={() =>
                      handleClickOpen(
                        item.documentId,
                        item.documentName,
                        FILE_TYPE.DOCUMENT,
                      )
                    }>
                    <Icons.Delete className="text-error" />
                  </IconButton>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-2">
                  <ButtonMUI
                    className={`bg-bigDipORuby text-white hover:bg-bigDipORuby font-GMX font-bold w-full max-w-xs`}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}>
                    Subir archivo
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png, image/jpeg, .pdf"
                      onChange={e => uploadDocumentHandler(e, item.id)}
                    />
                  </ButtonMUI>
                </div>
              )}
            </div>
          )
        })}
        <h1 className="font-GMX font-bold text-2xl">
          FOTOS DEL ESTABLECIMIENTO
        </h1>
        {photosList.map(item => {
          return (
            <div key={`i-${item.imageId}`} className="flex items-center mt-2">
              <Icons.Check className="text-seaGreen mr-1" />
              <p className="font-GMX text-gray text-sm grow">
                {item.imageName}
              </p>
              <IconButton
                onClick={() =>
                  handleClickOpen(item.imageId, item.imageName, FILE_TYPE.PHOTO)
                }>
                <Icons.Delete className="text-error" />
              </IconButton>
            </div>
          )
        })}
        {photosList?.length <= MAX_PHOTO_LENGTH ? (
          <div className="flex items-center justify-center mt-2">
            <ButtonMUI
              className={`bg-bigDipORuby text-white hover:bg-bigDipORuby font-GMX font-bold w-full max-w-xs`}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}>
              Subir foto
              <VisuallyHiddenInput
                type="file"
                accept="image/png, image/jpeg, .pdf"
                onChange={uploadPhotoHandler}
              />
            </ButtonMUI>
          </div>
        ) : (
          <p className="font-GMX text-gray text-sm">
            Límite de fotos alcanzado
          </p>
        )}
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
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Eliminar Documento</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar {selectedDoc.documentName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} content="Cancelar" />
          <Button
            onClick={() => removeFileHandler(selectedDoc.documentId)}
            content="Aceptar"
          />
        </DialogActions>
      </Dialog>
      <Snackbar
        open={state.showError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => dispatch({ type: TYPE.HIDE_ERROR })}>
        <Alert
          onClose={() => dispatch({ type: TYPE.HIDE_ERROR })}
          severity="warning"
          sx={{ width: '100%' }}>
          {state.errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Documents

Documents.propTypes = {
  documentsList: PropTypes.arrayOf(
    PropTypes.shape({
      documentId: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      fileTypes: PropTypes.string,
      isRequired: PropTypes.bool,
    }),
  ),
  step: PropTypes.number.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
}
