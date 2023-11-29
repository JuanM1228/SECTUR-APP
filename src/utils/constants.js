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

export const INIT_DATA_DOMICILIO = {
  codigoPostal: null,
  estado: '',
  municipio: '',
  colonia: null,
  calle: '',
  latitud: null,
  longitud: null,
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
  representanteLegal: '',
  nombreDelSolicitante: '',
  puestoDelSolicitante: '',
  fechaDeSolicitud: '', // Fecha de solicitud?
  fechaIngresoSECTUR: '', // Fecha
  tipoDeInmueble: null, // Propio, rentado
  numEscritura: '', // Inmueble propio?
  vigenciaContrato: '', // Fecha // Inmueble rentado?
  numeroDeRegistro: '', // Inmueble rentado?
  observaciones: '',
}

export const INIT_AGENCIA_VIAJES = {
  nombreNotario: '',
  numeroActaConstitutiva: null,
  numeroNotaria: null,
  lugarExpedicion: '',
  fechaEmisionActa: '',
  afiliaciones: null,
  boletaje: null,
}
