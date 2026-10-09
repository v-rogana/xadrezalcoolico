import React from 'react';
const btnVariants = {
  primary: { bg: 'var(--xa-preto)', fg: 'var(--xa-creme)', shadow: 'var(--xa-rosa)' },
  rosa: { bg: 'var(--xa-rosa)', fg: 'var(--xa-preto)', shadow: 'var(--xa-preto)' },
  amarelo: { bg: 'var(--xa-amarelo)', fg: 'var(--xa-preto)', shadow: 'var(--xa-preto)' },
  outline: { bg: 'transparent', fg: 'var(--xa-preto)', shadow: 'var(--xa-preto)' },
};
const btnSizes = { sm: { pad: '7px 16px 8px', fs: 16, sh: 2 }, md: { pad: '11px 22px 12px', fs: 20, sh: 4 }, lg: { pad: '16px 32px 17px', fs: 27, sh: 6 } };
export function Button({ variant = 'primary', size = 'md', disabled = false, icon, children, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = btnVariants[variant] || btnVariants.primary;
  const s = btnSizes[size] || btnSizes.md;
  const off = disabled ? 0 : press ? 0 : hover ? s.sh + 2 : s.sh;
  const shift = disabled ? 0 : press ? s.sh : hover ? -2 : 0;
  return (
    <button disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: s.pad,
        fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: s.fs, letterSpacing: '0.01em', lineHeight: 1,
        background: v.bg, color: v.fg, border: 'var(--border-base) solid var(--xa-preto)', borderRadius: 'var(--radius-pill)',
        boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.shadow : 'none',
        transform: 'translate(' + shift + 'px,' + shift + 'px)',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style,
      }} {...rest}>
      {icon ? <span style={{ display: 'inline-flex' }}>{icon}</span> : null}
      {children}
    </button>
  );
}
