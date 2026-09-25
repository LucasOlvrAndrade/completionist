# Completionist: Product Requirements Document (PRD)

Fase 2 do fluxo AIOX `greenfield-fullstack`, a cargo do @pm. Base: `docs/project-brief.md`
e as decisões do grill-me de 2026-09-25 (`.claude/memory/estado.md`).

## 1. Objetivos e contexto

### Objetivos

- Ajudar quem joga no PC a fazer 100% das conquistas da Steam, com as conquistas de
  cada jogo ordenadas da mais fácil para a mais difícil.
- Oferecer, nos jogos com guia, um passo a passo próprio, um vídeo que abre no trecho
  certo, etiquetas de dificuldade e um roteiro de platina.
- Mostrar o progresso real de quem entra com a Steam, jogo a jogo e na biblioteca inteira.
- Lançar com 14 jogos com guia completo, em PT-BR e em inglês.
- Servir de peça de portfólio: código aberto, conteúdo real, funcionando sem login.

### Contexto

Quem quer platinar hoje junta a lista da Steam (sem ordem nem explicação), um guia em
texto, um vídeo, um fórum para as perdíveis e uma planilha. Nenhuma dessas fontes sabe
o que a pessoa já fez. O Completionist junta tudo numa página por jogo e usa a conta
Steam do usuário para mostrar só o que falta. Existe pouco guia de platina bom em PT-BR,
e esse é o espaço inicial; o inglês amplia o alcance.

### Histórico

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 2026-09-25 | 1.0 | Primeira versão, a partir do brief e do grill-me | @pm |

## 2. Requisitos

### Funcionais

**Catálogo**

- **FR1:** Qualquer jogo da Steam com conquistas pode ser aberto no site, pela busca ou pelo AppID.
- **FR2:** A página do jogo lista todas as conquistas com ícone, nome, descrição e a % global
  de desbloqueio, ordenadas da maior % para a menor.
- **FR3:** Jogos sem guia mostram o aviso "O guia deste jogo ainda não foi produzido" e
  continuam com a lista ordenada.
- **FR4:** A home destaca os jogos com guia (vitrine); os demais aparecem só pela busca e pela
  biblioteca do usuário.
- **FR5:** Conquistas ocultas aparecem com nome, descrição e passo a passo embaçados até o
  clique. Conquistas já desbloqueadas pelo usuário logado aparecem sempre reveladas.
- **FR6:** Um interruptor global "mostrar spoilers" revela tudo e fica salvo (na conta, se
  logado; no navegador, se visitante).

**Guias**

- **FR7:** Jogos com guia exibem no topo a nota geral da platina: dificuldade (x/10), horas
  estimadas, número de jogadas e selo "guia completo".
- **FR8:** Jogos com guia exibem o bloco "Antes de começar": perdíveis, dificuldade que precisa
  ser escolhida desde o início, backups de save e avisos de DLC.
- **FR9:** Cada conquista de um jogo com guia pode ter: dificuldade (1 a 5), tempo estimado,
  etiquetas "perdível" e "grind", passo a passo em texto, vídeo do YouTube com início no
  segundo indicado, fotos e fontes (links).
- **FR10:** Nos jogos com guia, a ordem padrão é por dificuldade da curadoria, com a % da
  Steam como desempate. Sem guia, a ordem é só pela %.
- **FR11:** Nos jogos com guia, o usuário alterna entre "Dificuldade" e "Roteiro". O roteiro
  agrupa as conquistas em etapas nomeadas, e os nomes das etapas passam pelo filtro de spoiler.
- **FR12:** Filtros "o que me falta" (só com login) e "só perdíveis" (só com guia).
- **FR13:** Conquistas de DLC ficam em blocos separados do jogo base, com a barra de
  progresso "Base: x/y · Total: x/z". A marcação de DLC vem do guia; sem guia, a lista é única.
- **FR14:** Cada foto guarda a origem (`autor` ou `usuario`) e os créditos. Sem foto, o vídeo
  com timestamp faz esse papel.
- **FR15:** Cada conquista de um jogo com guia tem o botão "Sugerir correção", que abre uma
  issue no GitHub já preenchida com o jogo, a conquista e o idioma.
- **FR16:** Nomes de conquista traduzidos pela curadoria (ex.: Terraria, sem PT-BR na Steam)
  aparecem no idioma do site, com o nome original da Steam ao lado.

**Conta Steam**

- **FR17:** "Entrar com a Steam" via OpenID 2.0, sem senha. A conta é identificada pelo SteamID64.
- **FR18:** Logado, a página do jogo marca as conquistas desbloqueadas e mostra o progresso (x/y).
- **FR19:** O progresso é buscado na Steam no login e ao clicar "Atualizar", com a data da
  última atualização visível.
