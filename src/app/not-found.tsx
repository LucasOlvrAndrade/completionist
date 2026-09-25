import Link from 'next/link';

// Fora de um idioma (o proxy não casou): página mínima, sem layout traduzido.
export default function RootNotFound() {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
        <h1>404</h1>
        <p>
          <Link href="/">Completionist</Link>
        </p>
      </body>
    </html>
  );
}
