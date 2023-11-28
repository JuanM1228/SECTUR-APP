'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import Contacto from '@/components/solicitudes/Contacto'
import DatosGenerales from '@/components/solicitudes/DatosGenerales'
import InformacionLegal from '@/components/solicitudes/InformacionLegal'

import Icons from '@/assets/icons'
import Stepper from '@/components/common/Stepper'

const Domicilio = dynamic(() => import('@/components/solicitudes/Domicilio'), {
  ssr: false,
})

const Solicitudes = () => {
  const [step, setStep] = useState(0)

  const [register, setRegister] = useState({
    datosGenerales: null,
    domicilio: null,
    contacto: null,
    informacionLegal: null,
  })

  const onNextStepHandler = () => setStep(step + 1)

  const onBackStepHandler = () => setStep(step - 1)

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col justify-start sm:justify-center sm:items-center ">
      {step === 0 && (
        <DatosGenerales
          step={step}
          datosGenerales={register.datosGenerales}
          nextStep={onNextStepHandler}
        />
      )}
      {step === 1 && (
        <Domicilio
          step={step}
          dataDomicilio={register.domicilio}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
        />
      )}

      {/* <Contacto />
      <InformacionLegal /> */}
    </div>
  )
}

export default Solicitudes
