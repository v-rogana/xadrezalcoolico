import React from 'react';
import { LogoSymbol } from './LogoSymbol.jsx';
const wmTones = {
  preto: ['var(--xa-preto)', 'var(--xa-preto)'], creme: ['var(--xa-creme)', 'var(--xa-creme)'],
  duo: ['var(--xa-rosa)', 'var(--xa-amarelo)'], rosa: ['var(--xa-rosa)', 'var(--xa-rosa)'], amarelo: ['var(--xa-amarelo)', 'var(--xa-amarelo)'],
};
export function Wordmark({ layout = 'stacked', tone = 'preto', size = 64, symbol = false, symbolVariant = 'peao', style }) {
  const c = wmTones[tone] || wmTones.preto;
  const base = { fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 0.95, display: 'block', whiteSpace: 'nowrap' };
  const sym = symbol ? <LogoSymbol variant={symbolVariant} size={layout === 'inline' ? size * 1.5 : size * 2.4} tone={tone === 'creme' || tone === 'duo' ? 'negativo' : 'color'}></LogoSymbol> : null;
  if (layout === 'inline') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.35, ...style }}>
        {sym}
        <span style={{ ...base, display: 'inline-flex', gap: '0.25em', fontSize: size }}>
          <span style={{ color: c[0] }}>Xadrez</span><span style={{ color: c[1] }}>Alcoólico</span>
        </span>
      </span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, ...style }}>
      {sym}
      <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ ...base, fontSize: size * 1.2, color: c[0] }}>Xadrez</span>
        <span style={{ ...base, fontSize: size, color: c[1], marginTop: size * 0.02 }}>Alcoólico</span>
      </span>
    </span>
  );
}
