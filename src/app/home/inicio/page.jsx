'use client'
import Button from '@/components/common/Button'
import Icons from '@/assets/icons'
import React from 'react'
import Images from '@/assets/images'
import Image from 'next/image'
import  { useRouter } from 'next/navigation'

const Inicio = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/')
    }
    const handleHomeClick = () => {
        router.push('/home')
    }
 
    return (
      <>
        <div
        className="flex flex-col sm:flex-row rounded-lg shadow-xl h-auto t-ease min-w-fit m-40">
        <section className="flex rounded-t-lg sm:rounded-s-lg flex-col justify-center items-center gap-10 bg-merino w-full sm:w-1/2 p-10 sm:p-14">
          <Image alt="logo SECTUR" src={Images.logoSECTUR} className="w-3/4" />
  
          <p className="font-GMX font-bold text-2xl sm:text-3xl text-center text-twine">
            Registro Nacional de Turismo
          </p>
        </section>
  
        <div
          className="grow flex flex-col items-center rounded-e-xl gap-10 p-10 sm:p-14"
        >
          <h1 className="font-GMX font-semibold text-2xl text-gray text-center">
            ¿Qué deseas hacer?
          </h1>
            
          <Button startIcon={<Icons.Search style={{ fontSize: 35 }}/>} content="Consultar" onClick={handleHomeClick}/>
          <Button startIcon={<Icons.Check style={{ fontSize: 35 }}/>}content="Inscríbete" onClick={handleButtonClick} />
          <Button startIcon={<Icons.Sync style={{ fontSize: 35 }}/>}content="Renovar" onClick={handleButtonClick}/>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="mr-4">
          <Image src={Images.appstore} alt="App Store" width={150} height={100} />
        </div>
        <div>
          <Image src={Images.googleplay} alt="Play Store" width={170} height={150} />
        </div>
      </div>
      </>
    )
}

export default Inicio
