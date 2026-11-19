# TECH_SPEC — Coffee Delivery

> Status: **v1.1 — validado pelo Gustavo em 2026-11-19; alinhado ao projeto de referência.** Referências `RF-xx`/`RN-xx` apontam para `docs/PRD_SPEC.md`.
> Decisões D-01..D-17 registradas no PRD §10 (D-07, ferramenta da logo, decidida na T-07).
> **Projeto de referência:** https://github.com/Devpaulo1/coffee-delivery. Usado como referência de organização e decisões (estrutura de pastas, chaves de `localStorage`, ações do reducer, fluxo do CEP, tokens iniciais). Nada foi copiado literalmente; as divergências estão registradas na seção 14.

---

## 1. Stack e justificativa

| Tecnologia | Versão alvo | Uso | Justificativa |
|---|---|---|---|
| React | 19.x (template Vite) | UI em componentes | Exigido pela disciplina |
| Vite | **8.x** + `@vitejs/plugin-react@^6` | Dev server e build | Padrão da disciplina (AGENTS.md §1) |
| TypeScript | template `react-ts` (strict) | Tipagem, `.tsx` | Exigido no enunciado; sem `any` |
| React Router | `react-router` (v7, imports de `'react-router'`) | Rotas `/`, `/checkout`, `/success` (RF-07) | Aula 13 — **não** usar `react-router-dom` |
| Context API + `useReducer` | nativo | Estado global do carrinho e do pedido confirmado | Exigido no enunciado; ações explícitas e testáveis |
| React Hook Form + Zod + `@hookform/resolvers` | atuais (Zod 4) | Formulário de endereço/pagamento (RF-08, RF-09, RF-11) | Exigido no enunciado; resolver liga o schema Zod ao RHF |
| **styled-components** (D-02) | 6.x | Estilização + `ThemeProvider` para claro/escuro | Padrão do enunciado; tema via objeto tipado facilita os tokens |
| `@phosphor-icons/react` (D-11) | 2.x | Ícones do Header, cards, checkout | Mesma família de ícones do Figma; autorizada pelo Gustavo como lib extra |
| Vitest + `@testing-library/react` + `@testing-library/user-event` + `@testing-library/jest-dom` + `jsdom` | atuais | Testes unitários e de fluxo | Integra nativamente com Vite |
| oxlint | do template | Lint | Já vem no template do Vite 8 |
| Playwright (MCP) | — | Validação visual/fluxo antes de concluir tasks com UI | AGENTS.md §7.4 |
| Fontes | Google Fonts (`<link>` no `index.html`) | Baloo 2 + Roboto | Sem dependência extra |
| Deploy | Vercel (D-06) | Publicação | Rewrite SPA simples via `vercel.json` |

Gerenciador de pacotes: **npm** (padrão da disciplina). Node 22.x (instalado: v22.22.3). Versões instaladas na T-01: vite 8.3.8, @vitejs/plugin-react 6.3.0, react 19.3.1, TypeScript ~7.0.

> Tailwind CSS 4 foi considerado e descartado: styled-components é o padrão do enunciado e o `ThemeProvider` tipado atende bem ao tema claro/escuro.

## 2. Arquitetura

```
main.tsx
 └─ ThemeProvider (contexts/ThemeContext — tema claro/escuro + styled ThemeProvider + GlobalStyle)
     └─ BrowserRouter
         └─ CartProvider (contexts/CartContext — useReducer(cartReducer) + persistência)
             └─ App.tsx  → <Routes> (apenas rotas)
                 └─ PageLayout (Header + <Outlet/>)
                     ├─ /          → pages/Home
                     ├─ /checkout  → pages/Checkout
                     ├─ /success   → pages/Success
                     └─ *          → <Navigate to="/" replace />
```

Princípios:
- **App.tsx só declara rotas.** Lógica fica em contexts, reducers, hooks e utils.
- Componentes de apresentação recebem props; só páginas e poucos componentes conectados usam `useCart()`.
- `services/` faz HTTP (ViaCEP) e normaliza a resposta; não mexe em estado.
- `utils/` só funções puras (cálculos, formatação) — testadas isoladamente.
- Estado sempre imutável: `map`, `filter`, `find`, `reduce`, spread. Nunca `push/splice/sort` direto no state.

