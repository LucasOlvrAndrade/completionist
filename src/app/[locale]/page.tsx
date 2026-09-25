import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

export default function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('Home');

  return (
    <section className="max-w-3xl">
      <h1 className="font-display text-[1.75rem] font-semibold leading-tight md:text-4xl">{t('title')}</h1>
      <p className="mt-4 text-base leading-relaxed text-text-muted">{t('tagline')}</p>
      <p className="mt-8 rounded-[var(--radius-card)] border-l-4 border-info bg-surface px-4 py-3 text-sm">
        {t('status')}
      </p>
    </section>
  );
}
