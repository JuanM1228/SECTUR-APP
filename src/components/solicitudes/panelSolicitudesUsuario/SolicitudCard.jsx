import React from 'react'

import { Icon } from '@mui/material'

import Icons from '@/assets/icons'
import { PST_INFO } from '@/utils/constants'

const SolicitudCard = ({ data }) => {
  const {
    datosGenerales,
    status,
    step,
    id_solicitud,
    tipoPST = 2,
    folio,
  } = data
  const { nombreComercial, rfc } = datosGenerales
  const informationPST = PST_INFO[tipoPST]
  const iconPST = Icons[informationPST.icon]
  const cardColor =
    status === 3 ? 'bg-bigDipORuby bg-opacity-20' : 'bg-silver bg-opacity-40'
  return (
    <div
      className={`${cardColor} flex flex-col w-full font-Montserrat rounded-md`}>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between mb-2">
          <section className="flex items-center gap-2">
            <Icon component={iconPST} className="text-gray" />
            <h1 className="font-semibold text-lg">{nombreComercial}</h1>
          </section>
          {folio && <p className="text-xs">{folio}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <section className="grow flex items-center gap-2  text-sm">
              <Icons.Assignment className="text-gray text-base" />
              <p className="font-semibold">PST:</p>
              <p className="font-normal">{informationPST.name}</p>
            </section>
            <section className="grow flex items-center gap-2  text-sm">
              <Icons.Person className="text-gray text-base" />
              <p className="font-semibold">RFC:</p>
              <p className="font-normal">{rfc}</p>
            </section>
          </div>

          <section className="flex gap-4">
            <Icons.Edit className="text-gray hover:text-firefly cursor-pointer" />
            <Icons.Delete className="text-gray hover:text-error cursor-pointer" />
          </section>
        </div>
      </div>
    </div>
  )
}

export default SolicitudCard
