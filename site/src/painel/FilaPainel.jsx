import { useState } from 'react';
import FormFila from '../comum/FormFila.jsx';

const nomes = (e) => e.jogadores.map((j) => j.nome).join(' & ');
const arrobas = (e) => e.jogadores.map((j) => (j.ig ? `@${j.ig}` : 'sem @')).join(' · ');

export default function FilaPainel({ fila, agir, ocupado }) {
  const [adicionando, setAdicionando] = useState(false);
  const [remover, setRemover] = useState(null);
  const [juntar, setJuntar] = useState(null); // ids escolhidos, ou null fora do modo de juntar
  const solos = fila.filter((e) => e.tipo === 'solo');

  function escolher(id) {
    setJuntar((sel) => {
      if (sel.includes(id)) return sel.filter((x) => x !== id);
      return [...sel.slice(-1), id]; // no máximo dois; o terceiro toque troca o mais antigo
    });
  }

  // Erro aqui volta pro FormFila, que mostra a mensagem do banco embaixo dos campos.
  async function adicionar(tipo, jogadores) {
    if (await agir('painel_adicionar', { p_tipo: tipo, p_jogadores: jogadores }, { lancar: true })) setAdicionando(false);
  }

  return (
    <section className="card" aria-labelledby="pn-fila">
      <div className="card-hd">
        <h2 className="h3" id="pn-fila">Fila · {fila.length}</h2>
        {!adicionando && !juntar && (
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setAdicionando(true)}>Adicionar</button>
        )}
      </div>

      {adicionando && (
        <FormFila
          className="add"
          escopo="pn"
          titulo={<span className="lbl">Adicionar na fila</span>}
          rotulos={{ solo: 'Apelido', dupla1: 'Apelido 1', dupla2: 'Apelido 2' }}
          botao={{ texto: 'Pôr no fim da fila', className: 'btn btn-creme btn-block' }}
          onEnviar={adicionar}
          onCancelar={() => setAdicionando(false)}
        />
      )}

      {juntar ? (
        <div className="juntar">
          <p><b>Toca em dois solos pra juntar.</b> A dupla fica no lugar de quem chegou antes.</p>
          <div className="row">
            <button type="button" className="btn btn-amarelo btn-sm" disabled={juntar.length !== 2 || ocupado}
              onClick={async () => { if (await agir('painel_juntar', { p_a: juntar[0], p_b: juntar[1] })) setJuntar(null); }}>
              {juntar.length === 2 ? 'Juntar' : `Juntar (${juntar.length}/2)`}
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setJuntar(null)}>Cancelar</button>
          </div>
        </div>
      ) : (
        solos.length >= 2 && !adicionando && (
          <button type="button" className="btn btn-amarelo btn-block" onClick={() => { setRemover(null); setJuntar([]); }}>Juntar solos</button>
        )
      )}

      {fila.length ? (
        <ol className="pn-fila">
          {fila.map((e, i) => {
            if (juntar && e.tipo === 'solo') {
              const sel = juntar.includes(e.id);
              return (
                <li key={e.id} className={`pn-item escolha${sel ? ' sel' : ''}`}>
                  <button type="button" className="pick" aria-pressed={sel} onClick={() => escolher(e.id)}>
                    <span className="pos">{i + 1}</span>
                    <span className="quem"><span className="nm">{nomes(e)}</span><span className="ig-t">{arrobas(e)}</span></span>
                    <span className={`tag ${sel ? 'tag-amarelo' : 'tag-escura'}`}>{sel ? 'Junta' : 'Solo'}</span>
                  </button>
                </li>
              );
            }
            if (remover === e.id) {
              return (
                <li key={e.id} className="pn-item confirma">
                  <p>Tirar {nomes(e)} da fila?</p>
                  <div className="row">
                    <button type="button" className="btn btn-creme btn-sm" disabled={ocupado}
                      onClick={async () => { if (await agir('painel_remover', { p_id: e.id })) setRemover(null); }}>Tirar</button>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setRemover(null)}>Não</button>
                  </div>
                </li>
              );
            }
            return (
              <li key={e.id} className={`pn-item${juntar ? ' apagado' : ''}`}>
                <span className="pos">{i + 1}</span>
                <div className="quem">
                  <span className="nm">{nomes(e)} {e.tipo === 'solo' && <span className="tag tag-escura">solo</span>}</span>
                  <span className="ig-t">{arrobas(e)}</span>
                </div>
                <button type="button" className="x" disabled={!!juntar} aria-label={`Tirar ${nomes(e)} da fila`}
                  onClick={() => setRemover(e.id)}>×</button>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="nota">Fila vazia.</p>
      )}
    </section>
  );
}
