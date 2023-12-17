import { INIT_DATA_LOGIN, INIT_DATA_REGISTER_USER } from './constants'

const email = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
const hasText = value => value?.trim() !== ''

const rfc = rfc =>
  /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/.test(
    rfc,
  )

const loginForm = data => {
  let err = {
    email: '',
    password: '',
  }

  if (!hasText(data.email)) {
    err.email = 'Ingrese su correo'
  } else if (!email(data.email)) {
    err.email = 'Por favor ingrese un correo valido'
  }
  if (!hasText(data.password)) {
    err.password = 'Ingrese su contraseña'
  }
  return {
    hasError: err.email !== '' || err.password !== '',
    errors: err,
  }
}

const registerForm = data => {
  let err = {
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    email: '',
    password: '',
    verifyPassword: '',
    birthDate: '',
  }

  if (!hasText(data.name)) {
    err.name = 'Ingrese su(s) nombre(s)'
  }
  if (!hasText(data.paternalSurname)) {
    err.paternalSurname = 'Ingrese su apellido paterno'
  }
  if (!hasText(data.maternalSurname)) {
    err.maternalSurname = 'Ingrese su apellido materno'
  }
  if (!hasText(data.birthDate)) {
    err.birthDate = 'Ingrese su fecha de nacimiento'
  }
  if (!hasText(data.email)) {
    err.email = 'Ingrese su correo electrónico'
  } else if (!email(data.email)) {
    err.email = 'Por favor ingrese un correo valido'
  }
  if (!hasText(data.password)) {
    err.password = 'Ingrese una contraseña'
  }
  if (!hasText(data.verifyPassword)) {
    err.verifyPassword = 'Verifique su contraseña'
  } else if (data.password !== data.verifyPassword) {
    err.verifyPassword = 'Su contraseña no coincide'
  }

  return {
    hasError:
      err.name !== '' ||
      err.paternalSurname !== '' ||
      err.maternalSurname !== '' ||
      err.email !== '' ||
      err.password ||
      err.verifyPassword !== '' ||
      err.birthDate !== '',
    errors: err,
  }
}

const datosGeneralesForm = data => {
  let err = {
    tipoPST: '',
    nombreComercial: '',
    rfc: '',
  }

  if (!data.tipoPST) {
    err.tipoPST = 'Ingrese el tipo de PST'
  }
  if (!hasText(data.nombreComercial)) {
    err.nombreComercial = 'Ingrese su nombre comercial'
  }
  if (!hasText(data.rfc)) {
    err.rfc = 'Ingrese su RFC'
  }
  // else if (rfc(data.rfc)) {
  //   err.rfc = 'Por favor ingrese un RFC valido'
  // }

  return {
    hasError:
      err.tipoPST !== '' || err.nombreComercial !== '' || err.rfc !== '',
    errors: err,
  }
}

const domicilioForm = data => {
  let err = {
    codigoPostal: '',
    colonia: '',
    calle: '',
    latitud: '',
    longitud: '',
  }

  if (!data.codigoPostal) {
    err.codigoPostal = 'Ingrese un código postal'
  }
  if (!data.colonia) {
    err.colonia = 'Seleccione una colonia'
  }
  if (!hasText(data.calle)) {
    err.calle = 'Ingrese su calle con número exterior'
  }
  if (!data.latitud) {
    err.latitud = 'Ingrese la ubicación en el mapa'
  }

  return {
    hasError:
      err.codigoPostal !== '' ||
      err.colonia !== '' ||
      err.calle !== '' ||
      err.latitud !== '',
    errors: err,
  }
}

const contactoForm = data => {
  let err = {
    telefono: '',
    email: '',
  }

  if (!hasText(data.telefono)) {
    err.telefono = 'Ingrese un número de teléfono'
  }
  if (!hasText(data.email)) {
    err.email = 'Ingrese un correo electrónico'
  }

  return {
    hasError: err.telefono !== '' || err.email !== '',
    errors: err,
  }
}

const infoLegalForm = data => {
  let err = {
    nombreDelPropietario: '',
    representanteLegal: '',
    nombreDelSolicitante: '',
    puestoDelSolicitante: '',
    fechaDeSolicitud: '', // TODO: Change validation
    fechaIngresoSECTUR: '', // TODO: Change validation
  }

  if (!hasText(data.nombreDelPropietario)) {
    err.nombreDelPropietario = 'Ingrese un nombre de propietario'
  }
  if (!hasText(data.representanteLegal)) {
    err.representanteLegal = 'Ingrese un representante legal'
  }
  if (!hasText(data.nombreDelSolicitante)) {
    err.nombreDelSolicitante = 'Ingrese un nombre de solicitante'
  }
  if (!hasText(data.puestoDelSolicitante)) {
    err.puestoDelSolicitante = 'Ingrese un puesto de solicitante'
  }
  if (
    !(data.fechaDeSolicitud instanceof Date || hasText(data.fechaDeSolicitud))
  ) {
    err.fechaDeSolicitud = 'Ingrese una fecha de solicitud'
  }
  if (
    !(
      data.fechaIngresoSECTUR instanceof Date ||
      hasText(data.fechaIngresoSECTUR)
    )
  ) {
    err.fechaIngresoSECTUR = 'Ingrese una fecha de ingreso a SECTUR'
  }

  return {
    hasError:
      err.nombreDelPropietario !== '' ||
      err.representanteLegal !== '' ||
      err.nombreDelSolicitante !== '' ||
      err.puestoDelSolicitante !== '' ||
      err.fechaDeSolicitud !== '' ||
      err.fechaIngresoSECTUR !== '',
    errors: err,
  }
}

export const validate = {
  email,
  loginForm,
  registerForm,
  datosGeneralesForm,
  domicilioForm,
  contactoForm,
  infoLegalForm,
}
