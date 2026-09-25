# Completionist: Validação dos artefatos (@po)

Fase `po-validate-artifacts` do fluxo AIOX `greenfield-fullstack`, a cargo do @po (Pax).
Data: 2026-09-25. Modo: YOLO (análise completa, sem elicitação).

Artefatos validados: `docs/project-brief.md`, `docs/prd.md` (1.1, agora 1.2),
`docs/front-end-spec.md` (1.0, agora 1.1) e `docs/fullstack-architecture.md` (1.0, agora 1.1),
contra as decisões travadas em `.claude/memory/estado.md`. Checklist:
`_framework-aiox/aiox-core/.aiox-core/product/checklists/po-master-checklist.md`.

## 1. Resumo executivo

| Item | Resultado |
|---|---|
| Tipo de projeto | Greenfield, com UI |
| Veredito | **GO com ajustes** (ajustes de consistência já aplicados; sobram 3 decisões pequenas, nenhuma bloqueia o Épico 1) |
| Prontidão antes dos ajustes | 82% |
| Prontidão depois dos ajustes | 95% |
| Clareza para o @dev | 9/10 |
| Problemas encontrados | 39: 0 CRÍTICO, 5 ALTO, 21 MÉDIO, 13 BAIXO |
| Aplicados nesta validação | 5 ALTO, 21 MÉDIO e 3 BAIXO |
| Seções puladas | 1.2 e 7 inteira (só brownfield) e todos os itens `[[BROWNFIELD ONLY]]` |

Nenhuma decisão travada do Lucas foi alterada. Os três documentos já concordavam no essencial
(stack, custo zero, catálogo híbrido, formato dos guias, licenças, repositório único, idiomas,
DLC, spoilers, perfil). Os problemas estavam em três lugares: o front-end spec ainda refletia
o PRD 1.0 (rotas só em português, spoiler borrado no DOM, pontos "abertos" que o PRD 1.1 já
fechou); duas dependências para a frente entre stories; e requisitos cobertos na arquitetura
mas sem critério de aceite em nenhuma story.

## 2. Status por categoria

| # | Categoria | Antes | Depois | Observação |
|---|---|---|---|---|
| 1 | Setup e inicialização | Parcial | Passa | Faltavam README e tokens de design na Story 1.1 |
| 2 | Infraestrutura e deploy | Parcial | Passa | Story 1.1 pedia `DATABASE_URL` antes de o banco existir (1.2) |
| 3 | Dependências externas | Parcial | Passa | Chave da Steam, DNS e integração Neon não tinham dono nem momento |
| 4 | UI/UX | Parcial | Passa | Rotas, spoiler e limites divergentes no front-end spec |
| 5 | Responsabilidade usuário/agente | Parcial | Passa | Nenhuma lista de ações humanas; criada no PRD |
| 6 | Sequência e dependências | Parcial | Passa | 3.3 dependia de 3.4; 1.4 dependia do Épico 2 |
| 7 | Riscos (brownfield) | N/A | N/A | Pulada: greenfield |
| 8 | Escopo do MVP | Parcial | Passa | 5 FR/NFR sem AC; faltava a lista "fora do MVP" |
| 9 | Documentação e passagem | Parcial | Passa | README, seed do E2E, formato de guia com texto antigo na arquitetura |
| 10 | Pós-MVP | Parcial | Passa | Pós-MVP só existia no `estado.md`; agora no PRD (seção 11) |

### 2.1 Detalhe dos itens do checklist

**1. Setup.** 1.1 Scaffolding: Story 1.1 cria repo, Next.js, CI, deploy e domínio; faltava
README (corrigido). 1.3 Ambiente local: arquitetura 15.1 (Node 24, pnpm, Docker ou branch
Neon, `vercel env pull`). 1.4 Dependências: versões travadas na arquitetura 3, com `~`.

