'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import Contacto from '@/components/solicitudes/Contacto'
import DatosGenerales from '@/components/solicitudes/DatosGenerales'
import InformacionLegal from '@/components/solicitudes/InformacionLegal'
import AgenciaViaje from '@/components/solicitudes/formulariosPST/AgenciaViaje'
import OperadoraBuceo from '@/components/solicitudes/formulariosPST/OperadoraBuceo'
import DetalleGenerico from '@/components/solicitudes/formulariosPST/DetalleGenerico'
import ArrendadoraAutos from '@/components/solicitudes/formulariosPST/ArrendadoraAutos'
import AlimentosBebidas from '@/components/solicitudes/formulariosPST/AlimentosBebidas'

const Domicilio = dynamic(() => import('@/components/solicitudes/Domicilio'), {
  ssr: false,
})

import Icons from '@/assets/icons'
import { GENERIC_DETAILS_PST_ARRAY } from '@/utils/constants'

const Solicitudes = () => {
  const [step, setStep] = useState(4)

  const [register, setRegister] = useState({
    datosGenerales: null,
    domicilio: null,
    contacto: null,
    informacionLegal: null,
    detallePst: null,
  })
  const onNextStepHandler = () => setStep(step + 1)

  const onBackStepHandler = () => setStep(step - 1)

  const tipoPST = register.datosGenerales?.tipoPST
  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col justify-start  sm:items-center ">
      <DatosGenerales
        step={step}
        datosGenerales={register.datosGenerales}
        nextStep={onNextStepHandler}
        register={register}
        setRegister={setRegister}
      />

      <Domicilio
        step={step}
        dataDomicilio={register.domicilio}
        nextStep={onNextStepHandler}
        backStep={onBackStepHandler}
        register={register}
        setRegister={setRegister}
      />

      <Contacto
        step={step}
        dataContacto={register.contacto}
        nextStep={onNextStepHandler}
        backStep={onBackStepHandler}
        register={register}
        setRegister={setRegister}
      />

      <InformacionLegal
        step={step}
        dataInformacionLegal={register.informacionLegal}
        nextStep={onNextStepHandler}
        backStep={onBackStepHandler}
        register={register}
        setRegister={setRegister}
      />

      {tipoPST === 1 && (
        <AgenciaViaje
          step={step}
          dataPst={register.detallePst}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
        />
      )}

      {GENERIC_DETAILS_PST_ARRAY.includes(tipoPST) && (
        <DetalleGenerico
          step={step}
          dataPst={register.detallePst}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
        />
      )}

      {tipoPST === 3 && (
        <AlimentosBebidas
          step={step}
          dataPst={register.detallePst}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
        />
      )}

      {tipoPST === 4 && (
        <ArrendadoraAutos
          step={step}
          dataPst={register.detallePst}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
        />
      )}

      {tipoPST === 11 && (
        <OperadoraBuceo
          step={step}
          dataPst={register.detallePst}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
        />
      )}
    </div>
  )
}

export default Solicitudes
