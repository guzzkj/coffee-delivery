# TASKS_SPEC — Coffee Delivery

> Status: **v1.1 — validado pelo Gustavo em 2026-11-19; caminhos alinhados ao projeto de referência (uma pasta por componente, ver TECH_SPEC §3).**
> Regra: **uma task por vez** → analisar → planejar → implementar → testar (Vitest e/ou Playwright) → autorrevisar diff → commit (autoria só do Gustavo) → push → marcar aqui (status, teste, hash).
> Status: `A fazer` · `Em andamento` · `Em teste` · `Concluído`.
> Branches: `main` (estável) · `dev` (integração) · `feature/<fase>` (merge `--no-ff` em `dev` ao fim de cada fase).

---

## Fase 1–2 — Análise e Planejamento (sem código)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Status |
|---|---|---|---|---|---|
| T-00 | Ler enunciado, analisar Figma, redigir PRD/TECH/TASKS/AI_USAGE e adaptar AGENTS.md | todos | `docs/*.md`, `AGENTS.md` | Gustavo validou os 4 documentos e as decisões D-01..D-06 | Concluído |

## Fase 3 — Configuração (branch `main` → depois `dev` / `feature/setup`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-01 | Scaffold Vite 8 `react-ts` na pasta atual, `git init`, `.gitignore`, primeiro commit com docs | RF-07 | `package.json`, `vite.config.ts`, `tsconfig*`, `index.html`, `src/*`, `.gitignore` | `npm run dev` abre; `npm ls vite` = 8.x; autoria conferida | `chore: initialize coffee delivery project` | Concluído |
| T-02 | Criar repo GitHub público `coffee-delivery`, branch `dev`, push | — | — | `main` e `dev` no remoto | — | Concluído |
| T-03 | Remover boilerplate do template e criar pastas do TECH_SPEC §3 | — | `src/App.tsx`, `src/index.css`, pastas | App mostra "Coffee Delivery"; sem arquivos do demo | `chore: remove vite template boilerplate` | Concluído |
| T-04 | Configurar Vitest + Testing Library + jsdom + script `test` | — | `vite.config.ts`, `src/tests/setup.ts`, `package.json` | `npm run test -- --run` passa com 1 teste de exemplo | `chore: configure vitest` | Concluído |
| T-05 | Instalar `react-router`; rotas `/`, `/checkout`, `/success`, `*` com páginas placeholder e `PageLayout` | RF-07 | `main.tsx`, `App.tsx`, `pages/Home|Checkout|Success/`, `components/PageLayout/` | Navegação sem reload; rota inválida → `/` | `feat: add app routes` | Concluído |
| T-06 | styled-components: `themes.ts` (tokens claro/escuro), `styled.d.ts`, `GlobalStyle`, fontes Baloo 2 + Roboto | RF-14 (base) | `styles/themes/light.ts`, `styles/themes/dark.ts`, `styles/global.ts`, `styles/styled.d.ts`, `index.html`, `main.tsx` | Tema claro aplicado; fontes carregando; tipagem do tema sem `any` | `style: add theme tokens and global styles` | Concluído |

## Fase 4 — Branding (`feature/branding`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-07 | Gerar logo com IA (claro/escuro), registrar prompt/resultado/decisão | RF-16 | `docs/AI_USAGE.md`, `docs/BRANDING.md` (ou seção do README) | Logo aprovada pelo Gustavo; legível em 32 px | `docs: document ai branding process` | Concluído |
| T-08 | Adicionar logos em `src/assets/brand` e favicon em `public/` | RF-16 | `src/assets/brand/*`, `public/favicon.svg`, `index.html` | Favicon visível na aba; título da página definido | `feat: add ai generated logo and favicon` | A fazer |

## Fase 5 — Home (`feature/home`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-09 | Tipos `Coffee`/`CoffeeTag` + catálogo local com imagens | RF-01, RN-08 | `types/coffee.ts`, `data/coffees.ts` (imagens já em `public/coffees/*.png`) | Catálogo tipado compila; preços em centavos | `feat: add typed coffee catalog` | A fazer |
| T-10 | `formatCurrency` (centavos → BRL) + teste UT-07 | RN-04 | `utils/formatCurrency.ts`, `tests/formatCurrency.test.ts` | Teste passa | `feat: add currency formatter` | A fazer |
| T-11 | `Header` estático (logo, localização, botão carrinho) | RF-16 | `components/Header/` | Igual ao Figma em 1440; link do carrinho vai a `/checkout` | `feat: add header component` | A fazer |
| T-12 | `Hero` estático (título, subtítulo, 4 benefícios, imagem) | — | `components/Hero/` | Igual ao Figma em 1440 | `feat: add home hero section` | A fazer |
| T-13 | `CoffeeCard` estático + `CoffeeCatalog` com `map` | RF-01 | `components/CoffeeCard/`, `components/CoffeeCatalog/`, `pages/Home/` | Todos os cafés renderizados com `key={coffee.id}` | `feat: render coffee catalog` | A fazer |
| T-14 | `QuantityInput` + estado local de quantidade no card (mín. 1) | RF-02, RN-01 | `components/QuantityInput/`, `components/CoffeeCard/` | − desabilitado em 1; `aria-label` nos botões | `feat: add quantity selector to coffee card` | A fazer |

