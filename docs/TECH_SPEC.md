# TECH_SPEC — Coffee Delivery

> Status: **v1.0 — validado pelo Gustavo em 2026-11-19.** Referências `RF-xx`/`RN-xx` apontam para `docs/PRD_SPEC.md`.
> Decisões D-01..D-13 registradas no PRD §10 (D-07, ferramenta da logo, decidida na T-07).

---

## 1. Stack e justificativa

| Tecnologia | Versão alvo | Uso | Justificativa |
|---|---|---|---|
| React | 19.x (template Vite) | UI em componentes | Exigido pela disciplina |
| Vite | **8.x** + `@vitejs/plugin-react@^6` | Dev server e build | Padrão da disciplina (AGENTS.md §1) |
| TypeScript | template `react-ts` (strict) | Tipagem, `.tsx` | Exigido no enunciado; sem `any` |
| React Router | `react-router` (v7) | Rotas `/`, `/checkout`, `/success` (RF-07) | Aula 13 |
| Context API + `useReducer` | nativo | Estado global do carrinho | Exigido no enunciado; ações explícitas e testáveis |
| React Hook Form + Zod + `@hookform/resolvers` | atuais | Formulário de endereço/pagamento (RF-08, RF-09, RF-11) | Exigido no enunciado; resolver liga o schema Zod ao RHF |
| **styled-components** (D-02) | 6.x | Estilização + `ThemeProvider` para claro/escuro | Padrão do enunciado; tema via objeto tipado facilita os tokens |
| `@phosphor-icons/react` (D-11) | 2.x | Ícones do Header, cards, checkout | Mesma família de ícones do Figma; autorizada pelo Gustavo como lib extra |
| Vitest + `@testing-library/react` + `@testing-library/user-event` + `jsdom` | atuais | Testes unitários e de fluxo | Integra nativamente com Vite |
| Playwright (MCP) | — | Validação visual/fluxo antes de concluir tasks com UI | AGENTS.md §7.4 |
| Fontes | Google Fonts (`<link>` no `index.html`) | Baloo 2 + Roboto | Sem dependência extra |
| Deploy | Vercel (D-06) | Publicação | Rewrite SPA simples via `vercel.json` |

Gerenciador de pacotes: **npm** (padrão da disciplina). Node 22.x (instalado: v22.22.3).

> Tailwind CSS 4 foi considerado e descartado: styled-components é o padrão do enunciado e o `ThemeProvider` tipado atende bem ao tema claro/escuro.

## 2. Arquitetura

