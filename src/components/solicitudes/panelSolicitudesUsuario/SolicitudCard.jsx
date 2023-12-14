import React from 'react'

import { Icon } from '@mui/material'

import Icons from '@/assets/icons'
import { PST_INFO } from '@/utils/constants'

const SolicitudCard = ({ data }) => {
  const { tipoPST, nombreComercial, rfc, registroINEGI, curp } = data
  const informationPST = PST_INFO[tipoPST]
  const iconPST = Icons[informationPST.icon]
  return (
    <div className="bg-silver bg-opacity-40 flex flex-col w-full font-Montserrat">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <section className="flex items-center gap-2">
            <Icon component={iconPST} />
            <h1 className="font-semibold text-lg">{nombreComercial}</h1>
          </section>
          <p className="text-xs">{informationPST.name}</p>
        </div>

        <div className="flex items-center">
          <section className="grow flex items-center gap-2  text-sm">
            <Icons.Person className="text-gray text-base" />
            <p className="font-semibold">RFC:</p>
            <p className="font-normal">{rfc}</p>
          </section>
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
