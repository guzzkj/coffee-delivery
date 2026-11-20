import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { Benefit, BenefitIcon, Benefits, HeroContainer, HeroContent, HeroImage } from './styles'

type IconColor = 'yellowDark' | 'text' | 'yellow' | 'purple'

type BenefitItem = {
  icon: ReactNode
  color: IconColor
  text: string
}

const benefits: BenefitItem[] = [
  { icon: <ShoppingCart size={16} weight="fill" />, color: 'yellowDark', text: 'Compra simples e segura' },
  { icon: <Package size={16} weight="fill" />, color: 'text', text: 'Embalagem mantém o café intacto' },
  { icon: <Timer size={16} weight="fill" />, color: 'yellow', text: 'Entrega rápida e rastreada' },
  { icon: <Coffee size={16} weight="fill" />, color: 'purple', text: 'O café chega fresquinho até você' },
]

export function Hero() {
  return (
    <HeroContainer>
      <HeroContent>
        <div>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <p>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</p>
        </div>

        <Benefits>
          {benefits.map((benefit) => (
            <Benefit key={benefit.text}>
              <BenefitIcon $color={benefit.color} aria-hidden>
                {benefit.icon}
              </BenefitIcon>
              {benefit.text}
            </Benefit>
          ))}
        </Benefits>
      </HeroContent>

      <HeroImage
        src="/images/hero.png"
        alt="Copo de café para viagem do Coffee Delivery cercado de grãos de café"
        width={476}
        height={360}
      />
    </HeroContainer>
  )
}
