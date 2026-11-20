import 'styled-components'
import type { AppTheme } from './themes/light'

// Faz o `props.theme` dos styled-components ter os tipos dos nossos tokens
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
