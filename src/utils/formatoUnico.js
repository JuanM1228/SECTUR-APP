import jsPDF from 'jspdf'
import { image1 } from './fu/image1'
import { image2 } from './fu/image2'

export const formatoUnico = async solicitud => {
  var doc = new jsPDF('p')

  var tipo_pst = solicitud['tipo_pst'].toUpperCase()
  var nobre_comercial = solicitud['nobre_comercial'].toUpperCase()
  var razon_social = solicitud['razon_social'].toUpperCase()
  var RFC = solicitud['RFC'].toUpperCase()
  var codigi_postal = solicitud['codigi_postal'].split('').join('     ')
  var calle = solicitud['calle'].toUpperCase()
  var no_int = solicitud['no_int'].toUpperCase()
  var no_ext = solicitud['no_ext'].toUpperCase()
  var municipio = solicitud['municipio'].toUpperCase()
  var estado = solicitud['estado'].toUpperCase()
  var localidad = solicitud['localidad'].toUpperCase()
  var telefono = solicitud['telefono'].toUpperCase()
  var mail = solicitud['mail'].toUpperCase()
  var web = solicitud['web'].toUpperCase()
  var facebook = solicitud['facebook'].toUpperCase()
  var twitter = solicitud['twitter'].toUpperCase()
  var propietario = solicitud['propietario'].toUpperCase()
  var tipoDeTramite = solicitud['tipoDeTramite'].toUpperCase()
  var nacionalidad = solicitud['nacionalidad'].toUpperCase()
  var tipoDeVialidad = solicitud['tipoDeVialidad'].toUpperCase()
  var tipoDeAsentamiento = solicitud['tipoDeAsentamiento'].toUpperCase()
  var fechaDeApertura = solicitud['fechaDeApertura'].toUpperCase()
  var colonia = solicitud['colonia'].toUpperCase()

  var pag1 = image1
  var pag2 = image2

  doc.addImage(pag1, 'pag1', 7.5, 20, 2428 * 0.08, 3080 * 0.08)
  doc.addPage()
  doc.addImage(pag2, 'pag2', 5, 20, 2355 * 0.085, 3094 * 0.085)

  doc.setFontSize(8)

  doc.text(96, 63, tipo_pst, { maxWidth: 500, align: 'left' })
  doc.text(35, 121, tipoDeTramite, { maxWidth: 500, align: 'left' })
  doc.text(65, 163, nobre_comercial, { maxWidth: 500, align: 'left' })
  doc.text(45, 168, razon_social, { maxWidth: 500, align: 'left' })
  doc.text(20, 172, RFC, { maxWidth: 500, align: 'left' })
  doc.text(115, 172, nacionalidad, { maxWidth: 500, align: 'left' })
  doc.text(40, 185, tipoDeVialidad, { maxWidth: 500, align: 'left' })
  doc.text(60, 191, tipoDeAsentamiento, { maxWidth: 500, align: 'left' })
  doc.text(130, 185, calle, { maxWidth: 500, align: 'left' })
  doc.text(30, 202, no_ext, { maxWidth: 500, align: 'left' })
  doc.text(56, 202, codigi_postal, { maxWidth: 500, align: 'left' })
  doc.text(121, 202, estado, { maxWidth: 500, align: 'left' })
  doc.text(50, 206, municipio, { maxWidth: 500, align: 'left' })
  // doc.text(115, 206, localidad, { maxWidth: 500, align: 'left' })
  doc.text(48, 213, telefono, { maxWidth: 500, align: 'left' })
  doc.text(119, 213, mail, { maxWidth: 500, align: 'left' })
  doc.text(30, 220, web, { maxWidth: 500, align: 'left' })
  doc.text(103, 220, facebook, { maxWidth: 500, align: 'left' })
  doc.text(154, 220, twitter, { maxWidth: 500, align: 'left' })
  doc.text(80, 226, fechaDeApertura, { maxWidth: 500, align: 'left' })
  doc.text(12, 270, propietario, { maxWidth: 500, align: 'left' })
  doc.text(143, 192, colonia, { maxWidth: 500, align: 'left' })

  doc.setFontSize(15)
  doc.text(10.5, 248, 'X', { maxWidth: 500, align: 'left' })
  doc.text(10.5, 254, 'X', { maxWidth: 500, align: 'left' })
  doc.text(10.5, 260, 'X', { maxWidth: 500, align: 'left' })
  doc.setFontSize(8)

  doc.save('FORMATO ÚNICO' + nobre_comercial + '.pdf')
}