```
main.tsx
 └─ ThemeProvider (contexts/ThemeContext — tema claro/escuro + styled ThemeProvider)
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

## 3. Estrutura de diretórios

```
src/
├── assets/
│   ├── brand/             logo-light.svg, logo-dark.svg (IA)
│   ├── coffees/           imagens dos cafés
│   └── hero/              imagem do hero
├── components/
│   ├── layout/            PageLayout, Header
│   ├── ui/                QuantityInput, CartBadge, ThemeToggle, Button
│   ├── home/              Hero, CoffeeCatalog, CoffeeCard
│   ├── checkout/          DeliveryAddressForm, PaymentMethodSelector, CartItem, CartSummary, EmptyCart
│   └── success/           OrderSuccess
├── pages/                 Home.tsx, Checkout.tsx, Success.tsx
├── contexts/              CartContext.tsx, ThemeContext.tsx
├── reducers/              cartReducer.ts, cartActions.ts
├── hooks/                 useCart.ts, useTheme.ts, useLocalStorage.ts, useCepLookup.ts
├── services/              cepService.ts
├── data/                  coffees.ts
├── types/                 coffee.ts, cart.ts, order.ts
├── schemas/               checkoutSchema.ts
├── utils/                 currency.ts, cartCalculations.ts, storage.ts
├── styles/                themes.ts, GlobalStyle.ts, styled.d.ts
├── tests/                 *.test.ts(x) + setup.ts
├── App.tsx
└── main.tsx
public/                    favicon.svg (logo IA)
docs/                      PRD_SPEC, TECH_SPEC, TASKS_SPEC, AI_USAGE, BRANDING (opcional)
```

Estilos styled-components ficam no próprio arquivo do componente ou em `Componente.styles.ts` ao lado dele quando crescerem.

## 4. Componentes

| Componente | Responsabilidade | Props principais | RF |
|---|---|---|---|
| `PageLayout` | Header + `<Outlet/>` + largura máxima | — | RF-07, RF-15 |
| `Header` | Logo, localização, ThemeToggle, botão do carrinho com `CartBadge` | — (lê `useCart`) | RF-04, RF-14, RF-16 |
| `ThemeToggle` | Alterna tema; `aria-label` + `aria-pressed` | — (lê `useTheme`) | RF-14 |
| `CartBadge` | Mostra total de unidades; oculto se 0 | `count: number` | RF-04 |
| `Hero` | Título, subtítulo, 4 benefícios, imagem | — | RF-01 (contexto) |
| `CoffeeCatalog` | `coffees.map(c => <CoffeeCard key={c.id} …/>)` | `coffees: Coffee[]` | RF-01 |
| `CoffeeCard` | Card do café + `QuantityInput` + botão adicionar | `coffee: Coffee` | RF-01..03 |
| `QuantityInput` | − valor +; mínimo 1 | `value`, `onIncrement`, `onDecrement`, `min?` | RF-02, RF-05, RN-01 |
| `CartItem` | Linha do carrinho no checkout + Remover | `item: CartItemDetailed` | RF-05 |
| `CartSummary` | Subtotal, entrega, total + botão Confirmar | `subtotal`, `deliveryFee`, `total`, `disabled` | RF-10, RF-11 |
| `EmptyCart` | Estado vazio do carrinho | — | RN-09 |
| `DeliveryAddressForm` | Campos de endereço (RHF) + status do CEP | `register`, `errors`, `cepStatus` | RF-08, RN-07 |
| `PaymentMethodSelector` | Grupo de rádio estilizado (crédito/débito/dinheiro) | `register`, `error` | RF-09 |
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
export type PaymentMethod = 'credit' | 'debit' | 'cash'

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

O carrinho guarda só `coffeeId + quantity`; os dados do café são buscados no catálogo com `find` (fonte única de verdade, evita preço desatualizado no `localStorage`).

## 6. Estado global — Context + useReducer

### 6.1 Estado e ações (`reducers/`)

```ts
type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
```

| Ação | Regra | RF/RN |
|---|---|---|
| `ADD_ITEM` | Ignora `quantity < 1` ou não inteiro. Se existe → `map` somando; senão → `[...items, novo]` | RF-03, RN-01, RN-02 |
| `INCREMENT_ITEM` | `map` +1 no item | RF-05 |
| `DECREMENT_ITEM` | `map` −1, **sem descer abaixo de 1** (D-03) | RF-05, RN-01 |
| `REMOVE_ITEM` | `filter` por `coffeeId` | RF-05 |
| `CLEAR_CART` | `{ items: [] }` | RF-13 |

O reducer é função pura e é o primeiro alvo de testes.

### 6.2 CartContext

Expõe via `useCart()`:
- `items: CartItemDetailed[]` (derivado: `items` + `find` no catálogo, descartando ids inexistentes — RN-10)
- `totalUnits` (Σ `quantity`, RF-04), `subtotalInCents`, `deliveryFeeInCents`, `totalInCents` — **derivados na renderização, nunca em state**
- `addItem`, `incrementItem`, `decrementItem`, `removeItem`, `clearCart`
- `lastOrder: Order | null`, `confirmOrder(address, paymentMethod): Order`

`confirmOrder` monta o snapshot, salva `lastOrder`, despacha `CLEAR_CART` e devolve o pedido; a página navega para `/success` com `useNavigate()`.

`useCart()` lança erro claro se usado fora do `CartProvider`.

## 7. Hooks, efeitos e persistência

| Chave `localStorage` | Conteúdo | Quem grava |
|---|---|---|
| `coffee-delivery:cart:v1` | `CartItem[]` | `CartProvider` (`useEffect` em `[items]`) |
| `coffee-delivery:last-order:v1` | `Order` | `confirmOrder` |
| `coffee-delivery:theme:v1` | `'light' \| 'dark'` | `ThemeProvider` |

- Carrinho: `useReducer(cartReducer, undefined, loadInitialCart)` — inicializador lazy lê e **valida** o JSON (array, `quantity` inteiro ≥ 1, `coffeeId` existente no catálogo). Dado corrompido → carrinho vazio. Leitura/escrita sempre em `try/catch` (`utils/storage.ts`).
- Tema: `useTheme()` — lazy init: valor salvo → senão `matchMedia('(prefers-color-scheme: dark)')` → senão `light`.
- CEP: `useCepLookup()` — status `'idle' | 'loading' | 'success' | 'not-found' | 'error'`; ignora resposta antiga (flag `ignore`/`AbortController`) se o CEP mudar durante a busca.

## 8. Rotas

| Rota | Página | Observação |
|---|---|---|
| `/` | Home | Hero + catálogo |
| `/checkout` | Checkout | EmptyCart quando `items.length === 0` |
| `/success` | Success | Usa `lastOrder`; sem pedido → estado vazio (RN-09) |
| `*` | `<Navigate to="/" replace />` | D-09 |

Navegação com `<Link>`/`useNavigate` de `react-router` (sem `<a href>` interno).

## 9. Validação (Zod) e formulário

```ts
// schemas/checkoutSchema.ts (rascunho)
export const checkoutSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido (8 dígitos)'),
  street: z.string().trim().min(1, 'Informe a rua'),
  number: z.string().trim().min(1, 'Informe o número'),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, 'Informe o bairro'),
  city: z.string().trim().min(1, 'Informe a cidade'),
  state: z.string().trim().regex(/^[A-Za-z]{2}$/, 'UF com 2 letras'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], { message: 'Selecione a forma de pagamento' }),
})
export type CheckoutFormData = z.infer<typeof checkoutSchema>
```

- `useForm<CheckoutFormData>({ resolver: zodResolver(checkoutSchema) })`; `<form noValidate>`.
- Ao sair do campo CEP (ou ao completar 8 dígitos) → `useCepLookup`; sucesso → `setValue` em rua/bairro/cidade/UF (+ `clearErrors`); foco vai para Número.
- Submit bloqueado se `items.length === 0` (RF-11) e sempre revalidado pelo schema (RN-10).
- Erros: `<p id="campo-error" role="alert">` + `aria-invalid` + `aria-describedby`; status do CEP em `aria-live="polite"`.

### 9.1 ViaCEP (`services/cepService.ts`) (D-05)

```
GET https://viacep.com.br/ws/{cep8digitos}/json/
200 + { erro: true }   → CEP não encontrado
200 + dados            → normaliza { street: logradouro, neighborhood: bairro, city: localidade, state: uf }
!response.ok / rede    → erro de indisponibilidade
```
Formato inválido é barrado antes do fetch.

## 10. Cálculos (`utils/`)

```ts
export const DELIVERY_FEE_IN_CENTS = 350          // D-04 — único lugar com a taxa

