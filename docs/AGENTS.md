# AGENTS.md — Motor de desenvolvimento React (SPA · Senac)

> Instruções para **qualquer agente de IA** (OpenCode, Claude Code etc.) nos projetos da disciplina *Single Page Application*.
> Consolidado a partir das **Aulas 04 a 13** e dos **Projetos 02 (Currency Exchange), 03 (DevLinks) e 04 (HairDay)**.
> Copie este arquivo para a raiz de cada projeto e preencha o bloco **Projeto atual** abaixo.

---

## Projeto atual — Coffee Delivery (Projeto Final 05)

- **Projeto:** Coffee Delivery — React + TypeScript + IA (Projeto Final 05, SPA · Senac). Nome da marca: **Coffee Delivery** (D-01).
- **Papel do agente:** desenvolvedor front-end React + TypeScript responsável por este projeto.
- **Objetivo:** cafeteria SPA com catálogo, carrinho, checkout (endereço via CEP + pagamento) e confirmação de pedido fictício; logo criada por IA, tema claro/escuro, mobile, SPECs, testes e uso de IA documentado. Reproduzir fielmente o Figma (desktop e mobile).
- **Figma:** https://www.figma.com/design/7mC5Yp1OIdLSWEKyHJJebu/Coffee-Delivery-%E2%80%A2-Projeto-Final-React--Copy- (cópia do Gustavo; original: https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=2-1297) — frames Home, Checkout, Checkout Filled e Success.
- **Enunciado (Notion):** https://app.notion.com/p/41bdfca74d8d8119a849e30ea492a6af — entrega no Blackboard: link do repositório público + link da aplicação publicada.
- **Board / plano:** `docs/TASKS_SPEC.md` (fonte de verdade das tasks).
- **Projeto de referência:** https://github.com/Devpaulo1/coffee-delivery — consultar para organização e decisões; **nunca copiar texto ou código literalmente**. Divergências conscientes em `docs/TECH_SPEC.md` §14 (ex.: usamos `react-router`, não `react-router-dom`; Zod 4 com `error`, não `errorMap`).
- **Stack:** React 19 + **Vite 8** + **TypeScript** (template `react-ts`, `.tsx`) + `react-router` + Context API + `useReducer` + React Hook Form + Zod (`@hookform/resolvers`) + **styled-components** (D-02) + `@phosphor-icons/react` + Vitest/Testing Library/jsdom. Gerenciador: **npm**.
- **Escopo:** RF-01..RF-16 e RN-01..RN-10 de `docs/PRD_SPEC.md`. **Fora do escopo:** backend, auth, banco, pagamento real, frete por distância.
- **Componentes previstos:** PageLayout, Header, ThemeToggle, CartBadge, Hero, CoffeeCatalog, CoffeeCard, QuantityInput, CartItem, CartSummary, EmptyCart, DeliveryAddressForm, PaymentMethodSelector, OrderSuccess.

### Regras específicas deste projeto (prevalecem sobre o restante deste arquivo em caso de conflito)

