import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <section className="max-w-xl">
      <h1 className="font-display text-3xl font-semibold">{t('title')}</h1>
      <Link href="/" className="mt-6 inline-block text-accent underline underline-offset-4">
        {t('back')}
      </Link>
    </section>
  );
}
