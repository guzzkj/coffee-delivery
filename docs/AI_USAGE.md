# AI_USAGE — Registro de uso de IA

> Uso de IA registrado **somente aqui** (e resumido no README). Nunca em mensagens de commit.
> Mínimo exigido: 3 interações relevantes, com evidência.

Ferramentas:
- **Claude Code** (assistente de desenvolvimento) — análise, SPECs, arquitetura, implementação em etapas, revisão, testes.
- **Context7 MCP** — documentação atualizada de React, React Router, React Hook Form, Zod, styled-components, Vite. (evidência a registrar na primeira consulta real)
- **Playwright MCP** — validação de interface (desktop/mobile/dark).
- **Ferramenta de geração de logo** — a definir na T-07 (D-07).

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
| Data | — |
| Ferramenta | — |
| Objetivo | Gerar logo original para Header e favicon (versões claro/escuro) |
| Prompt | — |
| Resultado | — |
| Decisão / motivos | — |
| Direitos de uso | — |
| Evidência | — |

## Interação 03 — Consulta Context7

| Campo | Registro |
|---|---|
| Data | — |
| Pergunta | — |
| Resposta (resumo) | — |
| Como foi aplicada | — |
| Evidência | — |

## Interação 04 — Validação com Playwright MCP

| Campo | Registro |
|---|---|
| Data | — |
| Roteiro | — |
| Resultado | — |
| Evidência | — |