1. **Ler os SPECs antes de codar:** `docs/PRD_SPEC.md` (o quê), `docs/TECH_SPEC.md` (como), `docs/TASKS_SPEC.md` (ordem). Trabalhar **uma task `T-xx` por vez**, na ordem; ao terminar, atualizar o status e o registro de execução no TASKS_SPEC.
2. **TypeScript sempre** (`.ts`/`.tsx`), modo estrito, **sem `any`**. Tipos compartilhados em `src/types/`.
3. **Bibliotecas liberadas para este projeto** (exigidas pelo enunciado, ampliam a lista da seção 1.7): `react-router`, `react-hook-form`, `zod`, `@hookform/resolvers`, `styled-components`, `@phosphor-icons/react`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`. Qualquer outra: **perguntar antes**.
4. **Estado do carrinho:** só via `cartReducer` (estado `{ items, confirmedOrder }`; ações `ADD_ITEM`, `INCREMENT_ITEM`, `DECREMENT_ITEM` (só se quantidade > 1), `REMOVE_ITEM`, `CONFIRM_ORDER`, `CLEAR_CART`). Item guarda só `coffeeId + quantity`. Nunca mutar estado. Totais e contador são **derivados**, nunca guardados em state.
4.1. **Estrutura:** uma pasta por componente (`src/components/<Nome>/index.tsx` + `styles.ts`) e por página (`src/pages/<Nome>/`); temas em `src/styles/themes/light.ts` e `dark.ts`. Chaves do `localStorage` versionadas: `@coffee-delivery:cart-1.0.0`, `@coffee-delivery:last-order-1.0.0`, `@coffee-delivery:theme-1.0.0`.
5. **Dinheiro em centavos** (inteiros); formatar em BRL só na exibição. Taxa de entrega em **uma** constante (`src/utils/`).
6. **`App.tsx` só declara rotas** (`/`, `/checkout`, `/success`, `*`). Lógica em contexts, reducers, hooks, utils, services.
7. **CEP:** consulta em `src/services/viaCep.ts` (ViaCEP — D-05) usada pelo hook `useCepLookup` (sanitiza `\D`, busca ao chegar a 8 dígitos, preenche via `setValue`), com loading, inválido, não encontrado e indisponível tratados; campos editáveis após erro.
8. **Tema:** tokens semânticos claro/escuro; nada de cor hex espalhada nos componentes.
9. **Acessibilidade WCAG 2.2 AA** e responsividade em 320, 375/390, 768, 1280/1440 (validar com Playwright).
10. **Testes:** `npm run test -- --run` e `npm run build` verdes antes de cada commit que toque lógica; Playwright antes de concluir task com UI.
11. **Git:** regras da seção 2 valem integralmente — autoria só do Gustavo, **sem `Co-Authored-By`, "Generated with" ou menção a IA** em commits/PRs, Conventional Commits em inglês, merges `--no-ff`, nada de force push/reset --hard/amend publicado. Criar repositório no GitHub ou mudar visibilidade só com pedido explícito do Gustavo.
12. **Uso de IA:** registrar em `docs/AI_USAGE.md` (mínimo 3 interações com evidência).

---

## 0. Regras de ouro (não negociáveis)

1. **Stack fixa:** React + **Vite 8**. Sempre. (JavaScript/JSX por padrão; TypeScript/TSX só quando o projeto exigir — ex.: HairDay.)
2. **O agente pode fazer commit, push e merge, mas a autoria é só do Gustavo.** Nenhuma assinatura, coautoria ou menção a IA nos commits (seção 2).
3. **Uma tarefa por vez:** analisar → planejar → implementar **uma** task → testar → autorrevisar → commit + push (autoria do Gustavo) → explicar.
4. **Context7 antes de implementar** qualquer API de biblioteca (React, Router, Tailwind, TS). **Playwright para validar** a interface antes de dar a task como pronta.
5. **Fidelidade ao Figma:** não inventar elementos que não existem no protótipo.
6. **Sem bibliotecas extras sem necessidade** e sem libs que substituam o conceito da aula (ex.: lib pronta de carrossel no Image Slider).
7. **Código legível para iniciante:** componentes pequenos, nomes claros, sem "mágica".

---

## 1. Stack e setup

### 1.1 Versões de referência

| Item | Versão / pacote | Origem |
|---|---|---|
| Vite | **8.x** (material usa 8.3.2) | Aulas 10 e 12 |
| Plugin React | `@vitejs/plugin-react@^6` | Aula 12 |
| React | template oficial do Vite (`react` / `react-ts`) | Aula 04 |
| Tailwind CSS | 4.x (material usa 4.3.3) via `@tailwindcss/vite` | Aulas 10–12 |
| Roteamento | `react-router` (imports de `'react-router'`) | Aula 13 |
| Ícones | `lucide-react` | Aula 11 / Projeto 02 |
| Node | 20.19+ ou 22.12+ (exigência do Vite 8) | — |

### 1.2 Criar projeto (JavaScript)

```bash
npm create vite@latest <nome-do-projeto> -- --template react
cd <nome-do-projeto>
npm install
npm install -D vite@^8 @vitejs/plugin-react@^6   # garante Vite 8
npm run dev
```

### 1.3 Criar projeto (TypeScript — quando exigido)

```bash
npm create vite@latest <nome-do-projeto> -- --template react-ts
cd <nome-do-projeto>
npm install
npm install -D vite@^8 @vitejs/plugin-react@^6
npm run dev
```
Componentes com JSX em TS usam extensão **`.tsx`**.

### 1.4 Validar e registrar versões (sempre no README)

```bash
node --version
npm --version
npm ls react
npm ls vite          # deve mostrar 8.x
npm ls tailwindcss   # se usar Tailwind
```

### 1.5 Tailwind CSS 4 (quando o projeto usar)

```bash
npm install tailwindcss @tailwindcss/vite
```
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-primary: #2563eb;          /* tokens viram classes: bg-primary, text-primary */
}
```
Não existe `tailwind.config.js` nem `postcss.config.js` nesse fluxo.

### 1.6 Estilização permitida
- **Tailwind CSS 4** (Aulas 10–12, DevLinks, HairDay), **CSS Modules** (`*.module.css` — Projeto 02) ou **CSS comum**.
- Escolher **uma** abordagem por projeto e manter.

### 1.7 Bibliotecas permitidas (somente se a task pedir)
`react-router`, `lucide-react`, `recharts` ou `chart.js`, `date-fns`, `papaparse`.
Qualquer outra: **perguntar antes**.

---

## 2. Git — commit, push e merge com autoria exclusiva do Gustavo

### 2.1 Permissões do agente

| Ação | Agente |
|---|---|
| `git status`, `git diff`, `git log` | ✅ |
| `git checkout -b`, `git switch` (criar/trocar branch) | ✅ |
| `git add`, `git commit` | ✅ depois do checklist 2.5 |
| `git push` | ✅ |
| `git merge` (`feature/*` → `dev`, `dev` → `main`) | ✅ nas condições da 2.4 |
| `git push --force`, `git reset --hard`, `git rebase` em branch já publicada, `git commit --amend` em commit já enviado | ❌ nunca |
| Apagar branch remota, reescrever histórico | ❌ nunca |
| Alterar `git config` (nome, e-mail, assinatura) | ❌ nunca |
| Criar/excluir repositório no GitHub ou mudar visibilidade | ❌ só com pedido explícito |

### 2.2 Autoria — somente do Gustavo

- Todo commit usa **a identidade git já configurada na máquina** (Gustavo Henrique Barros da Silva). O agente não informa `--author` e não muda `user.name`/`user.email`.
- Antes do primeiro commit da sessão, conferir:
  ```bash
  git config user.name
  git config user.email
  ```
  Se estiverem vazios ou não forem do Gustavo: **parar e avisar**, sem commitar.
- **Proibido em mensagens de commit, merge e PR:**
  - trailers `Co-authored-by:` / `Co-Authored-By:` de qualquer IA ou ferramenta;
  - `Signed-off-by:` de agente;
  - linhas como "Generated with…", "Created by…", links de sessão de IA;
  - emojis de robô (🤖) ou menção a Claude, OpenCode, ChatGPT, Copilot, "AI", "agent".