**2. Infraestrutura.** Banco (Neon, Drizzle, migrations) na Story 1.2, antes de qualquer
leitura; schema de referência na arquitetura 6. Autenticação (3.1) antes das rotas
protegidas (3.2 a 4.2). Pipeline de CI e deploy na 1.1; migrations no build de produção
(15.3). Infra de testes: Vitest na 1.1, Postgres de serviço e fixtures na 1.2, Playwright
na 2.4. Seed das fixtures para o E2E estava sem story (corrigido).

**3. Externos.** Steam Web API com limites, orçamento, cache negativo e fallback
(`storesearch` com busca por AppID; `GetAchievementsProgress` com fallback por jogo; spike
na 3.4). OpenID sequenciado na 3.1. Faltava dizer quem gera a chave, aponta o DNS e liga o
Neon (corrigido com "Ações que só o Lucas faz").

**4. UI/UX.** Tokens, contraste verificado, componentes com estados, responsividade,
acessibilidade e fluxos completos. Problemas de consistência listados em A2, A3, A5, M1,
M12, M13, M14 (todos corrigidos).

**5. Responsabilidades.** Nada de compra; contas, chave, DNS e capturas de tela agora
atribuídos ao Lucas com a story que bloqueiam (PRD 4).

**6. Sequência.** Ver A1 e M5, M6, M8, M9. Depois dos ajustes, nenhuma story depende de uma
posterior. Épico 5 depende só da 2.1 (formato) e da 2.5 (modelo), como o PRD diz.

**8. Escopo.** O MVP bate com o brief e o grill-me. Épico 4 (perfil público) e a WAF não são
mínimos no sentido estrito, mas são decisões travadas; não foram questionadas.

**9. Documentação.** Arquitetura com rotas, erros, schema e padrões. `content/README.md` na
2.1. README do repositório estava faltando (corrigido).

**10. Pós-MVP.** Fotos de usuários, "próxima conquista sugerida", apoio, outras lojas;
monitoramento em `cron_run` e `steam_api_usage`; feedback pelo "Sugerir correção".

## 3. Cobertura de requisitos por story

Depois dos ajustes, todo FR e NFR tem pelo menos um critério de aceite ou uma regra
transversal explícita.

| Requisito | Story (AC) |
|---|---|
| FR1 | 1.3, 1.4 |
| FR2 (faixas de raridade) | 1.3 AC1 (**novo**) |
| FR3 | 1.3 AC3 |
| FR4 | 2.4 AC1 e AC5 (**movido da 1.4**) |
| FR5 | 1.3 AC4, 2.2 AC8 (**novo**), 3.2 AC1 |
| FR6 | 1.3 AC5, 3.1 AC4 |
| FR7 a FR10 | 2.2 AC1 a AC4 |
| FR11 | 2.3 AC1 |
| FR12 | 2.3 AC2, 3.2 AC3 |
| FR13 | 2.3 AC3, 3.2 AC2 |
| FR14 | 2.2 AC3 |
| FR15 | 2.2 AC6 |
| FR16 | 2.2 AC5 |
| FR17 | 3.1 AC1 |
| FR18 | 3.2 AC1 |
| FR19 | 3.1 AC6 (**novo**), 3.2 AC1 e AC4 |
| FR20 | 3.3 |
| FR21 | 3.4 |
| FR22 | 3.1 AC3 (tela de Configurações **nova**) |
| FR23 a FR25 | 4.1, 4.2 |
| FR26 | 1.1 AC3 e AC7 |
| FR27 | 1.3 AC6 |
| FR28 | 2.1 AC4, 2.2 AC9 (**novo**) |
| NFR1 | transversal (arquitetura 2.2 e 16); sem AC, ver B11 |
| NFR2, NFR14, NFR15 | 1.2 |
| NFR3 | 3.2 AC4, 3.3 AC3, 3.4 AC4 |
| NFR4 | 2.1 AC4, Épico 5 |
| NFR5 | 1.1 AC4 |
| NFR6 | 2.2 AC3 |
| NFR7 | 1.1 AC9 (corrigido), 1.2 |
| NFR8, NFR10 | 2.2 AC7 |
| NFR9 | 1.3 AC4, 2.4 AC4 (axe, **novo**), regra de teclado no PRD 4 (**nova**) |
| NFR11 | 1.1 AC6 |
| NFR12 | 3.1 AC5 |
| NFR13 | 1.1 AC2 e AC4, 2.2 AC10 (**novo**) |