## 3. Estrutura de diretórios (uma pasta por componente)

```
src/
├── assets/
│   ├── brand/                 logo-light.svg, logo-dark.svg (IA)
│   ├── coffees/               imagens dos cafés (exportadas do Figma)
│   └── hero/                  imagem do hero
├── components/
│   ├── PageLayout/            index.tsx + styles.ts
│   ├── Header/                index.tsx + styles.ts
│   ├── ThemeToggle/
│   ├── CartBadge/
│   ├── Hero/
│   ├── CoffeeCatalog/
│   ├── CoffeeCard/
│   ├── QuantityInput/
│   ├── CartItem/
│   ├── CartSummary/
│   ├── EmptyCart/
│   ├── DeliveryAddressForm/
│   ├── PaymentMethodSelector/
│   └── OrderSuccess/
├── pages/
│   ├── Home/                  index.tsx + styles.ts
│   ├── Checkout/
│   └── Success/
├── contexts/                  CartContext.tsx, ThemeContext.tsx
├── reducers/                  cartReducer.ts, cartActions.ts
├── hooks/                     useCart.ts, useTheme.ts, useCepLookup.ts
├── services/                  viaCep.ts
├── data/                      coffees.ts
├── types/                     coffee.ts, cart.ts, order.ts
├── schemas/                   checkoutSchema.ts
├── utils/                     formatCurrency.ts, cartCalculations.ts, storage.ts
├── styles/
│   ├── themes/                light.ts, dark.ts
│   ├── global.ts              GlobalStyle (createGlobalStyle)
│   └── styled.d.ts            tipagem do DefaultTheme
├── tests/                     *.test.ts(x) + setup.ts
├── App.tsx
└── main.tsx
public/                        favicon.svg (logo IA)
docs/                          PRD_SPEC, TECH_SPEC, TASKS_SPEC, AI_USAGE, BRANDING (opcional)
```

Cada componente: `index.tsx` (JSX + lógica de apresentação) e `styles.ts` (styled-components). Import: `import { CoffeeCard } from '../components/CoffeeCard'`.

## 4. Componentes

| Componente | Responsabilidade | Props principais | RF |
|---|---|---|---|
| `PageLayout` | Header + `<Outlet/>` + largura máxima | — | RF-07, RF-15 |
| `Header` | Logo, localização, ThemeToggle, botão do carrinho com `CartBadge` | — (lê `useCart`) | RF-04, RF-14, RF-16 |
| `ThemeToggle` | Alterna tema; `aria-label` + `aria-pressed` | — (lê `useTheme`) | RF-14 |
| `CartBadge` | Mostra total de unidades; oculto se 0 | `count: number` | RF-04 |
| `Hero` | Título, subtítulo, 4 benefícios, imagem | — | contexto da Home |
| `CoffeeCatalog` | `coffees.map(c => <CoffeeCard key={c.id} …/>)` | `coffees: Coffee[]` | RF-01 |
| `CoffeeCard` | Card do café + `QuantityInput` + botão adicionar | `coffee: Coffee` | RF-01..03 |
| `QuantityInput` | − valor +; mínimo 1 | `value`, `onIncrement`, `onDecrement`, `min?` | RF-02, RF-05, RN-01 |
| `CartItem` | Linha do carrinho no checkout + Remover | `item: CartItemDetailed` | RF-05 |
| `CartSummary` | Subtotal, entrega, total + botão Confirmar | `subtotal`, `deliveryFee`, `total`, `disabled` | RF-10, RF-11 |
| `EmptyCart` | Estado vazio do carrinho | — | RN-09 |
| `DeliveryAddressForm` | Campos de endereço (RHF) + status do CEP | `register`, `errors`, `isLoadingCep`, `cepError` | RF-08, RN-07 |
| `PaymentMethodSelector` | Grupo de rádio (crédito/débito/dinheiro) | `register`, `error` | RF-09 |
| `OrderSuccess` | Resumo do pedido confirmado | `order: Order` | RF-12, RF-13 |

