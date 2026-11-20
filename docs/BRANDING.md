# Branding com IA — Coffee Delivery

## Conceito

Copo de café para viagem (delivery) com o **pin de localização** na luva: o café que vai até onde o cliente está. Duas linhas de vapor em amarelo indicam café quente e fresco. O nome comercial **Coffee Delivery** foi mantido (D-01).

## Ferramenta, prompt e resultado

| Campo | Registro |
|---|---|
| Ferramenta | Claude Code (Anthropic), gerando a logo diretamente como código vetorial (SVG) |
| Prompt | "Crie uma logo original em SVG para a cafeteria Coffee Delivery: um copo de café para viagem visto de frente, tampa em roxo escuro, corpo roxo, luva amarela com um pin de localização e duas linhas de vapor. Use somente as cores do Style Guide (#4B2995, #8047F8, #DBAC2C, #C47F17, #F1E9C9), formas simples e legíveis em 32 px. Gere também uma versão com o nome da marca para fundo claro e outra para fundo escuro." |
| Resultado | `src/assets/brand/logo-icon.svg` (símbolo, também usado como `public/favicon.svg`), `logo-light.svg` e `logo-dark.svg` (símbolo + nome) |
| Por que esta proposta | Vetor (nítido em qualquer tamanho e leve), usa só a paleta do Figma, formas grandes que continuam legíveis no favicon, e o pin conecta a marca ao propósito de entrega |

## Paleta e tipografia

| Uso | Cor |
|---|---|
| Tampa e pin | `#4B2995` (purple-dark) |
| Corpo do copo | `#8047F8` (purple) |
| Luva e vapor | `#DBAC2C` (yellow) / `#C47F17` (yellow-dark) |
| Detalhe do pin | `#F1E9C9` (yellow-light) |

Tipografia: **Baloo 2 ExtraBold** no nome "Coffee" e **Roboto** em caixa alta no "Delivery".

## Variações

| Arquivo | Uso |
|---|---|
| `logo-icon.svg` | Favicon e espaços pequenos |
| `logo-light.svg` | Fundo claro (nome em `#4B2995`) |
| `logo-dark.svg` | Fundo escuro (nome em `#F5F5F7`) |

No Header o símbolo é o SVG e o nome é texto HTML com as cores do tema ativo, então a mesma logo funciona nos dois temas sem trocar arquivo.

## Legibilidade e direitos de uso

- Conferido no favicon (aba do navegador, 16–32 px) e no Header (44 px de altura).
- A logo foi criada do zero para este projeto acadêmico, sem usar marcas de terceiros nem imagens de banco. O conteúdo gerado por IA é usado por Gustavo sob os termos de uso da ferramenta; não há elemento protegido de terceiros.
- A logo do Coffee Delivery original (Rocketseat) **não** foi reutilizada. A imagem do copo no hero vem do Figma da disciplina.
