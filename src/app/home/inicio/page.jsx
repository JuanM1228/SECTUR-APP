'use client'
import { Button } from '@mui/material'
import React from 'react'
import Images from '@/assets/images'
import Image from 'next/image'

const Inicio = () => {
    return (
    <div className='font-Montserrat mx-auto max-w-4xl flex flex-col items-center p-4 gap-2 overflow-y-auto'>
        <h1 className='text-5xl text-center font-bold text-gray border-b-2 border-gray'>REGISTRO NACIONAL DE TURISMO</h1>
        <h2 className='font-bold'>Instrumento de información en donde se deben encontrar los
        prestadores de servicios turísticos para poder operar en el país
        de acuerdo a la ley</h2>
        <div className='gap-2'>
            <Button className='bg-manatee rounded-md text-black mr-4'>Registrate</Button>
            <Button className='bg-manatee rounded-md text-black'>Verifica</Button>
        </div>
        <h2 className='font-bold'>Conoce la oferta turística del país</h2>
        <p>Prestadores de servicios turisticos inscritos en el registro Nacional de Turismo</p>
        <div className="flex">
            <div className="w-1/2 h-24 mr-2">
            <Image alt="logo SECTUR" src={Images.googleplay} className="w-full h-full object-contain"/>
            </div>
            <div className="w-1/2 h-20 ml-2">
            <Image alt="logo SECTUR" src={Images.appstore} className="w-full h-full object-contain"/>
            </div>
        
        </div>
        <p>El Registro Nacional de Turismo, es el catálogo público de prestadores de
        servicios turísticos en el país, el cual constituye el mecanismo por el que el
        Ejecutivo Federal, los Estados y Municipios, podrán contar con información
        sobre los prestadores de servicios turísticos a nivel nacional, con objeto de
        conocer mejor el mercado turístico y establecer comunicación con las
        empresas cuando se requiera.</p>
        <h2 className='font-bold'>¿Eres un Prestador de Servicios Turísticos?</h2>
        <p>Conoce el catálogo de los diferentes servicios turísticos cuyos prestadores de
        servicios turísticos deberán inscribirse al Registro Nacional de Turismo</p>
        <Button className='bg-manatee rounded-md text-black'>Ver Catálogo</Button>
        <h2 className='font-bold'>¿Cuál es el procedimiento para inscribirte o actualizar tu información en
        el Registro Nacional de Turismo?</h2>
        <p>Los prestadores de servicios turísticos, definidos en el catálogo, deberán
        sujetarse a lo establecido en la convocatoria de inscripción al Registro
        Nacional de Turismo</p>
        <Button className='bg-manatee rounded-md text-black'>Ver convocatoria</Button>
        <h2 className='font-bold'>¿Conoces el formato único para los trámites del Registro Nacional de Turismo?</h2>
        <p>Todos los prestadores de servicios turísticos que realicen un trámite ante el
        Registro Nacional de Turismo (inscripción, actualización y rectificación de
        datos, renovación o reposición de certificado, expedición de nuevos
        certificados y cancelación de inscripción) deberán llenar el formato único</p>
        <Button className='bg-manatee rounded-md text-black'>Ver convocatoria</Button>

    </div>
    )
}

export default Inicio
