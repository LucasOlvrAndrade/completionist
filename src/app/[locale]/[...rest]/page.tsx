import { notFound } from 'next/navigation';

// Qualquer caminho desconhecido dentro de um idioma cai no not-found traduzido.
export default function CatchAll() {
  notFound();
}
