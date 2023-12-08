'use client'
import React from 'react'
import PropTypes from 'prop-types'

import DetalleGenerico from './DetalleGenerico'
import AgenciaViaje from './AgenciaViaje'
import AlimentosBebidas from './AlimentosBebidas'
import ArrendadoraAutos from './ArrendadoraAutos'
import OperadoraBuceo from './OperadoraBuceo'
import Hospedaje from './Hospedaje'
import OperadoraMarina from './OperadoraMarina'
import TiemposCompartidos from './TiemposCompartidos'
import TransportistaTuristico from './TransportistaTuristico'

import { GENERIC_DETAILS_PST_LIST, PST_ENUM } from '@/utils/constants'

const PSTHandler = ({
  step,
  tipoPST,
  register,
  setRegister,
  onNextStepHandler,
  onBackStepHandler,
}) => {
  const commonProps = {
    step,
    tipoPST,
    register,
    setRegister,
    onNextStepHandler,
    onBackStepHandler,
  }

  console.log('commonProps', commonProps)

  if (!tipoPST) return null

  if (GENERIC_DETAILS_PST_LIST.includes(tipoPST)) {
    return <DetalleGenerico {...commonProps} />
  }

  const Component = {
    [PST_ENUM.AGENCIA_VIAJES]: AgenciaViaje,
    [PST_ENUM.ALIMENTOS_Y_BEBIDAS]: AlimentosBebidas,
    [PST_ENUM.ARRENDADORA_AUTOS]: ArrendadoraAutos,
    [PST_ENUM.HOSPEDAJE]: Hospedaje,
    [PST_ENUM.OPERADORA_BUCEO]: OperadoraBuceo,
    [PST_ENUM.OPERADORA_MARINA]: OperadoraMarina,
    [PST_ENUM.TIEMPOS_COMPARTIDOS]: TiemposCompartidos,
    [PST_ENUM.TRANSPORTISTA_TURISTICO]: TransportistaTuristico,
  }[tipoPST]

  return <Component {...commonProps} />
}

export default PSTHandler

// PSTHandler.propTypes = {
//   step: PropTypes.number,
//   tipoPST: PropTypes.number.isRequired,
//   register: PropTypes.object.isRequired,
//   setRegister: PropTypes.func.isRequired,
//   onNextStepHandler: PropTypes.func.isRequired,
//   onBackStepHandler: PropTypes.func.isRequired,
// }

// const PSTHandler2 = ({
//   step,
//   tipoPST,
//   register,
//   setRegister,
//   onNextStepHandler,
//   onBackStepHandler,
// }) => {
//   return (
//     <>
//       {GENERIC_DETAILS_PST_LIST.includes(tipoPST) && (
//         <DetalleGenerico
//           step={step}
//           dataPst={register.detallesPST}
//           nextStep={onNextStepHandler}
//           backStep={onBackStepHandler}
//           register={register}
//           setRegister={setRegister}
//         />
//       )}
//       {tipoPST === PST_ENUM.AGENCIA_VIAJES && (
//         <AgenciaViaje
//           step={step}
//           dataPst={register.detallesPST}
//           nextStep={onNextStepHandler}
//           backStep={onBackStepHandler}
//           register={register}
//           setRegister={setRegister}
//         />
//       )}
//       {tipoPST === PST_ENUM.ALIMENTOS_Y_BEBIDAS && (
//         <AlimentosBebidas
//           step={step}
//           dataPst={register.detallesPST}
//           nextStep={onNextStepHandler}
//           backStep={onBackStepHandler}
//           register={register}
//           setRegister={setRegister}
//         />
//       )}
//       {tipoPST === PST_ENUM.ARRENDADORA_AUTOS && (
//         <ArrendadoraAutos
//           step={step}
//           dataPst={register.detallesPST}
//           nextStep={onNextStepHandler}
//           backStep={onBackStepHandler}
//           register={register}
//           setRegister={setRegister}
//         />
//       )}
//       {tipoPST === PST_ENUM.OPERADORA_BUCEO && (
//         <OperadoraBuceo
//           step={step}
//           dataPst={register.detallesPST}
//           nextStep={onNextStepHandler}
//           backStep={onBackStepHandler}
//           register={register}
//           setRegister={setRegister}
//         />
//       )}
//     </>
//   )
// }

// PSTHandler2.propTypes = {
//   step: PropTypes.number,
//   tipoPST: PropTypes.number,
//   setRegister: PropTypes.func,
//   onNextStepHandler: PropTypes.func,
//   onBackStepHandler: PropTypes.func,
// }

// export default PSTHandler
