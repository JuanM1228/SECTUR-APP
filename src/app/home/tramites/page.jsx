import React from 'react'

import SolicitudCard from '@/components/solicitudes/panelSolicitudesUsuario/SolicitudCard'
import SectionSolicitud from '@/components/solicitudes/panelSolicitudesUsuario/SectionSolicitud'

const INIT_DATOS_GENERALES = {
  tipoPST: 5,
  nombreComercial: 'Shangai',
  rfc: 'MAHJ280603MM',
  registroINEGI: '',
  registroAnterior: '',
  razonSocial: '',
  curp: 'MAHJ280603MSPRRV09',
}
const panelSolicitudesUsuario = () => {
  return (
    <div className="flex flex-col items-center p-4 container sm:w-1/2 absolute gap-1">
      <h1 className="font-GMX text-3xl font-bold mb-6">MIS SOLICITUDES</h1>
      <SectionSolicitud title="Por actualizar" idStatus={0} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SectionSolicitud title="Rechazados" idStatus={1} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SectionSolicitud title="En proceso" idStatus={2} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SectionSolicitud title="En revisión" idStatus={3} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SectionSolicitud title="Tramites finalizados" idStatus={4} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
      <SolicitudCard data={INIT_DATOS_GENERALES} />
    </div>
  )
}

export default panelSolicitudesUsuario