## 5. Tipos (`src/types/`)

```ts
// coffee.ts
export type CoffeeTag = 'tradicional' | 'especial' | 'com leite' | 'alcoólico' | 'gelado'

export type Coffee = {
  id: string
  name: string
  description: string
  tags: CoffeeTag[]
  priceInCents: number      // RN-04: sempre inteiro em centavos
  image: string             // import do asset
}

// cart.ts
export type CartItem = {
  coffeeId: string
  quantity: number          // inteiro ≥ 1
}

export type CartItemDetailed = CartItem & { coffee: Coffee }   // derivado na renderização

// order.ts
export type PaymentMethod = 'credit' | 'debit' | 'money'

export type DeliveryAddress = {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string             // UF, 2 letras
}

export type OrderItem = {
  coffeeId: string
  name: string
  priceInCents: number
  quantity: number
}

export type Order = {
  id: string                // crypto.randomUUID()
  items: OrderItem[]        // snapshot (RN-06)
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  createdAt: string         // ISO
}
```

Rótulos de exibição do pagamento em um mapa único: `{ credit: 'Cartão de Crédito', debit: 'Cartão de Débito', money: 'Dinheiro' }`.

**Decisão consciente (diverge da referência — D-15):** o carrinho guarda só `coffeeId + quantity`, e os dados do café vêm do catálogo com `find`. Motivo: o catálogo local é a fonte única de verdade (preço e nome nunca ficam desatualizados no `localStorage`) e itens com id inexistente são descartados ao carregar (RN-10). O projeto de referência guarda o objeto `coffee` inteiro no item.

## 6. Estado global — Context + useReducer

### 6.1 Estado e ações (`reducers/`)

```ts
type CartState = {
  items: CartItem[]
  confirmedOrder: Order | null      // snapshot do último pedido (RN-06)
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CONFIRM_ORDER'; payload: { order: Order } }
  | { type: 'CLEAR_CART' }
```

| Ação | Regra | RF/RN |
|---|---|---|
| `ADD_ITEM` | Ignora `quantity < 1` ou não inteiro. Se existe → `map` somando; senão → `[...items, novo]` | RF-03, RN-01, RN-02 |
| `INCREMENT_ITEM` | `map` +1 no item | RF-05 |
| `DECREMENT_ITEM` | `map` −1 **somente se `quantity > 1`** (D-03) | RF-05, RN-01 |
| `REMOVE_ITEM` | `filter` por `coffeeId` | RF-05 |
| `CONFIRM_ORDER` | `{ items: [], confirmedOrder: payload.order }` — guarda o snapshot e esvazia o carrinho numa única ação | RF-12, RF-13, RN-06 |
| `CLEAR_CART` | `{ ...state, items: [] }` (utilitário; não apaga o pedido) | RF-13 |

O snapshot (`Order`) é **montado fora do reducer** (no `CartContext`), porque usa `crypto.randomUUID()` e `new Date()`, que não são puros. O reducer só recebe o pedido pronto — continua função pura e é o primeiro alvo de testes.

### 6.2 CartContext

Expõe via `useCart()`:
- `items: CartItemDetailed[]` (derivado: `items` + `find` no catálogo, descartando ids inexistentes — RN-10)
- `totalUnits` (Σ `quantity`, RF-04), `subtotalInCents`, `deliveryFeeInCents`, `totalInCents` — **derivados na renderização, nunca em state**
- `addItem`, `incrementItem`, `decrementItem`, `removeItem`, `clearCart`
- `confirmedOrder: Order | null`, `confirmOrder(data: CheckoutFormData): Order`

`confirmOrder` monta o snapshot, despacha `CONFIRM_ORDER` e devolve o pedido; a página navega para `/success` com `useNavigate()`.

`useCart()` (em `hooks/useCart.ts`) lança erro claro se usado fora do `CartProvider`.

