# PRD_SPEC — Coffee Delivery

> Status: **v1.0 — validado pelo Gustavo em 2026-11-19.** Decisões registradas na seção 10 (só D-07 segue pendente, decidida na T-07).
> Projeto Final 05 — Single Page Application (Senac). Projeto acadêmico, sem cobrança.
> **v1.1:** alinhado ao projeto de referência https://github.com/Devpaulo1/coffee-delivery (decisões D-14..D-17). Texto próprio; divergências em `docs/TECH_SPEC.md` §14.

---

## 1. Visão do produto

**Coffee Delivery** é uma SPA de cafeteria em que o cliente navega por um catálogo de cafés, escolhe quantidades, monta um carrinho, informa o endereço de entrega (com preenchimento automático pelo CEP), escolhe a forma de pagamento e recebe a confirmação de um **pedido fictício**.

- **Problema:** o cliente quer pedir café para entrega de forma rápida, sem cadastro e sem precisar recalcular valores manualmente.
- **Objetivo acadêmico:** demonstrar React + TypeScript com componentes, props, hooks, Context API + useReducer, imutabilidade, rotas, formulários validados, persistência local, tema claro/escuro, responsividade, testes e uso documentado de IA.
- **Público:** pessoas que pedem café pelo celular ou computador; avaliador da disciplina.

## 2. Objetivos e métricas de sucesso

| Objetivo | Como medir |
|---|---|
| Fluxo Home → Checkout → Confirmação completo | Pedido fictício concluído em desktop e mobile sem erro |
| Cálculos corretos | Testes unitários de subtotal/taxa/total em centavos passando |
| Carrinho confiável | Sem linhas duplicadas; badge = soma das unidades; persiste após refresh |
| Formulário robusto | CEP via API com tratamento de loading/erro; bloqueio de pedido inválido |
| Acessível e responsivo | Navegável por teclado, foco visível, sem scroll horizontal de 320 a 1440 px |
| Fidelidade visual | Telas comparadas com os frames do Figma (Home, Checkout, Confirmação) |

## 3. Escopo

### Dentro do escopo
- Catálogo local tipado (cafés, imagens, tags, preços).
- Carrinho global (Context + useReducer) persistido em `localStorage`.
- Checkout com endereço (React Hook Form + Zod + API de CEP) e forma de pagamento.
- Resumo de valores (subtotal, entrega, total) em BRL.
- Tela de confirmação com snapshot do pedido.
- Tema claro/escuro persistido; layout mobile.
- Logo criada com IA, favicon e seção de branding.
- Testes (lógica, validação e fluxos principais); deploy público.

### Fora do escopo (exclusões)
- Backend, banco de dados, autenticação, cadastro de usuário.
- Pagamento real ou integração com gateway (RN-05).
- Rastreamento real de entrega, cálculo de frete por distância.
- Painel administrativo, estoque.
- Extras opcionais (busca/filtro, cupom, histórico, detalhe de produto) — só após o fluxo obrigatório estar pronto e com aprovação do Gustavo.

## 4. Fluxos do usuário

### 4.1 Fluxo principal (caminho feliz)
1. **Home (`/`)** — usuário vê o hero e a lista "Nossos cafés".
2. Ajusta a quantidade em um card (mínimo 1) e clica no botão de carrinho do card.
3. O contador do Header passa a mostrar a **soma das unidades**.
4. Clica no ícone do carrinho no Header → **Checkout (`/checkout`)**, sem recarregar a página.
5. Digita o CEP → rua, bairro, cidade e UF são preenchidos pela API; informa número (e complemento, opcional).
6. Escolhe Crédito, Débito ou Dinheiro.
7. Confere "Cafés selecionados", ajusta quantidades/remove itens e vê subtotal, entrega e total atualizados.
8. Clica em **Confirmar pedido** → **Confirmação (`/success`)** com endereço, previsão e forma de pagamento.
9. O carrinho é esvaziado; a tela de sucesso continua correta (usa o snapshot do pedido).

### 4.2 Fluxos alternativos
| Situação | Comportamento esperado |
|---|---|
| Checkout com carrinho vazio | Estado vazio (EmptyCart) com link para a Home; botão Confirmar desabilitado/bloqueado |
| CEP com formato inválido | Mensagem de erro no campo; nenhuma chamada à API |
| CEP não encontrado | Mensagem "CEP não encontrado"; campos liberados para correção manual |
| API de CEP indisponível / offline | Mensagem de falha; usuário pode tentar novamente ou preencher manualmente |
| Formulário inválido ao confirmar | Erros por campo (texto + `aria-invalid`), foco no primeiro campo inválido |
| Pagamento não selecionado | Erro acessível no grupo de pagamento |
| Acesso direto a `/success` sem pedido | Estado vazio com link para a Home (RN-09) |
| Rota inexistente | Redireciona para `/` (D-09) |

