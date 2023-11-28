const API_URL = `${process.env.ENV_URL}/api`
export default API_URL

export const INIT_DATA_REGISTER_USER = {
  name: '',
  paternalSurname: '',
  maternalSurname: '',
  email: '',
  password: '',
  verifyPassword: '',
  birthDate: '',
}

export const INIT_DATA_LOGIN = {
  email: '',
  password: '',
}

export const INIT_DATOS_GENERALES = {
  tipoPST: null,
  nombreComercial: '',
  rfc: '',
  registroINEGI: '',
  registroAnterior: '',
  razonSocial: '',
  curp: '',
}

export const INIT_CONTACTO = {
  telefono: '',
  email: '',
  celular: '',
  web: '',
  facebook: '',
  twitter: '',
  fax: '',
}

export const INIT_INFO_LEGAL = {
  nombreDelPropietario: '',
  nombreDelSolicitante: '',
  fechaDeSolicitud: '', // Fecha de solicitud?
  tipoDeInmueble: null, // Propio, rentado
  numeroDeRegistro: '',
  representanteLegal: '',
  puestoDelSolicitante: '',
  fechaIngresoSECTUR: '', // Fecha
  numEscritura: '',
  vigenciaContrato: '', // Fecha
  observaciones: '',
}