## 7. Hooks, efeitos e persistência

| Chave `localStorage` | Conteúdo | Quem grava |
|---|---|---|
| `@coffee-delivery:cart-1.0.0` | `CartItem[]` | `CartProvider` (`useEffect` em `[state.items]`) |
| `@coffee-delivery:last-order-1.0.0` | `Order` | `CartProvider` (`useEffect` em `[state.confirmedOrder]`) |
| `@coffee-delivery:theme-1.0.0` | `'light' \| 'dark'` | `ThemeProvider` |

O sufixo de versão permite mudar o formato salvo no futuro sem ler dados antigos incompatíveis.

- Carrinho: `useReducer(cartReducer, undefined, loadInitialState)` — inicializador lazy lê e **valida** o JSON (array, `quantity` inteiro ≥ 1, `coffeeId` existente no catálogo) e carrega o último pedido. Dado corrompido → estado vazio. Leitura/escrita sempre em `try/catch` (`utils/storage.ts`).
- Tema: `useTheme()` — lazy init: valor salvo → senão `matchMedia('(prefers-color-scheme: dark)')` → senão `light`.
- CEP: `useCepLookup()` — ver §9.2.

## 8. Rotas

| Rota | Página | Observação |
|---|---|---|
| `/` | Home | Hero + catálogo |
| `/checkout` | Checkout | EmptyCart quando `items.length === 0` |
| `/success` | Success | Usa `confirmedOrder`; sem pedido → estado vazio (RN-09) |
| `*` | `<Navigate to="/" replace />` | D-09 |

Navegação com `<Link>`/`useNavigate` de `react-router` (sem `<a href>` interno).

## 9. Validação (Zod) e formulário

```ts
// schemas/checkoutSchema.ts (rascunho — Zod 4; conferir a API com Context7 na T-24)
import { z } from 'zod'

export const checkoutSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, { error: 'Informe um CEP válido (8 dígitos)' }),
  street: z.string().trim().min(1, { error: 'Informe a rua' }),
  number: z.string().trim().min(1, { error: 'Informe o número' }),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, { error: 'Informe o bairro' }),
  city: z.string().trim().min(1, { error: 'Informe a cidade' }),
  state: z.string().trim().regex(/^[A-Za-z]{2}$/, { error: 'UF com 2 letras' }),
  paymentMethod: z.enum(['credit', 'debit', 'money'], { error: 'Selecione a forma de pagamento' }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
```

Não usar a sintaxe `errorMap` do Zod 3.

- `useForm<CheckoutFormData>({ resolver: zodResolver(checkoutSchema) })`; `<form noValidate>`.
- Submit bloqueado se `items.length === 0` (RF-11) e sempre revalidado pelo schema (RN-10).
- Erros: `<p id="campo-error" role="alert">` + `aria-invalid` + `aria-describedby`; foco no primeiro campo inválido.

### 9.1 ViaCEP (`services/viaCep.ts`) (D-05)

```
GET https://viacep.com.br/ws/{cep8digitos}/json/
200 + { erro: true }   → CEP não encontrado
200 + dados            → normaliza { street: logradouro, neighborhood: bairro, city: localidade, state: uf }
!response.ok / rede    → erro de indisponibilidade
```

### 9.2 `useCepLookup` (`hooks/useCepLookup.ts`)

1. Recebe o valor do campo CEP (via `watch('cep')`) e o `setValue` do RHF.
2. Sanitiza: `cep.replace(/\D/g, '')`.
3. Quando chega a **8 dígitos**, busca automaticamente (sem botão).
4. Estados expostos: `isLoadingCep: boolean` e `cepError: string | null`.
5. Sucesso → `setValue` em rua, bairro, cidade e UF (`{ shouldValidate: true }`) e foco em Número.
6. Erro (não encontrado/indisponível) → `cepError` com mensagem; **os campos continuam editáveis** para correção manual.
7. Ignora resposta antiga se o CEP mudar durante a busca (flag `ignore` no cleanup do `useEffect`).
8. Status anunciado com `aria-live="polite"`.

