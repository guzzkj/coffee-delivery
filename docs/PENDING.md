# Pendências — Coffee Delivery

> Ponto de partida para uma nova sessão. Atualizado em 2026-11-20, depois da T-41 (`dev` → `main`).
> Antes de começar: ler `AGENTS.md`, depois este arquivo, depois `docs/TASKS_SPEC.md`.

## Estado atual

- **Tasks T-00..T-41 concluídas.** `main` = `dev` = versão entregável, publicada em `https://github.com/guzzkj/coffee-delivery`.
- 56 testes (21 arquivos), `npm run build` e `npm run lint` verdes.
- Branches de feature (`feature/setup` … `feature/delivery`) já mescladas com `--no-ff`. Não apagar as remotas (regra do AGENTS.md §2.1).
- Prints em `docs/screenshots/` (12 arquivos). Registro de IA em `docs/AI_USAGE.md` (6 interações).

## Pendências obrigatórias (entrega no Blackboard)

### P-01 — Publicar na Vercel (Gustavo) — ✅ concluída: https://coffee-delivery-chi-bay.vercel.app/
1. Em vercel.com → *Add New Project* → importar `guzzkj/coffee-delivery`.
2. Preset **Vite**; build `npm run build`; saída `dist`; branch de produção `main`.
3. Depois do deploy, testar na URL pública:
   - Home carrega, adicionar café, badge muda.
   - **F5 em `/checkout` e `/success`** não dá 404 (o `vercel.json` já faz o rewrite).
   - CEP 01310-100 preenche o endereço (ViaCEP funciona em produção).
   - Tema escuro persiste depois do reload.

### P-02 — Link da aplicação no README — ✅ concluída
- Trocar a linha `_adicionar o link da Vercel após o primeiro deploy_` em `README.md` pelo link real.
- Commit sugerido: `docs: add deployed app link` (em `dev`, depois merge `--no-ff` em `main`).

### P-03 — Evidência real do Context7 — ✅ concluída (`docs/screenshots/context7.png`, Interação 03)
- Na sessão anterior o Context7 MCP **não estava conectado**. O enunciado e o AGENTS.md §7.3 pedem evidência de uma consulta real.
- Fazer 1 consulta com `use context7` (ex.: *"Como usar `useWatch` do React Hook Form 7? use context7"*), salvar um print em `docs/screenshots/context7.png`.
- Preencher a observação da **Interação 03** em `docs/AI_USAGE.md` (hoje diz que a evidência está pendente).

### P-04 — Evidência do Playwright MCP (recomendado) — ✅ concluída (`docs/screenshots/playwright-mcp-*.png`, Interação 04)
- O Playwright MCP também não estava disponível; a validação foi feita com Claude in Chrome e Chrome headless.
- Se o MCP estiver configurado na nova sessão: rodar o roteiro mínimo do AGENTS.md §7.4 (1440×900 e 390×844, console sem erros, fluxo completo) e adicionar o resultado/print na **Interação 04** do `docs/AI_USAGE.md`.

### P-05 — Entrega no Blackboard (Gustavo)
- Link do repositório público + link da Vercel.

## Pendências de documentação (pequenas)

### P-06 — Atualizar `docs/TECH_SPEC.md` §3 e §4 — ✅ concluída (em `dev`)
Arquivos criados durante a implementação que ainda não aparecem na estrutura/lista de componentes:
- `src/contexts/CartContextValue.ts`, `ThemeContext.tsx`, `ThemeContextValue.ts`
- `src/reducers/loadInitialCartState.ts`
- `src/hooks/useTheme.ts`, `useCepLookup.ts`
- `src/utils/createOrder.ts`
- `src/styles/typography.ts`, `breakpoints.ts`
- Componentes: `Logo`, `TextInput`, `EmptyState`, `ThemeToggle`
Commit sugerido: `docs: sync tech spec with final structure`.

## Opcionais (só com aprovação do Gustavo)

- **Logo com ferramenta de imagem por IA:** a atual é SVG feito pelo Claude Code (`src/assets/brand/*`, `public/favicon.svg`). Se trocar, atualizar `docs/BRANDING.md` e a Interação 02 do `AI_USAGE.md`.
- **X-01** Filtro por tag no catálogo.
- **X-02** E2E Playwright versionado + GitHub Actions (exige perguntar antes: dependência nova `@playwright/test`).
- **X-03** Animações respeitando `prefers-reduced-motion`.

## Divergências conscientes do Figma (para não “corrigir” por engano)

- Tema claro: `label` `#6E6767` (Figma `#8D8686`), texto do botão/badge amarelo escuro (`onAccent` `#272221`, Figma branco), tags com `yellowText` `#8C5A0E`. Motivo: contraste WCAG 2.2 AA. Ver `TECH_SPEC.md` §14.
- Localização do Header vira só ícone abaixo de 480 px (texto continua para leitor de tela).

## Dicas do ambiente (aprendidas na sessão anterior)

- Projeto fica no **OneDrive**: o watcher do Vite às vezes serve módulo truncado. Rodar o dev server com polling:
  `CHOKIDAR_USEPOLLING=1 npx vite --port 5199 --strictPort`
- O hook `rtk` filtra saídas: usar `rtk proxy git log --graph`, `rtk proxy git merge ...` e `rtk proxy npx vitest --run`. Não usar `rtk vitest` (cria pasta `.vitest/`).
- **Checar o código de saída** dos testes antes de commitar (um `| grep` no meio esconde falha). Ex.: `rtk proxy npx vitest --run > /dev/null 2>&1; echo $?`
- Testes de fluxo são lentos nesta máquina: `testTimeout: 15000` já está em `vite.config.ts`.
- Commits: identidade do Gustavo, Conventional Commits em inglês, **sem** `Co-Authored-By` ou menção a IA (AGENTS.md §2.2).