- Se a ferramenta adicionar assinatura automática, **desativar nas configurações dela** antes de commitar.
- Conferir após cada commit:
  ```bash
  git log -1 --format='%an <%ae>%n%B'
  ```
  Deve aparecer só o Gustavo como autor e nenhum trailer.
- O uso de IA é registrado **somente** em `docs/AI_USAGE.md`, nunca no histórico do Git.

### 2.3 Ritual de cada commit (1 task = 1 commit)

```bash
npm run dev                 # testar no navegador + Playwright (seção 7.4)
npm run build               # obrigatório em checkpoint, merge e entrega
git status                  # o que mudou?
git diff                    # autorrevisão linha a linha (checklist 2.5)
git add <arquivos da task>
git diff --staged           # última conferência
git commit -m "feat: add loading state to weather requests"
git log -1 --format='%an <%ae>%n%B'   # confirmar autoria
git push
```
**Nunca** acumular várias tasks em um commit. **Nunca** commitar com erro no console ou build quebrado.
Depois do push, informar ao Gustavo: hash curto, mensagem, arquivos alterados e como testar.

### 2.3.1 Padrão Conventional Commits (em inglês, imperativo, minúsculas, sem ponto final, ≤ 72 caracteres)

| Tipo | Quando | Exemplos tirados das aulas |
|---|---|---|
| `chore` | setup, configuração, dependências | `chore: initialize weather app project` |
| `feat` | nova funcionalidade visível | `feat: control weather location input` · `feat: remove random user from state` |
| `fix` | correção de bug | `fix: convert investment input values to numbers` |
| `refactor` | reorganização sem mudar comportamento | `refactor: extract weather api service` · `refactor: lift investment inputs state to App` |
| `style` | layout/CSS/Tailwind sem lógica | `style: implement responsive slider with tailwind` |
| `docs` | README, docs/*.md | `docs: complete README and screenshots` |
| `test` | validação, testes, checkpoint | `test: validate investment calculator user flows` |

Formato: `<tipo>: <descrição>` (escopo opcional: `feat(form): ...`).

### 2.3.2 Granularidade de referência (sequências reais dos boards)
- **First React App:** `chore: run provided react demo` → `feat: build hardcoded react tabs` → `style: add first react app styles` → `refactor: move tab content to data array` → `refactor: render tab content from array` → `feat: switch tab content with state` → `feat: highlight active tab` → `feat: add react vs js tab`
- **Weather (Fase 02):** `refactor: extract date formatter utility` → `refactor: extract weather api service` → `refactor: centralize weather theme configuration` → `refactor: extract search bar component` → `refactor: extract weather card component` → `refactor: extract weather details component` → `refactor: extract not found component` → `refactor: simplify weather app orchestration` → `refactor: finalize modular weather architecture`
- **Authentication Forms:** `chore: initialize authentication forms project` → `chore: organize authentication app structure` → `feat: add reusable input component` → … → `chore: configure tailwind css with vite` → `style: add authentication theme tokens` → `feat: toggle authentication forms with state` → `feat: add controlled signup fields` → `feat: add authentication form validation` → `feat: add authentication loading states` → `fix: improve auth responsiveness and accessibility` → `docs: finalize authentication forms project`

Regras tiradas dos boards:
- Primeiro commit do repositório: `git init` + `chore: initialize ...`.
- Task só de leitura/conferência sem alteração de arquivo → **não criar commit vazio**.
- Checkpoint sem mudança de código pode usar `chore: validate ...` só se houver arquivo alterado (ex.: README/notas).

### 2.4 Branches

- `main` → versão estável
- `dev` → integração do desenvolvimento
- `feature/<nome>` e `refactor/<nome>` → quando necessário

```bash
git checkout dev && git pull origin dev
git checkout -b refactor/weather-app-architecture
# ... tasks + commits + push ...
git push -u origin refactor/weather-app-architecture
```

**Merge** (sempre com `--no-ff`, para o histórico mostrar a evolução incremental, que faz parte da nota):
```bash
# feature/refactor → dev: quando todas as tasks da branch passaram nos testes
git checkout dev && git pull origin dev
git merge --no-ff refactor/weather-app-architecture
npm run build && git push origin dev

# dev → main: só em checkpoint/entrega, com build e Playwright aprovados
git checkout main && git pull origin main
git merge --no-ff dev
npm run build && git push origin main
```
- Mensagem de merge: a padrão do Git ou `chore: merge <branch> into <destino>`, sem assinatura de IA.
- **Conflito de merge:** parar, listar os arquivos em conflito e avisar o Gustavo. Nunca resolver descartando alterações.

### 2.5 Checklist de autorrevisão antes de cada commit
- [ ] O diff contém **só** o escopo da task?
- [ ] Nenhum `console.log` de debug esquecido (exceto onde a task pede)?
- [ ] Nenhum import não utilizado?
- [ ] Nenhuma chave, token ou senha no código?
- [ ] App roda sem erro no terminal e no console do navegador?
- [ ] Mensagem segue Conventional Commits e **não tem assinatura/coautoria de IA**?
- [ ] A mudança está explicada de forma que o Gustavo consiga reproduzir e explicar?

### 2.6 Kanban
Card: **A fazer → Em andamento → Em teste → Concluído**. Só avançar para a próxima task depois do commit e do push.

---

## 3. Fluxo de desenvolvimento padrão (todas as aulas)

```
Análise do Figma/requisitos → mapa de componentes
↓
Interface estática em JSX (hardcoded)
↓
Estilização (Tailwind / CSS Modules / CSS)
↓
Dados em array de objetos (data/ ou constants/)
↓
Renderização com map() + key
↓
Estado (useState) + eventos
↓
API (services/) + useEffect + loading/erro/vazio
↓
Custom hooks / Context / Router (se necessário)
↓
Refactor modular (components / services / utils)
↓
Testes (Playwright) + README + entrega
```
**Nunca começar pelo código final.** A evolução por commits faz parte da nota.

---

## 4. Estrutura de pastas padrão

```
src/
├── assets/            # imagens importadas via JS
├── components/
│   ├── ui/            # Button, Input, Badge, SocialButton (básicos e reutilizáveis)
│   ├── layout/        # Header, Sidebar, BackgroundEffects
│   └── <feature>/     # SearchBar, WeatherCard, SignInForm...
├── pages/             # telas ligadas a rotas
├── context/           # ThemeContext.jsx etc.
├── hooks/             # useCounter, useLocalStorage, useExchangeRates...
├── services/          # comunicação com APIs (fetch)
├── utils/             # funções puras: formatDate, calculate..., weatherCode
├── data/ ou constants/# arrays de dados fixos
├── types/             # (TS) tipos compartilhados
├── App.jsx
├── main.jsx
└── index.css
public/                # arquivos servidos por caminho (/images/img.jpg)
docs/                  # REQUIREMENTS, COMPONENTS, FIGMA, API_TESTS, FUNCTION_TESTS, AI_USAGE
AGENTS.md
README.md
```

Responsabilidades (SRP/SoC):
- **Componente orquestrador** (App/página): estado, handlers, orquestração, renderização condicional, composição.
- **Componente filho:** recebe props e renderiza. Não conhece URLs de API.
- **services/:** só fetch e normalização da resposta.
- **utils/:** funções puras, testáveis isoladamente.

---

## 5. Catálogo de funções e métodos ensinados (por aula)

> Fonte: páginas das aulas **e todos os cards dos boards** (First React App, Weather App Fase 01 e 02, Avançando no React, Simulador de Investimentos, Tailwind Play, Componentes Estáticos, Image Slider, Authentication Forms, React Hooks + Router).

### Aula 04 — Introdução ao React
- Imperativo (`querySelector`, `createElement`, `classList.add`, `appendChild`) **vs** declarativo (JSX).
- Entrada: `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)`.
- JSX: `className`, tags autofechadas (`<input />`), **um** elemento raiz, Fragment `<>...</>`, expressões em `{ }`.
- Componente = função que retorna JSX, nome com **maiúscula**, `export default`. Árvore de componentes.

### Aula 05 — First React App (board: 10 cards)
- Evolução obrigatória: **hardcoded → CSS → dados em array (`content`) → `map()` → `useState` → `onClick` → classe ativa**.
- `content[activeContentIndex].map((item) => <li key={item}>{item}</li>)`.
- `const [activeContentIndex, setActiveContentIndex] = useState(0)` + `onClick={() => setActiveContentIndex(1)}`.
- Classe condicional: `className={activeContentIndex === 1 ? 'active' : ''}`.
- Novos itens entram **nos dados**, nunca reescritos no JSX.
- **Não criar commit vazio** quando a task for só conferência.

### Aulas 06 & 07 — Weather App (Fase 01: 19 cards · Fase 02: 14 cards)
**Fase 01 — funcionalidade**
- Input controlado: `useState('')` + `value` + `onChange={handleInputChanges}` (`setLocation(e.target.value)`).
- `onKeyDown` (`e.key === 'Enter'`) e clique na lupa chamam **a mesma** `search(location)`.
- Estado de dados começa em **`null`** (não em objeto vazio): `useState(null)`.
- Utilitário de mapeamento com fallback: `getWeatherInfo(code)` → `weatherCodes[code] || { type: 'cloudy', description: 'Unknown weather' }`.
- `getCoordinates(city)` (Geocoding) → `getWeather(lat, lon)` (Forecast): `fetch`, `response.ok`, `response.json()`, `encodeURIComponent`, `[...].join(',')`.
- `search` async: `city.trim()` → `try { setLoading(true); setError('') ... setData({...normalizado}); setLocation('') } catch { setError(...); setData(null) } finally { setLoading(false) }`.
- Mapa de imagens por tipo: `const weatherImages = { sunny, cloudy, rainy, snowy }` → `weatherImages[weatherInfo.type]`.
- Optional chaining: `weatherInfo?.description || 'Weather'`; `Math.round(data.temperature)`.
- `Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).format(date)`.
- Estados da tela: **IDLE → LOADING → ERROR | SUCCESS**, renderizados com ternário encadeado:
  `loading ? <Loading/> : error ? <NotFound/> : data ? <Weather/> : null`.
- Checkpoint: testar loading com *Network Throttling* e falha com **Offline** no DevTools.

**Fase 02 — refactor (sem mudar comportamento)**
- Branch própria: `git switch dev` → `git pull origin dev` → `git switch -c refactor/weather-app-modular`.
- `utils/formatDate.js` (função pura) · `services/weatherApi.js` (só HTTP; **não** chama `setState`, não renderiza JSX) · `constants/weatherTheme.js` (imagens e gradientes que não mudam → **sem** `useState`).
- Componentes: `SearchBar` (recebe handlers por props), `WeatherCard` e `WeatherDetails` (`if (!data) return null`), `NotFound({ message = 'Not Found' })` (prop com valor padrão).
- Orquestrador final: estado + handlers + busca + renderização condicional + composição.
- Validação: `npm run build`, `git log --oneline`, `git diff dev..refactor/weather-app-modular`, depois `git push -u origin <branch>`.

### Aula 08 — Reforçando conceitos (board: 24 cards)
- Projeto de referência usa CRA (`ReactDOM.render`, `npm start`). **Na nossa stack: sempre `createRoot` + Vite 8.**
- Assets: `public/img1.jpg` → `src="/img1.jpg"`; `src/assets/city.jpg` → `import city from './assets/city.jpg'`.
- `ManageData`: variável comum (`let`) não re-renderiza; `useState` + setter re-renderiza.
- `ListRender`: `map()` com `key={i}` (só lista estática) → `key={user.id}` (objetos).
- Remoção imutável: `setUsers(prev => prev.filter(user => user.id !== id))`.
- `ConditionalRender`: `{x && <p/>}` (um resultado) e `cond ? <A/> : <B/>` (dois caminhos).
- Props: `props.name` → destructuring `({ brand, km, color })`. **Props são somente leitura.**
- `cars.map(car => <CarDetails key={car.id} {...dados} />)` em vez de repetir JSX.
- `Fragment` (`<>...</>`), `Container({ children })`, `ExecuteFunction({ myFunction })` → `onClick={myFunction}`.
- Lifting state: `message` no `App`; `MessageState({ msg })` exibe; `ChangeMessageState({ handleMessage })` altera.
- Derivados sem state: `users.length`, `km === 0 ? 'Carro novo' : 'Carro usado'`.

### Aula 09 — Simulador de Investimentos (board: 11 cards)
- `useState` com objeto + handler genérico com chave computada:
  ```js
  function handleChange(inputIdentifier, newValue) {
    setUserInput(prev => ({ ...prev, [inputIdentifier]: +newValue }))   // + converte para número
  }
  ```
- `event.target.value` é **sempre string**, mesmo em `type="number"` → converter na entrada.
- Lifting state: `UserInput` perde o state; recebe `userInput` + `onChange`. Fluxo: `UserInput → onChange → App → Results`.
- Lógica pura em `util/investment.js` (`calculateInvestmentResults(input)`, `formatter.format(valor)`).
- `resultsData.map(yearData => <tr key={yearData.year}>...)`.
- **Não guardar resultados calculados em `useState`**: são derivados do input.
- Validação derivada: `const inputIsValid = userInput.duration >= 1` + `&&` para mensagem ou tabela.

### Aula 10 — Tailwind CSS 4 + React + Vite 8 (Tailwind Play: 9 labs · Componentes estáticos: 10 cards)
- Utility-first; leitura `variante:propriedade-valor`; mobile-first (`sm: md: lg: xl: 2xl:`).
- Flexbox × Grid; grid com template arbitrário: `lg:grid-cols-[2fr_1fr]`.
- Estados: `hover: focus: focus-visible: active: disabled:`; `group` + `group-hover:`; `peer` + `peer-checked:` + `sr-only` (switch); `<details>/<summary>` + `open:` + `marker:` (accordion).
- Tema: `@custom-variant dark (&:where(.dark, .dark *));` + `@theme` com tokens semânticos (`bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`) + valores em `:root` e `.dark`.
- Toggle de tema: `document.documentElement.classList.toggle('dark')`; textos alternados com `dark:hidden` / `hidden dark:inline`; `transition-colors duration-500`.
- `@layer components { .x { @apply ... } }` com moderação.
- **Componentes estáticos (regras do board):**
  - Um único `Button.jsx` com props `children`, `variant`, `disabled`, `type` — variantes mapeadas para **strings completas** de classes (nunca `` `bg-${color}-500` ``).
  - `Avatar({ initials, variant, size })`, `Badge({ variant, children })` (info/success/warning).
  - Composição: `ProfileCard` = Avatar + Badge + Button; `PricingCard` = Badge + preço + `features.map()` + Button (prop `highlighted`); `Alert({ variant, title, children })`; `KpiCard({ label, value, change, trend })`; `Navbar` com `hidden md:flex` / `md:hidden`.
  - `MiniDashboard`: `metrics.map(m => <KpiCard key={m.label} {...m} />)`; reutilizar componentes anteriores.
  - Estado de erro **só por prop** em componente estático (`<InputField error="..." />`), sem `useState`.

### Aula 11 — Image Slider (board: 10 cards)
- Etapas: Vite → JSX semântico → componentização → Tailwind v4 + `lucide-react` → dados `data/slides.js` → `map` → `useState` → indicadores → teclado.
- Antes do state, índice constante (`const index = 2`) para testar a renderização.
- `useState(2)` + updater funcional e módulo para navegação circular.
- Imagens empilhadas (`absolute inset-6`), ativa com `opacity-100 z-10`, inativas `opacity-0 pointer-events-none` e `aria-hidden={i !== index}`.
- Rotação **estável** via array fixo (`const rotations = [-10, 7, -5, 9, -8]`) + `style={{ transform: ... }}` — nunca `Math.random()` no render.
- Indicadores: `Array.from({ length: count }, (_, i) => <button onClick={() => onSelect(i)} aria-current={i === index ? 'true' : undefined} />)`.
- Contador: `String(index + 1).padStart(2, '0')` + `tabular-nums`.
- Acessibilidade: `aria-roledescription="carousel"`, `aria-live="polite"`, `aria-atomic="true"`, `aria-label` nos botões, `focus-visible:outline-*`, `motion-reduce:transition-none`.
- Teclado com `useEffect` + cleanup, ignorando atalhos e campos de texto:
  ```js
  if (event.altKey || event.ctrlKey || event.metaKey) return
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return
  ```

### Aula 12 — Authentication Forms (board: 22 cards)
- Ordem: Vite (opção de fixar Vite 8) → pastas `components/ui|auth|layout` + `pages` → `Input`, `Button`, `SocialButton` → `SignUpForm`/`SignInForm` estáticos → checkpoint → Tailwind + tokens → estilos → `useState` → eventos → formulário controlado → submit → validação → loading → responsividade/a11y → build + README.
- Troca de tela estática primeiro com constante (`const CURRENT_VIEW = 'signup'`), depois `useState(true)` em `AuthPage`.
- Filho pede troca ao pai: `onSwitchForm={() => setIsSignUp(false)}` → `onClick={onSwitchForm}` (passa a função, não executa).
- `Input` reutilizável: `label htmlFor={id}`, `id`, `name`, `type`, `value`, `onChange`, `autoComplete`, `aria-invalid={Boolean(error)}`, `aria-describedby={error ? \`${id}-error\` : undefined}`, mensagem `{error && <p id={\`${id}-error\`}>}`.
- `SocialButton` só com ícone/letra → `aria-label` obrigatório.
- Formulário controlado com um handler para todos os campos:
  ```js
  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))      // limpa o erro ao editar
  }
  ```
- `validateForm()` monta `nextErrors`, chama `setErrors` e retorna `Object.keys(nextErrors).length === 0`; e-mail com `/^\S+@\S+\.\S+$/`, senha ≥ 6.
- `<form noValidate onSubmit={handleSubmit}>` + `event.preventDefault()` + `if (!validateForm()) return`.
- Loading: `setIsLoading(true)` → `try { await ... } finally { setIsLoading(false) }`; `<Button disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</Button>`; `disabled:opacity-60 disabled:cursor-not-allowed`.
- **Nunca logar senha** (logar só `passwordLength`); **nunca** guardar senha em `localStorage` (só e-mail, no desafio *Remember Email*).
- Tokens do projeto no `@theme` (ex.: `--color-navy-950`, `--color-auth-slate`) em vez de hex espalhado.
- `{' '}` para manter espaço entre texto e botão no JSX.

### Aula 13 — Hooks, Providers, Context API e React Router (board: 6 cards)
- **Regras dos hooks:** só no topo do componente/hook; custom hook começa com `use`; estado só via setter.
- `useEffect(fn)` / `useEffect(fn, [])` / `useEffect(fn, [valor])`; StrictMode roda setup+cleanup extra em dev.
- Ex01: `document.title` sincronizado com `[cliques]` e **cleanup restaurando o título**.
- Ex02: `useState(window.innerWidth)` + listener `resize` com `removeEventListener` no cleanup (`[]`).
- Ex03: `ThemeContext = createContext(null)` + `ThemeProvider` com `alternarTema` (`setTema(anterior => ...)`) + `useContext(ThemeContext)`.
- Ex04: `useCounter(inicial)` retorna `{ contador, aumentar, diminuir, zerar }` — cada componente que chama tem **estado próprio**.
- Ex05: `useLocalStorage(chave, inicial)` (lazy initializer + `JSON.parse/stringify` + `try/catch`) + favoritos com `includes`/`filter`/spread.
- Router (`react-router`): `BrowserRouter` em `main.jsx` (dentro do `ThemeProvider`), `Routes`/`Route`, `NavLink ... end` (classe `active`), `path="*"`, menu gerado por `paginas.map()`.
- Setup: `npm install react-router`.

### Projeto 02 — Currency Exchange App (API Frankfurter)
- Camada `services/` consultando moedas, cotação atual e histórico.
- `useEffect` disparando consultas **somente** quando as dependências corretas mudam (par de moedas, período).
- Estados obrigatórios: **loading, erro, vazio**.
- Pelo menos **um custom hook** (ex.: `useExchangeRates`).
- Funções de negócio puras: conversão, períodos (7d, 15d, 30d, 3m, 6m, 1a, 5a, 10a), filtros combináveis, ordenação, formatação.
- Arrays: `filter`, `sort` (sempre em cópia: `[...lista].sort(...)`), `map`, `reduce`.
- Exportar CSV dos registros **filtrados**, com cabeçalho, sem exportação vazia, nome identificável.
- CSS Modules; gráfico com Recharts/Chart.js.
- Investigação prévia da API no **Postman** (Collection exportada).

### Projeto 03 — DevLinks (React + IA)
- Componentes: `Profile`, `LinkButton`, `ThemeToggle`, `SocialLinks`.
- Links gerados a partir de array com `map()`; externos com `target="_blank" rel="noopener noreferrer"`.
- Tema claro/escuro com `useState` + persistência em `localStorage`.
- `AGENTS.md` + **Context7 MCP** + **Playwright MCP** (ver seção 7).

### Projeto 04 — HairDay (React + TypeScript + IA)
- Template `react-ts`, arquivos `.tsx`, props tipadas.
- Tipo base:
  ```ts
  type Appointment = { id: string; clientName: string; date: string; time: string }
  ```
- `useState<Appointment[]>([])`; adicionar com spread, excluir com `filter` por `id`.
- `filter()` pela data selecionada → `reduce()` agrupando em Manhã (09–12), Tarde (13–18), Noite (19–21) → `sort` cronológico → `map()` renderizando.
- Estado vazio com texto exato: **"Você ainda não tem agendamentos cadastrados nesse período."**
- Validação: sem nome, data ou horário não cadastra.
- Componentes sugeridos: `ScheduleSidebar`, `AppointmentForm`, `AppointmentList`, `PeriodSection`, `AppointmentItem`.

---

## 6. Padrões de código (referência rápida)

### 6.1 Entrada da aplicação com Provider + Router
```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
```

### 6.2 Estado imutável (arrays e objetos)
```js
setItems(prev => [...prev, novoItem])                          // adicionar
setItems(prev => prev.filter(item => item.id !== id))          // remover
setItems(prev => prev.map(i => (i.id === id ? { ...i, ...mudancas } : i))) // editar
setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))           // campo de formulário
```
Nunca: `items.push()`, `items.splice()`, `items.sort()` direto no state, `form.nome = ...`.

### 6.3 Service de API
```js
// src/services/xService.js
export async function getAlgo(param) {
  const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(param)}`)
  if (!response.ok) throw new Error('Failed to fetch data')
  const result = await response.json()
  return normalizar(result)          // só os campos que a UI usa
}
```

### 6.4 Busca com useEffect + loading/erro
```jsx
useEffect(() => {
  let ignore = false
  setLoading(true)
  setError(null)

  getAlgo(param)
    .then(data => { if (!ignore) setData(data) })
    .catch(err => { if (!ignore) setError(err.message) })
    .finally(() => { if (!ignore) setLoading(false) })

  return () => { ignore = true }       // evita atualizar com resposta antiga
}, [param])
```

### 6.5 Listener com cleanup
```jsx
useEffect(() => {
  function handleKey(e) {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') previous()
  }
  window.addEventListener('keydown', handleKey)
  return () => window.removeEventListener('keydown', handleKey)
}, [])
```

### 6.6 Context
```jsx
import { createContext, useState } from 'react'

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState('claro')
  const alternarTema = () => setTema(t => (t === 'claro' ? 'escuro' : 'claro'))
  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 6.7 useLocalStorage
```js
import { useEffect, useState } from 'react'

export function useLocalStorage(chave, inicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      return salvo === null ? inicial : JSON.parse(salvo)
    } catch {
      return inicial
    }
  })

  useEffect(() => {
    try { localStorage.setItem(chave, JSON.stringify(valor)) } catch { /* ignora */ }
  }, [chave, valor])

  return [valor, setValor]
}
```

### 6.8 Rotas
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/sobre" element={<Sobre />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 6.9 Agrupar com reduce (HairDay)
```ts
const doDia = appointments
  .filter(a => a.date === selectedDate)
  .sort((a, b) => a.time.localeCompare(b.time))

