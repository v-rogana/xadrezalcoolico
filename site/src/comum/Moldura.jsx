import estalo from '../imagens/estalo.png';
import { diaCurto } from '../lib/datas.js';
import { INSTAGRAM } from '../lib/constantes.js';
import { ROTAS } from '../lib/rotas.js';

// Cabeçalho, rodapé e as faixas quadriculadas das páginas públicas.
// Com a noite aberta, o cabeçalho assina "× bar · data" e mostra "Ao vivo".
export default function Moldura({ noite, aviso, children }) {
  const aberta = !!noite?.aberta;
  return (
    <>
      <div className="strip topo" />
      <main className="pg-in">
        <header className="hd">
          <a className="hd-marca" href={ROTAS.inicio} aria-label="Xadrez Alcoólico, página inicial">
            <img src={estalo} alt="" width="480" height="371" />
          </a>
          <div>
            <p className="wordmark">Xadrez Alcoólico</p>
            <p className="cobrand">
              {aberta ? `${noite.bar ? `× ${noite.bar} · ` : ''}${diaCurto(noite.aberta_em)}` : 'Capturou? Bebeu.'}
              {aberta && <span className="tag tag-preto tag-live">Ao vivo</span>}
            </p>
          </div>
        </header>
        {children}
        <footer className="rodape">
          <nav className="rodape-nav" aria-label="Mais do Xadrez Alcoólico">
            <a className="btn-link" href={ROTAS.comoJoga}>Como joga</a>
            <a className="btn-link" href={ROTAS.parcerias}>Parcerias</a>
            <a className="btn-link" href={INSTAGRAM} target="_blank" rel="noopener">@xadrezalcoolico</a>
          </nav>
          <p className="assin">Capturou? Bebeu.</p>
        </footer>
      </main>
      <div className="strip duelo" />
      {aviso && <div className="aviso" role="alert">{aviso}</div>}
    </>
  );
}
