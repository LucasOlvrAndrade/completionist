import { describe, expect, it } from 'vitest';
import { securityHeaders } from '../../next.config';

const header = (key: string) => securityHeaders.find((h) => h.key === key)?.value ?? '';

describe('cabeçalhos de segurança (arquitetura 13.1)', () => {
  it('bloqueia o site dentro de iframes', () => {
    expect(header('X-Frame-Options')).toBe('DENY');
    expect(header('Content-Security-Policy')).toContain("frame-ancestors 'none'");
  });

  it('só embute vídeo do youtube-nocookie (NFR6)', () => {
    expect(header('Content-Security-Policy')).toContain('frame-src https://www.youtube-nocookie.com');
  });

  it('tem nosniff, referrer e permissions', () => {
    expect(header('X-Content-Type-Options')).toBe('nosniff');
    expect(header('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(header('Permissions-Policy')).toContain('camera=()');
  });
});
