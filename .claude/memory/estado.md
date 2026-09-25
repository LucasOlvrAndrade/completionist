# Estado do projeto Platina (nome provisorio)

## 2026-09-25: abertura

Site publico para platinar jogos da Steam: conquistas ordenadas da mais facil
para a mais dificil, passo a passo proprio, video com timestamp, fotos de
localizacao, login com Steam para rastrear o progresso do usuario.

Decisoes do Lucas:
- Publico / portfolio: texto 100% proprio, fontes sempre citadas, nada copiado.
- Guias por curadoria nas sessoes (nao IA no site), comecando pelos jogos
  mainstream/mais populares; depois vai adicionando aos poucos.
- Linkar com a Steam para rastrear conquistas do usuario (OpenID + GetPlayerAchievements).
- Fluxo AIOX greenfield-fullstack completo.
- So Steam por enquanto.

Fase atual: brief pronto (docs/project-brief.md). Proximo: @pm cria o PRD, com
lista inicial de ~10 jogos pesquisada pelo @analyst.
Em aberto: nome/dominio, fotos de localizacao, repo no GitHub (ainda so local).

## 2026-09-25: grill-me (decisoes fechadas com o Lucas)

- Nome: **Completionist**, em completionist.lucas-andrade.dev (existe o completionist.me, avisado; ok para portfolio).
- Catalogo hibrido: todo jogo Steam aparece; vitrine destaca os com guia; sem guia mostra lista por % + aviso "guia ainda nao foi produzido".
- Dificuldade: % Steam em tudo; nos com guia, etiquetas por conquista (1-5, tempo, perdivel, grind) + nota geral da platina no topo (x/10, horas, jogadas).
- Fotos: video com timestamp como padrao, capturas do Lucas quando houver, envio por usuarios pos-MVP; cada foto guarda a origem.
- Login Steam: progresso por jogo + "Minha biblioteca" ordenada por proximidade da platina + perfil publico (desligado por padrao, apelido escolhido na ativacao, platinas + jogos >50%). "Proxima conquista sugerida" fica pos-MVP.
- Perfil Steam privado: so aviso com passo a passo + botao atualizar, sem marcacao manual.
- Idiomas: PT-BR e EN desde o lancamento, interface e guias (next-intl, /pt e /en).
- Lancamento: ~12 jogos misturando mais jogados agora (com platina viavel), mais donos e mais procurados para platinar. Lista em pesquisa.
- Repo: UM repo publico LucasOlvrAndrade/completionist; autoria so Lucas (Claude so frase no fim, sem trailer).
- Licencas: MIT (codigo, LICENSE) + CC BY-NC-SA (guias, content/LICENSE).
- Guias em arquivos content/ (md + frontmatter), botao "sugerir correcao" abre issue do GitHub preenchida.
- DLC: secoes separadas, barra "Base x/y . Total x/z"; marcacao de DLC vem da curadoria.
- Ordem: dificuldade padrao + alternar para "Roteiro" em etapas (so com guia) + filtros "o que me falta" e "so perdiveis".
- Spoilers: ocultas embacadas ate clicar, desbloqueadas reveladas, interruptor global lembrado por usuario.
- Sem anuncios no MVP; "apoie o projeto" so se houver publico; Vercel Analytics sem cookies.
- Stack: Next.js + Vercel + Neon, OpenID Steam feito a mao, cache diario da Steam via cron.

### Lista de lancamento aprovada (2026-09-25)

12: Elden Ring (1245620), Baldur's Gate 3 (1086940), Clair Obscur: Expedition 33 (1903340),
Hades (1145360), Hades II (1145350), Stardew Valley (413150), Terraria (105600),
Cyberpunk 2077 (1091500), Sekiro (814380), Black Myth: Wukong (2358720), Celeste (504230),
Hogwarts Legacy (990080).
Extras: Hollow Knight (367520) e Hollow Knight: Silksong (1030300).
Primeiro guia sugerido: Hollow Knight (depois Silksong).
Atencao: Terraria sem nomes PT-BR na Steam (curadoria traduz); Cyberpunk tem 13 conquistas
da DLC paga (bloco proprio). Reserva: Witcher 3, Lies of P, RE4 Remake, Skyrim, Portal 2, Balatro.
Excluidos: RDR2, GTA V (online), Valheim, Isaac, CS2/Dota/PUBG.
Dados de "% com 100%" sao teto (conquista mais rara); fontes de 100% bloquearam a pesquisa.
Resumo confirmado pelo Lucas. PRD escrito (docs/prd.md): 5 epicos, 15 stories + 13 de conteudo.
Front-end spec e arquitetura prontos; PRD 1.1 com as 13 mudancas do architect + lacunas do ux (caminhos traduzidos /en/game, faixas de raridade, regras de apelido, limites de refresh).
@po: GO com ajustes (95%), 39 achados, 29 corrigidos (docs/po-validation.md). PRD 1.2.
Pendentes do Lucas: D1 apelido reservado ao desligar perfil, D2 limite inferior das faixas, D3 Lighthouse bloqueia ou so reporta.
Proximo: tarefas manuais do Lucas p/ Story 1.1 (tabela no PRD) + @sm cria stories do Epico 1.
