'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useHttpClient } from '@/hooks/useHttpClient'

import Contacto from '@/components/solicitudes/Contacto'
import DatosGenerales from '@/components/solicitudes/DatosGenerales'
import InformacionLegal from '@/components/solicitudes/InformacionLegal'
import AgenciaViaje from '@/components/solicitudes/formulariosPST/AgenciaViaje'
import Documents from '@/components/solicitudes/Documents'
import OperadoraBuceo from '@/components/solicitudes/formulariosPST/OperadoraBuceo'
import DetalleGenerico from '@/components/solicitudes/formulariosPST/DetalleGenerico'
import ArrendadoraAutos from '@/components/solicitudes/formulariosPST/ArrendadoraAutos'
import AlimentosBebidas from '@/components/solicitudes/formulariosPST/AlimentosBebidas'
import ProcedureCompleted from '@/components/solicitudes/ProcedureCompleted'

const Domicilio = dynamic(() => import('@/components/solicitudes/Domicilio'), {
  ssr: false,
})
import { GENERIC_DETAILS_PST_LIST, PST_ENUM } from '@/utils/constants'
import OperadoraMarina from '@/components/solicitudes/formulariosPST/OperadoraMarina'
import Hospedaje from '@/components/solicitudes/formulariosPST/Hospedaje'
import TiemposCompartidos from '@/components/solicitudes/formulariosPST/TiemposCompartidos'
import TransportistaTuristico from '@/components/solicitudes/formulariosPST/TransportistaTuristico'
import Stepper from '@/components/common/Stepper'

const Solicitudes = () => {
  const params = useParams()
  const { sendRequest, isLoading } = useHttpClient()
  const [idSolicitud, setIdSolicitud] = useState(params.idSolicitud)
  const [coloniaActual, setColoniaActual] = useState('')
  console.log(coloniaActual)
  const [register, setRegister] = useState({
    datosGenerales: null,
    domicilio: null,
    contacto: null,
    informacionLegal: null,
    detallesPST: null,
  })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!params.idSolicitud) return
    getRegisterData(params.idSolicitud)
  }, [])

  const getRegisterData = async idSolicitud => {
    const url = `/api/registro/detalle-tramite/${idSolicitud}`
    try {
      const res = await sendRequest(url)
      console.log('DATA RODO', res.result.data)
      if (res.success) {
        setRegister(res.result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onNextStepHandler = () => setStep(step + 1)

  const onBackStepHandler = () => setStep(step - 1)

  const onSubmitHandler = event => {
    event.preventDefault()
  }

  const tipoPST = register.datosGenerales?.tipoPST
  return (
    <div className="flex flex-col gap-4 mt-8">
      <Stepper activeStep={step} />
      <div className=" flex flex-col justify-start items-center relative ">
        <DatosGenerales
          step={step}
          datosGenerales={register.datosGenerales}
          nextStep={onNextStepHandler}
          register={register}
          setRegister={setRegister}
          idSolicitud={idSolicitud}
          setIdSolicitud={setIdSolicitud}
        />

        <Domicilio
          step={step}
          dataDomicilio={register.domicilio}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
          idSolicitud={idSolicitud}
          setColoniaActual={setColoniaActual}
          coloniaActual={coloniaActual}
        />

        <Contacto
          step={step}
          dataContacto={register.contacto}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
          idSolicitud={idSolicitud}
        />

        <InformacionLegal
          step={step}
          dataInformacionLegal={register.informacionLegal}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
          idSolicitud={idSolicitud}
        />
        <Documents
          step={step}
          pstId={tipoPST}
          solicitudId={idSolicitud}
          onSubmitHandler={onSubmitHandler}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          coloniaActual={coloniaActual}
          register={register}
        />
        {GENERIC_DETAILS_PST_LIST.includes(tipoPST) && (
          <DetalleGenerico
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
            pstId={tipoPST}
          />
        )}
        {tipoPST === PST_ENUM.AGENCIA_VIAJES && (
          <AgenciaViaje
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        {tipoPST === PST_ENUM.ALIMENTOS_Y_BEBIDAS && (
          <AlimentosBebidas
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        {tipoPST === PST_ENUM.ARRENDADORA_AUTOS && (
          <ArrendadoraAutos
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        {tipoPST === PST_ENUM.HOSPEDAJE && (
          <Hospedaje
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        {tipoPST === PST_ENUM.OPERADORA_BUCEO && (
          <OperadoraBuceo
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        {tipoPST === PST_ENUM.OPERADORA_MARINA && (
          <OperadoraMarina
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        {tipoPST === PST_ENUM.TIEMPOS_COMPARTIDOS && (
          <TiemposCompartidos
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        {tipoPST === PST_ENUM.TRANSPORTISTA_TURISTICO && (
          <TransportistaTuristico
            step={step}
            dataPst={register.detallesPST}
            nextStep={onNextStepHandler}
            backStep={onBackStepHandler}
            register={register}
            setRegister={setRegister}
            idSolicitud={idSolicitud}
          />
        )}
        <ProcedureCompleted step={step} />
      </div>
    </div>
  )
}

export default Solicitudes
