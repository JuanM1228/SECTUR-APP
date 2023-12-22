'use client'
import React from 'react'

const TramitesLayout = ({ children }) => {
  return (
    <div className="flex flex-col self-stretch h-[calc(100vh-4rem)]">
      {children}
    </div>
  )
}

export default TramitesLayout
