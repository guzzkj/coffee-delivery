import logoIcon from '../../assets/brand/logo-icon.svg'
import { LogoContainer, LogoText } from './styles'

// Símbolo em SVG (gerado com IA) + nome em texto, para seguir a cor do tema
export function Logo() {
  return (
    <LogoContainer>
      <img src={logoIcon} alt="" width={30} height={35} />
      <LogoText>
        <strong>Coffee</strong>
        <span>Delivery</span>
      </LogoText>
    </LogoContainer>
  )
}
