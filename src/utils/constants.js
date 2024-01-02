const API_URL = `${process.env.ENV_URL}/api`
export default API_URL

export const INIT_FILTROS_DATA = {
  idUsuario: '',
  folio: '',
  idTramite: '',
  nombre: '',
  nombreComercial: '',
  idPST: '',
  idEstado: '',
  idStatus: '',
  fechaInicio: '',
  fechaFinal: '',
}

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
  numInterior: null,
  numExterior: null,
  latitud: null,
  longitud: null,
}

export const INIT_CONTACTO = {
  telefono: '',
  email: '',
  celular: '',
  web: '',
  facebook: '',
  x: '',
  tiktok: '',
  instagram: '',
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
  subcategoria: null,
  nombreNotario: '',
  numeroActaConstitutiva: null,
  numeroNotaria: null,
  lugarExpedicion: '',
  fechaEmisionActa: '',
  afiliacionesList: [],
  boletaje: null,
}

export const INIT_DETALLE_GENERICO = {
  subcategoria: null,
  tipoPersona: null,
  horaApertura: '',
  horaCierre: '',
  observacionesGenerales: '',
  observacionesEspecificas: '',
  observacionesAdicionales: '',
}

export const INIT_ALIMENTOS_BEBIDAS = {
  subcategoria: null,
  tipoDeServicio: null,
  espectaculo: null,
  especialidades: null,
  tiposDeComida: null,
  numeroDeCajones: null,
  mercadoExtranjero: null,
  mercadoNacional: null,
  serviciosAdicionalesList: [],
  ubicacion: null,
  descripcionUbicacion: '',
}

export const INIT_ARRENDADORA_AUTOS = {
  subcategoria: null,
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
  telefono: '',
  tipoEstablecimiento: 0,
  numeroSucursales: '',
  afiliaciones: '',
}

export const HOSPEDAJE_INIT_DATA = {
  subcategoria: null,
  distincionSelected: null,
  porcentajeMercadoNacional: '',
  porcentajeMercadoExtrenjero: '',
  clasificacionObtenidaSelected: null,
  folioDeClasificacion: '',
  tiposDeAlojamientoList: [],
  tiposDeHospedajeList: [],
  ubicacionSelected: null,
  serviciosAdicionalesList: [],
}

export const OPERADORA_MARINA_INIT_DATA = {
  superficieTerrestre: '',
  superficieTotal: '',
  superficieAcuatica: '',
  espaciosAtraqueSelected: null,
  espaciosFondoSelected: null,
  serviciosAdicionalesList: [],
  instalacionesList: [],
}

export const TIEMPOS_COMPARTIDOS_INIT_DATA = {
  ubicacionSelected: null,
  tipoOperacionSelected: null,
  nombreComercial: '',
  categoria: '',
  mercadoNacional: '',
  mercadoExtranjero: '',
  serviciosAdicionalesList: [],
}

export const TRANSPORTISTA_TURISTICO_INIT_DATA = {
  subcategoria: null,
  tipoEstablecimientoSelected: null,
  tipoServicioSelected: null,
  numSucursales: '',
  nombreMatriz: '',
  direcionMatriz: '',
  numDeGuias: '',
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
  DETALLES: 4,
  DOCUMENTOS: 5,
  COMPLETADO: 6,
}

/**
 * Enumerates the types of establishments for the PST process.
 * @enum {number}
 */
export const PST_ENUM = {
  GENERICO: 0, // Default value, it's not a valid PST type
  AGENCIA_VIAJES: 1,
  AGENCIA_SERVICIOS: 2,
  ALIMENTOS_Y_BEBIDAS: 3,
  ARRENDADORA_AUTOS: 4,
  BALNEARIO_ACUATICO: 5,
  CAMPO_GOLF: 6,
  SALVAVIDA: 7,
  GUIA_TURISTICO: 8,
  HOSPEDAJE: 9,
  OPERADORA_NATURALEZA: 10,
  OPERADORA_BUCEO: 11,
  OPERADORA_MARINA: 12,
  PARQUE_TEMATICO: 13,
  SPA: 14,
  TIEMPOS_COMPARTIDOS: 15,
  TOUR_OPERADOR: 16,
  TRANSPORTISTA_TURISTICO: 17,
  VUELO_EN_GLOBO: 18,
}

