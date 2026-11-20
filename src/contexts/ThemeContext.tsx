import { useEffect, useState, type ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import { darkTheme } from '../styles/themes/dark'
import { lightTheme } from '../styles/themes/light'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'
import { ThemeContext, type ThemeName } from './ThemeContextValue'

// Ordem de escolha: tema salvo → preferência do sistema → claro (RF-14)
function getInitialTheme(): ThemeName {
  const saved = readStorage(STORAGE_KEYS.theme)
  if (saved === 'light' || saved === 'dark') {
    return saved
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

type AppThemeProviderProps = {
  children: ReactNode
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  // Inicializador lazy: lê o localStorage só na primeira renderização
  const [themeName, setThemeName] = useState<ThemeName>(getInitialTheme)

  // Salva a escolha e avisa o navegador (barras de rolagem, campos nativos)
  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, themeName)
    document.documentElement.style.colorScheme = themeName
  }, [themeName])

  function toggleTheme() {
    setThemeName((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