## 10. Cálculos (`utils/`)

```ts
export const DELIVERY_FEE_IN_CENTS = 350          // D-04 — único lugar com a taxa

calculateSubtotal(items: CartItemDetailed[]): number  // reduce Σ priceInCents × quantity
calculateTotal(subtotal: number, deliveryFee = DELIVERY_FEE_IN_CENTS): number
formatCurrency(cents: number): string                 // utils/formatCurrency.ts — Intl.NumberFormat pt-BR BRL
```
Com carrinho vazio o checkout mostra `EmptyCart`, então a taxa de entrega nunca aparece sozinha.

## 11. Tema, tokens, breakpoints e acessibilidade

### 11.1 Tokens (`styles/themes/light.ts` e `dark.ts`)

> **Tema claro confirmado** no Style Guide do Figma (`docs/REF_DESIGN/Cores.png`): produto `yellow-dark #C47F17`, `yellow #DBAC2C`, `yellow-light #F1E9C9`, `purple-dark #4B2995`, `purple #8047F8`, `purple-light #EBE5F9`; base `title #272221`, `subtitle #403937`, `text #574F4D`, `label #8D8686`, `hover #D7D5D5`, `button #E6E5E5`, `input #EDEDED`, `card #F3F2F2`, `background #FAFAFA`, `white #FFFFFF`. O tema escuro não existe no Figma; os valores abaixo são proposta própria, validar contraste WCAG AA na T-33.

| Token semântico | Claro | Escuro |
|---|---|---|
| `background` (canvas) | `#FAFAFA` | `#121214` |
| `surface` (card) | `#F3F2F2` | `#202024` |
| `input` | `#EDEDED` | `#29292E` |
| `button` | `#E6E5E5` | `#323238` (proposta) |
| `hover` | `#D7D5D5` | `#3E3E44` (proposta) |
| `label` | `#8D8686` | `#A8A8B3` (proposta) |
| `text` | `#574F4D` | `#D4D4D8` (proposta) |
| `subtitle` | `#403937` | `#E1E1E6` (proposta) |
| `title` | `#272221` | `#F5F5F7` (proposta) |
| `yellow-light / yellow / yellow-dark` | `#F1E9C9 / #DBAC2C / #C47F17` | a definir (validar contraste) |
| `purple-light / purple / purple-dark` | `#EBE5F9 / #8047F8 / #4B2995` | a definir (validar contraste) |
| `danger` / `success` | a definir | a definir |

Os dois temas têm **as mesmas chaves**; `styled.d.ts` declara o `DefaultTheme` a partir de `typeof light`, então `props.theme.colors.*` tem autocompletar e nenhum `any`.

Tipografia (Style Guide, `docs/REF_DESIGN/Tipografia.png`), line-height 130% salvo indicação:

| Token | Fonte | Tamanho | Peso |
|---|---|---|---|
| `title-xl` / `title-l` / `title-m` | Baloo 2 | 48 / 32 / 24 px | 800 |
| `title-s` / `title-xs` | Baloo 2 | 20 / 18 px | 700 |
| `text-l` / `text-m` | Roboto | 20 / 16 px | 400 e 700 |
| `text-s` | Roboto | 14 px | 400 |
| `text-xs` | Roboto | 12 px | 700 |
| `tag` | Roboto | 10 px | 700 (uppercase) |
| `button-g` | Roboto | 14 px, lh 160% | 700 (uppercase) |
| `button-m` | Roboto | 12 px, lh 160% | 400 (uppercase) |

Ícones (`docs/REF_DESIGN/Ícones.png`, Phosphor): MapPin (fill/regular), Trash, CurrencyDollar, ShoppingCart (fill), Timer (fill), Package (fill), Coffee (fill), Plus, Minus, CreditCard, Money, Bank.

