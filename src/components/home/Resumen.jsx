'use client'
import React, { useEffect, useState } from 'react'
import Icons from '@/assets/icons'
import { PST_INFO } from '@/utils/constants'
import dayjs from 'dayjs'
const Resumen = ({ information }) => {
  const [data, setData] = useState({})
  const now = dayjs()
  const ingresoSectur = dayjs(information.informacionLegal.fechaIngresoSECTUR)
  const fechaExpiracion = ingresoSectur.add(2, 'years')
  const isActive = now < fechaExpiracion
  useEffect(() => {
    const {
      datosGenerales,
      domicilio,
      contacto,
      informacionLegal,
      documentsList,
      picturesList,
    } = information
    setData({
      // Datos Generales
      tipoPST: datosGenerales.tipoPST,
      nombreComercial: datosGenerales.nombreComercial,
      razonSocial: datosGenerales.razonSocial,
      rfc: datosGenerales.rfc,
      curp: datosGenerales.curp,
      registroINEGI: datosGenerales.registroINEGI,
      registroAnterior: datosGenerales.registroAnterior,
      // Domicilio
      calle: domicilio.calle,
      colonia: domicilio.colonia,
      municipio: domicilio.municipio,
      estado: domicilio.estado,
      codigoPostal: domicilio.codigoPostal,
      latitud: domicilio.latitud,
      longitud: domicilio.longitud,
      // Contacto
      telefono: contacto.telefono,
      celular: contacto.celular,
      email: contacto.email,
      web: contacto.web,
      facebook: contacto.facebook,
      x: contacto.x,
      fax: contacto.fax,
      //Información legal
      nombreDelPropietario: informacionLegal.nombreDelPropietario,
      representanteLegal: informacionLegal.representanteLegal,
      nombreDelSolicitante: informacionLegal.nombreDelSolicitante,
      puestoDelSolicitante: informacionLegal.puestoDelSolicitante,
      fechaIngresoSECTUR: informacionLegal.fechaIngresoSECTUR,
      // tipoDeInmueble: informacionLegal.tipoDeInmueble,
      // numEscritura: informacionLegal.numeroDeEscritura,
      // numeroDeRegistro: informacionLegal.numRegistroDeLaPropiedad,
      observaciones: informacionLegal.observaciones,
      documentsList,
      picturesList,
    })
  }, [])

  return (
    <div className="grid grid-cols-2 gap-2 font-Montserrat">
      <section className="bg-silver bg-opacity-30 col-span-2 p-4 rounded-md">
        <div className="flex mb-2 gap-1">
          <Icons.Description />
          <h2 className="text-lg font-semibold">
            Datos generales del prestador de servicios
          </h2>
        </div>
        <div>
          <p className="font-semibold my-2 ">
            ESTATUS CERTIFICADO:{'  '}
            <span
              className={`font-normal text-merino p-2 rounded bg-opacity-90 ml-3 ${
                isActive ? 'bg-blueDianne' : 'bg-bigDipORuby'
              }`}>
              {isActive ? 'ACTIVO' : 'VENCIDO'}
            </span>
          </p>
          <p className="font-semibold">
            Tipo de PST:{' '}
            <span className="font-normal">{PST_INFO[data.tipoPST]?.name}</span>
          </p>
          <p className="font-semibold">
            Nombre comercial:{' '}
            <span className="font-normal">{data.nombreComercial}</span>
          </p>
          <p className="font-semibold">
            Razón social:{' '}
            <span className="font-normal">{data.razonSocial}</span>
          </p>
        </div>
      </section>
      <section className="bg-silver bg-opacity-30 p-4 rounded-md col-span-2 sm:col-span-1">
        <div className="flex mb-2 gap-1">
          <Icons.Home />
          <h2 className="text-lg font-semibold">Domicilio</h2>
        </div>
        <div>
          <p className="font-semibold">
            Calle y número: <span className="font-normal">{data.calle}</span>
          </p>
          <p className="font-semibold">
            Colonia: <span className="font-normal">{data.colonia}</span>
          </p>
          <p className="font-semibold">
            Municipio: <span className="font-normal">{data.municipio}</span>
          </p>
          <p className="font-semibold">
            Estado: <span className="font-normal">{data.estado}</span>
          </p>
          <p className="font-semibold">
            Código postal:{' '}
            <span className="font-normal">{data.codigoPostal}</span>
          </p>
          <p className="font-semibold">
            Latitud: <span className="font-normal">{data.latitud}</span>
          </p>
          <p className="font-semibold">
            Longitud: <span className="font-normal">{data.longitud}</span>
          </p>
        </div>
      </section>
      <section className="bg-silver bg-opacity-30 p-4 rounded-md col-span-2 sm:col-span-1">
        <div className="flex mb-2 gap-1">
          <Icons.Phone />
          <h2 className="text-lg font-semibold">Contacto</h2>
        </div>
        <div>
          <p className="font-semibold">
            Teléfono: <span className="font-normal">{data.telefono}</span>
          </p>
          <p className="font-semibold">
            Celular: <span className="font-normal">{data.celular}</span>
          </p>
          <p className="font-semibold">
            Correo electrónico:{' '}
            <span className="font-normal">{data.email}</span>
          </p>
          <p className="font-semibold">
            Página web: <span className="font-normal">{data.web}</span>
          </p>
          <p className="font-semibold">
            Facebook: <span className="font-normal">{data.facebook}</span>
          </p>
          <p className="font-semibold">
            Fax: <span className="font-normal">{data.fax}</span>
          </p>

          <p className="font-semibold">
            X: <span className="font-normal">{data.x}</span>
          </p>
        </div>
      </section>
      <section className="bg-silver bg-opacity-30 col-span-2 p-4 rounded-md">
        <div className="flex mb-2 gap-1">
          <Icons.Gavel />
          <h2 className="text-lg font-semibold">Información legal</h2>
        </div>
        <div>
          <p className="font-semibold">
            Nombre del propietario:{' '}
            <span className="font-normal">{data.nombreDelPropietario}</span>
          </p>
          <p className="font-semibold">
            Nombre del representante legal:{' '}
            <span className="font-normal">{data.representanteLegal}</span>
          </p>
          <p className="font-semibold">
            Nombre del solicitante:{' '}
            <span className="font-normal">{data.nombreDelSolicitante}</span>
          </p>
          <p className="font-semibold">
            Puesto del solicitante:{' '}
            <span className="font-normal">{data.puestoDelSolicitante}</span>
          </p>

          <p className="font-semibold">
            Fecha de ingreso a SECTUR:{' '}
            <span className="font-normal">{data.fechaIngresoSECTUR}</span>
          </p>
          <p className="font-semibold">
            Observaciones:{' '}
            <span className="font-normal">{data.observaciones}</span>
          </p>
        </div>
      </section>

      <section className="bg-silver bg-opacity-30 col-span-2 p-4 rounded-md">
        <div className="flex mb-2 gap-1">
          <Icons.Description />
          <h2 className="text-lg font-semibold">Fotos del establecimiento</h2>
        </div>
        {data.picturesList?.length > 0 ? (
          <div className="grid sm:grid-cols-3">
            {data.picturesList?.map((item, index) => {
              return (
                <div key={index} className="">
                  <img
                    alt={item.documentName}
                    src={`http://172.16.100.47:3002/${item.documentUrl}`}
                    className="object-fill rounded"
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <p>No hay fotos para mostrar</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Resumen