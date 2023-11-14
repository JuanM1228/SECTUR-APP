'use client'
import React from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Image from 'next/image'

import { Person, Key } from '@mui/icons-material'
import Images from '@/assets/images'

const SingIn = ({ showRegister, setShowRegister }) => {
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
        {/* <p className="font-GMX font-bold text-4xl text-gray">¡Bienvenido!</p> */}
        <Button
          content="Registrarme"
          className="w-full sm:w-auto"
          onClick={() => setShowRegister(true)}
        />
      </section>

      <section className="grow flex flex-col items-center rounded-e-xl gap-10 p-10 sm:p-14">
        <h1 className="font-GMX font-bold text-2xl text-gray text-center">
          Inicio de sesión
        </h1>

        <Input label="Email" fullWidth icon={<Person />} type="email" />

        <Input label="Password" fullWidth icon={<Key />} type="password" />

        <Button content="Iniciar Sesión" />
      </section>
    </div>
  )
}

export default SingIn