Estados dos componentes (`docs/REF_DESIGN/Componentes.png`): botão primário `yellow` → hover `yellow-dark`; secundário "Remover" `button` → hover `hover`; botão ícone do card `purple-dark` → hover `purple`; carrinho do Header `yellow-light` com badge `yellow-dark`; select de pagamento `button` → hover `hover` → selecionado `purple-light` + borda `purple`; input `input` com borda `button`, foco borda `yellow-dark`, sufixo "Opcional" em itálico `label`; QuantityInput `button` com ícones `purple` → hover `purple-dark`.

### 11.2 Breakpoints

| Nome | Largura | Comportamento |
|---|---|---|
| mobile | < 768 px | Catálogo 1 coluna (2 a partir de ~480), hero empilhado, checkout em coluna única |
| tablet | ≥ 768 px | Catálogo 2–3 colunas |
| desktop | ≥ 1120 px | Layout do Figma (catálogo 4 colunas, checkout 2 colunas) |

Validação obrigatória em 320, 375/390, 768, 1280/1440.

### 11.3 Acessibilidade (WCAG 2.2 AA)
- Foco visível (`:focus-visible`) em todos os controles; ordem de tabulação lógica.
- **Alvos de toque ≥ 44×44 px** (botões −/+, carrinho, tema, remover, opções de pagamento).
- Botões só com ícone com `aria-label`.
- Pagamento como **grupo de rádio**: `fieldset` + `legend` + `input type="radio"` reais (estilizados), navegáveis por setas.
- Mensagens de erro com `role="alert"`; status do CEP com `aria-live="polite"`.
- `CartBadge` com texto acessível ("3 itens no carrinho").
- `prefers-reduced-motion` desliga transições.

## 12. Testes

Execução: `npm run test` (Vitest, watch) · `npm run test -- --run` (uma execução) · `npm run build`.

| ID | Alvo | Caso | Ref |
|---|---|---|---|
| UT-01 | `cartReducer` | ADD_ITEM em carrinho vazio cria linha | RF-03 |
| UT-02 | `cartReducer` | ADD_ITEM de item existente soma, sem duplicar | RN-02 |
| UT-03 | `cartReducer` | ADD_ITEM com 0/negativo/decimal é ignorado | RN-01 |
| UT-04 | `cartReducer` | INCREMENT/DECREMENT; DECREMENT em 1 não altera | RF-05, RN-01 |
| UT-05 | `cartReducer` | REMOVE, CLEAR e CONFIRM_ORDER (guarda pedido + esvazia); estado anterior não é mutado | RF-05, RF-12, RF-13 |
| UT-06 | `cartCalculations` | subtotal, total, taxa fixa em centavos (29,70 + 3,50 = 33,20) | RF-10, RN-03, RN-04 |
| UT-07 | `formatCurrency` | 990 → "R$ 9,90" (normalizando espaço não separável) | RN-04 |
| UT-08 | `checkoutSchema` | válido; CEP inválido; número vazio; complemento opcional; sem pagamento | RF-08, RF-09 |
| UT-09 | `viaCep` (fetch mockado) | sucesso, `{erro:true}`, falha de rede | RN-07 |
| UT-10 | `loadInitialState` | JSON inválido, id inexistente, quantidade inválida | RF-06, RN-10 |
| IT-01 | Home (RTL) | adicionar 2 + 1 do mesmo café → badge 3, uma linha | RF-03, RF-04 |
| IT-02 | Checkout (RTL) | carrinho vazio → EmptyCart, sem confirmar | RF-11, RN-09 |
| IT-03 | Checkout (RTL) | submit inválido mostra erros (`role="alert"`) e não navega | RF-11 |
| IT-04 | Fluxo (RTL) | confirmar → `/success` com endereço/pagamento; carrinho vazio | RF-12, RF-13 |
| IT-05 | Theme | toggle muda e persiste | RF-14 |
| E2E | Playwright MCP | Fluxo completo desktop 1440 + mobile 390/320, dark mode, prints | RF-07, RF-15 |

## 13. Rastreabilidade PRD ↔ TECH

