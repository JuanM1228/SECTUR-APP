'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Image from 'next/image'

import { Snackbar, Alert } from '@mui/material'

import { useHttpClient } from '@/hooks/useHttpClient'
import { INIT_DATA_LOGIN } from '@/utils/constants'
import { validate } from '@/utils/validation'

import Icons from '@/assets/icons'
import Images from '@/assets/images'

const SingIn = ({ showRegister, setShowRegister }) => {
  const [user, setUser] = useState(INIT_DATA_LOGIN)
  const [error, setError] = useState(INIT_DATA_LOGIN)
  const [showAlert, setShowAlert] = useState(false)
  const { sendRequest, isLoading } = useHttpClient()
  const setToken = useAuthStore(state => state.setToken)
  const setProfile = useAuthStore(state => state.setProfile)
  const router = useRouter()

  const onHandleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const loginHandler = async data => {
    try {
      const url = '/api/autenticacion/login'

      const res = await sendRequest(url, {
        method: 'POST',
        body: data,
      })
      if (res.success) {
        router.push('/home/tramites')
        setToken(res.result.token)
        setProfile(res.result.user)
      } else {
        setShowAlert(true)
      }
    } catch (e) {
      console.log(e)
      setShowAlert(true)
    }
  }

  const onHandleSubmit = e => {
    e.preventDefault()
    const { hasError, errors } = validate.loginForm(user)
    if (hasError) {
      setError(errors)
    } else {
      setError(INIT_DATA_LOGIN)
      loginHandler(user)
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
          IconComponent={Icons.Person}
          type="email"
          onChange={onHandleChange}
          error={error.email !== ''}
          helpText={error.email}
          value={user.email}
        />

        <Input
          label="Password"
          name="password"
          IconComponent={Icons.Key}
          type="password"
          onChange={onHandleChange}
          error={error.password !== ''}
          helpText={error.password}
          value={user.password}
        />

        <Button content="Iniciar Sesión" type="submit" />
      </form>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setShowAlert(false)}>
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          sx={{ width: '100%' }}>
          USUARIO O CONTRASEÑA INCORRECTO
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SingIn
