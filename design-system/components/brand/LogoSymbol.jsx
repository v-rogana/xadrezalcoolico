import React from 'react';

function xaPawn(ink, paper, liquid, hollow, uid) {
  var lw = 7;
  var solid = hollow ? 'fill="' + paper + '" stroke="' + ink + '" stroke-width="5"' : 'fill="' + ink + '"';
  var body = 'M42 60 H78 L88 124 H32 Z';
  var ly = 102, k = 10 / 64, lx1 = 42 - (ly - 60) * k, lx2 = 78 + (ly - 60) * k;
  return '<circle cx="60" cy="22" r="' + (hollow ? 15.5 : 17) + '" ' + solid + '/>' +
    '<rect x="' + (hollow ? 35 : 33) + '" y="' + (hollow ? 44 : 43) + '" width="' + (hollow ? 50 : 54) + '" height="' + (hollow ? 8 : 10) + '" rx="4" ' + solid + '/>' +
    '<path d="' + body + '" fill="' + paper + '"/>' +
    '<path d="M' + lx1.toFixed(1) + ' ' + ly + ' H' + lx2.toFixed(1) + ' L88 124 H32 Z" fill="' + liquid + '"/>' +
    '<path d="' + body + '" fill="none" stroke="' + ink + '" stroke-width="' + lw + '" stroke-linejoin="round"/>' +
    '<rect x="39" y="57" width="42" height="' + (hollow ? 8 : 11) + '" ' + (hollow ? 'fill="' + ink + '"' : 'fill="' + ink + '"') + '/>' +
    '<rect x="' + (hollow ? 27.5 : 26) + '" y="' + (hollow ? 125.5 : 124) + '" width="' + (hollow ? 65 : 68) + '" height="' + (hollow ? 7 : 9) + '" ' + solid + '/>' +
    '<rect x="' + (hollow ? 19.5 : 18) + '" y="' + (hollow ? 134.5 : 133) + '" width="' + (hollow ? 81 : 84) + '" height="' + (hollow ? 8 : 10) + '" rx="1.5" ' + solid + '/>';
}
function xaBrinde(c, base) {
  // duelo: cada peão gira 15° sobre o canto interno da base — as bases levantam por fora, cabeças quase se tocando
  var cx = 116, py = 150, gap = 15, out = '';
  if (base === 'linha') out += '<line x1="8" y1="' + (py + 3) + '" x2="224" y2="' + (py + 3) + '" stroke="' + c.ink + '" stroke-width="6" stroke-linecap="round"/>';
  if (base === 'tabuleiro') {
    for (var i = 0; i < 8; i++) out += '<rect x="' + (12 + i * 26) + '" y="' + py + '" width="26" height="10" fill="' + (i % 2 ? c.paper : c.ink) + '"/>';
    out += '<rect x="12" y="' + py + '" width="208" height="10" fill="none" stroke="' + c.ink + '" stroke-width="3"/>';
  }
  out += '<g transform="translate(' + (cx - gap - 102) + ' ' + (py - 143) + ') rotate(15 102 143)">' + xaPawn(c.ink, c.paper, c.a, false) + '</g>';
  out += '<g transform="translate(' + (cx + gap - 18) + ' ' + (py - 143) + ') rotate(-15 18 143)">' + xaPawn(c.ink, c.paper, c.b, true) + '</g>';
  return { vb: base === 'tabuleiro' ? '0 0 232 162' : '0 0 232 158', svg: out };
}
function xaLogoSVG(variant, c, base) {
  // c: {ink, paper, a, b}
  if (variant === 'brinde') return xaBrinde(c, base);
  if (variant === 'tabuleiro') {
    return { vb: '0 0 128 128', svg:
      '<rect x="4" y="4" width="60" height="60" fill="' + c.ink + '"/><rect x="64" y="4" width="60" height="60" fill="' + c.paper + '"/>' +
      '<rect x="4" y="64" width="60" height="60" fill="' + c.paper + '"/><rect x="64" y="64" width="60" height="60" fill="' + c.ink + '"/>' +
      '<circle cx="34" cy="34" r="19" fill="' + c.a + '" stroke="' + c.paper + '" stroke-width="4"/>' +
      '<circle cx="94" cy="94" r="19" fill="' + c.b + '" stroke="' + c.paper + '" stroke-width="4"/>' +
      '<circle cx="94" cy="34" r="18" fill="none" stroke="' + c.ink + '" stroke-width="5"/>' +
      '<circle cx="34" cy="94" r="18" fill="none" stroke="' + c.ink + '" stroke-width="5"/>' +
      '<rect x="4" y="4" width="120" height="120" fill="none" stroke="' + c.ink + '" stroke-width="5"/>' };
  }
  return { vb: '0 0 120 146', svg: xaPawn(c.ink, c.paper, c.a, false) };
}

const lsTones = {
  color: { ink: 'var(--xa-preto)', paper: 'var(--xa-creme)', a: 'var(--xa-rosa)', b: 'var(--xa-amarelo)' },
  negativo: { ink: 'var(--xa-creme)', paper: 'var(--xa-preto)', a: 'var(--xa-rosa)', b: 'var(--xa-amarelo)' },
  amarelo: { ink: 'var(--xa-preto)', paper: 'var(--xa-creme)', a: 'var(--xa-amarelo)', b: 'var(--xa-rosa)' },
};
export function LogoSymbol({ variant = 'peao', tone = 'color', base = 'linha', size = 96, style }) {
  const r = xaLogoSVG(variant, lsTones[tone] || lsTones.color, base);
  const vb = r.vb.split(' ').map(Number);
  return (
    <svg viewBox={r.vb} height={size} width={size * vb[2] / vb[3]} role="img" aria-label="Xadrez Alcoólico"
      style={{ display: 'block', overflow: 'visible', ...style }} dangerouslySetInnerHTML={{ __html: r.svg }}></svg>
  );
}