- **FR20:** Se os detalhes de jogos do perfil forem privados, o site mostra um aviso com o
  passo a passo (com capturas) para torná-los públicos e o botão "Já mudei, atualizar". Não
  existe marcação manual.
- **FR21:** "Minha biblioteca" lista os jogos do usuário que têm conquistas, ordenados por
  proximidade da platina (primeiro quem tem menos conquistas faltando, com peso para a
  dificuldade delas), mostrando o que falta e se o jogo tem guia.
- **FR22:** O usuário pode sair e apagar a conta (remove progresso e perfil do banco).

**Perfil público**

- **FR23:** O perfil público nasce desligado. Ao ativar, o usuário escolhe um apelido único
  (sugestão: o nome da Steam), e o perfil passa a ficar em `/u/{apelido}`.
- **FR24:** O perfil mostra avatar, apelido, platinas feitas e jogos com mais de 50% de
  progresso, cada um com o ícone da conquista mais rara desbloqueada.
- **FR25:** O usuário pode trocar o apelido e desligar o perfil a qualquer momento; perfil
  desligado responde 404.

**Idiomas**

- **FR26:** O site inteiro existe em PT-BR (`/pt`) e em inglês (`/en`), com seletor de idioma.
  A primeira visita escolhe pelo idioma do navegador.
- **FR27:** Os dados da Steam (nomes e descrições das conquistas) vêm no idioma do site
  quando o jogo tiver tradução, e em inglês quando não tiver.
- **FR28:** Todo guia do lançamento existe nos dois idiomas. Guia faltando num idioma mostra
  o aviso de guia não produzido naquele idioma, com link para o outro.

### Não funcionais

- **NFR1:** Custo zero no plano gratuito da Vercel e do Neon.
- **NFR2:** Respeitar o limite da Steam Web API (100 mil chamadas/dia): schema e % ficam em
  cache no banco, com atualização diária por cron; um jogo novo é buscado na primeira visita.
- **NFR3:** Progresso do usuário: no máximo uma atualização por jogo a cada 5 minutos.
- **NFR4:** Texto dos guias 100% próprio; toda conquista com guia cita as fontes. Nada de
  scraping automatizado de sites de guia.
- **NFR5:** Rodapé com o aviso de que o site não tem vínculo com a Valve e com o crédito
  "Powered by Steam", conforme os termos da Steam Web API.
- **NFR6:** Vídeos só por embed oficial do YouTube, no modo `youtube-nocookie`.
- **NFR7:** Segredos (`STEAM_API_KEY`, banco, sessão) fora do git, via `vercel env pull`.
- **NFR8:** Páginas de jogos com guia estáticas ou em cache (ISR), com LCP abaixo de 2,5 s no 4G.
- **NFR9:** Acessibilidade WCAG AA: contraste, navegação por teclado, o embaçamento de
  spoiler é um botão acessível e não esconde o conteúdo de leitores de tela sem aviso.
- **NFR10:** SEO: cada jogo com guia tem título, descrição, Open Graph e `hreflang` pt/en.
- **NFR11:** Analytics sem cookies (Vercel Analytics). Sem anúncios.
- **NFR12:** Dados guardados do usuário: SteamID, nome, avatar, progresso, preferências e
  perfil. Política de privacidade simples explicando isso e como apagar a conta.
- **NFR13:** Licenças: MIT para o código (`LICENSE`) e CC BY-NC-SA 4.0 para os guias
  (`content/LICENSE`), com a licença do guia citada no rodapé das páginas de jogo.

## 3. Objetivos de interface

### Visão

Uma página por jogo que responde em segundos a "vale a pena platinar?" (nota no topo) e
"o que eu faço agora?" (lista ordenada e o que falta). Estética de caçador de conquista:
escura por padrão, com tema claro, ícones das conquistas em destaque e a raridade visível
em cada item.

### Interações principais

- Lista de conquistas com cartões que abrem no lugar e mostram passo a passo, vídeo e fotos.
- Alternância "Dificuldade / Roteiro" e filtros fixos no topo da lista ao rolar.
- Spoiler embaçado com clique para revelar; interruptor global no cabeçalho.
- Barra de progresso dupla (base / total) nos jogos com DLC.

### Telas

