'use client'
import React, { useState } from 'react'

import DatePickerCustom from '../common/DatePicker'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Image from 'next/image'

import { INIT_DATA_REGISTER_USER } from '@/utils/constants'
import { validate } from '@/utils/validation'

import Icons from '@/assets/icons'
import Images from '@/assets/images'

const Register = ({ showRegister, setShowRegister }) => {
  const [register, setRegister] = useState(INIT_DATA_REGISTER_USER)

  const [error, setError] = useState(INIT_DATA_REGISTER_USER)

  const onHandleChange = ({ target: { name, value } }) => {
    setRegister({ ...register, [name]: value })
  }

  const registerHandler = async e => {
    e.preventDefault()
    console.log(register)
    const { hasError, errors } = validate.registerForm(register)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_DATA_REGISTER_USER)
    }
  }

  return (
    <div
      className={`flex flex-col sm:flex-row rounded-lg shadow-xl h-auto t-ease min-w-fit m-4 ${
        showRegister ? '' : 'hide'
      }`}>
      <section className="flex rounded-t-lg sm:rounded-s-lg flex-col justify-center items-center gap-10 bg-merino w-full sm:w-1/2 p-10 sm:p-14">
        <Image alt="logo SECTUR" src={Images.logoSECTUR} className="w-3/4" />

        <p className="font-GMX font-bold text-2xl sm:text-3xl text-center text-twine">
          Registro Nacional de Turismo
        </p>
        {/* <p className="font-GMX font-bold text-4xl text-gray">¡Bienvenido!</p> */}
        <Button
          content="Iniciar Sesión"
          className="w-full sm:w-auto"
          onClick={() => setShowRegister(false)}
        />
      </section>

      <form
        className="grow flex flex-col items-center rounded-e-xl gap-5 p-10 sm:p-14"
        onSubmit={registerHandler}>
        <h1 className="font-GMX font-bold text-2xl text-gray text-center">
          Crear una cuenta
        </h1>

        <Input
          label="Nombre(s)"
          name="name"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.name !== ''}
          helpText={error.name}
        />

        <Input
          label="Apellido Paterno"
          name="paternalSurname"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.paternalSurname !== ''}
          helpText={error.paternalSurname}
        />

        <Input
          label="Apellido Materno"
          name="maternalSurname"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.maternalSurname !== ''}
          helpText={error.maternalSurname}
        />

        <DatePickerCustom
          label="Fecha de nacimiento"
          name="birthDate"
          onChange={onHandleChange}
          error={error.birthDate !== ''}
          helpText={error.birthDate}
        />

        <Input
          label="Email"
          name="email"
          fullWidth
          icon={Icons.Email}
          type="email"
          onChange={onHandleChange}
          error={error.email !== ''}
          helpText={error.email}
        />

        <Input
          label="Password"
          name="password"
          fullWidth
          icon={Icons.Lock}
          type="password"
          onChange={onHandleChange}
          error={error.password !== ''}
          helpText={error.password}
        />

        <Input
          label="Verificar Contraseña"
          name="verifyPassword"
          fullWidth
          icon={Icons.Lock}
          onChange={onHandleChange}
          error={error.verifyPassword !== ''}
          helpText={error.verifyPassword}
          type="password"
        />

        <Button content="Registarme" type="submit" onClick={registerHandler} />
      </form>
    </div>
  )
}

export default Register