calculateSubtotal(items: CartItemDetailed[]): number  // reduce Σ priceInCents × quantity
calculateTotal(subtotal: number, deliveryFee = DELIVERY_FEE_IN_CENTS): number
formatCurrency(cents: number): string                 // Intl.NumberFormat pt-BR BRL
```
Com carrinho vazio o checkout mostra `EmptyCart`, então a taxa de entrega nunca aparece sozinha.

## 11. Tema, tokens, breakpoints e acessibilidade

### 11.1 Tokens (referência do Coffee Delivery — **confirmar no Style Guide do Figma**)

| Token semântico | Claro | Escuro (proposta, validar contraste) |
|---|---|---|
| `background` | `#FAFAFA` | `#1A1716` |
| `surface` (card) | `#F3F2F2` | `#262220` |
| `input` | `#EDEDED` | `#2F2A28` |
| `button` | `#E6E5E5` | `#3A3432` |
| `hover` | `#D7D5D5` | `#47403D` |
| `label` | `#8D8686` | `#A39C99` |
| `text` | `#574F4D` | `#D7D2D0` |
| `subtitle` | `#403937` | `#E6E1DF` |
| `title` | `#272221` | `#F5F2F0` |
| `yellow-light / yellow / yellow-dark` | `#F1E9C9 / #DBAC2C / #C47F17` | `#3D3220 / #DBAC2C / #F0B84A` |
| `purple-light / purple / purple-dark` | `#EBE5F9 / #8047F8 / #4B2995` | `#2E2445 / #9B6BFF / #C9B3FF` |
| `danger` / `success` | definir | definir |

