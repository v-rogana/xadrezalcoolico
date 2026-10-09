import React from 'react';
import { Wordmark } from './Wordmark.jsx';
export function CoBrand({ partner = 'Bar Parceiro', partnerLogo, layout = 'inline', tone = 'preto', size = 28, symbol = true, style }) {
  const ink = tone === 'creme' || tone === 'duo' ? 'var(--xa-creme)' : 'var(--xa-preto)';
  const times = <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: size * 1.3, lineHeight: 0.8,
    color: tone === 'preto' ? 'var(--xa-preto)' : 'var(--xa-encontro)' }}>×</span>;
  const partnerEl = partnerLogo
    ? <img src={partnerLogo} alt={partner} style={{ height: size * 1.7, width: 'auto', display: 'block' }} />
    : <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: size * 0.8,
        color: ink, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{partner}</span>;
  const stacked = layout === 'stacked';
  return (
    <span style={{ display: 'inline-flex', flexDirection: stacked ? 'column' : 'row', alignItems: stacked ? 'flex-start' : 'center',
      gap: stacked ? size * 0.25 : size * 0.45, ...style }}>
      <Wordmark layout={stacked ? 'stacked' : 'inline'} tone={tone} size={size} symbol={symbol} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.45 }}>{times}{partnerEl}</span>
    </span>
  );
}
