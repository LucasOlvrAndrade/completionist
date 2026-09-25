import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next 16 renomeou `middleware.ts` para `proxy.ts`. Escolhe o idioma pelo cookie
// `NEXT_LOCALE` ou pelo `Accept-Language` e redireciona a raiz e `/u/{apelido}`.
export default createMiddleware(routing);

export const config = {
  // Fora: API, internos do Next e da Vercel, e arquivos com extensão.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