const porPeriodo = doDia.reduce<Record<'manha' | 'tarde' | 'noite', Appointment[]>>(
  (acc, a) => {
    const hora = Number(a.time.slice(0, 2))
    const periodo = hora <= 12 ? 'manha' : hora <= 18 ? 'tarde' : 'noite'
    acc[periodo].push(a)              // acc é um objeto novo do reduce, não o state
    return acc
  },
  { manha: [], tarde: [], noite: [] }
)
```

### 6.10 Exportar CSV no navegador (Projeto 02)
```js
export function exportCsv(rows, filename) {
  if (!rows.length) return false
  const header = 'date,from,to,rate'
  const lines = rows.map(r => [r.date, r.from, r.to, r.rate].join(','))
  const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename                // ex.: rates_USD-BRL_2026-01-01_2026-03-01.csv
  a.click()
  URL.revokeObjectURL(url)
  return true
}
```

### 6.11 Faça / Não faça

| ✅ Faça | ❌ Não faça |
|---|---|
| `className` | `class` no JSX |
| `key={item.id}` | `key={index}` quando há id |
| Valor derivado calculado na renderização | Criar state para `lista.length` |
| Um array de objetos por entidade | Arrays paralelos (imagens[], textos[]) |
| `button type="button"` + `aria-label` | Botão só visual, sem ação |
| Mapa de classes Tailwind completas | `` `bg-${cor}-500` `` |
| Lista fixa de valores visuais | `Math.random()` no render |
| Componente React para padrão repetido | `@apply` para tudo |
| URLs de API em `services/` | `fetch` espalhado nos componentes |
| Lógica de cálculo em `utils/` | Cálculo complexo dentro do JSX |
| Configuração fixa (imagens, gradientes) em `constants/` | `useState` para valores que nunca mudam |
| Estado de dados iniciando em `null` | Objeto vazio “de mentira” como estado inicial |
| Filho retorna `null` quando não há dado (`if (!data) return null`) | Filho quebrando ao acessar `data.x` |
| `onClick={handler}` ou `onClick={() => handler(arg)}` | `onClick={handler()}` (executa no render) |
| Converter `event.target.value` para número na entrada (`+value`) | Calcular com strings vindas do input |
| `try/catch/finally` com `setLoading(false)` no `finally` | Loading que fica preso após erro |
| `<form noValidate onSubmit>` + `preventDefault` + validação própria | Submit recarregando a página |
| `aria-invalid` + `aria-describedby` em campos com erro | Erro só por cor |
| Logar `passwordLength`, nunca a senha | `console.log(formData)` com senha |
| Rotação/valores visuais em array fixo | Valores aleatórios recalculados a cada render |
| Testar loading/erro com Throttling e Offline no DevTools | Considerar pronto só no “caminho feliz” |

---

## 7. IA no projeto: AGENTS.md + Context7 + Playwright

### 7.1 Papel do agente
- Desenvolvedor front-end React (+ TypeScript quando aplicável) **do projeto específico**.
- Objetivo: reproduzir fielmente o Figma, desktop e mobile.
- Um único agente configurado pelo `AGENTS.md` na raiz. Sem subagentes, sem `.opencode/agents/`, sem Skills próprias obrigatórias.

### 7.2 Workflow obrigatório do agente
1. Ler este `AGENTS.md` e explicar como vai segui-lo.
2. Explicar a **próxima task pequena** antes de escrever código.
3. Consultar **Context7** para a API que vai usar.
4. Implementar **uma** task do board.
5. Validar com **Playwright MCP**.
6. Autorrevisar o diff (checklist 2.5), commitar e fazer push **com autoria só do Gustavo** (seção 2.2).
7. Explicar o que mudou, como testar e informar hash + mensagem do commit. Só então seguir para a próxima task.

### 7.3 Context7 MCP — documentação atualizada

**Configuração (OpenCode — `opencode.json` na raiz ou `~/.config/opencode/opencode.json`):**
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true
    }
  }
}
```
Com API key (limite maior): adicionar `"headers": { "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}" }` — a chave fica em variável de ambiente, **nunca** no repositório.

