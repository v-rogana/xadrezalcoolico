import React from 'react';
const tagTones = {
  preto: ['var(--xa-preto)', 'var(--xa-creme)'], rosa: ['var(--xa-rosa)', 'var(--xa-preto)'],
  amarelo: ['var(--xa-amarelo)', 'var(--xa-preto)'], creme: ['var(--xa-creme)', 'var(--xa-preto)'],
};
export function Tag({ tone = 'preto', mono = false, upper = true, rotate = 0, children, style }) {
  const t = tagTones[tone] || tagTones.preto;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: mono ? '4px 10px' : '5px 12px',
      background: t[0], color: t[1], border: 'var(--border-thin) solid var(--xa-preto)', borderRadius: 'var(--radius-pill)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-display)', fontWeight: mono ? 700 : 400,
      fontSize: mono ? 13 : 15, letterSpacing: mono ? '0.04em' : 0, textTransform: mono && upper ? 'uppercase' : 'none', lineHeight: 1,
      transform: rotate ? 'rotate(' + rotate + 'deg)' : undefined, whiteSpace: 'nowrap', ...style,
    }}>{children}</span>
  );
}
