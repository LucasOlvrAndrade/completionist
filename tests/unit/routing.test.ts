import { describe, expect, it } from 'vitest';
import { MESSAGE_LOCALE, routing } from '@/i18n/routing';

describe('roteamento por idioma', () => {
  it('tem pt e en, com pt como padrão e prefixo sempre', () => {
    expect(routing.locales).toEqual(['pt', 'en']);
    expect(routing.defaultLocale).toBe('pt');
    expect(routing.localePrefix).toBe('always');
  });

  it('cada idioma de URL aponta para um arquivo de textos', () => {
    for (const locale of routing.locales) expect(MESSAGE_LOCALE[locale]).toBeTruthy();
  });

  it('traduz os caminhos em inglês e mantém o perfil igual (FR26)', () => {
    const pathnames = routing.pathnames as Record<string, string | Record<string, string>>;
    expect(pathnames['/jogo/[appid]']).toEqual({ pt: '/jogo/[appid]', en: '/game/[appid]' });
    expect(pathnames['/biblioteca']).toEqual({ pt: '/biblioteca', en: '/library' });
    expect(pathnames['/u/[apelido]']).toBe('/u/[apelido]');
  });
});
