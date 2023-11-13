import '@/styles/globals.css'

import { GMX, montserrat } from '@/assets/fonts'

export const metadata = {
  title: 'SECTUR',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${GMX.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  )
}
