'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import Contacto from '@/components/solicitudes/Contacto'
import DatosGenerales from '@/components/solicitudes/DatosGenerales'
import InformacionLegal from '@/components/solicitudes/InformacionLegal'
import AgenciaViaje from '@/components/solicitudes/formulariosPST/AgenciaViaje'
import Detalles from '@/components/solicitudes/Detalles'
import Stepper from '@/components/common/Stepper'
import Documents from '@/components/solicitudes/Documents'
import OperadoraBuceo from '@/components/solicitudes/formulariosPST/OperadoraBuceo'
import DetalleGenerico from '@/components/solicitudes/formulariosPST/DetalleGenerico'
import ArrendadoraAutos from '@/components/solicitudes/formulariosPST/ArrendadoraAutos'
import AlimentosBebidas from '@/components/solicitudes/formulariosPST/AlimentosBebidas'

const documentsList = [
  {
    documentId: '232342323',
    title:
      'Escritura pública del inmueble, contrato de arrendamiento o contrato de comodato',
    subtitle:
      'Documento que acredite la posesión legal o uso del inmueble donde realiza la actividad',
    fileTypes: '',
    isRequired: true,
  },
  {
    documentId: '2323423323',
    title: 'Identificación oficial del promvente',
    subtitle:
      'Credencial de elector (INE), cédula profesional, pasaporte del propietario o representante legal',
    fileTypes: '',
    isRequired: true,
  },
  {
    documentId: '2322342323',
    title: 'Comprobante de domicilio',
    subtitle:
      'Recibo de agua, luz, teléfono, predial, etc., del domicilio donde se realiza la actividad',
    fileTypes: '',
    isRequired: true,
  },
  {
    documentId: '2232342323',
    title: 'Formato firmado por el propietario o representante legal',
    subtitle:
      'Formato único para los trámites del Registro Nacional de Turismo',
    fileTypes: '',
    isRequired: true,
  },
  {
    documentId: '1132342323',
    title: 'Registro Federal de Contribuyentes RFC (Persona Física o Moral)',
    subtitle:
      'Documento que acredita la actividad lícita del solicitante de servicios turísticos',
    fileTypes: '',
    isRequired: true,
  },
  {
    documentId: '1132342324',
    title:
      'Acta Constitutiva (Persona Moral). Persona Física deberá adjuntar RFC',
    subtitle: 'Documento que acredita la legal constitución de la empresa',
    fileTypes: '',
    isRequired: true,
  },
]

const Domicilio = dynamic(() => import('@/components/solicitudes/Domicilio'), {
  ssr: false,
})

import { GENERIC_DETAILS_PST_LIST, PST_ENUM } from '@/utils/constants'
import OperadoraMarina from '@/components/solicitudes/formulariosPST/OperadoraMarina'
import Hospedaje from '@/components/solicitudes/formulariosPST/Hospedaje'
import TiemposCompartidos from '@/components/solicitudes/formulariosPST/TiemposCompartidos'
import TransportistaTuristico from '@/components/solicitudes/formulariosPST/TransportistaTuristico'

const Solicitudes = () => {
  const [step, setStep] = useState(0)

  const [register, setRegister] = useState({
    datosGenerales: null,
    domicilio: null,
    contacto: null,
    informacionLegal: null,
    detallesPST: null,
  })
  const onNextStepHandler = () => setStep(step + 1)

  const onBackStepHandler = () => setStep(step - 1)

  const onSubmitHandler = event => {
    event.preventDefault()
    console.log(event)
  }

  const tipoPST = register.datosGenerales?.tipoPST
  // const tipoPST = PST_ENUM.HOSPEDAJE

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
      <Documents
        step={step}
        documentsList={documentsList}
        onSubmitHandler={onSubmitHandler}
      />
      {/* TODO: Añadir subcategoría en los detalles de pst? */}
      {GENERIC_DETAILS_PST_LIST.includes(tipoPST) && (
        <DetalleGenerico
          step={step}
          dataPst={register.detallesPST}
          nextStep={onNextStepHandler}
          backStep={onBackStepHandler}
          register={register}
          setRegister={setRegister}
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
        />
      )}
    </div>
  )
}

export default Solicitudes
