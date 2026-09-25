# Completionist

Guias de platina para jogos da Steam. Cada jogo mostra as conquistas da mais fácil para a
mais difícil, com passo a passo, vídeo no trecho certo e, para quem entra com a Steam, o
próprio progresso. Em português e em inglês.

**Status:** em construção. Épico 1 (fundação e catálogo) em andamento. O planejamento
completo está em [`docs/`](docs/): [brief](docs/project-brief.md), [PRD](docs/prd.md),
[front-end spec](docs/front-end-spec.md), [arquitetura](docs/fullstack-architecture.md) e
[stories](docs/stories/).

## Stack

Next.js 16 (App Router) na Vercel, Postgres no Neon, next-intl (`/pt` e `/en`, com caminhos
traduzidos), Tailwind CSS 4, Vitest. Detalhes e versões na
[arquitetura](docs/fullstack-architecture.md#3-stack).

## Rodando localmente

Requisitos: Node 24 e pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Com o projeto ligado na Vercel, as variáveis vêm de lá (nada de segredo no git):

```bash
vercel link
vercel env pull .env.local
```

Sem Vercel, basta um `.env.local` com `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

> No Windows, rode os comandos pelo caminho com as maiúsculas certas
> (`C:\Users\...\Documents\ProjetosC\completionist`). Com o caminho em minúsculas, o pnpm
> falha com `Cannot destructure property 'manifest'`.

### Comandos

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` / `pnpm start` | Build de produção e servidor |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Gera os tipos das rotas e roda o `tsc` |
| `pnpm test` | Testes unitários (Vitest) |

## Variáveis de ambiente

Ficam na Vercel e chegam ao `.env.local` pelo `vercel env pull`. Nenhuma vai para o git.

| Variável | Quando entra | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Story 1.1 | URL pública do site |
| `SESSION_SECRET` | Story 1.1 | Assinatura da sessão (32+ bytes) |
| `CRON_SECRET` | Story 1.1 | Proteção do cron diário (16+ caracteres) |
| `DATABASE_URL`, `DATABASE_URL_UNPOOLED` | Story 1.2 | Neon, injetadas pela integração |
| `STEAM_API_KEY` | Story 1.2 | Steam Web API |

## Licenças

- **Código:** [MIT](LICENSE).
- **Guias** (tudo em [`content/`](content/)): [CC BY-NC-SA 4.0](content/LICENSE). Pode citar e
  adaptar dando o crédito, sem uso comercial, e derivados sob a mesma licença.

O Completionist não tem vínculo com a Valve Corporation. Steam e os logotipos da Steam são
marcas da Valve Corporation. Dados de conquistas fornecidos pela Steam Web API.
