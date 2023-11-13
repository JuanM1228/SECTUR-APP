'use client'
import React from 'react'

import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'
import Input from '@/components/common/Input'
import Image from 'next/image'

import { Person, Key } from '@mui/icons-material'
import Images from '@/assets/images'
import Colors from '@/assets/colors'

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-bandera bg-cover bg-center">
      <div className="flex rounded-lg shadow-xl w-1/2 h-1/2">
        <section className="flex flex-col justify-center items-center gap-10 bg-merino w-1/2">
          <Image alt="logo SECTUR" src={Images.logoSECTUR} className="w-3/4" />

          <p className="font-GMX font-bold text-4xl text-gray">¡Bienvenido!</p>
          <Button title="Registrarme" />
        </section>

        <section className="grow flex flex-col items-center gap-6 px-5">
          <h1 className="font-GMX font-bold text-2xl mt-14 text-gray text-center">
            Inicio de sesión
          </h1>

          <Input label="Email" fullWidth icon={<Person />} type="email" />

          <Input label="Password" fullWidth icon={<Key />} type="password" />
        </section>

        <div></div>
      </div>
    </div>
  )
}

export default Login