## 5. Requisitos funcionais

| ID | Requisito | Critério de aceite |
|---|---|---|
| RF-01 | Catálogo com imagem, nome, descrição, preço e tag(s) | Todos os cafés do arquivo local aparecem na Home |
| RF-02 | Selecionar quantidade antes de adicionar | Valor sempre inteiro ≥ 1; botões − e + funcionam; − desabilitado em 1 |
| RF-03 | Adicionar ao carrinho acumulando produto repetido | Adicionar o mesmo café soma à quantidade existente (sem linha nova) |
| RF-04 | Contador de unidades no Header | Mostra Σ quantidades; oculto quando 0 |
| RF-05 | Aumentar, diminuir e remover itens no carrinho | Totais e contador atualizam imediatamente |
| RF-06 | Persistir carrinho em `localStorage` | Após F5 o carrinho é recuperado |
| RF-07 | Navegação Home / Checkout / Confirmação com React Router | Sem reload completo (SPA) |
| RF-08 | Endereço com CEP, rua, número, complemento (opcional), bairro, cidade e UF consultando API pública de CEP | CEP válido preenche rua/bairro/cidade/UF; número e complemento manuais; erros para inválido, não encontrado e falha |
| RF-09 | Forma de pagamento: crédito, débito ou dinheiro | Uma opção obrigatória |
| RF-10 | Subtotal, taxa de entrega e total | Valores consistentes com RN-03/RN-04 |
| RF-11 | Impedir finalização com carrinho vazio ou formulário inválido | Feedback visível e anunciado por leitor de tela |
| RF-12 | Confirmar pedido fictício mostrando endereço e pagamento | Resumo correto na tela de sucesso |
| RF-13 | Limpar carrinho após confirmação preservando o pedido | Sucesso correto mesmo com carrinho vazio |
| RF-14 | Tema claro/escuro | Todas as telas; preferência persistida |
| RF-15 | Layout mobile | Fluxo completo utilizável em 320 px |
| RF-16 | Logo original criada com IA | No Header, no favicon e documentada (Branding com IA) |

## 6. Regras de negócio

