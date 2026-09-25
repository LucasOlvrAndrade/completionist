import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { MESSAGE_LOCALE, routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messages = (await import(`../../messages/${MESSAGE_LOCALE[locale]}.json`)).default;
  return { locale, messages };
});
