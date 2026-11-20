import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '../../hooks/useTheme'
import { ToggleButton } from './styles'

// Botão de alternância: o nome acessível é fixo e o aria-pressed diz se está ativo
export function ThemeToggle() {
  const { themeName, toggleTheme } = useTheme()
  const isDark = themeName === 'dark'

  return (
    <ToggleButton type="button" onClick={toggleTheme} aria-label="Tema escuro" aria-pressed={isDark}>
      {isDark ? <Sun size={22} weight="fill" aria-hidden /> : <Moon size={22} weight="fill" aria-hidden />}
    </ToggleButton>
  )
}
