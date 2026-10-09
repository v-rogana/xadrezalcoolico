import React from 'react';
import { PieceGlyph } from '../game/PieceGlyph.jsx';
const PIECE_NAMES = { rei: 'Rei', dama: 'Dama', torre: 'Torre', bispo: 'Bispo', cavalo: 'Cavalo', peao: 'Peão' };
export function MenuItem({ piece = 'peao', drink, note, count, side = 'preto', dark = false, style }) {
  const ink = dark ? 'var(--xa-creme)' : 'var(--xa-preto)';
  const empty = !drink;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr auto', alignItems: 'center', gap: 16, padding: '12px 0',
      borderBottom: '2px solid ' + ink, color: ink, ...style }}>
      <PieceGlyph piece={piece} side={side} size={48} outline={side === 'rosa' || side === 'amarelo'} style={{ justifySelf: 'center' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.75 }}>
          {PIECE_NAMES[piece] || piece}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1,
          padding: empty ? '6px 10px' : 0, border: empty ? '2px dashed ' + ink : 'none', borderRadius: 6,
          opacity: empty ? 0.5 : 1, alignSelf: 'flex-start' }}>
          {empty ? 'nome da bebida' : drink}
        </span>
        {note ? <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, opacity: 0.8 }}>{note}</span> : null}
      </div>
      {count ? <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18 }}>{'×' + count}</span> : null}
    </div>
  );
}
