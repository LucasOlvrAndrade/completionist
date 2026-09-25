'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const LABELS: Record<Locale, { short: string; name: string }> = {
  pt: { short: 'PT', name: 'Português' },
  en: { short: 'EN', name: 'English' },
};

export function LocaleSwitcher() {
  const t = useTranslations('Header');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(next: Locale) {
    // Mantém a mesma página no outro idioma, com o caminho traduzido (FR26).
    // @ts-expect-error params do caminho atual combinam com o pathname atual
    router.replace({ pathname, params }, { locale: next });
  }

  return (
    <nav aria-label={t('language')} className="flex items-center gap-1 text-sm">
      {routing.locales.map((option) => (
        <button
          key={option}
          type="button"
          lang={option === 'pt' ? 'pt-BR' : 'en'}
          onClick={() => switchTo(option)}
          aria-current={option === locale ? 'true' : undefined}
          aria-label={t('switchTo', { language: LABELS[option].name })}
          className="rounded-[var(--radius-button)] px-2 py-1 font-medium text-text-muted hover:text-text aria-[current]:bg-surface-2 aria-[current]:text-text"
        >
          {LABELS[option].short}
        </button>
      ))}
    </nav>
  );
}
