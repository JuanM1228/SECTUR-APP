'use client'
import React, { useState } from 'react'

import Menu from '@/components/navigation/Menu'
import Header from '@/components/navigation/Header'

const HomeLayout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div className="h-screen flex">
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <section className="w-full t-ease absolute flex flex-col items-center">
        <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
        {children}
      </section>
    </div>
  )
}

export default HomeLayout
