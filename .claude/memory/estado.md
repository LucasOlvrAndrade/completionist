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