1. **Home:** vitrine dos jogos com guia, busca e chamada para entrar com a Steam.
2. **Busca:** resultados de qualquer jogo da Steam, com selo nos que têm guia.
3. **Página do jogo:** nota da platina, "Antes de começar", lista de conquistas, alternância e filtros.
4. **Minha biblioteca:** jogos do usuário ordenados por proximidade da platina.
5. **Configurações da conta:** perfil público (apelido, ligar/desligar), spoilers, sair, apagar conta.
6. **Perfil público:** `/u/{apelido}`.
7. **Aviso de perfil Steam privado.**
8. **Sobre / privacidade / créditos e licenças.**

### Acessibilidade

WCAG AA.

### Marca

Nome **Completionist**. Identidade visual a definir pelo @ux-design-expert: tema escuro,
um tom de platina como cor de destaque e a raridade em escala de cor.

### Plataformas

Web responsivo, com prioridade para desktop (quem joga no PC costuma consultar numa
segunda tela ou no celular ao lado), e celular bem resolvido.

## 4. Premissas técnicas

### Repositório

Um repositório **público** `LucasOlvrAndrade/completionist` com código e guias. Commits
com autor e committer só o Lucas; o Claude aparece só como frase no fim da mensagem.

### Arquitetura

Monólito Next.js (App Router) na Vercel, Postgres no Neon. Guias em Markdown com
frontmatter em `content/games/{appid}/{pt-BR,en}.md`, lidos na hora do build. O banco
guarda usuários, progresso, preferências, perfil e o cache da Steam.

### Testes

- Unitários para: ordenação por dificuldade, cálculo de proximidade da platina, parser dos
  guias e validação do frontmatter.
- Validação dos guias no CI: frontmatter válido, `apiname` de cada conquista existente no
  schema da Steam, os dois idiomas presentes.
- Testes de integração das rotas da Steam com respostas gravadas (fixtures), sem chamar a
  API real no CI.
- Um teste ponta a ponta do fluxo visitante: home → jogo com guia → revelar spoiler.

### Outras premissas

- Login Steam por OpenID 2.0 implementado à mão (verificação `check_authentication`), com
  sessão em cookie assinado.
- `next-intl` para as rotas `/pt` e `/en`.
- Cron diário da Vercel para atualizar schema e % dos jogos com guia e dos jogos visitados
  recentemente.
- Domínio `completionist.lucas-andrade.dev`.

## 5. Épicos

1. **Fundação e catálogo:** o projeto no ar com qualquer jogo da Steam listando as conquistas ordenadas pela %, nos dois idiomas.
2. **Guias:** o formato dos guias e a página completa do jogo com guia, estreando com o Hollow Knight.
3. **Conta Steam:** login, progresso por jogo, perfil privado e "Minha biblioteca".
4. **Perfil público:** ativação com apelido e a página `/u/{apelido}`.
5. **Conteúdo do lançamento:** os outros 13 guias, nos dois idiomas.

A ordem garante que cada épico entregue algo usável: o 1 já é um site útil (lista ordenada
de qualquer jogo), o 2 entrega o diferencial para visitantes e o 3 depende só do 1. O épico
5 é trabalho de curadoria e pode andar em paralelo ao 3 e ao 4, assim que o 2 fechar o formato.

## 6. Épico 1: Fundação e catálogo

Colocar o projeto no ar com a base que todo o resto usa: Next.js, idiomas, banco, cache da
Steam e deploy no domínio. No fim do épico, qualquer pessoa busca um jogo e vê as conquistas
ordenadas da mais fácil para a mais difícil.

### Story 1.1: Projeto no ar

Como Lucas, quero o projeto criado e publicado no domínio, para que cada passo seguinte já
vá direto para produção.

1. Repositório público `completionist` com Next.js, TypeScript, lint e testes rodando no CI.
2. `LICENSE` (MIT) e `content/LICENSE` (CC BY-NC-SA 4.0) presentes.
3. Rotas `/pt` e `/en` com `next-intl`; `/` redireciona pelo idioma do navegador.
4. Página inicial provisória com o nome, o seletor de idioma e o rodapé com o aviso da Valve e as licenças.
5. Deploy automático do `main` na Vercel, respondendo em `completionist.lucas-andrade.dev`.
6. Vercel Analytics ativo.

### Story 1.2: Cache da Steam

Como sistema, quero guardar o schema e as porcentagens de cada jogo no banco, para não
depender da Steam a cada visita nem estourar o limite da API.

1. Banco Neon ligado ao projeto, com migrations versionadas.
2. Função que busca `GetSchemaForGame` (nos dois idiomas) e `GetGlobalAchievementPercentagesForApp`
   de um AppID e grava conquistas (apiname, nome e descrição por idioma, ícones, oculta, %).