## 4. Problemas encontrados

Formato: severidade, documento e seção, problema, correção. "Aplicado" indica que a
correção já está nos documentos.

### ALTO

**A1. Story 3.3 dependia da Story 3.4.** PRD, Story 3.3 AC4 (estado "Você não tem este
jogo") e arquitetura 9.5 precisam da lista de jogos do usuário (`GetOwnedGames`), que só
aparecia na Story 3.4. Correção: Story 3.1 ganhou o AC6 (no login, buscar perfil e lista de
jogos, sem detalhe, gravando `user_game`, FR19); a arquitetura 9.5 registra que a lista vem do
login. **Aplicado.**

**A2. Spoiler vazava no front-end spec.** Front-end spec 5.1 (estado "Oculta embaçada"), 5.2
e 9 descreviam o texto real borrado com `aria-hidden`, o que contradiz o PRD (Story 1.3 AC4:
fora do DOM visível e da árvore de acessibilidade) e a arquitetura 12.4 (`<template>` e
barras genéricas); o "localizar na página" acharia o spoiler. Correção: 5.1, 5.2 e 9
reescritos no modelo da arquitetura, com `<noscript>` e anúncio `aria-live`. **Aplicado.**

**A3. Rotas só em português no front-end spec.** Front-end spec 2.1 (mapa, tabela e "Decisão
de UX (slugs)") e 12.2 mantinham `/[locale]/jogo` nos dois idiomas, contra o FR26 do PRD 1.1
(`/en/game`, `/en/library` etc.) e a arquitetura 12.1. Correção: mapa e tabela com colunas PT
e EN, decisão substituída pela regra de caminhos traduzidos, nota de que a pasta interna
continua em português. **Aplicado.**

**A4. FR24 sem dado para os platinados.** Arquitetura 9.6: o refino só processa jogos com
`0 < faltando`, então `rarest_unlocked_apiname` nunca era gravado para jogo platinado, e o
perfil público mostra a mais rara de cada platina. Correção: passo 6 no 9.6 (platinado usa a
menor % global do jogo, porque U = A, sem chamar `GetPlayerAchievements`), nota em 11.3 e
AC6 na Story 3.4. **Aplicado.**

**A5. "Já mudei, atualizar" sem rota nem coluna.** NFR3 fixa 1 vez por minuto, mas a
arquitetura não tinha rota para a ação nem campo para o throttle, e o front-end spec 3.3 e
12.2 ainda tratavam o limite como aberto. Correção: `POST /api/me/privacy-check` (8.2 e
árvore do código), coluna `app_user.privacy_checked_at` (6), tabela de 9.4 com os três
limites e onde cada um é guardado; front-end spec 3.3 e 5.13 com o estado "aguardando".
**Aplicado.**

### MÉDIO

**M1. Limites das faixas de raridade.** PRD FR2 dizia "Comum > 50%" e a arquitetura 11.1
`p ≥ 50 → 1`; 50% exato caía em faixas diferentes. % nula sem regra de exibição. Correção:
intervalos fechados embaixo e abertos em cima nos três documentos, "sem dado" para nula,
função única `src/domain/rarity.ts`. **Aplicado.** (Ver D2.)

**M2. FR2 sem AC.** Nenhuma story pedia o selo de raridade. Correção: Story 1.3 AC1. **Aplicado.**

**M3. FR28 sem AC.** O aviso de guia faltando num idioma só existia na arquitetura 7.5.
Correção: Story 2.2 AC9. **Aplicado.**

**M4. Spoiler na página com guia.** A seção 19 da arquitetura pedia o AC técnico de spoiler
na 1.3 e na 2.2; o PRD 1.1 só pôs na 1.3. Passo a passo, vídeo e fotos de conquista oculta
ficavam sem critério. Correção: Story 2.2 AC8, e AC7 proíbe nome oculto no `<title>` e no
Open Graph. **Aplicado.**

**M5. Story 1.4 dependia do Épico 2.** AC3 "jogos com guia aparecem primeiro, com selo" não
é testável antes de existir guia. Correção: 1.4 entrega o campo `guided` na resposta; ordem e
selo foram para a Story 2.4 AC5. **Aplicado.**

**M6. Segredos antes do banco.** Story 1.1 AC9 pedia os segredos da NFR7, incluindo
`DATABASE_URL`, que só existe com o Neon da 1.2. Correção: AC9 lista o que entra na 1.1 e o
que entra na 1.2; arquitetura 15.2 com a ordem de cadastro. **Aplicado.**

**M7. Fundação incompleta.** Story 1.1 sem README do repositório e sem os tokens de design
e o tema, embora o front-end spec 12.1 peça tokens e componentes já no Épico 1. Correção:
AC1 (pnpm, tipos, `.gitignore`), AC2 (README) e AC10 (tokens e tema). **Aplicado.**

**M8. Tela de Configurações sem story.** Tela 5 do PRD aparecia pela primeira vez na 4.1
("em configurações"), mas sair, apagar conta (FR22) e spoilers na conta são da 3.1.
Correção: Story 3.1 AC3 cria `/pt/conta` e `/en/account`. **Aplicado.**

**M9. Registro de visita sem story.** O cron da 1.2 atualiza os "visitados nos últimos 30
dias", mas `POST /api/visit/{appid}` (arquitetura 8.1) não estava em nenhum AC. Correção:
Story 1.3 AC7. **Aplicado.**

**M10. Ações humanas sem dono.** Chave da Steam, projeto Vercel, DNS, integração Neon,
`steam:snapshot` local e capturas de privacidade. Correção: PRD 4, "Ações que só o Lucas
faz", com a story que cada uma bloqueia. **Aplicado.**

**M11. Sem lista "fora do MVP" no PRD.** Os adiamentos do grill-me só existiam no
`estado.md`. Correção: PRD seção 11. Checklist e próximos passos viraram 12 e 13.
**Aplicado.**

**M12. Regra do apelido.** A regex da arquitetura exige começar por letra ou número; o FR23
não dizia isso; o front-end spec 3.4 deixava o formato "para o @architect". Correção: FR23,
front-end spec 3.4 (regra e erro 409) e arquitetura 6.2. **Aplicado.**

**M13. URL do perfil ambígua.** FR23 e FR26 diziam `/u/{apelido}`; Story 4.2, o front-end
spec e a pasta da arquitetura usam `/[locale]/u/`. Correção: `/pt/u/{apelido}` e
`/en/u/{apelido}`, com `/u/{apelido}` sem idioma redirecionado pelo proxy, nos três
documentos. **Aplicado.**

**M14. Limite da biblioteca.** Arquitetura 9.4 ainda dizia "1 vez por hora (proposta)";
front-end spec 3.2 mostrava a janela de 5 min no botão da biblioteca. Correção: 1 h fixa pela
NFR3 nos dois; Story 3.4 AC4 com o botão mostrando quando volta. **Aplicado.**

**M15. Formato dos guias.** Arquitetura 7.1 ainda dizia "o PRD fixa só os `.md`"; a flag
`exemplo` da Story 2.1 não estava no schema zod nem no YAML de exemplo; o guia de exemplo não
tinha AppID nem snapshot definidos; PRD 2.1 AC4 exigia os dois idiomas sempre, e a
arquitetura 7.5 só para `completo: true` (o que o FR28 pede). Correção: 7.1 reescrita,
`exemplo` em 7.2 e 7.4, 7.5 item 6 simplificado, Story 2.1 AC1, AC4 e AC5 alinhados. **Aplicado.**

**M16. E2E sem peças.** Seed `pnpm db:seed:fixtures`, axe e presença do guia de exemplo na
vitrine do CI não estavam em story nem na lista de comandos. Correção: Story 2.4 AC4,
arquitetura 14.4, 15.1 e 15.2 (`CI_BUILD`). **Aplicado.**

**M17. Testes do PRD 4 sem AC nas stories.** Ordenação (1.3, 2.2), parser (2.1), OpenID (3.1)
e fixtures de privacidade (3.3). Correção: ACs acrescentados. **Aplicado.**

**M18. Privacidade incompleta.** A arquitetura guarda `playtime_minutes` e `last_played_at`,
e a NFR12 não citava. Correção: NFR12 e arquitetura 13.1. **Aplicado.**

**M19. Seção "Platinados" fora do PRD.** Decidida no front-end spec 4.4 e na arquitetura
11.3, mas ausente da Story 3.4. Correção: Story 3.4 AC2. **Aplicado.**

**M20. `revalidatePath` com caminhos traduzidos.** Arquitetura 9.7 revalida `/en/jogo/…`,
que não é a URL pública em inglês. Está certo (é o caminho interno depois do rewrite), mas
confunde. Correção: nota em 9.7 e em 8.1, e teste de integração que confere as duas URLs.
**Aplicado.**

**M21. NFR9 sem portão.** Acessibilidade só aparecia no spoiler. Correção: axe no E2E (2.4)
e regra no PRD 4: story com tela nova só fecha depois de navegada por teclado nos dois
idiomas. **Aplicado.**

### BAIXO

| # | Onde | Problema | Correção | Status |
|---|---|---|---|---|
| B1 | PRD 2, NFR | NFR14 e NFR15 ficam entre NFR3 e NFR4 | Manter; renumerar quebraria referências | Não aplicado |
| B2 | Arquitetura 6.2 | Lista de apelidos reservados sem os segmentos em inglês | Incluídos `account`, `library`, `search`, `game`, `about`, `privacy`, `me` | Aplicado |
| B3 | PRD Story 2.4 AC2 | "Desativada ou oculta" contra "oculta" do front-end spec 2.2 | "Oculta até o épico 3" | Aplicado |
| B4 | Arquitetura 15.2 | `CI_BUILD` fora da tabela de variáveis | Linha acrescentada | Aplicado |
| B5 | `.claude/memory/estado.md` | Diz "18 stories"; o PRD tem 15 stories mais 13 de conteúdo | Corrigir na próxima atualização da memória (fora de `docs/`) | Não aplicado |
| B6 | `docs/project-brief.md` 5, 7 e 8 | Script de importação, repo privado + vitrine e marcação manual foram superados | Brief é histórico; PRD e arquitetura já registram. Opcional: nota no topo | Não aplicado |
| B7 | Arquitetura 16 | Lighthouse no CI sem story | Pôr na Story 2.2 ou 2.4 (ver D3) | Não aplicado |
| B8 | Front-end spec 6.6 | "Google Fonts" pode ser lido como CSS externo, que a CSP (arquitetura 13.1) bloquearia | Usar `next/font/google`, que hospeda as fontes no próprio site | Não aplicado |
| B9 | PRD 1.1 AC4 | Rodapé linka Sobre e Privacidade antes das stories 2.4 e 3.1 | Link aparece quando a página existe | Não aplicado |
| B10 | Front-end spec 4.3 | Destino do link "Como funciona" indefinido | Apontar para Sobre | Não aplicado |
| B11 | PRD NFR1 | Custo zero sem AC | Transversal; métricas na arquitetura 16 bastam | Não aplicado |
| B12 | Arquitetura 13.3 | `/api/visit` fora da regra da WAF | Escrita barata e limitada a 1 por hora por jogo; aceitável | Não aplicado |
| B13 | Front-end spec 4.1 e arquitetura 7.2 | Números ilustrativos diferentes (7/10, ~70 h, 2 jogadas contra 60 h, 1 jogada) | Ilustrativos; o guia real define | Não aplicado |

## 5. Pontos conferidos sem problema

- **Formato dos guias:** `guide.yaml` + `{pt-BR,en}.md`, lidos no build, fora do banco,
  igual no PRD 4, Story 2.1 e arquitetura 5 e 7 (depois de M15).
- **Rate limits (NFR3):** 5 min por jogo, 1 h biblioteca, 1 min "Já mudei", iguais no PRD,
  front-end spec e arquitetura 9.4, 9.5 e 13.3 (depois de A5 e M14).
- **Variáveis de ambiente:** NFR7 é o subconjunto de segredos; a lista completa está na
  arquitetura 15.2; nada com `NEXT_PUBLIC_` além da URL.
- **Teste E2E:** na Story 2.4, no PRD 4 e na arquitetura 14.4, depois de 1.3, 2.2 e 2.4.
- **Story 1.1:** repositório público, CI, deploy do `main`, domínio, licenças MIT e CC
  BY-NC-SA, analytics, `proxy.ts`, cabeçalhos, WAF, segredos, README e tokens.
- **Contagem de jogos:** 14 no lançamento (2.5 + 13 do Épico 5) no PRD, front-end spec 4.3
  e arquitetura 15.3; bate com a lista aprovada.
- **Decisões travadas** (nome, domínio, catálogo híbrido, % em tudo, fotos, login, perfil
  privado sem marcação manual, idiomas, repo único, licenças, DLC, ordem, spoilers, sem
  anúncios, stack): todas refletidas e sem contradição.

## 6. Riscos principais

1. `storesearch` e `GetAchievementsProgress` não documentados (R1, R2). Mitigados por
   fallback e spike na 3.4.
2. 403 ambíguo da Steam (R3). Mitigado pela regra 9.5; agora sem dependência da 3.4 (A1).
3. Volume de conteúdo: 14 guias bilíngues é o caminho crítico do lançamento, não o código.
   O Épico 5 pode andar em paralelo com 3 e 4 depois da 2.5.
4. Neon 0,5 GB (R4). Retenção e alerta em 400 MB.
5. Vazamento de spoiler por implementação ingênua. Mitigado por A2 e pelo E2E da 2.4.

## 7. Decisões para o Lucas

Nenhuma bloqueia o início do Épico 1.

- **D1. Apelido de perfil desligado:** continua reservado para a pessoa ou fica livre para
  outro usuário? Proposta do @po: continua reservado enquanto a conta existir; só a troca de
  apelido ou apagar a conta libera.
- **D2. Faixas de raridade no limite exato:** apliquei "cada faixa inclui o limite de baixo"
  (50% exato é Comum, 20% exato é Incomum). Muda só o caso de igualdade; confirme ou peça o
  contrário.
- **D3. Lighthouse no CI:** bloqueia o merge quando o LCP passa de 2,5 s, ou só gera relatório?
  Proposta: só relatório até o lançamento, bloqueante depois.

## 8. Arquivos alterados nesta validação

- `docs/prd.md` (1.2): FR2, FR23, FR26, NFR12; PRD 4 (testes, "Ações que só o Lucas faz");
  Stories 1.1, 1.3, 1.4, 2.1, 2.2, 2.4, 3.1, 3.3, 3.4, 4.2; seção 11 "Fora do MVP";
  seções 12 e 13 renumeradas.
- `docs/front-end-spec.md` (1.1): 1.4, 2.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.13, 5.15, 6.4, 9,
  12.2, 13.
- `docs/fullstack-architecture.md` (1.1): 1.2, 4, 6, 6.2, 7.1, 7.2, 7.4, 7.5, 8.1, 8.2, 9.4,
  9.5, 9.6, 9.7, 11.3, 12.1, 13.1, 14.4, 15.1, 15.2, 19, 20.

## 9. Próximo passo

@sm cria as stories do Épico 1 a partir do PRD 1.2 (`docs/stories/`), começando pela 1.1,
depois que o Lucas fizer as ações da tabela "Ações que só o Lucas faz" marcadas para a 1.1.
