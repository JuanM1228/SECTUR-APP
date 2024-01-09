'use client'
import React, { useEffect, useState } from 'react'
import SectionCatalog from '@/components/catalogos/SectionCatalog'
import SubCategoria from '@/components/catalogos/SubCategoria'
import { useHttpClient } from '@/hooks/useHttpClient' 
import { createTheme, ThemeProvider } from '@mui/material'
import Table from '@/components/common/Table'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import colors from '@/assets/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.bigDipORuby,
    },
    secondary: {
      main: colors.gray,
    },
  },
})

const Catalogos = () => {
  const { sendRequest, isLoading } = useHttpClient()
  const [catalogo, setCatalogo] = useState([])
  const [subCategoria, setSubCategoria] = useState([])
  const [tab, setTab] = useState(0)


  useEffect( ()  => {
   getCatalogs()
   getCatalogsSubcategoria()
  }, [])

  const getCatalogs = async () => {
    try {
      const url = '/api/configuration/catalogo-sevicios'
      const res = await sendRequest(url)
      if (res.success) {
        setCatalogo(res.result.data)
        console.log('Data de catalogos',res)
        // setToken(res.result.token)
        // setProfile(res.result.user)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getCatalogsSubcategoria = async () => {
    try {
      const url = '/api/configuration/catalogo-subcategorias/0'
      const res = await sendRequest(url)
      if (res.success) {
        setSubCategoria(res.result.data)
        console.log('subcategoria1',res)
  
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }
  return (
    <div className=" flex w-3/4  h-[calc(100vh-5rem)] flex-col items-center p-4 gap-2 overflow-y-auto">
      <h1 className="font-GMX text-4xl font-bold mb-6 text-start">CATÁLOGOS</h1>
      <ThemeProvider theme={theme}>
      <Tabs
      value={tab}
      onChange={handleChangeTab}
      className="bg-gray bg-opacity-10 rounded">
      <Tab value={0} label="Editar PST" />
      <Tab value={1} label="Editar Subcategoria" />
    </Tabs>
    {tab === 0 &&(
      catalogo.map(section => (
        <SectionCatalog
          key={section.id}
          title={section.name}
          catalogs={section.catalogs}
        />
      )))}
    {tab === 1 && (   
      subCategoria.map(section =>(
        <SubCategoria
        key={section.id}
        title={section.name}
        subpst={section.subpst}
        />
        ))
        )} 
      </ThemeProvider>

    </div>
  )
}

export default Catalogos
