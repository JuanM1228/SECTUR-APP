'use client'
import React, { useState } from 'react'

import DatePickerCustom from '../common/DatePicker'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Image from 'next/image'

import { useAuthStore } from '@/store/auth'
import { useHttpClient } from '@/hooks/useHttpClient'
import { INIT_DATA_REGISTER_USER } from '@/utils/constants'
import { validate } from '@/utils/validation'

import Icons from '@/assets/icons'
import Images from '@/assets/images'

const Register = ({ showRegister, setShowRegister }) => {
  const { sendRequest, isLoading } = useHttpClient()
  const setToken = useAuthStore(state => state.setToken)
  const setProfile = useAuthStore(state => state.setProfile)
  const [register, setRegister] = useState(INIT_DATA_REGISTER_USER)

  const [error, setError] = useState(INIT_DATA_REGISTER_USER)

  const onHandleChange = ({ target: { name, value } }) => {
    setRegister({ ...register, [name]: value })
  }

  const registerHandler = async e => {
    e.preventDefault()
    // const { hasError, errors } = validate.registerForm(register)
    onRegisterHandler(register)
    // if (hasError) {
    //   setError(errors)
    // } else {
    //   setError(INIT_DATA_REGISTER_USER)
    //   onRegisterHandler()
    // }
  }

  const onRegisterHandler = async body => {
    try {
      const url = '/api/autenticacion/registrar'
      const res = await sendRequest(url, {
        method: 'POST',
        body: body,
      })
      if (res.success) {
        router.push('/home/tramites')
        // setToken(res.result.token)
        // setProfile(res.result.user)
      }
    } catch (e) {
      console.log(e)
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
          value={register.name}
        />

        <Input
          label="Apellido Paterno"
          name="paternalSurname"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.paternalSurname !== ''}
          helpText={error.paternalSurname}
          value={register.paternalSurname}
        />

        <Input
          label="Apellido Materno"
          name="maternalSurname"
          fullWidth
          type="text"
          onChange={onHandleChange}
          error={error.maternalSurname !== ''}
          helpText={error.maternalSurname}
          value={register.maternalSurname}
        />

        <DatePickerCustom
          label="Fecha de nacimiento"
          name="birthDate"
          onChange={onHandleChange}
          error={error.birthDate !== ''}
          helpText={error.birthDate}
          value={register.birthDate}
        />

        <Input
          label="Email"
          name="email"
          fullWidth
          IconComponent={Icons.Email}
          type="email"
          onChange={onHandleChange}
          error={error.email !== ''}
          helpText={error.email}
          value={register.email}
        />

        <Input
          label="Password"
          name="password"
          fullWidth
          IconComponent={Icons.Lock}
          type="password"
          onChange={onHandleChange}
          error={error.password !== ''}
          helpText={error.password}
          value={register.password}
        />

        <Input
          label="Verificar Contraseña"
          name="verifyPassword"
          fullWidth
          IconComponent={Icons.Lock}
          onChange={onHandleChange}
          error={error.verifyPassword !== ''}
          helpText={error.verifyPassword}
          type="password"
          value={register.verifyPassword}
        />

        <Button content="Registarme" type="submit" />
      </form>
    </div>
  )
}

export default Register
