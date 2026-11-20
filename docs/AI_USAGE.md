# AI_USAGE — Registro de uso de IA

> Uso de IA registrado **somente aqui** (e resumido no README). Nunca em mensagens de commit.
> Mínimo exigido: 3 interações relevantes, com evidência.

Ferramentas:
- **Claude Code** (assistente de desenvolvimento) — análise, SPECs, arquitetura, implementação em etapas, revisão, testes.
- **Context7 MCP** — documentação atualizada. Não estava conectado durante a implementação (a API foi conferida nos `.d.ts` dos pacotes); a consulta real foi feita depois, em 2026-11-20, e confirmou a solução adotada (ver Interação 03, `docs/screenshots/context7.png`).
- **Playwright MCP** — validação da interface. Durante a implementação a validação foi feita com a extensão Claude in Chrome e Chrome headless; depois da entrega o roteiro mínimo do AGENTS.md §7.4 foi repetido com o Playwright MCP (ver Interação 04, `docs/screenshots/playwright-mcp-*.png`).
- **Claude Code** também gerou a logo em SVG (D-07) — ver `docs/BRANDING.md`.

---

## Interação 01 — Análise do enunciado e planejamento (SPECs)

| Campo | Registro |
|---|---|
| Data | 2026-11-19 |
| Ferramenta | Claude Code |
| Objetivo | Ler o enunciado do Projeto Final 05 e o AGENTS.md da disciplina; levantar decisões pendentes; redigir rascunhos de PRD_SPEC, TECH_SPEC, TASKS_SPEC e adaptar o AGENTS.md |
| Prompt (resumo) | "Ler enunciado + AGENTS.md, analisar o Figma, levantar decisões de produto e produzir rascunhos dos SPECs sem iniciar código." |
| Resposta (resumo) | Rascunhos dos 3 SPECs com RF-01..16, RN-01..10, arquitetura (Context + useReducer, RHF + Zod, styled-components), tipos, ações do reducer, plano de testes e 41 tasks pequenas; lista de 7 decisões pendentes (D-01..D-07). O Figma é privado e não pôde ser lido diretamente; tokens e textos foram propostos a partir do layout de referência do Coffee Delivery e marcados para conferência. |
| Decisão do Gustavo | Validou os SPECs. Escolheu styled-components, "−" travado em 1 no carrinho (remoção só por "Remover"), ícones Phosphor, Testing Library + jsdom, repositório público `coffee-delivery`; manteve nome Coffee Delivery, taxa fixa R$ 3,50, ViaCEP e Vercel. Ferramenta da logo fica para a T-07. Conferiu o Figma pelo navegador. |
| Evidência | `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md` (versão v0.1) |

## Interação 02 — Branding com IA (logo)

| Campo | Registro |
|---|---|
| Data | 2026-11-20 |
| Ferramenta | Claude Code (geração da logo como SVG) |
| Objetivo | Gerar logo original para Header e favicon (versões claro/escuro) |
| Prompt | Ver `docs/BRANDING.md` (copo para viagem + pin de localização, só cores do Style Guide, legível em 32 px) |
| Resultado | Símbolo + 2 variações com nome; favicon SVG |
| Decisão / motivos | Vetor nítido e leve, paleta do Figma, pin liga a marca à entrega; nome em texto HTML no Header para seguir o tema |
| Direitos de uso | Criação original para o projeto, sem marcas de terceiros |
| Evidência | `src/assets/brand/*`, `public/favicon.svg`, `docs/BRANDING.md` |

## Interação 03 — Conferência de API e consulta ao Context7

| Campo | Registro |
|---|---|
| Data | 2026-11-20 |
| Ferramenta | Claude Code (leitura de `node_modules/*/*.d.ts`) |
| Pergunta | "Como passar mensagem de erro no Zod 4 e como integrar com React Hook Form 7 sem `any`?" |
| Resposta (resumo) | No Zod 4 o parâmetro é `error` (o `errorMap` do Zod 3 saiu); `zodResolver` vem de `@hookform/resolvers/zod`; tipos de entrada/saída com `z.input`/`z.output`. Para observar o CEP, `useWatch({ control, name })` em vez de `watch()` (o lint do React Compiler acusava `incompatible-library`). |
| Como foi aplicada | `src/schemas/checkoutSchema.ts`, `src/pages/Checkout/index.tsx` |
| Evidência | Commits `feat: add delivery address form`, `feat: autofill address from cep`; divergência registrada no TECH_SPEC §14 |
| Consulta Context7 (2026-11-20) | Prompt: *"Como usar `useWatch` do React Hook Form 7 para observar só o campo CEP? use context7"*. Chamadas: `resolve-library-id` ("React Hook Form" → `/react-hook-form/documentation`, reputação High) e `query-docs` ("useWatch with control and name to observe a single field value…", TypeScript). |
| Resultado da consulta | A documentação mostra `useWatch({ control, name })` assinando um campo e re-renderizando só no nível do hook; regras: retorna o valor atual no primeiro render, a ordem importa (assinatura antes do `setValue`) e o resultado é feito para a renderização, não para dependência de `useEffect`. Confere com `src/pages/Checkout/index.tsx:50` (`const cep = useWatch({ control, name: 'cep' })`, react-hook-form 7.92.0) — nenhuma mudança de código foi necessária. |
| Observação | Durante a implementação o Context7 não estava conectado; a consulta acima foi feita depois e serve de evidência. Print: `docs/screenshots/context7.png`. |