**Quando consultar (obrigatório):**
- `useState`, `useEffect`, `useContext`, custom hooks
- Props e tipagem de props (React + TypeScript)
- React Router (`react-router`)
- Tailwind CSS 4 (`@theme`, variantes, dark mode)
- `localStorage`, `Intl`, APIs do navegador
- Vite 8 (config, plugins)

**Como pedir:** incluir `use context7` no prompt. Ex.: *"Como tipar props de um componente React com TypeScript? use context7"*.
**Evidência:** guardar print/trecho de **uma consulta real** por projeto.

### 7.4 Playwright MCP — validação da interface

**Configuração (OpenCode):**
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "playwright": {
      "type": "local",
      "command": ["npx", "@playwright/mcp@latest"],
      "enabled": true
    }
  }
}
```
(Outros clientes MCP: `"command": "npx", "args": ["@playwright/mcp@latest"]`.)

**Ferramentas mais usadas:** `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_fill_form`, `browser_press_key`, `browser_resize`, `browser_console_messages`, `browser_take_screenshot`.

**Roteiro mínimo de validação (toda task com UI):**
- [ ] Abrir `http://localhost:5173/` e carregar sem erro
- [ ] `browser_console_messages` sem erros
- [ ] Interações da task funcionando (clique, digitação, Enter, teclado)
- [ ] Desktop (**1440×900**) e mobile (**390×844**) via `browser_resize`, sem overflow
- [ ] Comparar com o Figma
- [ ] Screenshot desktop + mobile como evidência