## Fase 6 — Carrinho (`feature/cart`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-15 | Tipos de carrinho/pedido + `cartReducer` (ADD, INCREMENT, DECREMENT, REMOVE, CONFIRM_ORDER, CLEAR) + testes UT-01..05 | RF-03, RF-05, RN-01, RN-02 | `types/cart.ts`, `types/order.ts`, `reducers/*`, `tests/cartReducer.test.ts` | Testes passam; nenhuma mutação | `feat: add cart reducer` | A fazer |
| T-16 | `CartContext` + `CartProvider` + `useCart` | RF-03 | `contexts/CartContext.tsx`, `hooks/useCart.ts`, `main.tsx` | `useCart` fora do provider lança erro claro | `feat: add cart context` | A fazer |
| T-17 | Botão do card adiciona ao carrinho e reseta quantidade para 1 | RF-03, RN-02 | `components/CoffeeCard/` | Re-adicionar soma (verificado via React DevTools/Playwright) | `feat: add coffee to cart` | A fazer |
| T-18 | `CartBadge` no Header com soma das unidades | RF-04 | `components/CartBadge/`, `components/Header/` | 2+1 do mesmo café → "3"; oculto em 0 | `feat: show cart units in header` | A fazer |
| T-19 | `cartCalculations` (subtotal, taxa fixa, total) + UT-06 | RF-10, RN-03, RN-04 | `utils/cartCalculations.ts`, teste | Testes passam; taxa em uma constante só | `feat: add cart total calculations` | A fazer |

## Fase 7 — Persistência (`feature/cart`, continuação)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-20 | Persistir carrinho e último pedido (chaves `@coffee-delivery:*-1.0.0`, lazy init validado + `useEffect`) + UT-10 | RF-06, RN-06, RN-10 | `utils/storage.ts`, `CartContext.tsx`, teste | F5 mantém o carrinho; JSON corrompido não quebra | `feat: persist cart in local storage` | A fazer |

## Fase 8 — Checkout (`feature/checkout`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-21 | Layout estático do Checkout (2 colunas desktop) | RF-15 (base) | `pages/Checkout/` | Estrutura igual ao Figma | `feat: add checkout page layout` | A fazer |
| T-22 | `CartItem` + `CartSummary` ligados ao contexto | RF-05, RF-10 | `components/CartItem/`, `components/CartSummary/` | +/−/Remover atualizam totais e badge na hora | `feat: list selected coffees in checkout` | A fazer |
| T-23 | `EmptyCart` quando não há itens | RN-09, RF-11 | `components/EmptyCart/` | Link volta para a Home; sem botão de confirmar ativo | `feat: add empty cart state` | A fazer |
| T-24 | `checkoutSchema` (Zod 4, mensagens com `error`; conferir API no Context7) + UT-08 | RF-08, RF-09 | `schemas/checkoutSchema.ts`, teste | Testes passam | `feat: add checkout validation schema` | A fazer |
| T-25 | `DeliveryAddressForm` com RHF + `zodResolver` (sem API ainda) | RF-08, RF-11 | `components/DeliveryAddressForm/`, `pages/Checkout/` | Erros por campo com `aria-invalid`/`aria-describedby` | `feat: add delivery address form` | A fazer |
| T-26 | `services/viaCep.ts` + UT-09 com fetch mockado | RN-07 | `services/viaCep.ts`, teste | Trata sucesso, não encontrado e falha | `feat: add cep lookup service` | A fazer |
| T-27 | `useCepLookup` (sanitiza `\D`, busca ao chegar a 8 dígitos, `setValue`, `isLoadingCep`/`cepError`, campos editáveis após erro) | RF-08, RN-07 | `hooks/useCepLookup.ts`, `components/DeliveryAddressForm/` | Testado com CEP válido, inexistente e Offline no DevTools | `feat: autofill address from cep` | A fazer |
| T-28 | `PaymentMethodSelector` (grupo de rádio `credit`/`debit`/`money`, alvos ≥ 44 px) no formulário | RF-09 | `components/PaymentMethodSelector/` | Teclado funciona; erro se nada selecionado | `feat: add payment method selector` | A fazer |
| T-29 | `confirmOrder`: bloqueio (RN-10), monta snapshot, despacha `CONFIRM_ORDER` (guarda pedido + esvazia), navega | RF-11, RF-12, RF-13, RN-06 | `contexts/CartContext.tsx`, `pages/Checkout/` | Pedido inválido não avança; válido vai a `/success` | `feat: confirm order and clear cart` | A fazer |

