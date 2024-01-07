import { GMX, montserrat } from '@/assets/fonts'
import colors from '../colors'

export const themeOptions = {
  typography: {
    fontSize: 16,
    fontFamily: montserrat.style.fontFamily,
    button: {
      letterSpacing: 1,
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: colors.bigDipORuby,
      dark: colors.blazeOrange,
      contrastText: colors.merinoTransparent,
    },
    secondary: {
      main: colors.gray,
    },
    text: {
      primary: colors.gray,
    },
  },
}
