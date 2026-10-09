import React from 'react';
export const PIECE_GLYPHS = { rei: '\u265A', dama: '\u265B', torre: '\u265C', bispo: '\u265D', cavalo: '\u265E', peao: '\u265F' };
const pgColors = { rosa: 'var(--xa-rosa)', amarelo: 'var(--xa-amarelo)', preto: 'var(--xa-preto)', creme: 'var(--xa-creme)' };
export function PieceGlyph({ piece = 'rei', side = 'preto', size = 48, outline = false, style }) {
  return (
    <span aria-label={piece} style={{
      fontFamily: 'var(--font-pieces)', fontSize: size, lineHeight: 1, color: pgColors[side] || side,
      WebkitTextStroke: outline ? Math.max(1, size / 28) + 'px var(--xa-preto)' : undefined, paintOrder: 'stroke fill',
      display: 'inline-block', ...style,
    }}>{(PIECE_GLYPHS[piece] || PIECE_GLYPHS.rei) + '\uFE0E'}</span>
  );
}
