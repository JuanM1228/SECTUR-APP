'use client'
import React, { useEffect, useState } from 'react'
import SectionCatalog from '@/components/catalogos/SectionCatalog'
import { useHttpClient } from '@/hooks/useHttpClient'
import Cookies from 'js-cookie'


const Catalogos = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const [catalogo, setCatalogo] = useState([])

  useEffect(() => {
    getCatalogs()
  }, [])

  const getCatalogs = async () => {
    try {
      const token = Cookies.get('token')
      const url = `/api/configuration/catalogo-sevicios/${token}`
      const res = await sendRequest(url)
      if (res.success) {
        setCatalogo(res.result.data)
        console.log('Rodo', res)
        // setToken(res.result.token)
        // setProfile(res.result.user)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className=" flex w-3/4  h-[calc(100vh-5rem)] flex-col items-center p-4 gap-2 overflow-y-auto">
      <h1 className="font-GMX text-4xl font-bold mb-6 text-start">CATÁLOGOS</h1>
      {catalogo.map(section => (
        <SectionCatalog
          key={section.id}
          title={section.name}
          catalogs={section.catalogs}
          pst={section.catalogs.id}
        />
      ))}
    </div>
  )
}

export default Catalogos
