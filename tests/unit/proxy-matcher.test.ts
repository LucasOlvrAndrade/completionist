import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// O matcher já saiu uma vez com `\.` em vez de `\\.`, o que excluía qualquer caminho
// com mais de um caractere e deixava `/sobre` sem redirecionamento. O proxy importa o
// next-intl, que não roda no Vitest, então o matcher é lido do próprio arquivo.
const source = readFileSync(new URL('../../src/proxy.ts', import.meta.url), 'utf8');
const literal = source.match(/matcher:\s*'((?:[^'\\]|\\.)*)'/)?.[1] ?? '';
// Desfaz o escape da string JS: `\\` vira `\`.
const matcherSource = literal.replace(/\\(.)/g, '$1');
const matcher = new RegExp(`^${matcherSource}$`);

describe('matcher do proxy', () => {
  it.each(['/', '/sobre', '/u/fulano', '/pt/jogo/367520', '/en/game/367520'])('passa pelo proxy: %s', (path) => {
    expect(matcher.test(path)).toBe(true);
  });

  it.each(['/api/search', '/_next/static/a.js', '/_vercel/insights/script.js', '/favicon.ico'])(
    'fica de fora: %s',
    (path) => {
      expect(matcher.test(path)).toBe(false);
    },
  );
});
