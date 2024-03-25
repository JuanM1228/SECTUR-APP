'use client'
import Button from '@/components/common/Button'
import Icons from '@/assets/icons'
import React from 'react'
import Images from '@/assets/images'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Inicio = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push('/login')
  }
  const handleHomeClick = () => {
    router.push('/consulta')
  }
  const handleRenovarClick = () => {
    router.push('/home/tramites')
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="flex flex-col sm:flex-row rounded-lg shadow-xl h-auto t-ease min-w-fit mt-20">
        <section className="flex rounded-t-lg sm:rounded-s-lg flex-col justify-center items-center gap-10 bg-merino w-full sm:w-1/2 p-10 sm:p-14">
          <Image alt="logo SECTUR" src={Images.logoSECTUR} className="w-80" />

          <p className="font-GMX font-bold text-2xl sm:text-3xl text-center text-twine">
            Registro Nacional de Turismo
          </p>
        </section>

        <div className="grow flex flex-col items-center rounded-e-xl gap-10 p-10 sm:p-14 ">
          <h1 className="font-Montserrat font-semibold text-2xl text-gray text-center">
            ¿Qué deseas hacer?
          </h1>

          <section className=" w-full flex flex-col gap-4 ">
            <h1 className="text-center text-xl font-Montserrat">General</h1>
            <Button
              startIcon={<Icons.Search style={{ fontSize: 35 }} />}
              content="Consulta"
              onClick={handleHomeClick}
            />
          </section>

          <section className="flex flex-col w-full gap-4 border-t-2 border-t-manatee border-opacity-40 pt-4">
            <h1 className="text-center text-xl font-Montserrat">
              Prestadores de Servicios Turísticos
            </h1>
            <Button
              startIcon={<Icons.Check style={{ fontSize: 35 }} />}
              content="Inscríbete"
              onClick={handleLoginClick}
            />
            <Button
              startIcon={<Icons.Sync style={{ fontSize: 35 }} />}
              content="Renueva"
              onClick={handleRenovarClick}
            />

            <p
              className="text-blue underline text-center cursor-pointer"
              onClick={handleLoginClick}>
              Panel de Administrador
            </p>
          </section>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <a
          href="https://rnt.sectur.gob.mx/public/condiciones.html"
          target="_blank"
          rel="noopener noreferrer">
          Términos y condiciones
        </a>
        .
      </div>
    </div>
  )
}

export default Inicio
