const email = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

const hasText = value => value?.trim() !== ''

const loginForm = data => {
  let err = {
    email: '',
    password: '',
  }
  console.log(data)
  console.log(!hasText(data.paswword))

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

export const validate = {
  email,
  loginForm,
}
