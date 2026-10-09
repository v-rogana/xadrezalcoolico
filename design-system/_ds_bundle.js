/* @ds-bundle: {"format":4,"namespace":"XadrezAlcoLicoDesignSystem_ee9af0","components":[{"name":"Checker","sourcePath":"components/brand/Checker.jsx"},{"name":"CoBrand","sourcePath":"components/brand/CoBrand.jsx"},{"name":"LogoSymbol","sourcePath":"components/brand/LogoSymbol.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Ficha","sourcePath":"components/game/Ficha.jsx"},{"name":"PIECE_GLYPHS","sourcePath":"components/game/PieceGlyph.jsx"},{"name":"PieceGlyph","sourcePath":"components/game/PieceGlyph.jsx"},{"name":"MenuItem","sourcePath":"components/menu/MenuItem.jsx"}],"sourceHashes":{"components/brand/Checker.jsx":"e7f3329557fe","components/brand/CoBrand.jsx":"527926f81232","components/brand/LogoSymbol.jsx":"fe484a0f7df8","components/brand/Wordmark.jsx":"3e8dd36a542e","components/core/Button.jsx":"31412cf95ef0","components/core/Tag.jsx":"ddf2eebbc86c","components/game/Ficha.jsx":"70e2eec8effa","components/game/PieceGlyph.jsx":"6ac2cc0942f3","components/menu/MenuItem.jsx":"d02f3c161e2d","ui_kits/aplicacoes/Merch.jsx":"57a784a95c90","ui_kits/aplicacoes/Print.jsx":"819430ba7a5f","ui_kits/aplicacoes/Social.jsx":"8fdcef6a6230"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.XadrezAlcoLicoDesignSystem_ee9af0 = window.XadrezAlcoLicoDesignSystem_ee9af0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Checker.jsx
try { (() => {
const checkerPairs = {
  classic: ['var(--xa-preto)', 'var(--xa-creme)'],
  duel: ['var(--xa-rosa)', 'var(--xa-amarelo)'],
  rosa: ['var(--xa-preto)', 'var(--xa-rosa)'],
  amarelo: ['var(--xa-preto)', 'var(--xa-amarelo)'],
  soft: ['var(--xa-creme-300)', 'var(--xa-creme)']
};
function Checker({
  palette = 'classic',
  cell = 24,
  width = '100%',
  height = '100%',
  a,
  b,
  children,
  style
}) {
  const p = checkerPairs[palette] || checkerPairs.classic;
  const c1 = a || p[0],
    c2 = b || p[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      position: 'relative',
      background: 'repeating-conic-gradient(' + c1 + ' 0 25%, ' + c2 + ' 0 50%) 0 0 / ' + cell * 2 + 'px ' + cell * 2 + 'px',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Checker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Checker.jsx", error: String((e && e.message) || e) }); }

// components/brand/LogoSymbol.jsx
try { (() => {
function xaPawn(ink, paper, liquid, hollow, uid) {
  var lw = 7;
  var solid = hollow ? 'fill="' + paper + '" stroke="' + ink + '" stroke-width="5"' : 'fill="' + ink + '"';
  var body = 'M42 60 H78 L88 124 H32 Z';
  var ly = 102,
    k = 10 / 64,
    lx1 = 42 - (ly - 60) * k,
    lx2 = 78 + (ly - 60) * k;
  return '<circle cx="60" cy="22" r="' + (hollow ? 15.5 : 17) + '" ' + solid + '/>' + '<rect x="' + (hollow ? 35 : 33) + '" y="' + (hollow ? 44 : 43) + '" width="' + (hollow ? 50 : 54) + '" height="' + (hollow ? 8 : 10) + '" rx="4" ' + solid + '/>' + '<path d="' + body + '" fill="' + paper + '"/>' + '<path d="M' + lx1.toFixed(1) + ' ' + ly + ' H' + lx2.toFixed(1) + ' L88 124 H32 Z" fill="' + liquid + '"/>' + '<path d="' + body + '" fill="none" stroke="' + ink + '" stroke-width="' + lw + '" stroke-linejoin="round"/>' + '<rect x="39" y="57" width="42" height="' + (hollow ? 8 : 11) + '" ' + (hollow ? 'fill="' + ink + '"' : 'fill="' + ink + '"') + '/>' + '<rect x="' + (hollow ? 27.5 : 26) + '" y="' + (hollow ? 125.5 : 124) + '" width="' + (hollow ? 65 : 68) + '" height="' + (hollow ? 7 : 9) + '" ' + solid + '/>' + '<rect x="' + (hollow ? 19.5 : 18) + '" y="' + (hollow ? 134.5 : 133) + '" width="' + (hollow ? 81 : 84) + '" height="' + (hollow ? 8 : 10) + '" rx="1.5" ' + solid + '/>';
}
function xaBrinde(c, base) {
  // duelo: cada peão gira 15° sobre o canto interno da base — as bases levantam por fora, cabeças quase se tocando
  var cx = 116,
    py = 150,
    gap = 15,
    out = '';
  if (base === 'linha') out += '<line x1="8" y1="' + (py + 3) + '" x2="224" y2="' + (py + 3) + '" stroke="' + c.ink + '" stroke-width="6" stroke-linecap="round"/>';
  if (base === 'tabuleiro') {
    for (var i = 0; i < 8; i++) out += '<rect x="' + (12 + i * 26) + '" y="' + py + '" width="26" height="10" fill="' + (i % 2 ? c.paper : c.ink) + '"/>';
    out += '<rect x="12" y="' + py + '" width="208" height="10" fill="none" stroke="' + c.ink + '" stroke-width="3"/>';
  }
  out += '<g transform="translate(' + (cx - gap - 102) + ' ' + (py - 143) + ') rotate(15 102 143)">' + xaPawn(c.ink, c.paper, c.a, false) + '</g>';
  out += '<g transform="translate(' + (cx + gap - 18) + ' ' + (py - 143) + ') rotate(-15 18 143)">' + xaPawn(c.ink, c.paper, c.b, true) + '</g>';
  return {
    vb: base === 'tabuleiro' ? '0 0 232 162' : '0 0 232 158',
    svg: out
  };
}
function xaLogoSVG(variant, c, base) {
  // c: {ink, paper, a, b}
  if (variant === 'brinde') return xaBrinde(c, base);
  if (variant === 'tabuleiro') {
    return {
      vb: '0 0 128 128',
      svg: '<rect x="4" y="4" width="60" height="60" fill="' + c.ink + '"/><rect x="64" y="4" width="60" height="60" fill="' + c.paper + '"/>' + '<rect x="4" y="64" width="60" height="60" fill="' + c.paper + '"/><rect x="64" y="64" width="60" height="60" fill="' + c.ink + '"/>' + '<circle cx="34" cy="34" r="19" fill="' + c.a + '" stroke="' + c.paper + '" stroke-width="4"/>' + '<circle cx="94" cy="94" r="19" fill="' + c.b + '" stroke="' + c.paper + '" stroke-width="4"/>' + '<circle cx="94" cy="34" r="18" fill="none" stroke="' + c.ink + '" stroke-width="5"/>' + '<circle cx="34" cy="94" r="18" fill="none" stroke="' + c.ink + '" stroke-width="5"/>' + '<rect x="4" y="4" width="120" height="120" fill="none" stroke="' + c.ink + '" stroke-width="5"/>'
    };
  }
  return {
    vb: '0 0 120 146',
    svg: xaPawn(c.ink, c.paper, c.a, false)
  };
}
const lsTones = {
  color: {
    ink: 'var(--xa-preto)',
    paper: 'var(--xa-creme)',
    a: 'var(--xa-rosa)',
    b: 'var(--xa-amarelo)'
  },
  negativo: {
    ink: 'var(--xa-creme)',
    paper: 'var(--xa-preto)',
    a: 'var(--xa-rosa)',
    b: 'var(--xa-amarelo)'
  },
  amarelo: {
    ink: 'var(--xa-preto)',
    paper: 'var(--xa-creme)',
    a: 'var(--xa-amarelo)',
    b: 'var(--xa-rosa)'
  }
};
function LogoSymbol({
  variant = 'peao',
  tone = 'color',
  base = 'linha',
  size = 96,
  style
}) {
  const r = xaLogoSVG(variant, lsTones[tone] || lsTones.color, base);
  const vb = r.vb.split(' ').map(Number);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: r.vb,
    height: size,
    width: size * vb[2] / vb[3],
    role: "img",
    "aria-label": "Xadrez Alco\xF3lico",
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: r.svg
    }
  });
}
Object.assign(__ds_scope, { LogoSymbol });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoSymbol.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
const wmTones = {
  preto: ['var(--xa-preto)', 'var(--xa-preto)'],
  creme: ['var(--xa-creme)', 'var(--xa-creme)'],
  duo: ['var(--xa-rosa)', 'var(--xa-amarelo)'],
  rosa: ['var(--xa-rosa)', 'var(--xa-rosa)'],
  amarelo: ['var(--xa-amarelo)', 'var(--xa-amarelo)']
};
function Wordmark({
  layout = 'stacked',
  tone = 'preto',
  size = 64,
  symbol = false,
  symbolVariant = 'peao',
  style
}) {
  const c = wmTones[tone] || wmTones.preto;
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 400,
    letterSpacing: '-0.01em',
    lineHeight: 0.95,
    display: 'block',
    whiteSpace: 'nowrap'
  };
  const sym = symbol ? /*#__PURE__*/React.createElement(__ds_scope.LogoSymbol, {
    variant: symbolVariant,
    size: layout === 'inline' ? size * 1.5 : size * 2.4,
    tone: tone === 'creme' || tone === 'duo' ? 'negativo' : 'color'
  }) : null;
  if (layout === 'inline') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.35,
        ...style
      }
    }, sym, /*#__PURE__*/React.createElement("span", {
      style: {
        ...base,
        display: 'inline-flex',
        gap: '0.25em',
        fontSize: size
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: c[0]
      }
    }, "Xadrez"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: c[1]
      }
    }, "Alco\xF3lico")));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.3,
      ...style
    }
  }, sym, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      fontSize: size * 1.2,
      color: c[0]
    }
  }, "Xadrez"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      fontSize: size,
      color: c[1],
      marginTop: size * 0.02
    }
  }, "Alco\xF3lico")));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/brand/CoBrand.jsx