| Requisito | Onde é implementado | Task(s) | Teste |
|---|---|---|---|
| RF-01 | `data/coffees.ts`, `CoffeeCatalog`, `CoffeeCard` | T-09, T-13 | Playwright |
| RF-02 | `QuantityInput`, estado local do `CoffeeCard` | T-14 | IT-01 |
| RF-03 | `cartReducer` ADD_ITEM, `CoffeeCard` | T-15, T-17 | UT-01, UT-02, IT-01 |
| RF-04 | `CartBadge`, `totalUnits` derivado | T-18 | IT-01 |
| RF-05 | INCREMENT/DECREMENT/REMOVE, `CartItem` | T-15, T-22 | UT-04, UT-05 |
| RF-06 | `utils/storage.ts`, `CartProvider` | T-20 | UT-10 |
| RF-07 | `App.tsx`, `PageLayout` | T-05 | Playwright |
| RF-08 | `DeliveryAddressForm`, `useCepLookup`, `viaCep` | T-25..T-27 | UT-08, UT-09 |
| RF-09 | `PaymentMethodSelector`, `checkoutSchema` | T-28 | UT-08 |
| RF-10 | `utils/cartCalculations.ts`, `CartSummary` | T-19, T-22 | UT-06 |
| RF-11 | `Checkout` (bloqueio), `checkoutSchema` | T-23, T-29 | IT-02, IT-03 |
| RF-12 | `confirmOrder`, CONFIRM_ORDER, `OrderSuccess` | T-29, T-30 | UT-05, IT-04 |
| RF-13 | CONFIRM_ORDER (esvazia + guarda snapshot) | T-29, T-30 | UT-05, IT-04 |
| RF-14 | `ThemeContext`, `useTheme`, `ThemeToggle`, `styles/themes` | T-06, T-32, T-33 | IT-05 |
| RF-15 | estilos responsivos | T-34, T-35 | Playwright |
| RF-16 | `assets/brand`, `public/favicon.svg`, Header | T-07, T-08 | Playwright |
| RN-01 | ADD_ITEM/DECREMENT_ITEM, `QuantityInput` | T-14, T-15 | UT-03, UT-04 |
| RN-02 | ADD_ITEM (`find` + `map`) | T-15 | UT-02 |
| RN-03 / RN-04 | `cartCalculations`, `formatCurrency`, centavos | T-10, T-19 | UT-06, UT-07 |
| RN-05 | `PaymentMethodSelector` (sem dados de cartão) | T-28 | revisão |
| RN-06 | `Order` snapshot + `last-order` no storage | T-29, T-30 | UT-05 |
| RN-07 | `viaCep`, `useCepLookup` | T-26, T-27 | UT-09 |
| RN-08 | `data/coffees.ts` tipado | T-09 | build (tsc) |
| RN-09 | `EmptyCart`, Success sem pedido | T-23, T-31 | IT-02 |
| RN-10 | `checkoutSchema`, `loadInitialState` | T-20, T-29 | UT-08, UT-10 |

## 14. Divergências conscientes em relação ao projeto de referência

| Tema | Referência | Este projeto | Motivo |
|---|---|---|---|
| Item do carrinho | Guarda o objeto `coffee` inteiro | Guarda só `coffeeId + quantity` | Catálogo como fonte única; descarta ids inválidos (RN-10) |
| Roteamento | `react-router-dom` | `react-router` (v7) | Padrão da disciplina (Aula 13) |
| Mensagens do Zod | `errorMap` (Zod 3) | parâmetro `error` (Zod 4) | Versão atual da biblioteca |
| Organização dos docs | SPECs dentro de `agents.md`, regras em `spec.md` | `docs/PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md` + `AGENTS.md` | Exigência do enunciado |
| Ação de limpeza | Só `CONFIRM_ORDER` | `CONFIRM_ORDER` + `CLEAR_CART` | `CLEAR_CART` mantido como utilitário |

## 15. Deploy

Vercel (D-06): build `npm run build`, saída `dist`, `vercel.json` com rewrite `/(.*)` → `/index.html` para as rotas do React Router. Sem variáveis de ambiente (ViaCEP é pública).
