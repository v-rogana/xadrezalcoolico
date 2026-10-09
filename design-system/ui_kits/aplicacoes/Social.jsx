// Social: foto de perfil, post de evento, story, post collab. Usa window.XA (bundle do DS).
const socD = { fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.01em', margin: 0 };
const bigTag = { fontSize: 30, padding: '12px 24px', borderWidth: 3 };

function ProfilePic() {
  return (
    <div style={{ width: 1080, height: 1080, background: 'var(--xa-creme)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <XA.LogoSymbol variant="peao" size={680}></XA.LogoSymbol>
    </div>
  );
}

function EventPost({ partner, date, time }) {
  return (
    <div style={{ width: 1080, height: 1350, background: 'var(--xa-creme)', display: 'flex', flexDirection: 'column' }}>
      <XA.Checker palette="classic" cell={36} height={72}></XA.Checker>
      <div style={{ flex: 1, padding: '64px 72px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <XA.Tag tone="rosa" style={bigTag}>{date}</XA.Tag>
          <XA.Tag tone="amarelo" style={bigTag}>{time}</XA.Tag>
          <XA.Tag tone="preto" style={bigTag}>+18</XA.Tag>
        </div>
        <h1 style={{ ...socD, fontSize: 132, lineHeight: 1 }}>Sexta tem xeque&#8209;mate</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 38, lineHeight: 1.25, margin: 0, maxWidth: 820, textWrap: 'pretty' }}>Xadrez em que cada peça é um shot de 10 ml. Capturou, bebeu. Uns 20 minutos de partida.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 'auto' }}>
          <XA.Ficha piece="rei" side="rosa" size={230}></XA.Ficha>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 90, lineHeight: 1, color: 'var(--xa-encontro)' }}>×</span>
          <XA.Ficha piece="rei" side="amarelo" size={230}></XA.Ficha>
        </div>
      </div>
      <div style={{ background: 'var(--xa-preto)', padding: '36px 72px' }}>
        <XA.CoBrand partner={partner} tone="duo" size={44}></XA.CoBrand>
      </div>
    </div>
  );
}

function Story({ partner, date, time }) {
  return (
    <div style={{ width: 1080, height: 1920, display: 'grid', gridTemplateRows: '1fr 140px 1fr', position: 'relative' }}>
      <div style={{ background: 'var(--xa-rosa)', padding: '120px 80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <XA.CoBrand partner={partner} tone="preto" size={40}></XA.CoBrand>
        <h1 style={{ ...socD, fontSize: 168 }}>Capturou?</h1>
      </div>
      <XA.Checker palette="classic" cell={70} style={{ borderTop: '6px solid var(--xa-preto)', borderBottom: '6px solid var(--xa-preto)' }}></XA.Checker>
      <div style={{ background: 'var(--xa-amarelo)', padding: '60px 80px 160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <h1 style={{ ...socD, fontSize: 210 }}>Bebeu.</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
          <XA.Tag tone="preto" style={{ fontSize: 40, padding: '16px 30px' }}>{date + ' · ' + time}</XA.Tag>
          <XA.Tag tone="creme" rotate={-3} style={{ fontSize: 40, padding: '16px 30px', borderWidth: 3 }}>{'No ' + partner}</XA.Tag>
        </div>
      </div>
      <XA.Ficha piece="cavalo" side="preto" size={260} style={{ position: 'absolute', right: 80, top: 'calc(50% - 130px)' }}></XA.Ficha>
    </div>
  );
}

function CollabPost({ partner }) {
  return (
    <div style={{ width: 1080, height: 1350, background: 'var(--xa-preto)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '110px 80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30 }}>
        <XA.LogoSymbol variant="brinde" tone="negativo" size={300}></XA.LogoSymbol>
        <XA.Wordmark tone="duo" size={84} layout="inline"></XA.Wordmark>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 200, color: 'var(--xa-encontro)', lineHeight: 0.7 }}>×</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 96, color: 'var(--xa-creme)', lineHeight: 1, textTransform: 'uppercase' }}>{partner}</span>
      </div>
      <XA.Checker palette="duel" cell={60} height={120} style={{ borderTop: '6px solid var(--xa-preto)' }}></XA.Checker>
      <div style={{ background: 'var(--xa-creme)', padding: '36px 80px', fontFamily: 'var(--font-display)', fontSize: 44, display: 'flex', justifyContent: 'space-between' }}>
        <span>Agora tem tabuleiro aqui.</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: 30 }}>+18</span>
      </div>
    </div>
  );
}

Object.assign(window, { ProfilePic, EventPost, Story, CollabPost });
