import { describe, expect, it } from 'vitest';
import en from '../../messages/en.json';
import ptBR from '../../messages/pt-BR.json';

function keys(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) => keys(child, prefix ? `${prefix}.${key}` : key));
}

function leaves(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (typeof value !== 'object' || value === null) return [];
  return Object.values(value).flatMap(leaves);
}

describe('textos da interface', () => {
  it('pt-BR e en têm exatamente as mesmas chaves', () => {
    expect(keys(en).sort()).toEqual(keys(ptBR).sort());
  });

  it('nenhum texto está vazio', () => {
    for (const text of [...leaves(ptBR), ...leaves(en)]) expect(text.trim()).not.toBe('');
  });

  it('nenhum texto visível usa travessão', () => {
    for (const text of [...leaves(ptBR), ...leaves(en)]) expect(text).not.toContain('—');
  });
});
