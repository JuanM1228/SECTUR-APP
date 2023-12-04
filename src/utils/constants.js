const API_URL = `${process.env.ENV_URL}/api`
export default API_URL

export const GENERIC_DETAILS_PST_ARRAY = [2, 5, 6, 7, 8, 10, 13, 14, 16, 18]

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

export const INIT_DETALLE_GENERICO = {
  tipoPersona: null,
  horaApertura: '',
  horaCierre: '',
  observacionesGenerales: '',
  observacionesEspecificas: '',
  observacionesAdicionales: '',
}

export const INIT_ALIMENTOS_BEBIDAS = {
  tipoDeServicio: null,
  espectaculo: null,
  especialidades: null,
  tiposDeComida: null,
  numeroDeCajones: null,
  mercadoExtranjero: null,
  mercadoNacional: null,
  serviciosAdicionales: null,
  ubicacion: null,
  descripcionUbicacion: '',
}

export const INIT_ARRENDADORA_AUTOS = {
  tipoEstablecimiento: null,
  nombreMatriz: '',
  domicilio: '',
  numeroSucursales: null,
  captacionNacional: null,
  captacionExtrangero: null,
}

export const INIT_OPERADORA_BUCEO = {
  nombreMatriz: '',
  domicilio: '',
  telefono: null,
  tipoEstablecimiento: null,
  numeroSucursales: null,
  afiliaciones: '',
}

/**
 * Enumerates the steps for a multi-step process.
 * @enum {number}
 */
export const STEP_ENUM = {
  DATOS_GENERALES: 0,
  DOMICILIO: 1,
  CONTACTO: 2,
  INFO_LEGAL: 3,
  DETALLES: 4, // TODO: Verificar si es necesario
}
