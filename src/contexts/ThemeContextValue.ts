import { createContext } from 'react'

export type ThemeName = 'light' | 'dark'

export type ThemeContextValue = {
  themeName: ThemeName
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
