'use client'
import React, { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import Table from '@/components/common/Table'

import Icons from '@/assets/icons'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { STATUS_TRAMITE } from '@/utils/constants'
import { useHttpClient } from '@/hooks/useHttpClient'
import { COLUMNS_TABLE_TRAMITES_USUARIO } from '@/utils/columsTables'

const { EN_PROCESO, FINALIZADO, RECHAZADO, REVISION } = STATUS_TRAMITE

const PanelSolicitudesUsuario = () => {
  const router = useRouter()
  const { profile } = useAuthStore()
  const { sendRequest, isLoading } = useHttpClient()
  const [tramites, setTramites] = useState([])

  useEffect(() => {
    if (!profile) return
    getTramites(profile.id)
  }, [])

  const getTramites = async id => {
    const url = `/api/registro/tramites-usuario/${id}`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        setTramites(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onNuevaSolicitudHandler = () => {
    router.push('/home/tramites/solicitudes/null')
  }

  const contentButton = (
    <span className="flex gap-2" onClick={onNuevaSolicitudHandler}>
      <Icons.Add />
      <p>NUEVA SOLICITUD</p>
    </span>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] items-center p-4  gap-4">
      <h1 className="font-GMX text-3xl font-bold mb-6">MIS SOLICITUDES</h1>

      <Button content={contentButton} fullWidth={false} className="self-end" />

      {tramites.length !== 0 && (
        <Table
          columns={COLUMNS_TABLE_TRAMITES_USUARIO}
          isLoading={isLoading}
          rows={tramites}
        />
      )}
    </div>
  )
}

export default PanelSolicitudesUsuario
