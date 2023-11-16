'use client'
import React, { useState } from 'react'

import Menu from '@/components/navigation/Menu'
import Header from '@/components/navigation/Header'

const RNTLayout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div className="h-screen flex">
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <section className="w-full t-ease absolute">
        <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
        {children}
      </section>
    </div>
  )
}

export default RNTLayout
