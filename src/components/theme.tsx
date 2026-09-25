'use client';

import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

type Theme = 'system' | 'dark' | 'light';
const STORAGE_KEY = 'theme';

// Roda no <head> antes da pintura. O tema fica só no navegador (front-end spec 6.3).
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`;

function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === 'dark' || value === 'light' ? value : 'system';
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  try {
    if (theme === 'system') {
      delete root.dataset.theme;
      localStorage.removeItem(STORAGE_KEY);
    } else {
      root.dataset.theme = theme;
      localStorage.setItem(STORAGE_KEY, theme);
    }
  } catch {
    // Sem localStorage (janela privada, bloqueio): o tema vale só nesta página.
  }
}

export function ThemeSelect() {
  const t = useTranslations('Footer');
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'system' as Theme);

  return (
    <label className="inline-flex items-center gap-2">
      <span>{t('theme')}</span>
      <select
        value={theme}
        onChange={(event) => applyTheme(event.target.value as Theme)}
        className="rounded-[var(--radius-button)] border border-border-strong bg-surface px-2 py-1 text-text"
      >
        <option value="system">{t('themeSystem')}</option>
        <option value="dark">{t('themeDark')}</option>
        <option value="light">{t('themeLight')}</option>
      </select>
    </label>
  );
}