| ID | Regra | Decisão adotada |
|---|---|---|
| RN-01 | Quantidade nunca 0 ou negativa na adição | Seletor do card com mínimo 1. **No carrinho, o botão − fica desabilitado em 1; para tirar o item usa-se o botão "Remover".** (D-03) |
| RN-02 | Produto único no carrinho | Re-adicionar soma a quantidade da linha existente (`find` por `coffeeId`) |
| RN-03 | subtotal = Σ(preço × qtd); total = subtotal + entrega | **Taxa de entrega fixa de R$ 3,50 (350 centavos)**, como no Figma, centralizada em `src/utils/` (constante única) (D-04). |
| RN-04 | Moeda BRL com 2 casas; cálculo em centavos | Preços guardados como inteiros em centavos; formatação com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` só na exibição |
| RN-05 | Pagamento apenas informativo | Nenhum dado de cartão é coletado |
| RN-06 | Carrinho sobrevive refresh; pedido é snapshot independente | Pedido confirmado copia itens, valores, endereço e pagamento; salvo separado do carrinho |
| RN-07 | Complemento opcional; CEP obrigatório via API | ViaCEP (D-05); trata formato inválido, não encontrado, loading e indisponibilidade; campos editáveis após erro |
| RN-08 | Catálogo em arquivo local tipado | `src/data/coffees.ts` tipado com `Coffee[]` |
| RN-09 | Estados vazios | Carrinho sem itens (checkout) e sucesso sem pedido válido |
| RN-10 | Não confirmar com erros ou itens inexistentes | Validação Zod + carrinho filtrado contra o catálogo ao carregar do `localStorage` |

## 7. Requisitos não funcionais

| Categoria | Requisito |
|---|---|
| Acessibilidade | WCAG 2.2 AA: contraste ≥ 4.5:1 (texto), foco visível, labels em todos os campos, erros com texto (não só cor) e `role="alert"`, `aria-invalid`/`aria-describedby`, `aria-live` para status do CEP, botões de ícone com `aria-label`, pagamento como grupo de rádio (`fieldset` + `legend`), **alvos de toque ≥ 44×44 px** |
| Responsividade | Testado em 320, 375/390, 768, 1280/1440 px; sem scroll horizontal; checkout em coluna única no mobile |
| Desempenho | Imagens dos cafés otimizadas (SVG/PNG pequenos); build de produção sem warnings relevantes |
| Persistência | Carrinho, tema e último pedido em `localStorage` com `try/catch` e fallback seguro |
| Compatibilidade | Últimas versões de Chrome, Edge, Firefox e Safari (desktop e mobile) |
| Qualidade de código | TypeScript estrito, sem `any`; estado nunca mutado; componentes pequenos |
| Movimento | Transições respeitam `prefers-reduced-motion` |

## 8. Identidade visual e tema

- **Nome:** Coffee Delivery (D-01).
- **Paleta de referência:** amarelo (destaques/CTA) e roxo (ações secundárias, seleção), base em tons neutros quentes. Tokens exatos extraídos do Style Guide do Figma (ver TECH_SPEC §8).
- **Tipografia:** Baloo 2 (títulos) + Roboto (textos).
- **Logo:** gerada com ferramenta de IA (D-07, definida na T-07); variações para fundo claro e escuro; testada em tamanho pequeno (favicon 32 px e Header). Documentada na seção "Branding com IA" do README (ferramenta, prompt, resultado, motivo das escolhas, direitos de uso).
- **Tema:** claro e escuro com tokens semânticos; preferência salva em `localStorage`, fallback `prefers-color-scheme`; toggle acessível no Header.

## 9. Critérios de aceite globais (Definition of Done do produto)

- [ ] `npm run build` e `npm run test` sem erros.
- [ ] Todos os RF-01..RF-16 verificados (manual + Playwright).
- [ ] Todas as RN-01..RN-10 cobertas por teste unitário ou de fluxo quando aplicável.
- [ ] Light/dark em Home, Checkout e Confirmação, persistido.
- [ ] Desktop, tablet e mobile sem scroll horizontal.
- [ ] Logo IA no Header + favicon + documentação.
- [ ] PRD/TECH/TASKS/AGENTS/README no GitHub; ≥ 3 interações de IA em `docs/AI_USAGE.md`.
- [ ] App publicada e link no README; prints Home, Checkout, Sucesso e Dark Mode (desktop + mobile).

## 10. Decisões

| # | Decisão | Status |
|---|---|---|
| D-01 | Nome da marca: Coffee Delivery | Decidido |
| D-02 | Estilização: styled-components (padrão do enunciado) | Decidido |
| D-03 | RN-01: − desabilitado em 1 no carrinho; remoção só por "Remover" | Decidido |
| D-04 | Taxa de entrega fixa R$ 3,50 | Decidido |
| D-05 | API de CEP: ViaCEP (`https://viacep.com.br/ws/{cep}/json/`) | Decidido |
| D-06 | Deploy: Vercel | Decidido |
| D-07 | Ferramenta de IA para logo | Decidido — Claude Code gerando SVG (ver `docs/BRANDING.md`) |
| D-08 | Último pedido persistido em `localStorage` para `/success` sobreviver a refresh | Decidido |
| D-09 | Rota inexistente redireciona para `/` | Decidido |
| D-10 | Previsão de entrega fixa "20 min - 30 min" (texto do Figma) | Decidido |
| D-11 | Ícones: `@phosphor-icons/react` (os mesmos do Figma) | Decidido |
| D-12 | Testes: Vitest + Testing Library + jsdom | Decidido |
| D-13 | Repositório GitHub público `coffee-delivery` | Decidido |
| D-14 | Projeto de referência: https://github.com/Devpaulo1/coffee-delivery (estrutura uma-pasta-por-componente, ações do reducer, fluxo do CEP, tokens iniciais) — adaptado, não copiado | Decidido |
| D-15 | Item do carrinho guarda só `coffeeId + quantity` (diverge da referência; catálogo é a fonte única — RN-10) | Decidido |
| D-16 | Chaves versionadas no `localStorage`: `@coffee-delivery:cart-1.0.0`, `@coffee-delivery:last-order-1.0.0`, `@coffee-delivery:theme-1.0.0` | Decidido |
| D-17 | Formas de pagamento no código: `'credit' \| 'debit' \| 'money'`; pedido confirmado via ação `CONFIRM_ORDER` (guarda snapshot e esvazia o carrinho) | Decidido |

Figma conferido (cópia do Gustavo, 2026-11-19): Home, Checkout, Checkout preenchido e Sucesso batem com a referência — 14 cafés a R$ 9,90, entrega R$ 3,50, total R$ 33,20 para R$ 29,70 em itens, "− 1 +" + Remover no carrinho, sucesso com endereço / 20–30 min / pagamento. Hex exatos e Style Guide ainda a confirmar; imagens serão exportadas pelo Gustavo.