try { (() => {
function CoBrand({
  partner = 'Bar Parceiro',
  partnerLogo,
  layout = 'inline',
  tone = 'preto',
  size = 28,
  symbol = true,
  style
}) {
  const ink = tone === 'creme' || tone === 'duo' ? 'var(--xa-creme)' : 'var(--xa-preto)';
  const times = /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: size * 1.3,
      lineHeight: 0.8,
      color: tone === 'preto' ? 'var(--xa-preto)' : 'var(--xa-encontro)'
    }
  }, "\xD7");
  const partnerEl = partnerLogo ? /*#__PURE__*/React.createElement("img", {
    src: partnerLogo,
    alt: partner,
    style: {
      height: size * 1.7,
      width: 'auto',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: size * 0.8,
      color: ink,
      lineHeight: 1,
      textTransform: 'uppercase',
      letterSpacing: '0.02em'
    }
  }, partner);
  const stacked = layout === 'stacked';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: stacked ? 'column' : 'row',
      alignItems: stacked ? 'flex-start' : 'center',
      gap: stacked ? size * 0.25 : size * 0.45,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    layout: stacked ? 'stacked' : 'inline',
    tone: tone,
    size: size,
    symbol: symbol
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.45
    }
  }, times, partnerEl));
}
Object.assign(__ds_scope, { CoBrand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/CoBrand.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const btnVariants = {
  primary: {
    bg: 'var(--xa-preto)',
    fg: 'var(--xa-creme)',
    shadow: 'var(--xa-rosa)'
  },
  rosa: {
    bg: 'var(--xa-rosa)',
    fg: 'var(--xa-preto)',
    shadow: 'var(--xa-preto)'
  },
  amarelo: {
    bg: 'var(--xa-amarelo)',
    fg: 'var(--xa-preto)',
    shadow: 'var(--xa-preto)'
  },
  outline: {
    bg: 'transparent',
    fg: 'var(--xa-preto)',
    shadow: 'var(--xa-preto)'
  }
};
const btnSizes = {
  sm: {
    pad: '7px 16px 8px',
    fs: 16,
    sh: 2
  },
  md: {
    pad: '11px 22px 12px',
    fs: 20,
    sh: 4
  },
  lg: {
    pad: '16px 32px 17px',
    fs: 27,
    sh: 6
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  children,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = btnVariants[variant] || btnVariants.primary;
  const s = btnSizes[size] || btnSizes.md;
  const off = disabled ? 0 : press ? 0 : hover ? s.sh + 2 : s.sh;
  const shift = disabled ? 0 : press ? s.sh : hover ? -2 : 0;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: s.pad,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: s.fs,
      letterSpacing: '0.01em',
      lineHeight: 1,
      background: v.bg,
      color: v.fg,
      border: 'var(--border-base) solid var(--xa-preto)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.shadow : 'none',
      transform: 'translate(' + shift + 'px,' + shift + 'px)',
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const tagTones = {
  preto: ['var(--xa-preto)', 'var(--xa-creme)'],
  rosa: ['var(--xa-rosa)', 'var(--xa-preto)'],
  amarelo: ['var(--xa-amarelo)', 'var(--xa-preto)'],
  creme: ['var(--xa-creme)', 'var(--xa-preto)']
};
function Tag({
  tone = 'preto',
  mono = false,
  upper = true,
  rotate = 0,
  children,
  style
}) {
  const t = tagTones[tone] || tagTones.preto;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: mono ? '4px 10px' : '5px 12px',
      background: t[0],
      color: t[1],
      border: 'var(--border-thin) solid var(--xa-preto)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-display)',
      fontWeight: mono ? 700 : 400,
      fontSize: mono ? 13 : 15,
      letterSpacing: mono ? '0.04em' : 0,
      textTransform: mono && upper ? 'uppercase' : 'none',
      lineHeight: 1,
      transform: rotate ? 'rotate(' + rotate + 'deg)' : undefined,
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/game/PieceGlyph.jsx
try { (() => {
const PIECE_GLYPHS = {
  rei: '\u265A',
  dama: '\u265B',
  torre: '\u265C',
  bispo: '\u265D',
  cavalo: '\u265E',
  peao: '\u265F'
};
const pgColors = {
  rosa: 'var(--xa-rosa)',
  amarelo: 'var(--xa-amarelo)',
  preto: 'var(--xa-preto)',
  creme: 'var(--xa-creme)'
};
function PieceGlyph({
  piece = 'rei',
  side = 'preto',
  size = 48,
  outline = false,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": piece,
    style: {
      fontFamily: 'var(--font-pieces)',
      fontSize: size,
      lineHeight: 1,
      color: pgColors[side] || side,
      WebkitTextStroke: outline ? Math.max(1, size / 28) + 'px var(--xa-preto)' : undefined,
      paintOrder: 'stroke fill',
      display: 'inline-block',
      ...style
    }
  }, (PIECE_GLYPHS[piece] || PIECE_GLYPHS.rei) + '\uFE0E');
}
Object.assign(__ds_scope, { PIECE_GLYPHS, PieceGlyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/PieceGlyph.jsx", error: String((e && e.message) || e) }); }

// components/game/Ficha.jsx
try { (() => {
function Ficha({
  piece = 'peao',
  side = 'rosa',
  label,
  size = 120,
  style
}) {
  const bg = side === 'amarelo' ? 'var(--xa-amarelo)' : side === 'preto' ? 'var(--xa-preto)' : 'var(--xa-rosa)';
  const ink = side === 'preto' ? 'var(--xa-creme)' : 'var(--xa-preto)';
  const ring = Math.max(2, size * 0.03);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      border: ring + 'px solid var(--xa-preto)',
      boxShadow: size * 0.04 + 'px ' + size * 0.04 + 'px 0 var(--xa-preto)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: size * 0.07,
      borderRadius: '50%',
      border: Math.max(1, size * 0.018) + 'px dashed ' + ink,
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.PieceGlyph, {
    piece: piece,
    side: side === 'preto' ? 'creme' : 'preto',
    size: size * 0.46,
    style: {
      marginTop: label ? -size * 0.04 : 0
    }
  }), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: size * 0.11,
      color: ink,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 1
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Ficha });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/Ficha.jsx", error: String((e && e.message) || e) }); }

// components/menu/MenuItem.jsx
try { (() => {
const PIECE_NAMES = {
  rei: 'Rei',
  dama: 'Dama',
  torre: 'Torre',
  bispo: 'Bispo',
  cavalo: 'Cavalo',
  peao: 'Peão'
};
function MenuItem({
  piece = 'peao',
  drink,
  note,
  count,
  side = 'preto',
  dark = false,
  style
}) {
  const ink = dark ? 'var(--xa-creme)' : 'var(--xa-preto)';
  const empty = !drink;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '56px 1fr auto',
      alignItems: 'center',
      gap: 16,
      padding: '12px 0',
      borderBottom: '2px solid ' + ink,
      color: ink,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PieceGlyph, {
    piece: piece,
    side: side,
    size: 48,
    outline: side === 'rosa' || side === 'amarelo',
    style: {
      justifySelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      opacity: 0.75
    }
  }, PIECE_NAMES[piece] || piece), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 28,
      lineHeight: 1,
      padding: empty ? '6px 10px' : 0,
      border: empty ? '2px dashed ' + ink : 'none',
      borderRadius: 6,
      opacity: empty ? 0.5 : 1,
      alignSelf: 'flex-start'
    }
  }, empty ? 'nome da bebida' : drink), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      opacity: 0.8
    }
  }, note) : null), count ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 18
    }
  }, '×' + count) : null);
}
Object.assign(__ds_scope, { MenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/MenuItem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aplicacoes/Merch.jsx
try { (() => {
// Jogo e merch: fichas, adesivos, pano de mesa.
const mD = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  lineHeight: 0.92,
  letterSpacing: '-0.01em',
  margin: 0
};
const PIECES = ['rei', 'dama', 'torre', 'bispo', 'cavalo', 'peao'];
function Fichas() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1000,
      padding: 40,
      background: 'var(--xa-creme)',
      display: 'flex',
      flexDirection: 'column',
      gap: 36
    }
  }, ['rosa', 'amarelo'].map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      display: 'flex',
      gap: 24
    }
  }, PIECES.map(p => /*#__PURE__*/React.createElement(XA.Ficha, {
    key: p,
    piece: p,
    side: s,
    size: 130
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(XA.Ficha, {
    piece: "rei",
    side: "preto",
    label: "Rodada 1",
    size: 130
  }), /*#__PURE__*/React.createElement(XA.Ficha, {
    piece: "dama",
    side: "rosa",
    label: "1 shot",
    size: 130
  }), /*#__PURE__*/React.createElement(XA.Ficha, {
    piece: "dama",
    side: "amarelo",
    label: "1 shot",
    size: 130
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      maxWidth: 300,
      color: 'var(--text-2)'
    }
  }, "\xD8 30 mm impresso. Anel tracejado = linha de seguran\xE7a, nada fora dela.")));
}
const dieCut = {
  filter: 'drop-shadow(0 0 0 var(--xa-creme))',
  outline: '10px solid var(--xa-creme)',
  boxShadow: '0 0 0 13px var(--xa-preto), 10px 10px 0 13px var(--xa-preto)'
};
function Stickers() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1000,
      height: 640,
      background: 'var(--xa-creme-300)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 60,
      top: 50,
      width: 240,
      height: 240,
      borderRadius: 24,
      background: 'var(--xa-creme)',
      ...dieCut,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'rotate(-5deg)'
    }
  }, /*#__PURE__*/React.createElement(XA.LogoSymbol, {
    variant: "peao",
    size: 200
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 380,
      top: 90,
      transform: 'rotate(-6deg)',
      background: 'var(--xa-amarelo)',
      border: '4px solid var(--xa-preto)',
      borderRadius: 999,
      padding: '22px 40px',
      ...dieCut
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mD,
      fontFamily: 'var(--font-accent)',
      fontSize: 64
    }
  }, "capturou? bebeu.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 420,
      top: 300,
      background: 'var(--xa-preto)',
      padding: '30px 36px',
      transform: 'rotate(3deg)',
      ...dieCut
    }
  }, /*#__PURE__*/React.createElement(XA.Wordmark, {
    tone: "duo",
    size: 50,
    symbol: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 90,
      top: 380,
      width: 210,
      height: 210,
      transform: 'rotate(-4deg)',
      ...dieCut,
      border: '4px solid var(--xa-preto)'
    }
  }, /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "rosa",
    cell: 26.25
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 40,
      background: 'var(--xa-creme)',
      border: '4px solid var(--xa-preto)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mD,
      fontSize: 26
    }
  }, "Xeque-mate com sede")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 60,
      top: 500,
      transform: 'rotate(8deg)',
      ...dieCut,
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement(XA.Tag, {
    tone: "rosa",
    mono: true,
    upper: false,
    style: {
      fontSize: 40,
      padding: '14px 26px',
      borderWidth: 4
    }
  }, "Dxf7#")));
}
function Drop({
  bg,
  children,
  rotate = 0,
  w,
  h
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      height: h,
      background: bg,
      position: 'relative',
      overflow: 'hidden',
      border: '4px solid var(--xa-preto)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'rotate(' + rotate + 'deg)'
    }
  }, children));
}
function TableCloth() {
  const T = 560,
    D = 300;
  const hem = dir => /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "classic",
    cell: 20,
    width: dir === 'h' ? '100%' : 40,
    height: dir === 'h' ? 40 : '100%'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: T + D * 2,
      height: T + D * 2,
      display: 'grid',
      gridTemplateColumns: D + 'px ' + T + 'px ' + D + 'px',
      gridTemplateRows: D + 'px ' + T + 'px ' + D + 'px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement(Drop, {
    bg: "var(--xa-amarelo)",
    w: T,
    h: D,
    rotate: 180
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mD,
      fontSize: 72
    }
  }, "Capturou? Bebeu."))), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement(Drop, {
    bg: "var(--xa-preto)",
    w: D,
    h: T,
    rotate: 90
  }, /*#__PURE__*/React.createElement(XA.Wordmark, {
    tone: "duo",
    size: 56
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '4px solid var(--xa-preto)',
      boxSizing: 'border-box',
      background: 'var(--xa-creme)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "soft",
    cell: 35
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      background: 'var(--xa-creme)',
      border: '2px solid var(--xa-preto)',
      padding: '6px 10px'
    }
  }, "tampo \xB7 tabuleiro vai aqui")), /*#__PURE__*/React.createElement(Drop, {
    bg: "var(--xa-preto)",
    w: D,
    h: T,
    rotate: -90
  }, /*#__PURE__*/React.createElement(XA.Wordmark, {
    tone: "duo",
    size: 56
  })), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement(Drop, {
    bg: "var(--xa-rosa)",
    w: T,
    h: D
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(XA.LogoSymbol, {
    variant: "brinde",
    size: 200
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 18,
      textTransform: 'uppercase'
    }
  }, "Frente \xB7 lado do p\xFAblico"))), /*#__PURE__*/React.createElement("div", null));
}
Object.assign(window, {
  Fichas,
  Stickers,
  TableCloth
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aplicacoes/Merch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aplicacoes/Print.jsx
try { (() => {
// Impressos: panfleto A4, placa de mesa (table tent), cardápio das peças.
const prD = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  lineHeight: 0.92,
  letterSpacing: '-0.01em',
  margin: 0
};
const prLegal = {
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  lineHeight: 1.3
};
function MiniBoard({
  cell = 40
}) {
  const pos = [['torre', 'rosa', 0, 0], ['cavalo', 'rosa', 1, 0], ['dama', 'rosa', 3, 1], ['peao', 'rosa', 4, 3], ['peao', 'amarelo', 3, 4], ['bispo', 'amarelo', 5, 5], ['rei', 'amarelo', 4, 7], ['cavalo', 'amarelo', 6, 7]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: cell * 8,
      height: cell * 8,
      border: '4px solid var(--xa-preto)',
      boxSizing: 'content-box'
    }
  }, /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "soft",
    cell: cell,
    a: "var(--xa-preto-700)",
    b: "var(--xa-creme)"
  }), pos.map(([p, s, x, y], i) => /*#__PURE__*/React.createElement(XA.PieceGlyph, {
    key: i,
    piece: p,
    side: s,
    outline: true,
    size: cell * 0.9,
    style: {
      position: 'absolute',
      left: x * cell + cell * 0.05,
      top: y * cell
    }
  })));
}
function Flyer({
  partner,
  date,
  time
}) {
  const steps = [['01', 'Cada peça é um copinho de 10 ml.'], ['02', 'Capturou a peça do adversário? Bebe o shot.'], ['03', 'A partida dura uns 20 minutos. Dá tempo de revanche.']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 794,
      height: 1123,
      background: 'var(--xa-creme)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--xa-preto)',
      padding: '48px 56px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(XA.Wordmark, {
    tone: "duo",
    size: 44,
    symbol: true
  }), /*#__PURE__*/React.createElement(XA.Tag, {
    tone: "creme",
    style: {
      fontSize: 18,
      padding: '8px 14px'
    }
  }, "+18")), /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "duel",
    cell: 22,
    height: 44,
    style: {
      borderBottom: '4px solid var(--xa-preto)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '44px 56px',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 40,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...prD,
      fontSize: 64
    }
  }, "Capturou? Bebeu."), steps.map(([n, t]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'grid',
      gridTemplateColumns: '56px 1fr',
      gap: 12,
      alignItems: 'baseline',
      borderTop: '3px solid var(--xa-preto)',
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 24
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 22,
      lineHeight: 1.25
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'start',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(MiniBoard, {
    cell: 34
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 56px 36px',
      background: 'var(--xa-rosa)',
      border: '4px solid var(--xa-preto)',
      boxShadow: 'var(--shadow-hard-lg)',
      padding: '22px 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, "Pr\xF3xima partida"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...prD,
      fontSize: 48
    }
  }, date + ' · ' + time)), /*#__PURE__*/React.createElement(XA.Ficha, {
    piece: "dama",
    side: "amarelo",
    size: 96
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '4px solid var(--xa-preto)',
      padding: '18px 56px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(XA.CoBrand, {
    partner: partner,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...prLegal,
      maxWidth: 200,
      textAlign: 'right'
    }
  }, "Proibido para menores de 18 anos. Beba com modera\xE7\xE3o.")));
}
function TentFace({
  bg,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      height: 600,
      background: bg,
      border: '4px solid var(--xa-preto)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "classic",
    cell: 20,
    height: 40,
    style: {
      borderBottom: '4px solid var(--xa-preto)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '32px 32px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, children));
}
function TableTent({
  partner
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(TentFace, {
    bg: "var(--xa-rosa)"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...prD,
      fontSize: 60
    }
  }, "Capturou?", /*#__PURE__*/React.createElement("br", null), "Bebeu."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 19,
      lineHeight: 1.35,
      margin: 0
    }
  }, "Xadrez em que cada pe\xE7a \xE9 um shot de 10 ml. Chama algu\xE9m da mesa e desafia."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(XA.Wordmark, {
    size: 28,
    symbol: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 110,
      height: 110,
      border: '3px dashed var(--xa-preto)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      textAlign: 'center',
      background: 'var(--xa-creme)'
    }
  }, "QR code"))), /*#__PURE__*/React.createElement(TentFace, {
    bg: "var(--xa-amarelo)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, "Pe\xE7a no balc\xE3o"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...prD,
      fontSize: 56
    }
  }, "Uma partida pra mesa"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '3px dashed var(--xa-preto)',
      padding: '14px 18px',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 30
    }
  }, "R$ ___"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(XA.CoBrand, {
    partner: partner,
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: prLegal
  }, "Proibido para menores de 18 anos. Beba com modera\xE7\xE3o."))));
}
const MENU_ORDER = [['rei', 1], ['dama', 1], ['torre', 2], ['bispo', 2], ['cavalo', 2], ['peao', 8]];
function Menu({
  drinks,
  partner
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 559,
      height: 794,
      background: 'var(--xa-preto)',
      color: 'var(--xa-creme)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "duel",
    cell: 16,
    height: 32
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px 40px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(XA.Wordmark, {
    tone: "duo",
    size: 30,
    symbol: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      textAlign: 'right',
      color: 'var(--xa-preto-300)',
      textTransform: 'uppercase'
    }
  }, "Card\xE1pio", /*#__PURE__*/React.createElement("br", null), "das pe\xE7as")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 40px',
      flex: 1
    }
  }, MENU_ORDER.map(([p, n]) => /*#__PURE__*/React.createElement(XA.MenuItem, {
    key: p,
    piece: p,
    drink: drinks[p],
    count: n,
    side: n > 1 && p !== 'peao' ? 'amarelo' : 'rosa',
    dark: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 40px 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--xa-preto-300)',
      maxWidth: 260
    }
  }, "16 pe\xE7as por lado, 32 copinhos de 10 ml. Proibido para menores de 18 anos."), /*#__PURE__*/React.createElement(XA.CoBrand, {
    partner: partner,
    tone: "duo",
    size: 14
  })));
}
Object.assign(window, {
  Flyer,
  TableTent,
  Menu,
  MiniBoard,
  MENU_ORDER
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aplicacoes/Print.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aplicacoes/Social.jsx
try { (() => {
// Social: foto de perfil, post de evento, story, post collab. Usa window.XA (bundle do DS).
const socD = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  lineHeight: 0.92,
  letterSpacing: '-0.01em',
  margin: 0
};
const bigTag = {
  fontSize: 30,
  padding: '12px 24px',
  borderWidth: 3
};
function ProfilePic() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1080,
      background: 'var(--xa-creme)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(XA.LogoSymbol, {
    variant: "peao",
    size: 680
  }));
}
function EventPost({
  partner,
  date,
  time
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1350,
      background: 'var(--xa-creme)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "classic",
    cell: 36,
    height: 72
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '64px 72px',
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(XA.Tag, {
    tone: "rosa",
    style: bigTag
  }, date), /*#__PURE__*/React.createElement(XA.Tag, {
    tone: "amarelo",
    style: bigTag
  }, time), /*#__PURE__*/React.createElement(XA.Tag, {
    tone: "preto",
    style: bigTag
  }, "+18")), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...socD,
      fontSize: 132,
      lineHeight: 1
    }
  }, "Sexta tem xeque\u2011mate"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 38,
      lineHeight: 1.25,
      margin: 0,
      maxWidth: 820,
      textWrap: 'pretty'
    }
  }, "Xadrez em que cada pe\xE7a \xE9 um shot de 10 ml. Capturou, bebeu. Uns 20 minutos de partida."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 36,
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(XA.Ficha, {
    piece: "rei",
    side: "rosa",
    size: 230
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 90,
      lineHeight: 1,
      color: 'var(--xa-encontro)'
    }
  }, "\xD7"), /*#__PURE__*/React.createElement(XA.Ficha, {
    piece: "rei",
    side: "amarelo",
    size: 230
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--xa-preto)',
      padding: '36px 72px'
    }
  }, /*#__PURE__*/React.createElement(XA.CoBrand, {
    partner: partner,
    tone: "duo",
    size: 44
  })));
}
function Story({
  partner,
  date,
  time
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1920,
      display: 'grid',
      gridTemplateRows: '1fr 140px 1fr',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--xa-rosa)',
      padding: '120px 80px 60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(XA.CoBrand, {
    partner: partner,
    tone: "preto",
    size: 40
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...socD,
      fontSize: 168
    }
  }, "Capturou?")), /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "classic",
    cell: 70,
    style: {
      borderTop: '6px solid var(--xa-preto)',
      borderBottom: '6px solid var(--xa-preto)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--xa-amarelo)',
      padding: '60px 80px 160px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...socD,
      fontSize: 210
    }
  }, "Bebeu."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(XA.Tag, {
    tone: "preto",
    style: {
      fontSize: 40,
      padding: '16px 30px'
    }
  }, date + ' · ' + time), /*#__PURE__*/React.createElement(XA.Tag, {
    tone: "creme",
    rotate: -3,
    style: {
      fontSize: 40,
      padding: '16px 30px',
      borderWidth: 3
    }
  }, 'No ' + partner))), /*#__PURE__*/React.createElement(XA.Ficha, {
    piece: "cavalo",
    side: "preto",
    size: 260,
    style: {
      position: 'absolute',
      right: 80,
      top: 'calc(50% - 130px)'
    }
  }));
}
function CollabPost({
  partner
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1350,
      background: 'var(--xa-preto)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '110px 80px 60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 30
    }
  }, /*#__PURE__*/React.createElement(XA.LogoSymbol, {
    variant: "brinde",
    tone: "negativo",
    size: 300
  }), /*#__PURE__*/React.createElement(XA.Wordmark, {
    tone: "duo",
    size: 84,
    layout: "inline"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 200,
      color: 'var(--xa-encontro)',
      lineHeight: 0.7
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 96,
      color: 'var(--xa-creme)',
      lineHeight: 1,
      textTransform: 'uppercase'
    }
  }, partner)), /*#__PURE__*/React.createElement(XA.Checker, {
    palette: "duel",
    cell: 60,
    height: 120,
    style: {
      borderTop: '6px solid var(--xa-preto)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--xa-creme)',
      padding: '36px 80px',
      fontFamily: 'var(--font-display)',
      fontSize: 44,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Agora tem tabuleiro aqui."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 30
    }
  }, "+18")));
}
Object.assign(window, {
  ProfilePic,
  EventPost,
  Story,
  CollabPost
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aplicacoes/Social.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Checker = __ds_scope.Checker;

__ds_ns.CoBrand = __ds_scope.CoBrand;

__ds_ns.LogoSymbol = __ds_scope.LogoSymbol;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Ficha = __ds_scope.Ficha;

__ds_ns.PIECE_GLYPHS = __ds_scope.PIECE_GLYPHS;

__ds_ns.PieceGlyph = __ds_scope.PieceGlyph;

__ds_ns.MenuItem = __ds_scope.MenuItem;

})();
