import Ficha from '../comum/Ficha.jsx';

function Jogador({ lado, j }) {
  return (
    <div className="jog">
      <Ficha lado={lado} />
      <div className="jog-txt">
        <span className="jn">{j.nome}</span>
        <span className="ig-t">{j.ig ? `@${j.ig}` : 'sem @'}</span>
      </div>
      <span className={`tag tag-${lado}`}>{lado}</span>
    </div>
  );
}

export default function MesaPainel({ estado, agir, ocupado, onResultado }) {
  const { mesa, fila } = estado;

  if (!mesa) {
    const prox = fila.find((e) => e.tipo === 'dupla');
    const temSolo = fila.some((e) => e.tipo === 'solo');
    return (
      <section className="card" aria-labelledby="pn-mesa">
        <div className="card-hd"><h2 className="lbl" id="pn-mesa">Mesa livre · partida {estado.proximo_n}</h2></div>
        {prox ? (
          <>
            <button type="button" className="btn btn-creme btn-xl btn-block" disabled={ocupado} onClick={() => agir('painel_chamar')}>
              Chamar {prox.jogadores.map((j) => j.nome).join(' & ')}
            </button>
            <p className="nota">As cores são sorteadas. Dá pra inverter depois.</p>
          </>
        ) : (
          <p>{temSolo ? 'Só tem gente solo na fila. Junta dois solos ou espera mais alguém.' : 'Ninguém na fila.'}</p>
        )}
      </section>
    );
  }

  const nome = (lado) => mesa[lado].nome;
  return (
    <section className="card" aria-labelledby="pn-mesa">
      <div className="card-hd">
        <h2 className="lbl" id="pn-mesa">Na mesa · partida {mesa.n}</h2>
        <span className="lbl">Torcida {mesa.votos.rosa} × {mesa.votos.amarelo}</span>
      </div>
      <div className="jogs">
        <Jogador lado="rosa" j={mesa.rosa} />
        <Jogador lado="amarelo" j={mesa.amarelo} />
      </div>
      <button type="button" className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} disabled={ocupado}
        onClick={() => agir('painel_inverter')}>Inverter cores</button>
      <p className="lbl">Quem venceu?</p>
      <div className="res">
        <button type="button" className="btn btn-rosa btn-xl" disabled={ocupado}
          onClick={() => onResultado(mesa.id, 'rosa', `${nome('rosa')} venceu de rosa.`)}>Rosa venceu</button>
        <button type="button" className="btn btn-amarelo btn-xl" disabled={ocupado}
          onClick={() => onResultado(mesa.id, 'amarelo', `${nome('amarelo')} venceu de amarelo.`)}>Amarelo venceu</button>
      </div>
      <button type="button" className="btn btn-outline btn-block" disabled={ocupado}
        onClick={() => onResultado(mesa.id, 'anulada', 'Partida anulada.')}>Anular partida</button>
      <p className="nota">Anular serve pra empate ou desistência. Não conta no placar.</p>
    </section>
  );
}
