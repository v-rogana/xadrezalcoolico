import React from 'react';
const checkerPairs = {
  classic: ['var(--xa-preto)', 'var(--xa-creme)'], duel: ['var(--xa-rosa)', 'var(--xa-amarelo)'],
  rosa: ['var(--xa-preto)', 'var(--xa-rosa)'], amarelo: ['var(--xa-preto)', 'var(--xa-amarelo)'], soft: ['var(--xa-creme-300)', 'var(--xa-creme)'],
};
export function Checker({ palette = 'classic', cell = 24, width = '100%', height = '100%', a, b, children, style }) {
  const p = checkerPairs[palette] || checkerPairs.classic;
  const c1 = a || p[0], c2 = b || p[1];
  return (
    <div style={{ width, height, position: 'relative',
      background: 'repeating-conic-gradient(' + c1 + ' 0 25%, ' + c2 + ' 0 50%) 0 0 / ' + (cell * 2) + 'px ' + (cell * 2) + 'px', ...style }}>
      {children}
    </div>
  );
}
