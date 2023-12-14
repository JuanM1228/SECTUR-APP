import React from 'react'

const SectionSolicitud = ({ title, idStatus }) => {
  return (
    <div className="w-full bg-sapling bg-opacity-50 sticky top-0">
      <div className="bg-blueDianne h-1"></div>
      <section className="py-2 px-4">
        <h1 className="font-Montserrat font-semibold text-xl">{title}</h1>
      </section>
    </div>
  )
}

export default SectionSolicitud
