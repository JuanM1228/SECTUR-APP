const email = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/.test(email)
const hasText = value => value?.trim() !== ''
const phoneNumber = phoneNumber => /^\d{10}$/.test(phoneNumber)

const rfc = rfc => /^[a-zA-Z0-9]{1,13}$/.test(rfc)

const curp = curp => /^[a-zA-Z0-9]{1,18}$/.test(curp)

const password = password =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
    password,
  )

const razonSocial = razonSocial =>
  /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜäÄëËïÏöÖñÑçÇàèìòùÀÈÌÒÙ\s\-_.,]{1,50}$/.test(
    razonSocial,
  )

const codigoPostal = codigoPostal => /^[a-zA-Z0-9]{1,5}$/.test(codigoPostal)
const numDireccion = numDireccion => /^[0-9]{1,5}$/.test(numDireccion)
const calle = calle => /^[a-zA-Z0-9]{1,60}$/.test(calle)

const redesSociales = redesSociales => /^.{1,150}$/.test(redesSociales)
const datosLegales = datosLegales =>
  /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s']{1,150}$/.test(datosLegales)

const loginForm = data => {
  let err = {
    email: '',
    password: '',
  }

  if (!hasText(data.email)) {
    err.email = 'Ingrese su correo'
  } else if (!email(data.email)) {
    err.email = 'Por favor ingrese un correo válido'
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
  if (!(data.birthDate instanceof Date || hasText(data.birthDate))) {
    err.birthDate = 'Ingrese su fecha de nacimiento'
  }
  if (!hasText(data.email)) {
    err.email = 'Ingrese su correo electrónico'
  } else if (!email(data.email)) {
    err.email = 'Por favor ingrese un correo válido'
  }
  if (!hasText(data.password)) {
    err.password = 'Ingrese una contraseña'
  }
  if (!hasText(data.verifyPassword)) {
    err.verifyPassword = 'Verifique su contraseña'
  } else if (data.password !== data.verifyPassword) {
    err.verifyPassword = 'Su contraseña no coincide'
  }
  if (!(data.password.length >= 8 && data.password.length <= 16)) {
    err.password =
      'Su contraseña debe ser mayor a 8 caracteres y menor a 16 caracteres'
  } else if (!password(data.password)) {
    err.password =
      'Su contraseña debe tener mayusculas, minusculas, numeros y simbolos'
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
    razonSocial: '',
    tipoTramite: '',
    nacionalidad: '',
    tipoVialidad: '',
    asentamiento: '',
    fechaApertura: '',
    curp: '',
  }

  if (!data.tipoPST) {
    err.tipoPST = 'Ingrese el tipo de PST'
  }
  if (!hasText(data.nombreComercial)) {
    err.nombreComercial = 'Ingrese su nombre comercial'
  }
  if (!hasText(data.rfc)) {
    err.rfc = 'Ingrese su RFC'
  } else if (!rfc(data.rfc)) {
    err.rfc = 'Por favor ingrese un RFC válido'
  }
  if (!hasText(data.curp)) {
    err.razonSocial = 'Ingrese su razón social'
  }
  if (!hasText(data.curp)) {
    err.curp = 'Ingrese su CURP'
  } else if (!curp(data.curp)) {
    err.curp = 'Por favor ingrese una CURP valida'
  }
  if (!data.tipoTramite) {
    err.tipoTramite = 'Ingrese tipo de tramite'
  }
  if (!hasText(data.nacionalidad)) {
    err.nacionalidad = 'Ingrese su nacionalidad'
  }
  if (!data.tipoVialidad) {
    err.tipoVialidad = 'Ingrese tipo de vialidad'
  }
  if (!data.asentamiento) {
    err.asentamiento = 'Ingrese tipo de asentamiento'
  }
  if (!(data.fechaApertura instanceof Date || hasText(data.fechaApertura))) {
    err.fechaApertura = 'Ingrese una fecha de apertura'
  }
  if (!razonSocial(data.razonSocial)) {
    err.razonSocial = 'Ingrese una razon social valida'
  }

  return {
    hasError:
      err.tipoPST !== '' ||
      err.nombreComercial !== '' ||
      err.rfc !== '' ||
      err.razonSocial !== '' ||
      err.tipoTramite !== '' ||
      err.nacionalidad !== '' ||
      err.tipoVialidad !== '' ||
      err.asentamiento !== '' ||
      err.fechaApertura !== '' ||
      err.curp !== '',
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
    numExterior: '',
    numInterior: '',
  }

  if (!data.codigoPostal) {
    err.codigoPostal = 'Ingrese un código postal'
  }
  if (!codigoPostal(data.codigoPostal)) {
    err.codigoPostal = 'Ingrese un código portal valido de 5 digitos'
  }
  if (!data.colonia) {
    err.colonia = 'Seleccione una colonia'
  }
  if (!hasText(data.calle)) {
    err.calle = 'Ingrese su calle '
  }
  if (!calle(data.calle)) {
    err.calle =
      'La calle solo debe contener letras, numeros y no mayor a 60 caracteres'
  }
  if (!data.latitud) {
    err.latitud = 'Ingrese la ubicación en el mapa'
  }
  if (!data.numExterior) {
    err.numExterior = 'Ingrese el número exterior'
  }
  if (!numDireccion(data.numExterior)) {
    err.numExterior = 'Ingrese solo numeros no mayor a 5 digitos'
  }
  if (data.numInterior) {
    if (!numDireccion(data.numInterior)) {
      err.numInterior = 'Ingrese solo numeros no mayor a 5 digitos'
    }
  }

  return {
    hasError:
      err.codigoPostal !== '' ||
      err.colonia !== '' ||
      err.calle !== '' ||
      err.latitud !== '' ||
      err.numInterior !== '' ||
      err.numExterior !== '',
    errors: err,
  }
}

const contactoForm = data => {
  let err = {
    telefono: '',
    email: '',
    celular: '',
    web: '',
    facebook: '',
    x: '',
    tiktok: '',
    instagram: '',
  }

  if (!data.telefono) {
    err.telefono = 'Ingrese un número de teléfono'
  } else if (!phoneNumber(data.telefono)) {
    err.telefono =
      'Por favor ingrese un número de teléfono válido de 10 digitos'
  }
  if (!data.celular) {
    err.celular = 'Ingrese un número de celular'
  } else if (!phoneNumber(data.celular)) {
    err.celular = 'Por favor ingrese un número de celular válido de 10 digitos'
  }
  if (!data.email) {
    err.email = 'Ingrese un correo electrónico'
  } else if (!email(data.email)) {
    err.email = 'Por favor ingrese un correo válido'
  }
  if (hasText(data.celular) && !phoneNumber(data.celular)) {
    err.celular = 'Por favor ingrese un número de celular válido'
  }
  if (data.web) {
    if (!redesSociales(data.web)) {
      err.web = 'solo permite 150 caracteres'
    }
  }
  if (data.facebook) {
    if (!redesSociales(data.facebook)) {
      err.facebook = 'solo permite 150 caracteres'
    }
  }
  if (data.x) {
    if (!redesSociales(data.x)) {
      err.x = 'solo permite 150 caracteres'
    }
  }
  if (data.tiktok) {
    if (!redesSociales(data.tiktok)) {
      err.tiktok = 'solo permite 150 caracteres'
    }
  }
  if (data.instagram) {
    if (!redesSociales(data.instagram)) {
      err.instagram = 'solo permite 150 caracteres'
    }
  }

  return {
    hasError:
      err.telefono !== '' ||
      err.email !== '' ||
      err.celular !== '' ||
      err.web !== '' ||
      err.facebook !== '' ||
      err.x !== '' ||
      err.tiktok !== '' ||
      err.instagram !== '',
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
  } else if (!datosLegales(data.nombreDelPropietario)) {
    err.instagram = 'solo permite 150 caracteres'
  }
  if (!hasText(data.representanteLegal)) {
    err.representanteLegal = 'Ingrese un representante legal'
  } else if (!datosLegales(data.representanteLegal)) {
    err.representanteLegal = 'solo permite 150 caracteres'
  }
  if (!hasText(data.nombreDelSolicitante)) {
    err.nombreDelSolicitante = 'Ingrese un nombre de solicitante'
  } else if (!datosLegales(data.nombreDelSolicitante)) {
    err.nombreDelSolicitante = 'solo permite 150 caracteres'
  }
  if (!hasText(data.puestoDelSolicitante)) {
    err.puestoDelSolicitante = 'Ingrese un puesto de solicitante'
  } else if (!datosLegales(data.puestoDelSolicitante)) {
    err.puestoDelSolicitante = 'solo permite 150 caracteres'
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
