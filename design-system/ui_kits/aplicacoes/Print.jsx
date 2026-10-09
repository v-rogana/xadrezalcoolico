// Impressos: panfleto A4, placa de mesa (table tent), cardápio das peças.
const prD = { fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.01em', margin: 0 };
const prLegal = { fontFamily: 'var(--font-body)', fontSize: 11, lineHeight: 1.3 };

function MiniBoard({ cell = 40 }) {
  const pos = [['torre', 'rosa', 0, 0], ['cavalo', 'rosa', 1, 0], ['dama', 'rosa', 3, 1], ['peao', 'rosa', 4, 3], ['peao', 'amarelo', 3, 4], ['bispo', 'amarelo', 5, 5], ['rei', 'amarelo', 4, 7], ['cavalo', 'amarelo', 6, 7]];
  return (
    <div style={{ position: 'relative', width: cell * 8, height: cell * 8, border: '4px solid var(--xa-preto)', boxSizing: 'content-box' }}>
      <XA.Checker palette="soft" cell={cell} a="var(--xa-preto-700)" b="var(--xa-creme)"></XA.Checker>
      {pos.map(([p, s, x, y], i) => (
        <XA.PieceGlyph key={i} piece={p} side={s} outline size={cell * 0.9} style={{ position: 'absolute', left: x * cell + cell * 0.05, top: y * cell }}></XA.PieceGlyph>
      ))}
    </div>
  );
}

function Flyer({ partner, date, time }) {
  const steps = [['01', 'Cada peça é um copinho de 10 ml.'], ['02', 'Capturou a peça do adversário? Bebe o shot.'], ['03', 'A partida dura uns 20 minutos. Dá tempo de revanche.']];
  return (
    <div style={{ width: 794, height: 1123, background: 'var(--xa-creme)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--xa-preto)', padding: '48px 56px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <XA.Wordmark tone="duo" size={44} symbol></XA.Wordmark>
        <XA.Tag tone="creme" style={{ fontSize: 18, padding: '8px 14px' }}>+18</XA.Tag>
      </div>
      <XA.Checker palette="duel" cell={22} height={44} style={{ borderBottom: '4px solid var(--xa-preto)' }}></XA.Checker>
      <div style={{ padding: '44px 56px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <h1 style={{ ...prD, fontSize: 64 }}>Capturou? Bebeu.</h1>
          {steps.map(([n, t]) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 12, alignItems: 'baseline', borderTop: '3px solid var(--xa-preto)', paddingTop: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 24 }}>{n}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 22, lineHeight: 1.25 }}>{t}</span>
            </div>
          ))}
        </div>
        <div style={{ alignSelf: 'start', paddingTop: 8 }}><MiniBoard cell={34}></MiniBoard></div>
      </div>
      <div style={{ margin: '0 56px 36px', background: 'var(--xa-rosa)', border: '4px solid var(--xa-preto)', boxShadow: 'var(--shadow-hard-lg)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase' }}>Próxima partida</div>
          <div style={{ ...prD, fontSize: 48 }}>{date + ' · ' + time}</div>
        </div>
        <XA.Ficha piece="dama" side="amarelo" size={96}></XA.Ficha>
      </div>
      <div style={{ borderTop: '4px solid var(--xa-preto)', padding: '18px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <XA.CoBrand partner={partner} size={20}></XA.CoBrand>
        <span style={{ ...prLegal, maxWidth: 200, textAlign: 'right' }}>Proibido para menores de 18 anos. Beba com moderação.</span>
      </div>
    </div>
  );
}

function TentFace({ bg, children }) {
  return (
    <div style={{ width: 420, height: 600, background: bg, border: '4px solid var(--xa-preto)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <XA.Checker palette="classic" cell={20} height={40} style={{ borderBottom: '4px solid var(--xa-preto)' }}></XA.Checker>
      <div style={{ flex: 1, padding: '32px 32px 26px', display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
    </div>
  );
}

function TableTent({ partner }) {
  return (
    <div style={{ display: 'flex', gap: 40, padding: 0 }}>
      <TentFace bg="var(--xa-rosa)">
        <h1 style={{ ...prD, fontSize: 60 }}>Capturou?<br />Bebeu.</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 19, lineHeight: 1.35, margin: 0 }}>Xadrez em que cada peça é um shot de 10 ml. Chama alguém da mesa e desafia.</p>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <XA.Wordmark size={28} symbol></XA.Wordmark>
          <div style={{ width: 110, height: 110, border: '3px dashed var(--xa-preto)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'center', background: 'var(--xa-creme)' }}>QR code</div>
        </div>
      </TentFace>
      <TentFace bg="var(--xa-amarelo)">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase' }}>Peça no balcão</div>
        <h1 style={{ ...prD, fontSize: 56 }}>Uma partida pra mesa</h1>
        <div style={{ border: '3px dashed var(--xa-preto)', padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 30 }}>R$ ___</div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <XA.CoBrand partner={partner} size={18}></XA.CoBrand>
          <span style={prLegal}>Proibido para menores de 18 anos. Beba com moderação.</span>
        </div>
      </TentFace>
    </div>
  );
}

const MENU_ORDER = [['rei', 1], ['dama', 1], ['torre', 2], ['bispo', 2], ['cavalo', 2], ['peao', 8]];
function Menu({ drinks, partner }) {
  return (
    <div style={{ width: 559, height: 794, background: 'var(--xa-preto)', color: 'var(--xa-creme)', display: 'flex', flexDirection: 'column' }}>
      <XA.Checker palette="duel" cell={16} height={32}></XA.Checker>
      <div style={{ padding: '32px 40px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <XA.Wordmark tone="duo" size={30} symbol></XA.Wordmark>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right', color: 'var(--xa-preto-300)', textTransform: 'uppercase' }}>Cardápio<br />das peças</span>
      </div>
      <div style={{ padding: '18px 40px', flex: 1 }}>
        {MENU_ORDER.map(([p, n]) => (
          <XA.MenuItem key={p} piece={p} drink={drinks[p]} count={n} side={n > 1 && p !== 'peao' ? 'amarelo' : 'rosa'} dark></XA.MenuItem>
        ))}
      </div>
      <div style={{ padding: '0 40px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--xa-preto-300)', maxWidth: 260 }}>16 peças por lado, 32 copinhos de 10 ml. Proibido para menores de 18 anos.</span>
        <XA.CoBrand partner={partner} tone="duo" size={14}></XA.CoBrand>
      </div>
    </div>
  );
}

Object.assign(window, { Flyer, TableTent, Menu, MiniBoard, MENU_ORDER });
