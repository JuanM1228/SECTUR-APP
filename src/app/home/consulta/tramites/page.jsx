'use client' // This is a client component 👈🏽

import { useHttpClient } from '@/hooks/useHttpClient'
import React, { useCallback, useEffect } from 'react'

const Tramites = () => {
  const { sendRequest, isLoading } = useHttpClient()

  const getInfo = useCallback(async () => {
    const url = 'https://rickandmortyapi.com/api/character'
    try {
      const res = await sendRequest(url)
      if (res?.results) console.log('Hola', res.results)
    } catch (error) {
      console.log('error', error)
      // showErrorMessage()
    }
  }, [sendRequest])

  useEffect(() => {
    getInfo()
  }, [getInfo])

  return (
    <div>
      <p>Trámites</p>
      {isLoading ? <p>cargando</p> : <p>No cargando</p>}
    </div>
  )
}

export default Tramites
