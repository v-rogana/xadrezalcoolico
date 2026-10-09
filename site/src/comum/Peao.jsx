// Símbolo A (peão-copo) do design system, com as cores trocáveis.
export default function Peao({ tinta = 'var(--xa-preto)', papel = 'var(--xa-creme)', bebida = 'var(--xa-rosa)', className = 'peao' }) {
  return (
    <svg className={className} viewBox="0 0 120 146" aria-hidden="true">
      <circle cx="60" cy="22" r="17" style={{ fill: tinta }} />
      <rect x="33" y="43" width="54" height="10" rx="4" style={{ fill: tinta }} />
      <path d="M42 60 H78 L88 124 H32 Z" style={{ fill: papel }} />
      <path d="M35.4 102 H84.6 L88 124 H32 Z" style={{ fill: bebida }} />
      <path d="M42 60 H78 L88 124 H32 Z" style={{ fill: 'none', stroke: tinta, strokeWidth: 7, strokeLinejoin: 'round' }} />
      <rect x="39" y="57" width="42" height="11" style={{ fill: tinta }} />
      <rect x="26" y="124" width="68" height="9" style={{ fill: tinta }} />
      <rect x="18" y="133" width="84" height="10" rx="1.5" style={{ fill: tinta }} />
    </svg>
  );
}
