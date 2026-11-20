import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContextValue'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme precisa ser usado dentro de <AppThemeProvider>')
  }

  return context
}