**Testes específicos por projeto:**
- **DevLinks:** troca de tema; tema persiste após reload; links abrem destinos corretos; navegação por teclado.
- **HairDay:** cadastro válido e com campos vazios; troca de data; cada agendamento no período certo; exclusão remove só o item; mensagem de período vazio.
- **Currency Exchange:** conversão; inversão de moedas; todos os períodos; filtros combinados; ordenação; CSV; loading/erro/vazio.

### 7.5 Cuidados com IA
- Explicar toda mudança; o Gustavo precisa saber explicar componente, prop, state e métodos usados.
- Não adicionar bibliotecas sem necessidade (perguntar antes).
- Não inventar elementos ausentes do Figma.
- Não implementar tudo de uma vez.
- Registrar o uso de IA em `docs/AI_USAGE.md` (e **nunca** nos commits).
- Git só dentro das permissões da seção 2.1 e com autoria exclusiva do Gustavo (seção 2.2).

---

## 8. Definition of Done (por task)

- [ ] Escopo do card implementado — nada além
- [ ] `npm run dev` sem erro no terminal e no console
- [ ] Testado manualmente **e** com Playwright (quando houver UI)
- [ ] Responsivo (desktop + mobile)
- [ ] Sem imports/variáveis não usados
- [ ] Mudança explicada ao Gustavo (o quê, por quê, como testar)
- [ ] Diff autorrevisado, commit semântico **com autoria só do Gustavo** e push feito
- [ ] Card movido para **Concluído**

