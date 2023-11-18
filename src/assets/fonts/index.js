import localFont from 'next/font/local'
import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--montserrat',
  display: 'auto',
})

export const GMX = localFont({
  src: './GMX-Regular.ttf',
  variable: '--gmx',
  display: 'auto',
})
