'use client'
import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Resumen from '@/components/home/Resumen'
import Icons from '@/assets/icons'
import Button from '@/components/common/Button'

import { useHttpClient } from '@/hooks/useHttpClient'
const DATA = {
  datosGenerales: {
    tipoPST: 1,
    nombreComercial: 'Prueba_001',
    rfc: 'Prueba_001',
    registroINEGI: 'Prueba_001',
    registroAnterior: 'Prueba_001',
    razonSocial: 'Prueba_001',
    curp: '000000000001',
  },
  domicilio: {
    codigoPostal: 7860,
    estado: '',
    municipio: '',
    colonia: '9005695',
    calle: 'Norte 56',
    latitud: 20.3248,
    longitud: -99.8491,
  },
  contacto: {
    telefono: '5555122200',
    email: 'antoniohdz0899@outlook.com',
    celular: '5555122200',
    web: 'prueba.com',
    facebook: 'prueba',
    x: '',
    fax: '0001',
  },
  informacionLegal: {
    nombreDelPropietario: 'Prueba_001',
    representanteLegal: 'Prueba_001',
    nombreDelSolicitante: 'Prueba_001',
    puestoDelSolicitante: 'Prueba_001',
    fechaIngresoSECTUR: '2023-12-20T00:00:00.000Z',
    tipoDeInmueble: '1',
    numEscritura: '5',
    numeroDeRegistro: '5',
    observaciones: '',
  },
  detallesPST: [
    {
      id: 11,
      nombre_notario: 'prueba_1',
      numero_acta_constitutiva: '23423423423',
      numero_notaria: '12',
      lugar_expedicion: null,
      fecha_emision_acta: '2023-12-20T12:00:00.000Z',
      afiliaciones: null,
      boletaje: '11',
    },
  ],
  documentsList: [
    {
      documentName: 'PRUEBA_001.pdf',
      documentType: 'application/pdf',
      documentUrl: 'documentos/solicitudes/1703016744090_346.pdf',
    },
    {
      documentName: 'PRUEBA_001.pdf',
      documentType: 'application/pdf',
      documentUrl: 'documentos/solicitudes/1703016747251_279.pdf',
    },
    {
      documentName: 'PRUEBA_001.pdf',
      documentType: 'application/pdf',
      documentUrl: 'documentos/solicitudes/1703016750552_1.pdf',
    },
    {
      documentName: 'PRUEBA_001.pdf',
      documentType: 'application/pdf',
      documentUrl: 'documentos/solicitudes/1703016753928_802.pdf',
    },
    {
      documentName: 'PRUEBA_001.pdf',
      documentType: 'application/pdf',
      documentUrl: 'documentos/solicitudes/1703016757157_755.pdf',
    },
    {
      documentName: 'PRUEBA_001.pdf',
      documentType: 'application/pdf',
      documentUrl: 'documentos/solicitudes/1703016760715_923.pdf',
    },
    {
      documentName: 'PRUEBA_001.pdf',
      documentType: 'application/pdf',
      documentUrl: 'documentos/solicitudes/1703016764466_272.pdf',
    },
  ],
  picturesList: [
    {
      documentName: 'PRUEBA_001.jpg',
      documentType: 'image/jpeg',
      documentUrl: 'documentos/solicitudes/images/1703016828781_345.jpg',
    },
  ],
  folioSolicitud: null,
  pathFolioSolicitud: '/certificados/null.pdf',
}
const HomePage = () => {
  const { sendRequest, isLoading } = useHttpClient()

  const [folio, setFolio] = useState('')
  const [data, setData] = useState(null)
  const [firstConsulta, setFirstConsulta] = useState(true)

  const onHandleChange = ({ target: { name, value } }) => {
    setFolio(value)
  }

  const getRegisterData = async () => {
    const url = `/api/registro/detalle-tramite-folio/${folio}`
    try {
      const res = await sendRequest(url)
      console.log('DATA RODO', res.result.data)
      if (res.success) {
        setData(res.result.data)
        setFirstConsulta(false)
      }
    } catch (error) {
      console.log('error', error)
      setData(null)
      setFirstConsulta(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-4 gap-10 sm:w-1/2">
      <h2 className="font-GMX text-3xl font-semibold text-center mt-4">
        Consulta de Certificados
      </h2>
      <div className="flex flex-wrap w-full gap-4 justify-center">
        <div className="w-full sm:w-1/2">
          <Input
            label="Folio"
            name="folio"
            IconComponent={Icons.QrCode}
            onChange={onHandleChange}
            value={folio}
          />
        </div>

        <Button
          content="Buscar"
          className="w-full sm:w-auto"
          onClick={getRegisterData}
        />
      </div>

      {data && <Resumen information={data} />}
      {!data && (
        <div className="flex flex-col justify-center items-center text-gray mt-10">
          <Icons.Search className="w-36 h-36 animate-bounce" />
          <p className="font-Montserrat font-semibold text-4xl">
            {firstConsulta ? 'REALIZA UNA CONSULTA' : 'REGISTRO NO EXISTENTE'}
          </p>
        </div>
      )}
    </div>
  )
}

export default HomePage
