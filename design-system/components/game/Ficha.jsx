import React from 'react';
import { PieceGlyph } from './PieceGlyph.jsx';
export function Ficha({ piece = 'peao', side = 'rosa', label, size = 120, style }) {
  const bg = side === 'amarelo' ? 'var(--xa-amarelo)' : side === 'preto' ? 'var(--xa-preto)' : 'var(--xa-rosa)';
  const ink = side === 'preto' ? 'var(--xa-creme)' : 'var(--xa-preto)';
  const ring = Math.max(2, size * 0.03);
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, border: ring + 'px solid var(--xa-preto)',
      boxShadow: (size * 0.04) + 'px ' + (size * 0.04) + 'px 0 var(--xa-preto)', position: 'relative', display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxSizing: 'border-box', ...style }}>
      <div style={{ position: 'absolute', inset: size * 0.07, borderRadius: '50%', border: Math.max(1, size * 0.018) + 'px dashed ' + ink, opacity: 0.55 }}></div>
      <PieceGlyph piece={piece} side={side === 'preto' ? 'creme' : 'preto'} size={size * 0.46} style={{ marginTop: label ? -size * 0.04 : 0 }} />
      {label ? <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700,
        fontSize: size * 0.11, color: ink, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1 }}>{label}</span> : null}
    </div>
  );
}
