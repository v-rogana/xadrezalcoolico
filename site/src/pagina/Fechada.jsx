import { INSTAGRAM } from '../lib/constantes.js';

const Insta = () => <a className="link" href={INSTAGRAM} target="_blank" rel="noopener">@xadrezalcoolico</a>;

// Mesa fechada. A página "sobre" completa (matéria, como nasceu, regras) entra na peça 2.
export default function Fechada({ dados }) {
  const { noite, proxima, placar, hist } = dados;
  return (
    <>
      <div className="fechada">
        <h2 className="h2">Mesa fechada hoje.</h2>
        {proxima ? (
          <>
            <p className="lbl">Próxima noite</p>
            <p className="h3">{proxima}</p>
            <p className="nota">Detalhes no <Insta />.</p>
          </>
        ) : (
          <p>A próxima noite a gente avisa no <Insta />.</p>
        )}
        {noite && hist.length > 0 && (
          <p className="meta">
            Última noite{noite.bar ? ` · ${noite.bar}` : ''}: rosa {placar.rosa} × {placar.amarelo} amarelo · {hist.length} {hist.length === 1 ? 'partida' : 'partidas'}
          </p>
        )}
      </div>
      <div className="adesivo">
        <p className="psiu">segue a gente</p>
        <p className="ades-txt">Próximas noites, fotos e revanches.</p>
        <a className="link arroba" href={INSTAGRAM} target="_blank" rel="noopener">@xadrezalcoolico</a>
      </div>
    </>
  );
}