## Fase 9 — Sucesso (`feature/success`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-30 | `OrderSuccess` com endereço, previsão e pagamento do snapshot | RF-12, RF-13 | `components/OrderSuccess/`, `pages/Success/` | Dados corretos mesmo com carrinho vazio e após F5 | `feat: add order success page` | A fazer |
| T-31 | Estado vazio de `/success` sem pedido | RN-09 | `pages/Success/` | Acesso direto mostra mensagem + link Home | `feat: handle success page without order` | A fazer |

## Fase 10 — Tema e mobile (`feature/theme-responsive`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-32 | `ThemeContext`/`useTheme` (localStorage + prefers-color-scheme) + `ThemeToggle` | RF-14 | `contexts/ThemeContext.tsx`, `hooks/useTheme.ts`, `components/ThemeToggle/` | Alterna, persiste, respeita preferência do SO | `feat: add light and dark theme toggle` | A fazer |
| T-33 | Revisar contraste do tema escuro em todas as telas | RF-14, RNF a11y | `styles/themes/dark.ts` | Contraste AA conferido | `style: adjust dark theme contrast` | A fazer |
| T-34 | Home responsiva (320–1440) | RF-15 | componentes da Home | Sem scroll horizontal; prints 390/320 | `style: make home responsive` | A fazer |
| T-35 | Checkout e Sucesso responsivos | RF-15 | componentes de checkout/success | Coluna única no mobile; alvos de toque OK | `style: make checkout and success responsive` | A fazer |

## Fase 11 — Qualidade (`feature/quality`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-36 | Revisão de acessibilidade (foco, labels, aria-live, teclado, reduced motion) | RNF a11y | vários | Fluxo completo só com teclado | `fix: improve accessibility across pages` | A fazer |
| T-37 | Testes de fluxo IT-01..IT-05 (Testing Library) | RF-03..RF-14 | `src/tests/*` | `npm run test -- --run` verde | `test: cover main user flows` | A fazer |
| T-38 | Validação Playwright (desktop/mobile/dark) + prints em `docs/screenshots` | RF-07, RF-15 | `docs/screenshots/*` | Prints Home, Checkout, Sucesso, Dark (desktop+mobile) | `docs: add app screenshots` | A fazer |

## Fase 12 — Entrega (`dev` → `main`)

| ID | Objetivo | Req. | Arquivos | Critério de pronto | Commit sugerido | Status |
|---|---|---|---|---|---|---|
| T-39 | Configurar deploy (Vercel) com rewrite SPA | Entrega | `vercel.json` | URL pública funcionando, inclusive F5 em `/checkout` | `chore: configure vercel deploy` | A fazer |
| T-40 | README final (stack/versões, scripts, decisões, prints, Figma, branding, IA, link) + AI_USAGE completo | Entrega | `README.md`, `docs/AI_USAGE.md` | Checklist §10 do enunciado completo | `docs: finalize readme and ai usage` | A fazer |
| T-41 | Merge `dev` → `main` (`--no-ff`) com build + Playwright aprovados | Entrega | — | `main` publicada = versão entregue | `chore: merge dev into main` | A fazer |

## Opcionais (somente após T-41 e com aprovação)

| ID | Objetivo | Status |
|---|---|---|
| X-01 | Filtro por tag no catálogo | A fazer |
| X-02 | E2E Playwright como teste versionado + GitHub Actions | A fazer |
| X-03 | Animações com `prefers-reduced-motion` | A fazer |

---

## Registro de execução

| Task | Data | Teste executado | Commit (hash) |
|---|---|---|---|
| T-00 | 2026-11-19 | — (documentação) | incluído em `f06a3a1` |
| T-01 | 2026-11-19 | `npm run build` OK; `npm ls vite` = 8.3.8; `@vitejs/plugin-react` 6.3.0; autoria conferida | `f06a3a1` |
| T-02 | 2026-11-20 | Repo https://github.com/guzzkj/coffee-delivery (público); `origin/main` e `origin/dev` com upstream; `git fetch` conferido | — (criado pelo Gustavo) |
| T-03 | 2026-11-20 | `npm run build` OK; `npm run lint` (oxlint) sem avisos; demo do Vite removida | `chore: remove vite template boilerplate` |
| T-04 | 2026-11-20 | `npm run test -- --run` 1/1 OK; build + lint OK | `chore: configure vitest` |
| T-05 | 2026-11-20 | Vitest 3/3 (rotas `/`, `/checkout`, `*` → `/`); build + lint OK; react-router 8.5.2 | `feat: add app routes` |
| T-06 | 2026-11-20 | styled-components 6.6.0; tokens claro (Figma) + escuro (proposta) com tipos compartilhados; build/test/lint OK | `style: add theme tokens and global styles` |
| T-07 | 2026-11-20 | Logo SVG gerada; prompt/resultado/decisão em BRANDING.md e AI_USAGE | `docs: document ai branding process` |
