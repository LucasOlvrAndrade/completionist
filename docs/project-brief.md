# Project Brief: Platina (nome provisório)

Fase 1 do fluxo AIOX `greenfield-fullstack`, a cargo do @analyst. Data: 2026-09-25.

## 1. Resumo

Um site público que ajuda a platinar jogos da Steam (fazer 100% das conquistas).
Para cada jogo, o site mostra todas as conquistas **ordenadas da mais fácil para a
mais difícil**. Cada conquista tem um passo a passo escrito, imagens de onde fica e
um vídeo que já abre no trecho certo. O usuário pode entrar com a conta Steam e o
site passa a mostrar o que ele já desbloqueou e o que falta.

## 2. Problema

Quem quer platinar hoje junta cinco abas: a lista da Steam (sem ordem nem
explicação), um guia em texto num site, um vídeo no YouTube, um fórum para as
conquistas perdíveis e uma planilha para marcar o progresso. Nenhuma dessas
fontes sabe o que a pessoa já fez.

## 3. Solução proposta

| Peça | Como |
|---|---|
| Lista de conquistas | Steam Web API: `GetSchemaForGame` (nome, descrição, ícone, conquistas ocultas) |
| Ordem de dificuldade | % global de desbloqueio (`GetGlobalAchievementPercentagesForApp`), ajustada pela curadoria (perdível, grind, tempo estimado, dificuldade apontada pelos guias) |
| Passo a passo | Texto **próprio**, escrito a partir de várias fontes, sempre com links para elas |
| Vídeo | Vídeo do YouTube embutido, abrindo no trecho da conquista (`start=`) |
| Fotos da localização | Ver seção 8, é o ponto aberto |
| Progresso do usuário | Entrar com a Steam (OpenID 2.0, sem senha) → SteamID64 → `GetPlayerAchievements` / `GetOwnedGames` |

### Roteiro de platina (diferencial)

Além da lista ordenada, cada jogo tem um bloco "antes de começar": conquistas
perdíveis, dificuldade que precisa ser escolhida desde o início, número de
jogadas e tempo estimado. A ordem "mais fácil primeiro" é a padrão, e o usuário
pode alternar para "ordem da história" quando o guia tiver essa informação.

## 4. Público

- Jogador de PC que quer platinar um jogo popular e está perdido em algumas conquistas.
- Quem caça conquistas, já tem jogos quase completos e quer ver só o que falta.
- Recrutadores e visitantes do portfólio do Lucas: o site precisa funcionar sem
  login, com conteúdo real.

## 5. Estratégia de conteúdo

**Curadoria, não geração automática.** Os guias são pesquisados e escritos nas
sessões com o Claude e entram no repositório como arquivos versionados (um por
jogo). Um script importa esses arquivos para o banco. A vantagem é que cada guia
passa por revisão no `git diff`, sem custo por jogo.

**Ordem de entrada dos jogos:** os mais populares primeiro. Critério a fechar no PRD,
com proposta inicial de:

1. Estar entre os mais jogados ou com mais donos na Steam (SteamSpy / Steam Charts);
2. Ter conquistas (e de preferência platina viável, sem conquista impossível ou de servidor desligado);
3. Ter procura por guia de platina (há guias populares e vídeos).

A lista inicial (em torno de 10 jogos) sai da pesquisa do @analyst na fase do PRD.

**Fontes consultadas** (só leitura e citação, nada copiado): guias da comunidade
Steam, PowerPyx, TrueSteamAchievements / TrueAchievements, PSNProfiles (para jogos
multiplataforma com troféus equivalentes), wikis dos jogos e vídeos do YouTube.

## 6. Restrições

- **Site público:** texto 100% próprio. Nada de copiar texto nem imagem de guia.
  Toda conquista mostra de onde veio a informação.
- **Sem scraping automatizado** de sites de guias. A pesquisa é feita por pessoa ou
  Claude durante a sessão.
- **Steam Web API:** chave gratuita, limite de 100 mil chamadas por dia. Os dados
  de schema e porcentagem ficam em cache no banco. Aviso obrigatório de que o site
  não tem vínculo com a Valve ("Powered by Steam" nos termos deles).
- **YouTube:** só embed oficial. A busca pela API custa 100 unidades da cota
  diária de 10 mil, então os vídeos são escolhidos na curadoria e não buscados a
  cada visita.
- **Segredos** (`STEAM_API_KEY`, banco) fora do git, via `vercel env pull`.
- **Custo zero** no nível gratuito, como nos outros projetos.

## 7. Stack preferida (a confirmar com o @architect)

A mesma dos outros projetos do Lucas, que ele já opera: Next.js na Vercel, Postgres
no Neon e domínio em `*.lucas-andrade.dev`. Repositórios seguindo o padrão do
sistema-barbearia (código privado + vitrine pública), se ele quiser o mesmo aqui.

## 8. Questões em aberto

1. **Fotos da localização.** Opções:
   a) quadro do próprio vídeo naquele minuto (o embed já resolve boa parte);
   b) capturas próprias, tiradas pelo Lucas jogando;
   c) link para a imagem no guia original, sem hospedar;
   d) mapa ou diagrama desenhado por nós, em jogos de coletáveis.
   Proposta: vídeo com timestamp como padrão, (b) e (d) quando houver, (c) como apoio.
2. **Nome e domínio.** "Platina" é provisório.
3. **Perfil privado:** se o perfil Steam do usuário não for público, mostrar um
   passo a passo de como abrir os "detalhes de jogos" e, enquanto isso, permitir
   marcar à mão?
4. **Jogos sem guia ainda:** mostrar a lista da Steam ordenada por % mesmo sem o
   passo a passo, com o aviso "guia em produção"? (Proposta: sim, qualquer jogo
   da Steam aparece, e os curados ganham o selo de guia completo.)
5. **Conteúdo de usuários** (comentários, dicas): fora do MVP?

## 9. Fora do escopo por enquanto

PlayStation, Xbox e outras lojas. Geração automática de guia por IA no site. App
mobile.

## 10. Próximo passo

@pm transforma este brief em PRD (`docs/prd.md`), com a lista inicial de jogos
pesquisada pelo @analyst.