export const PST_INFO = {
  0: { name: 'Default', icon: 'HelpOutline' },
  1: { name: 'Agencia de Viajes', icon: 'Flight' },
  2: { name: 'Agencia de Servicios', icon: 'RoomService' },
  3: { name: 'Alimentos y Bebidas', icon: 'Restaurant' },
  4: { name: 'Arrendadora de Autos', icon: 'DriveEta' },
  5: { name: 'Balneario Acuático', icon: 'Pool' },
  6: { name: 'Campo de Golf', icon: 'GolfCourse' },
  7: { name: 'Salvavidas', icon: 'BeachAccess' },
  8: { name: 'Guía Turístico', icon: 'Directions' },
  9: { name: 'Hospedaje', icon: 'Hotel' },
  10: { name: 'Operadora de Naturaleza', icon: 'NaturePeople' },
  11: { name: 'Operadora de Buceo', icon: 'BubbleChart' },
  12: { name: 'Operadora Marina', icon: 'DirectionsBoat' },
  13: { name: 'Parque Temático', icon: 'LocalPlay' },
  14: { name: 'Spa', icon: 'Spa' },
  15: { name: 'Tiempos Compartidos', icon: 'Schedule' },
  16: { name: 'Tour Operador', icon: 'Tour' },
  17: { name: 'Transportista Turístico', icon: 'Commute' },
  18: { name: 'Vuelo en Globo', icon: 'FlightTakeoff' },
}

export const STATUS_TRAMITE = {
  EN_PROCESO: 1,
  REVISION: 2,
  RECHAZADO: 3,
  FINALIZADO: 4,
  REVOCADO: 5,
}

export const STATUS_TRAMITE_DROPDOWN = [
  { value: 1, title: 'En proceso' },
  { value: 2, title: 'En revisión' },
  { value: 3, title: 'Rechazado' },
  { value: 4, title: 'Finalizado' },
  { value: 5, title: 'Revocado' },
]

export const STATUS_INFO = {
  1: 'EN PROCESO',
  2: 'REVISION',
  3: 'RECHAZADO',
  4: 'CONCLUIDO',
  5: 'REVOCADO',
}
/**
 * Array containing generic details of PST categories.
 * @type {Array<PST_ENUM>}
 */
export const GENERIC_DETAILS_PST_LIST = [
  PST_ENUM.GENERICO, // Default value
  PST_ENUM.AGENCIA_SERVICIOS,
  PST_ENUM.BALNEARIO_ACUATICO,
  PST_ENUM.CAMPO_GOLF,
  PST_ENUM.SALVAVIDA,
  PST_ENUM.GUIA_TURISTICO,
  PST_ENUM.OPERADORA_NATURALEZA,
  PST_ENUM.PARQUE_TEMATICO,
  PST_ENUM.SPA,
  PST_ENUM.TOUR_OPERADOR,
  PST_ENUM.VUELO_EN_GLOBO,
]

/**
 * Maximum length of photos allowed.
 * @type {number}
 */
export const MAX_PHOTO_LENGTH = 10

export const ROLE_ENUM = {
  ADMIN: 10,
  USER: 20,
}

export const CONFIGURATIONS_APP = {
  LOGO: 1,
  COLOR: 2,
  DIRECTOR: 3,
  FIRMA: 4,
  SELLO: 5,
  FONDO: 6,
  SEGURIDAD: 7,
  REPORTES: 8,
}

export const INIT_DATA_GRAPH = [
  { name: 'Agencia de Viajes', value: 0 },
  { name: 'Agencia de Servicios', value: 0 },
  { name: 'Alimentos y Bebidas', value: 0 },
  { name: 'Arrendadora de Autos', value: 0 },
  { name: 'Balneario Acuático', value: 0 },
  { name: 'Campo de Golf', value: 0 },
  { name: 'Salvavidas', value: 0 },
  { name: 'Guía Turístico', value: 0 },
  { name: 'Hospedaje', value: 0 },
  { name: 'Operadora de Naturaleza', value: 0 },
  { name: 'Operadora de Buceo', value: 0 },
  { name: 'Operadora Marina', value: 0 },
  { name: 'Parque Temático', value: 0 },
  { name: 'Spa', value: 0 },
  { name: 'Tiempos Compartidos', value: 0 },
  { name: 'Tour Operador', value: 0 },
  { name: 'Transportista Turístico', value: 0 },
  { name: 'Vuelo en Globo', value: 0 },
]

export const INIT_DATA_KPIS = {
  total: null,
  finalizado: null,
  rechazado: null,
  revision: null,
  expirado: null,
}
