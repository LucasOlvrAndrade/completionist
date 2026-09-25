import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';

function TrophyIcon() {
  // Troféu próprio em linhas (front-end spec 6.1), sem marca de terceiros.
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3" />
      <path d="M12 13v4M9 20h6M10 17h4" />
    </svg>
  );
}

export function SiteHeader() {
  const t = useTranslations('Header');
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-20 focus:rounded-[var(--radius-button)] focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent"
      >
        {t('skip')}
      </a>
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
        <Link href="/" aria-label={t('home')} className="flex items-center gap-2 text-accent">
          <TrophyIcon />
          <span className="font-display text-lg font-semibold text-text">Completionist</span>
        </Link>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