## Interação 04 — Validação da interface (Claude in Chrome e Playwright MCP)

| Campo | Registro |
|---|---|
| Data | 2026-11-20 |
| Ferramenta | Claude Code + extensão Claude in Chrome; Chrome headless via DevTools Protocol |
| Roteiro | Cada task com UI: abrir `localhost`, interagir (adicionar, quantidade, remover, CEP real na ViaCEP, pagamento, confirmar), conferir console, testar 320/390/768/1440 (iframes de largura fixa) e o tema escuro. Fluxo completo só com teclado na T-36. |
| Resultado | Sem rolagem horizontal; checkout em 1 coluna abaixo de 1024 px; foco visível; erro do formulário foca o primeiro campo inválido; CEP 01310-100 preenche Avenida Paulista/Bela Vista/São Paulo/SP. Achados corrigidos: preço vazando do card em 320 px (T-35) e linha vazia do status do CEP no mobile. |
| Evidência | `docs/screenshots/*.png` (12 prints: 3 telas × claro/escuro × desktop/mobile); registro de testes no `docs/TASKS_SPEC.md` |
| Playwright MCP (2026-11-20) | Roteiro do AGENTS.md §7.4 no dev server (`localhost:5199`), `localStorage` limpo. **1440×900:** Home carrega; Latte ×2 + Expresso Tradicional → badge "3 itens"; checkout com totais R$ 29,70 + R$ 3,50 = R$ 33,20; CEP 01310100 (digitado) preenche Avenida Paulista / Bela Vista / São Paulo / SP pela ViaCEP; confirmar sem número e sem pagamento mostra "Informe o número" e "Selecione a forma de pagamento" e foca o campo Número; com número 1000 + Cartão de Crédito vai para `/success` com endereço, previsão e pagamento corretos; carrinho volta a "vazio". **390×844:** reload em `/success` mantém o pedido; tema escuro ativado (`aria-pressed="true"`) persiste após reload (`@coffee-delivery:theme-1.0.0 = "dark"`); checkout em 1 coluna. Sem rolagem horizontal em nenhuma tela; console do app sem erros nem avisos. |
| Prints Playwright MCP | `docs/screenshots/playwright-mcp-home-1440.png`, `playwright-mcp-checkout-1440.png`, `playwright-mcp-success-1440.png`, `playwright-mcp-home-dark-390.png`, `playwright-mcp-checkout-dark-390.png` |

## Interação 05 — Implementação guiada por lint e testes (hook do CEP)

| Campo | Registro |
|---|---|
| Data | 2026-11-20 |
| Ferramenta | Claude Code |
| Problema | Primeira versão do `useCepLookup` chamava `setState` direto no efeito (aviso `set-state-in-effect` do oxlint). |
| Solução | Guardar só o resultado da última consulta junto com o CEP consultado e **derivar** `isLoadingCep`, `cepError` e `cepFound` na renderização; `AbortController` cancela a busca antiga. |
| Evidência | `src/hooks/useCepLookup.ts`, `src/tests/cepLookup.test.tsx` |

## Interação 06 — Revisão de contraste (WCAG 2.2 AA)

| Campo | Registro |
|---|---|
| Data | 2026-11-20 |
| Ferramenta | Claude Code (script que calcula a razão de contraste de 25 pares de tokens nos dois temas) |
| Resultado | Tema escuro: todos os pares passam. Tema claro: placeholder `#8D8686` (3.0:1), texto branco no botão amarelo (2.1:1) e tags amarelas (2.7:1) reprovavam. |
| Decisão | Ajuste mínimo de tokens (`label`, `onAccent`, novo `yellowText`) mantendo a aparência do Figma; divergência registrada no TECH_SPEC §14. |
| Evidência | Commit `style: improve theme color contrast` |

## O que a IA **não** decidiu sozinha

- Escolhas de produto (nome, biblioteca de estilo, regra do "−", repositório público) foram do Gustavo (Interação 01).
- Commits, merges e push seguem a identidade do Gustavo; nenhuma mensagem de commit menciona IA.
