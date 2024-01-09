'use client'
import React, { useEffect, useState } from 'react'
import { useHttpClient } from '@/hooks/useHttpClient'
import Button from '@/components/common/Button'

const ReportesGraficos = () => {
  const { sendRequest, isLoading } = useHttpClient()

  const [srcFrame, setSrcFrame] = useState('')

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    const url = `/api/configuration/system-theme`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        console.log(res.result.data)
        setSrcFrame(res.result.data.reportes_path)
      } else {
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="font-GMX text-3xl font-bold text-center my-4 ">
        REPORTES GRÁFICOS
      </h1>
      <Button content='Imprimir' fullWidth={false} onClick={() =>window.print()} />
      <iframe
        width="100%"
        height="2000px"
        src={srcFrame}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  )
}

export default ReportesGraficos