3. Um jogo que nunca foi visitado é buscado na primeira visita; os seguintes leem do banco.
4. Cron diário atualiza os jogos com guia e os visitados nos últimos 30 dias.
5. Jogo sem conquistas ou AppID inexistente retorna um erro tratado, sem gravar lixo.
6. Testes com fixtures das respostas da Steam.

### Story 1.3: Página do jogo sem guia

Como visitante, quero abrir qualquer jogo e ver as conquistas da mais fácil para a mais
difícil, para saber por onde começar.

1. `/[locale]/jogo/[appid]` mostra capa, nome e a lista das conquistas com ícone, nome, descrição e % global.
2. Ordem pela % decrescente.
3. Aviso "O guia deste jogo ainda não foi produzido" (FR3).
4. Conquistas ocultas embaçadas com clique para revelar (FR5).
5. Interruptor global de spoilers no cabeçalho, salvo no navegador (FR6, parte visitante).
6. Nomes e descrições no idioma do site, com inglês como alternativa (FR27).

### Story 1.4: Busca

Como visitante, quero buscar um jogo pelo nome, para chegar à página dele.

1. Campo de busca no cabeçalho e na home.
2. Resultados com capa e nome, vindos da busca de apps da Steam, e só jogos com conquistas.
3. Jogos com guia aparecem primeiro, com selo.
4. Busca por AppID numérico abre o jogo direto.

## 7. Épico 2: Guias

Definir o formato dos guias e construir a página completa do jogo com guia. O épico fecha
com o guia do Hollow Knight publicado nos dois idiomas, que serve de modelo para os demais.

### Story 2.1: Formato e validação dos guias

Como curador, quero um formato de guia validado automaticamente, para que um guia com erro
nunca chegue ao site.

1. Formato documentado em `content/README.md`: frontmatter do jogo (nota, horas, jogadas,
   antes de começar, etapas do roteiro, DLCs) e bloco por conquista (apiname, dificuldade,
   tempo, perdível, grind, DLC, etapa, vídeo + segundo, fotos com origem e crédito, fontes,
   nome traduzido opcional).
2. Leitura dos guias no build.
3. Validação no CI: campos obrigatórios, apiname existente no schema, os dois idiomas presentes,
   URLs de vídeo válidas.
4. Um guia de exemplo pequeno usado nos testes.

### Story 2.2: Página do jogo com guia

Como visitante, quero ver a nota da platina, o "Antes de começar" e o passo a passo de cada
conquista, para planejar e executar a platina.

1. Nota geral no topo com o selo "guia completo" (FR7).
2. Bloco "Antes de começar" (FR8).
3. Cartões das conquistas com etiquetas, passo a passo, vídeo `youtube-nocookie` iniciando no
   segundo indicado, fotos com crédito e fontes (FR9, FR14).
4. Ordem por dificuldade da curadoria com desempate pela % (FR10).
5. Nome traduzido pela curadoria com o original da Steam ao lado (FR16).
6. Botão "Sugerir correção" abrindo issue preenchida (FR15).
7. Página estática/ISR com metadados de SEO e `hreflang` (NFR8, NFR10).

### Story 2.3: Roteiro, filtros e DLC

Como visitante, quero ver as conquistas em etapas e separar o que é de DLC, para seguir
a platina na ordem certa.

1. Alternância "Dificuldade / Roteiro" (FR11), com os nomes das etapas sob o filtro de spoiler.
2. Filtro "só perdíveis" (FR12).
3. Blocos de DLC separados e barra "Base / Total" (FR13).

### Story 2.4: Vitrine

Como visitante, quero ver na home os jogos que já têm guia, para descobrir o que o site oferece.

1. Home com os jogos com guia em cartões (capa, nota, horas).
2. Chamada "Entrar com a Steam" (desativada até o épico 3, ou oculta).
3. Página "Sobre" com o propósito, as fontes e as licenças.

### Story 2.5: Guia do Hollow Knight

Como jogador de Hollow Knight, quero o guia completo, para platinar o jogo.

1. Guia das 63 conquistas (52 do jogo base + 11 dos pacotes gratuitos) em PT-BR e em inglês.
2. Roteiro em etapas, perdíveis e avisos (Steel Soul, Panteão, speedrun) no "Antes de começar".
3. Vídeo com timestamp em toda conquista que precise; fontes citadas em todas.
4. Validação do CI passando e página publicada.

## 8. Épico 3: Conta Steam

Permitir entrar com a Steam e usar o progresso real do usuário em todo o site.

### Story 3.1: Entrar com a Steam

Como jogador, quero entrar com minha conta Steam, para o site saber o que eu já fiz.