Tipografia: Baloo 2 (700/800) para títulos; Roboto (400/700) para textos. Escala conforme Style Guide.

Tipagem do tema em `styles/styled.d.ts` (`DefaultTheme`) para autocompletar `props.theme.colors.*` sem `any`.

### 11.2 Breakpoints

| Nome | Largura | Comportamento |
|---|---|---|
| mobile | < 768 px | Catálogo 1 coluna (2 a partir de ~480), hero empilhado, checkout em coluna única |
| tablet | ≥ 768 px | Catálogo 2–3 colunas |
| desktop | ≥ 1120 px | Layout do Figma (catálogo 4 colunas, checkout 2 colunas) |

Validação obrigatória em 320, 375/390, 768, 1280/1440.

### 11.3 Acessibilidade (WCAG 2.2 AA)
- Foco visível (`:focus-visible`) em todos os controles; ordem de tabulação lógica.
- Botões só com ícone (+, −, carrinho, tema, remover) com `aria-label`.
- Pagamento como `fieldset` + `legend` + inputs `radio` reais (estilizados), navegáveis por setas.
- `CartBadge` com texto acessível ("3 itens no carrinho").
- `prefers-reduced-motion` desliga transições.

## 12. Testes

Execução: `npm run test` (Vitest, watch) · `npm run test -- --run` (CI) · `npm run build`.

| ID | Alvo | Caso | Ref |
|---|---|---|---|
| UT-01 | `cartReducer` | ADD_ITEM em carrinho vazio cria linha | RF-03 |
| UT-02 | `cartReducer` | ADD_ITEM de item existente soma, sem duplicar | RN-02 |
| UT-03 | `cartReducer` | ADD_ITEM com 0/negativo/decimal é ignorado | RN-01 |
| UT-04 | `cartReducer` | INCREMENT/DECREMENT; DECREMENT não passa de 1 | RF-05, RN-01 |
| UT-05 | `cartReducer` | REMOVE e CLEAR; estado anterior não é mutado | RF-05, RF-13 |
| UT-06 | `cartCalculations` | subtotal, total, taxa fixa em centavos | RF-10, RN-03, RN-04 |
| UT-07 | `formatCurrency` | 990 → "R$ 9,90" (normalizando espaço não separável) | RN-04 |
| UT-08 | `checkoutSchema` | válido; CEP inválido; número vazio; complemento opcional; sem pagamento | RF-08, RF-09 |
| UT-09 | `cepService` (fetch mockado) | sucesso, `{erro:true}`, falha de rede | RN-07 |
| UT-10 | `loadInitialCart` | JSON inválido, id inexistente, quantidade inválida | RF-06, RN-10 |
| IT-01 | Home (RTL) | adicionar 2 + 1 do mesmo café → badge 3, uma linha | RF-03, RF-04 |
| IT-02 | Checkout (RTL) | carrinho vazio → EmptyCart, sem confirmar | RF-11, RN-09 |
| IT-03 | Checkout (RTL) | submit inválido mostra erros e não navega | RF-11 |
| IT-04 | Fluxo (RTL) | confirmar → `/success` com endereço/pagamento; carrinho vazio | RF-12, RF-13 |
| IT-05 | Theme | toggle muda e persiste | RF-14 |
| E2E | Playwright MCP | Fluxo completo desktop 1440 + mobile 390/320, dark mode, prints | RF-07, RF-15 |

## 13. Deploy

Vercel (D-06): build `npm run build`, saída `dist`, `vercel.json` com rewrite `/(.*)` → `/index.html` para as rotas do React Router. Sem variáveis de ambiente (ViaCEP é pública).
