import { lightTheme, type AppTheme } from './light'

// O Figma não tem tema escuro: estes valores são proposta própria,
// mantendo as mesmas chaves do tema claro (contraste revisado na T-33).
export const darkTheme: AppTheme = {
  name: 'dark',
  colors: {
    background: '#121214',
    card: '#202024',
    input: '#29292E',
    button: '#323238',
    hover: '#3E3E44',
    label: '#A8A8B3',
    text: '#D4D4D8',
    subtitle: '#E1E1E6',
    title: '#F5F5F7',
    onAccent: '#121214',

    yellowLight: '#3A2E10',
    yellow: '#DBAC2C',
    yellowDark: '#F0C14B',
    yellowText: '#F0C14B',

    purpleLight: '#2E2350',
    purple: '#A78BFA',
    purpleDark: '#C4B2FF',

    danger: '#FF8A80',
  },
  fonts: lightTheme.fonts,
}


