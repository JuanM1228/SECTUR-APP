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
