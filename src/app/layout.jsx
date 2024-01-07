import ThemeRegistry from '@/assets/theme/ThemeRegistry'
import '@/styles/globals.css'
import Head from 'next/head'
import { GMX, montserrat } from '@/assets/fonts'
export const metadata = {
  title: 'SECTUR',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" bg-bandera bg-cover bg-center">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""
        />
      </Head>

      <ThemeRegistry>
        <body
          className={`${GMX.variable} ${montserrat.variable} font-Montserrat`}>
          {children}
        </body>
      </ThemeRegistry>
    </html>
  )
}
