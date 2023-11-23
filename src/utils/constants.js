import ENV from '../../env.json'

export const URL_API_BASE = `${ENV.API_URL}/api`

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
