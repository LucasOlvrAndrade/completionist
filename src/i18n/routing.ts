import { defineRouting } from 'next-intl/routing';

// Segmento de URL (`pt`/`en`) e idioma interno dos textos (`pt-BR`/`en`).
export const MESSAGE_LOCALE = { pt: 'pt-BR', en: 'en' } as const;

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix: 'always',
  // Caminhos traduzidos (PRD FR26, arquitetura 12.1). A pasta interna é a do português.
  pathnames: {
    '/': '/',
    '/jogo/[appid]': { pt: '/jogo/[appid]', en: '/game/[appid]' },
    '/busca': { pt: '/busca', en: '/search' },
    '/biblioteca': { pt: '/biblioteca', en: '/library' },
    '/conta': { pt: '/conta', en: '/account' },
    '/sobre': { pt: '/sobre', en: '/about' },
    '/privacidade': { pt: '/privacidade', en: '/privacy' },
    '/u/[apelido]': '/u/[apelido]',
  },
});

export type Locale = (typeof routing.locales)[number];
