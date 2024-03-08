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
export const INIT_FILTROS_USER_DATA = {
  id: '',
  name: '',
  email: '',
  estados: [],
  token: '',
}
export const INIT_DATA_REGISTER_USER = {
  name: '',
  paternalSurname: '',
  maternalSurname: '',
  email: '',
  password: '',
  verifyPassword: '',
  birthDate: '',
  submenus: '',
  subadmin: 0,
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
  tipoTramite: null,
  nacionalidad: '',
  tipoVialidad: null,
  asentamiento: null,
  fechaApertura: '',
}

export const INIT_DATA_DOMICILIO = {
  codigoPostal: null,
  estado: '',
  municipio: '',
  colonia: null,
  calle: '',
  numInterior: '',
  numExterior: '',
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
  7: 'REVISADO',
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

export const TIPOS_TRAMITES_DROPDOWN = [
  { value: 1, title: 'Inscripción' },
  {
    value: 2,
    title:
      'Expedición de nuevo certificado por cambio de domicilio, razón social o nombre comercial',
  },
  {
    value: 5,
    title: 'Reposición de certificado (robo, extravío o destrucción)',
  },
  {
    value: 6,
    title: 'Renovación (idéntico a la inscripción se hace cada dos años)',
  },
  { value: 7, title: 'Cancelación (constancia de baja)' },
  {
    value: 8,
    title: 'Rectificación (discrepancia de información en el certificado)',
  },
]

export const TIPOS_TRAMITES_OBJETO = {
  1: 'Inscripción',
  2: 'Expedición de nuevo certificado por cambio de domicilio',
  3: 'Razón social o nombre comercial',
  4: 'Expedición de nuevo certificado por incluir la categoria obtenida en el sistema de alificación hotelero',
  5: 'Reposición de certificado (robo, extravío o destrucción)',
  6: 'Renovación (idéntico a la inscripción se hace cada dos años)',
  7: 'Cancelación (constancia de baja)',
  8: 'Rectificación (discrepancia de información en el certificado)',
}

export const TIPOS_VIALIDAD_DROPDOWN = [
  { value: 9, title: 'Ampliación' },
  { value: 10, title: 'Andador' },
  { value: 11, title: 'Avenida' },
  { value: 12, title: 'Boulevard' },
  { value: 13, title: 'Calle' },
  { value: 14, title: 'Callejón' },
  { value: 15, title: 'Calzada' },
  { value: 16, title: 'Cerrada' },
  { value: 17, title: 'Circuito' },
  { value: 18, title: 'Circunvalación' },
  { value: 19, title: 'Continuación' },
  { value: 20, title: 'Corredor' },
  { value: 21, title: 'Diagonal' },
  { value: 22, title: 'Eje Vial' },
  { value: 23, title: 'Pasaje peatonal' },
  { value: 24, title: 'Periférico' },
  { value: 25, title: 'Privada' },
  { value: 26, title: 'Prolongación' },
  { value: 27, title: 'Retorno' },
  { value: 28, title: 'Viaducto' },
  { value: 29, title: 'Carretera' },
]

export const TIPOS_VIALIDAD_OBJETO = {
  9: 'Ampliación',
  10: 'Andador',
  11: 'Avenida',
  12: 'Boulevard',
  13: 'Calle',
  14: 'Callejón',
  15: 'Calzada',
  16: 'Cerrada',
  17: 'Circuito',
  18: 'Circunvalación',
  19: 'Continuación',
  20: 'Corredor',
  21: 'Diagonal',
  22: 'Eje Vial',
  23: 'Pasaje peatonal',
  24: 'Periférico',
  25: 'Privada',
  26: 'Prolongación',
  27: 'Retorno',
  28: 'Viaducto',
}

export const TIPOS_ASENTAMIENTO_DROPDOWN = [
  { value: 29, title: 'Aeropuerto' },
  { value: 30, title: 'Ampliación' },
  { value: 31, title: 'Barrio' },
  { value: 32, title: 'Cantón' },
  { value: 33, title: 'Cd.' },
  { value: 34, title: 'Cd. Industrial' },
  { value: 35, title: 'Colonia' },
  { value: 36, title: 'Condominio' },
  { value: 37, title: 'Conjunto habitacional' },
  { value: 38, title: 'Corredor industrial' },
  { value: 39, title: 'Coto' },
  { value: 40, title: 'Cuartel' },
  { value: 41, title: 'Ejido' },
  { value: 42, title: 'Exhacienda' },
  { value: 43, title: 'Fracción' },
  { value: 44, title: 'Fraccionamiento' },
  { value: 45, title: 'Granja' },
  { value: 46, title: 'Hacienda' },
  { value: 47, title: 'Ingenio' },
  { value: 48, title: 'Manzana' },
  { value: 49, title: 'Paraje' },
  { value: 50, title: 'Parque industrial' },
  { value: 51, title: 'Privada' },
  { value: 52, title: 'Prolongación' },
  { value: 53, title: 'Pueblo' },
  { value: 54, title: 'Puerto' },
  { value: 55, title: 'Ranchería' },
  { value: 56, title: 'Rancho' },
  { value: 57, title: 'Región' },
  { value: 58, title: 'Residencial' },
  { value: 59, title: 'Rinconada' },
  { value: 60, title: 'Sección' },
  { value: 61, title: 'Sector' },
  { value: 62, title: 'Supermanzana' },
  { value: 63, title: 'Unidad' },
  { value: 64, title: 'Unidad habitacional' },
  { value: 65, title: 'Villa' },
  { value: 66, title: 'Zona federal' },
  { value: 67, title: 'Zona industrial' },
  { value: 68, title: 'Zona militar' },
  { value: 69, title: 'Zona naval' },
  { value: 70, title: 'Kilómetro' },
]

export const TIPOS_ASENTAMIENTO_OBJETO = {
  29: 'Aeropuerto',
  30: 'Ampliación',
  31: 'Barrio',
  32: 'Cantón',
  33: 'Cd.',
  34: 'Cd. Industrial',
  35: 'Colonia',
  36: 'Condominio',
  37: 'Conjunto habitacional',
  38: 'Corredor industrial',
  39: 'Coto',
  40: 'Cuartel',
  41: 'Ejido',
  42: 'Exhacienda',
  43: 'Fracción',
  44: 'Fraccionamiento',
  45: 'Granja',
  46: 'Hacienda',
  47: 'Ingenio',
  48: 'Manzana',
  49: 'Paraje',
  50: 'Parque industrial',
  51: 'Privada',
  52: 'Prolongación',
  53: 'Pueblo',
  54: 'Puerto',
  55: 'Ranchería',
  56: 'Rancho',
  57: 'Región',
  58: 'Residencial',
  59: 'Rinconada',
  60: 'Sección',
  61: 'Sector',
  62: 'Supermanzana',
  63: 'Unidad',
  64: 'Unidad habitacional',
  65: 'Villa',
  66: 'Zona federal',
  67: 'Zona industrial',
  68: 'Zona militar',
  69: 'Zona naval',
}

export const OPTIONS_ESTADOS = [
  { value: 1, title: 'Aguascalientes' },
  { value: 2, title: 'Baja California' },
  { value: 3, title: 'Baja California Sur' },
  { value: 4, title: 'Campeche' },
  { value: 5, title: 'Coahuila de Zaragoza' },
  { value: 6, title: 'Colima' },
  { value: 7, title: 'Chiapas' },
  { value: 8, title: 'Chihuahua' },
  { value: 9, title: 'Ciudad de Mexico' },
  { value: 10, title: 'Durango' },
  { value: 11, title: 'Guanajuato' },
  { value: 12, title: 'Guerrero' },
  { value: 13, title: 'Hidalgo' },
  { value: 14, title: 'Jalisco' },
  { value: 15, title: 'México' },
  { value: 16, title: 'Michoacán de Ocampo' },
  { value: 17, title: 'Morelos' },
  { value: 18, title: 'Nayarit' },
  { value: 19, title: 'Nuevo León' },
  { value: 20, title: 'Oaxaca' },
  { value: 21, title: 'Puebla' },
  { value: 22, title: 'Querétaro' },
  { value: 23, title: 'Quintana Roo' },
  { value: 24, title: 'San Luis Potosí' },
  { value: 25, title: 'Sinaloa' },
  { value: 26, title: 'Sonora' },
  { value: 27, title: 'Tabasco' },
  { value: 28, title: 'Tamaulipas' },
  { value: 29, title: 'Tlaxcala' },
  { value: 30, title: 'Veracruz de Ignacio de la Llave' },
  { value: 31, title: 'Yucatán' },
  { value: 32, title: 'Zacatecas' },
]
