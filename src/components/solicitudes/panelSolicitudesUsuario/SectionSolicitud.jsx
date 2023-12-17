import React from 'react'

const COLOR_BAR = {
  1: 'bg-gray',
  2: ' bg-sapling',
  3: 'bg-bigDipORuby',
  4: 'bg-blueDianne',
}
const SectionSolicitud = ({ title, idStatus }) => {
  return (
    <div className="w-full bg-sapling bg-opacity-40 rounded-md">
      <div className={`${COLOR_BAR[idStatus]} h-1 rounded-t-md`}></div>
      <section className="py-2 px-4">
        <h1 className="font-Montserrat font-semibold text-xl">{title}</h1>
      </section>
    </div>
  )
}

export default SectionSolicitud
