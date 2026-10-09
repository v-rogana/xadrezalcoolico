// Jogo e merch: fichas, adesivos, pano de mesa.
const mD = { fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.01em', margin: 0 };
const PIECES = ['rei', 'dama', 'torre', 'bispo', 'cavalo', 'peao'];

function Fichas() {
  return (
    <div style={{ width: 1000, padding: 40, background: 'var(--xa-creme)', display: 'flex', flexDirection: 'column', gap: 36 }}>
      {['rosa', 'amarelo'].map(s => (
        <div key={s} style={{ display: 'flex', gap: 24 }}>
      {PIECES.map(p => <XA.Ficha key={p} piece={p} side={s} size={130}></XA.Ficha>)}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <XA.Ficha piece="rei" side="preto" label="Rodada 1" size={130}></XA.Ficha>
        <XA.Ficha piece="dama" side="rosa" label="1 shot" size={130}></XA.Ficha>
        <XA.Ficha piece="dama" side="amarelo" label="1 shot" size={130}></XA.Ficha>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, maxWidth: 300, color: 'var(--text-2)' }}>Ø 30 mm impresso. Anel tracejado = linha de segurança, nada fora dela.</span>
      </div>
    </div>
  );
}

const dieCut = { filter: 'drop-shadow(0 0 0 var(--xa-creme))', outline: '10px solid var(--xa-creme)', boxShadow: '0 0 0 13px var(--xa-preto), 10px 10px 0 13px var(--xa-preto)' };
function Stickers() {
  return (
    <div style={{ width: 1000, height: 640, background: 'var(--xa-creme-300)', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 60, top: 50, width: 240, height: 240, borderRadius: 24, background: 'var(--xa-creme)', ...dieCut, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-5deg)' }}>
        <XA.LogoSymbol variant="peao" size={200}></XA.LogoSymbol>
      </div>
      <div style={{ position: 'absolute', left: 380, top: 90, transform: 'rotate(-6deg)', background: 'var(--xa-amarelo)', border: '4px solid var(--xa-preto)', borderRadius: 999, padding: '22px 40px', ...dieCut }}>
        <span style={{ ...mD, fontFamily: 'var(--font-accent)', fontSize: 64 }}>capturou? bebeu.</span>
      </div>
      <div style={{ position: 'absolute', left: 420, top: 300, background: 'var(--xa-preto)', padding: '30px 36px', transform: 'rotate(3deg)', ...dieCut }}>
        <XA.Wordmark tone="duo" size={50} symbol></XA.Wordmark>
      </div>
      <div style={{ position: 'absolute', left: 90, top: 380, width: 210, height: 210, transform: 'rotate(-4deg)', ...dieCut, border: '4px solid var(--xa-preto)' }}>
        <XA.Checker palette="rosa" cell={26.25}>
          <div style={{ position: 'absolute', inset: 40, background: 'var(--xa-creme)', border: '4px solid var(--xa-preto)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <span style={{ ...mD, fontSize: 26 }}>Xeque-mate com sede</span>
          </div>
        </XA.Checker>
      </div>
      <div style={{ position: 'absolute', right: 60, top: 500, transform: 'rotate(8deg)', ...dieCut, borderRadius: 999 }}>
        <XA.Tag tone="rosa" mono upper={false} style={{ fontSize: 40, padding: '14px 26px', borderWidth: 4 }}>Dxf7#</XA.Tag>
      </div>
    </div>
  );
}

function Drop({ bg, children, rotate = 0, w, h }) {
  return (
    <div style={{ width: w, height: h, background: bg, position: 'relative', overflow: 'hidden', border: '4px solid var(--xa-preto)', boxSizing: 'border-box' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(' + rotate + 'deg)' }}>{children}</div>
    </div>
  );
}

function TableCloth() {
  const T = 560, D = 300;
  const hem = (dir) => <XA.Checker palette="classic" cell={20} width={dir === 'h' ? '100%' : 40} height={dir === 'h' ? 40 : '100%'}></XA.Checker>;
  return (
    <div style={{ width: T + D * 2, height: T + D * 2, display: 'grid', gridTemplateColumns: D + 'px ' + T + 'px ' + D + 'px', gridTemplateRows: D + 'px ' + T + 'px ' + D + 'px', position: 'relative' }}>
      <div></div>
      <Drop bg="var(--xa-amarelo)" w={T} h={D} rotate={180}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}><span style={{ ...mD, fontSize: 72 }}>Capturou? Bebeu.</span></div></Drop>
      <div></div>
      <Drop bg="var(--xa-preto)" w={D} h={T} rotate={90}><XA.Wordmark tone="duo" size={56}></XA.Wordmark></Drop>
      <div style={{ border: '4px solid var(--xa-preto)', boxSizing: 'border-box', background: 'var(--xa-creme)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <XA.Checker palette="soft" cell={35}></XA.Checker>
        <span style={{ position: 'absolute', fontFamily: 'var(--font-mono)', fontSize: 14, background: 'var(--xa-creme)', border: '2px solid var(--xa-preto)', padding: '6px 10px' }}>tampo · tabuleiro vai aqui</span>
      </div>
      <Drop bg="var(--xa-preto)" w={D} h={T} rotate={-90}><XA.Wordmark tone="duo" size={56}></XA.Wordmark></Drop>
      <div></div>
      <Drop bg="var(--xa-rosa)" w={T} h={D}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <XA.LogoSymbol variant="brinde" size={200}></XA.LogoSymbol>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase' }}>Frente · lado do público</span>
        </div>
      </Drop>
      <div></div>
    </div>
  );
}

Object.assign(window, { Fichas, Stickers, TableCloth });
