/** @type {import('tailwindcss').Config} */
const colors = require('./src/assets/colors')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    colors: colors,
    extend: {
      backgroundImage: {
        bandera: "url('/images/logos/bandera.png')",
        header: "url('/images/logos/lineaVerde.svg')",
      },
      fontFamily: {
        GMX: ['var(--gmx)'],
      },
    },
  },
  plugins: [],
}
