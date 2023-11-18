'use client'
import React, { useState } from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Image from 'next/image'

import { URL_API_BASE } from '@/utils/constants'
import { validate } from '@/utils/validation'

import { Person, Key } from '@mui/icons-material'
import Images from '@/assets/images'

const SingIn = ({ showRegister, setShowRegister }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState({
    email: '',
    password: '',
  })

  const { isLoading, sendRequest } = useHttpClient()

  const onHandleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const loginHandler = async data => {
    try {
      //TODO: REQUEST HOOK
    } catch (e) {}
  }

  const onHandleSubmit = e => {
    e.preventDefault()
    const { hasError, errors } = validate.loginForm(user)
    if (hasError) {
      setError(errors)
    } else {
      setError({
        email: '',
        password: '',
      })
    }
  }

  return (
    <div
      className={`flex flex-col sm:flex-row rounded-lg shadow-xl h-auto t-ease min-w-fit m-4 ${
        showRegister ? 'hide' : ''
      }`}>
      <section className="flex rounded-t-lg sm:rounded-s-lg flex-col justify-center items-center gap-10 bg-merino w-full sm:w-1/2 p-10 sm:p-14">
        <Image alt="logo SECTUR" src={Images.logoSECTUR} className="w-3/4" />

        <p className="font-GMX font-bold text-2xl sm:text-3xl text-center text-twine">
          Registro Nacional de Turismo
        </p>
        <Button
          content="Registrarme"
          className="w-full sm:w-auto"
          onClick={() => setShowRegister(true)}
        />
      </section>

      <form
        className="grow flex flex-col items-center rounded-e-xl gap-10 p-10 sm:p-14"
        onSubmit={onHandleSubmit}>
        <h1 className="font-GMX font-bold text-2xl text-gray text-center">
          Inicio de sesión
        </h1>

        <Input
          label="Email"
          name="email"
          fullWidth
          icon={<Person />}
          type="email"
          onChange={onHandleChange}
          error={error.email !== ''}
          helpText={error.email}
        />

        <Input
          label="Password"
          name="password"
          fullWidth
          icon={<Key />}
          type="password"
          onChange={onHandleChange}
          error={error.password !== ''}
          helpText={error.password}
        />

        <Button content="Iniciar Sesión" type="submit" />
      </form>
    </div>
  )
}

export default SingIn
