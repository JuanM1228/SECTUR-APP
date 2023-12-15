import React from 'react'

import Link from 'next/link'
import Button from '@/components/common/Button'
import SolicitudCard from '@/components/solicitudes/panelSolicitudesUsuario/SolicitudCard'
import SectionSolicitud from '@/components/solicitudes/panelSolicitudesUsuario/SectionSolicitud'

import { STATUS_TRAMITE } from '@/utils/constants'
import Icons from '@/assets/icons'

const { EN_PROCESO, FINALIZADO, RECHAZADO, REVISION } = STATUS_TRAMITE

const INIT_DATOS_GENERALES = {
  tipoPST: 1,
  nombreComercial: 'SHANGAI',
  rfc: 'MAHJ280603MM',
  registroINEGI: 12348423,
  registroAnterior: '#ASD123ASD123',
  razonSocial: '',
  curp: 'MAHJ280603MSPRRV09',
}

const getTramites = async () => {
  const res = await fetch(
    `${process.env.ENV_URL}/api/registro/tramites-usuario/1`,
  )
  const data = await res.json()
  return data
}

const panelSolicitudesUsuario = async () => {
  const tramites = await getTramites()
  const {
    result: { data },
  } = tramites

  const tramitesEnProceso = data[STATUS_TRAMITE.EN_PROCESO]
  const tramitesRevision = data[STATUS_TRAMITE.REVISION]
  const tramitesRechazado = data[STATUS_TRAMITE.RECHAZADO]
  const tramitesFinalizado = data[STATUS_TRAMITE.FINALIZADO]

  console.log(tramitesRechazado)

  const contentButton = (
    <span className="flex gap-2">
      <Icons.Add />
      <p>NUEVA SOLICITUD</p>
    </span>
  )

  return (
    <div className="flex flex-col items-center p-4 container max-w-3xl gap-1">
      <h1 className="font-GMX text-3xl font-bold mb-6">MIS SOLICITUDES</h1>
      <Link href="/home/tramites/solicitudes" className="self-end mb-4">
        <Button content={contentButton} fullWidth={false} />
      </Link>

      <SectionSolicitud title="Rechazados" idStatus={RECHAZADO} />
      {tramitesRechazado.map(tramite => (
        <SolicitudCard data={tramite} key={tramite.id_solicitud} />
      ))}
      <SectionSolicitud title="En proceso" idStatus={EN_PROCESO} />
      {tramitesEnProceso.map(tramite => (
        <SolicitudCard data={tramite} key={tramite.id_solicitud} />
      ))}
      <SectionSolicitud title="En revisión" idStatus={REVISION} />
      {tramitesRevision.map(tramite => (
        <SolicitudCard data={tramite} key={tramite.id_solicitud} />
      ))}
      <SectionSolicitud title="Tramites finalizados" idStatus={FINALIZADO} />
      {tramitesFinalizado.map(tramite => (
        <SolicitudCard data={tramite} key={tramite.id_solicitud} />
      ))}
    </div>
  )
}

export default panelSolicitudesUsuario
