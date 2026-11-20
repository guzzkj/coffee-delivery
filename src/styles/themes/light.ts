// Tokens do tema claro, extraídos do Style Guide do Figma (docs/REF_DESIGN/Cores.png)
export const lightTheme = {
  name: 'light',
  colors: {
    background: '#FAFAFA',
    card: '#F3F2F2',
    input: '#EDEDED',
    button: '#E6E5E5',
    hover: '#D7D5D5',
    label: '#8D8686',
    text: '#574F4D',
    subtitle: '#403937',
    title: '#272221',
    onAccent: '#FFFFFF',

    yellowLight: '#F1E9C9',
    yellow: '#DBAC2C',
    yellowDark: '#C47F17',

    purpleLight: '#EBE5F9',
    purple: '#8047F8',
    purpleDark: '#4B2995',

    danger: '#B3261E',
  },
  fonts: {
    heading: "'Baloo 2', sans-serif",
    body: "'Roboto', sans-serif",
  },
}

export type AppTheme = typeof lightTheme
