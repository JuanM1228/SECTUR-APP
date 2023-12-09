import React from 'react'

import SectionCatalog from '@/components/catalogos/SectionCatalog'

import { CATALOGOS } from '@/utils/dummyData'

const Catalogos = () => {
  return (
    <div className=" flex h-[calc(100vh-5rem)] flex-col items-center p-4 gap-2 overflow-y-auto">
      <h1 className="font-GMX text-4xl font-bold mb-6 text-start">CATÁLOGOS</h1>
      {CATALOGOS.map(section => (
        <SectionCatalog
          key={section.id}
          title={section.name}
          catalogs={section.catalogs}
        />
      ))}
    </div>
  )
}

export default Catalogos