Checkpoint/entrega: + `npm run build` sem erro + README atualizado.

---

## 9. Documentação do repositório

| Arquivo | Conteúdo |
|---|---|
| `README.md` | objetivo, funcionalidades, tecnologias e versões (seção 1.4), instalação, execução, arquitetura, screenshots |
| `AGENTS.md` | este arquivo, com o bloco **Projeto atual** preenchido |
| `docs/REQUIREMENTS.md` | contexto, público, escopo, RF, RNF, regras de negócio, critérios de aceite |
| `docs/COMPONENTS.md` | componente, responsabilidade, arquivo, props, estados, relações |
| `docs/FIGMA.md` | links e evidências dos protótipos |
| `docs/API_TESTS.md` | testes no Postman (projetos com API) |
| `docs/FUNCTION_TESTS.md` | testes das funções puras |
| `docs/AI_USAGE.md` | registro do uso de IA + evidências Context7/Playwright |

---

## 10. Referências oficiais

- React — https://react.dev/learn
- Vite — https://vite.dev/guide/
- React Router — https://reactrouter.com/
- Tailwind CSS (Vite) — https://tailwindcss.com/docs/installation/using-vite
- TypeScript + React — https://react.dev/learn/typescript
- Context7 — https://github.com/upstash/context7
- Playwright MCP — https://github.com/microsoft/playwright-mcp
- OpenCode (MCP / Rules) — https://opencode.ai/docs/mcp-servers
- Conventional Commits — https://www.conventionalcommits.org/