1. Botão "Entrar com a Steam" e fluxo OpenID 2.0 com verificação no servidor (FR17).
2. Usuário criado ou atualizado com SteamID, nome e avatar; sessão em cookie assinado.
3. Sair encerra a sessão; apagar a conta remove todos os dados do usuário (FR22).
4. Preferência de spoiler passa a ser salva na conta (FR6).
5. Página de privacidade descreve os dados guardados (NFR12).

### Story 3.2: Progresso no jogo

Como jogador logado, quero ver na página do jogo o que já desbloqueei, para focar no que falta.

1. Conquistas desbloqueadas marcadas e reveladas mesmo se ocultas; contador x/y (FR18, FR5).
2. Barra "Base / Total" usa o progresso real nos jogos com DLC.
3. Filtro "o que me falta" (FR12).
4. Botão "Atualizar" com data da última atualização e limite de uma por jogo a cada 5 min (FR19, NFR3).

### Story 3.3: Perfil Steam privado

Como jogador com perfil privado, quero entender por que meu progresso não aparece e como resolver.

1. Detecção do perfil privado na resposta da Steam.
2. Aviso com o passo a passo e capturas da tela de privacidade da Steam (FR20).
3. Botão "Já mudei, atualizar" tenta de novo.

### Story 3.4: Minha biblioteca

Como jogador logado, quero ver todos os meus jogos ordenados por quão perto estou da
platina, para escolher onde investir.

1. Página com os jogos do usuário que têm conquistas (`GetOwnedGames` + progresso).
2. Ordenação por proximidade da platina (FR21) com o número de conquistas faltando e o selo "tem guia".
3. Carregamento progressivo para bibliotecas grandes, respeitando o limite da API.
4. Teste unitário do cálculo de proximidade.

## 9. Épico 4: Perfil público

### Story 4.1: Ativar o perfil

Como jogador logado, quero tornar meu perfil público com um apelido, para compartilhar minhas platinas.

1. Em configurações, o botão "Tornar meu perfil público" pede um apelido (sugestão: nome da
   Steam), com validação de formato e unicidade (FR23).
2. Trocar o apelido e desligar o perfil (FR25).

### Story 4.2: Página do perfil

Como visitante, quero ver o perfil público de alguém, para conhecer as platinas da pessoa.

1. `/[locale]/u/[apelido]` com avatar, apelido, platinas e jogos acima de 50%, cada um com a
   conquista mais rara desbloqueada (FR24).
2. Perfil desligado ou inexistente responde 404.
3. Metadados Open Graph para o link ficar bonito ao compartilhar.

## 10. Épico 5: Conteúdo do lançamento

Produzir os outros 13 guias, nos dois idiomas, com o mesmo padrão do Hollow Knight. Cada
story é um guia e segue os mesmos critérios de aceite: todas as conquistas cobertas,
roteiro em etapas, "Antes de começar", vídeo com timestamp quando precisar, fontes citadas
e validação do CI passando.

| Story | Jogo | Observação |
|---|---|---|
| 5.1 | Hollow Knight: Silksong | 52 conquistas; atenção à DLC gratuita prevista para 2026 |
| 5.2 | Elden Ring | 3 finais, backup de save |
| 5.3 | Clair Obscur: Expedition 33 | perdível no prólogo |
| 5.4 | Hades | |
| 5.5 | Hades II | |
| 5.6 | Black Myth: Wukong | NG+ |
| 5.7 | Hogwarts Legacy | jogadas extras para as casas |
| 5.8 | Sekiro | 4 finais |
| 5.9 | Cyberpunk 2077 | 13 conquistas da DLC paga em bloco próprio |
| 5.10 | Stardew Valley | Prairie King |
| 5.11 | Celeste | C-sides |
| 5.12 | Terraria | 137 conquistas; nomes PT-BR pela curadoria |
| 5.13 | Baldur's Gate 3 | Modo Honra e Dark Urge |

A ordem vai do mais pedido e mais simples de escrever para os mais longos.

## 11. Checklist

A rodar pelo @po na fase de validação dos artefatos (`po-master-checklist`).

## 12. Próximos passos

### Para o @ux-design-expert

Criar o `docs/front-end-spec.md` a partir das seções 3 e 5: identidade escura com destaque
platina, escala de cor de raridade, cartão de conquista (fechado e aberto), spoiler
embaçado, nota da platina, barra base/total e as oito telas, em desktop e celular.

### Para o @architect

Criar o `docs/fullstack-architecture.md` a partir das seções 2 e 4: modelo de dados (cache
da Steam por idioma, usuários, progresso, preferências, perfil), fluxo OpenID, estratégia
de cache e ISR, cron, pipeline de leitura e validação dos guias e o cálculo de proximidade
da platina, respeitando o custo zero e o limite da Steam.
