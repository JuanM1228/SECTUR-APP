'use client'
import React, { useState, useEffect } from 'react'

import Menu from '@/components/navigation/Menu'
import Header from '@/components/navigation/Header'

import { useHttpClient } from '@/hooks/useHttpClient'

const HomeLayout = ({ children }) => {
  const { sendRequest, isLoading } = useHttpClient()
  const [openMenu, setOpenMenu] = useState(false)
  const [configuration, setConfiguration] = useState({
    logo_path: null,
    color: null,
    nombre_director: null,
    firma_path: null,
    sello_path: null,
    fondo_path: null,
    seguridad_path: null,
  })

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    const url = `/api/configuration/system-theme`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setConfiguration(res.result.data)
        console.log(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div className="h-screen flex">
      <Menu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        configuration={configuration}
      />
      <section className="w-full t-ease absolute flex flex-col items-center ">
        <Header
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          configuration={configuration}
        />
        {children}
      </section>
    </div>
  )
}

export default HomeLayout
