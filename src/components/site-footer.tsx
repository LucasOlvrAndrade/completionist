import { useTranslations } from 'next-intl';
import { ThemeSelect } from './theme';

const REPOSITORY_URL = 'https://github.com/LucasOlvrAndrade/completionist';

export function SiteFooter() {
  const t = useTranslations('Footer');
  return (
    <footer className="border-t border-border bg-surface text-[0.8125rem] text-text-muted">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 py-6 md:px-8">
        <p>{t('valve')}</p>
        <p className="font-medium text-text">{t('poweredBy')}</p>
        <p>{t('licenses')}</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href={REPOSITORY_URL} className="underline underline-offset-4 hover:text-text">
            {t('repository')}
          </a>
          <ThemeSelect />
        </div>
      </div>
    </footer>
  );
}
