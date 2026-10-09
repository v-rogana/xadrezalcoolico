import { PECAS, TEXTO } from '../lib/constantes.js';

export function Fila({ fila, minha }) {
  const prox = fila.findIndex((e) => e.tipo === 'dupla');
  return (
    <section className="sec" aria-labelledby="t-fila">
      <div className="sec-hd">
        <h2 className="h2" id="t-fila">Fila</h2>
        <span className="meta">{fila.length} na fila</span>
      </div>
      {fila.length ? (
        <ol className="fila">
          {fila.map((e, i) => (
            <li key={e.id} className={`item${e.tipo === 'solo' ? ' solo' : ''}${i === prox ? ' prox' : ''}${i === minha ? ' voce' : ''}`}>
              <span className="pos">{i + 1}</span>
              <div className="quem">
                <span className="nm">{e.nomes.join(' & ')}</span>
                {e.tipo === 'solo' && <span className="sub">Solo · esperando dupla</span>}
              </div>
              <div className="tags">
                {i === minha && <span className="tag tag-rosa">Você</span>}
                {i === prox && <span className="tag tag-preto">Próxima</span>}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="vazio">Fila vazia. Chega mais.</p>
      )}
    </section>
  );
}

export function Placar({ placar, hist }) {
  return (
    <section className="sec" aria-labelledby="t-placar">
      <div className="sec-hd">
        <h2 className="h2" id="t-placar">Placar da noite</h2>
        <span className="meta">{hist.length} {hist.length === 1 ? 'partida' : 'partidas'}</span>
      </div>
      <div className="placar">
        <div className="pl rosa"><span className="lbl">Rosa</span><span className="num">{placar.rosa}</span></div>
        <span className="vs">×</span>
        <div className="pl amarelo"><span className="lbl">Amarelo</span><span className="num">{placar.amarelo}</span></div>
      </div>
      {hist.length ? (
        <ol className="hist">
          {hist.map((h) => (
            <li key={h.n}>
              <span className="hn">P{h.n}</span>
              <span>{h.vencedor === 'anulada' ? 'Anulada' : `${h.nome} venceu de ${h.vencedor}`}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="nota">Ninguém ganhou nada ainda.</p>
      )}
    </section>
  );
}

export function Cardapio({ cardapio }) {
  return (
    <section className="sec" aria-labelledby="t-cardapio">
      <div className="sec-hd">
        <h2 className="h2" id="t-cardapio">Cardápio das peças</h2>
        <span className="meta">Hoje</span>
      </div>
      <ul className="cardapio">
        {PECAS.map((p, i) => (
          <li key={p.nome}>
            <span className="glifo" aria-hidden="true">{p.glifo + TEXTO}</span>
            <span className="peca">{p.nome}</span>
            <span className="pontos" aria-hidden="true" />
            <span className="bebida">{cardapio[i]}</span>
          </li>
        ))}
      </ul>
      <p className="nota">Capturou uma peça? Bebe o copinho dela.</p>
    </section>
  );
}

export function Lembrete() {
  return (
    <div className="adesivo">
      <p className="psiu">psiu,</p>
      <p className="ades-txt">Tirou foto? Marca a gente.</p>
      <span className="arroba">@xadrezalcoolico</span>
    </div>
  );
}
