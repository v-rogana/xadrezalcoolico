import { useState } from 'react';
import { MIN_POR_PARTIDA } from '../lib/constantes.js';
import { ROTAS } from '../lib/rotas.js';
import FormFila from '../comum/FormFila.jsx';

// O que este celular vê sobre si: sua vez, seu lugar na fila, ou o convite pra entrar.
// O "Bora pra fila" da página Como joga chega aqui com #entrar e já abre o formulário.
export default function Voce({ dados, minha, naMesa, jogou, aguardando, onEntrar, onSair }) {
  const [form, setForm] = useState(() => window.location.hash === '#entrar');
  const [confirmarSaida, setConfirmarSaida] = useState(false);

  if (naMesa) {
    return (
      <div className="adesivo rosa" role="status">
        <p className="psiu">psiu, é sua vez</p>
        <p className="ades-txt">Senta na mesa. Capturou? Bebeu.</p>
      </div>
    );
  }

  if (minha >= 0) {
    const eu = dados.fila[minha];
    const duplasAntes = dados.fila.slice(0, minha).filter((e) => e.tipo === 'dupla').length;
    const sair = confirmarSaida ? (
      <div className="confirma">
        <p>Sair da fila? Seu lugar vai pro próximo.</p>
        <div className="row">
          <button type="button" className="btn btn-preto btn-sm" onClick={() => { setConfirmarSaida(false); onSair(); }}>Sair</button>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setConfirmarSaida(false)}>Ficar</button>
        </div>
      </div>
    ) : (
      <button type="button" className="btn-link" onClick={() => setConfirmarSaida(true)}>Sair da fila</button>
    );

    if (eu.tipo === 'solo') {
      return (
        <div className="bloco voce">
          <div className="bloco-hd"><span className="lbl">Você na fila</span><span className="tag">Solo</span></div>
          <p className="big">{minha + 1}º lugar</p>
          <p>Você entrou solo. A equipe junta você com outra pessoa que veio solo.</p>
          {sair}
        </div>
      );
    }
    if (duplasAntes === 0) {
      return (
        <div className="sec">
          <div className="adesivo rosa" role="status">
            <p className="psiu">psiu, sua dupla é a próxima</p>
            <p className="ades-txt">Fica perto da mesa.</p>
          </div>
          {sair}
        </div>
      );
    }
    const partidas = duplasAntes + (dados.mesa ? 1 : 0);
    return (
      <div className="bloco voce">
        <div className="bloco-hd"><span className="lbl">Você na fila</span><span className="tag tag-rosa">{eu.nomes.join(' & ')}</span></div>
        <p className="big">{minha + 1}º lugar</p>
        <p>{partidas === 1 ? 'Falta 1 partida' : `Faltam ${partidas} partidas`}, uns {partidas * MIN_POR_PARTIDA} min.</p>
        {sair}
      </div>
    );
  }

  if (aguardando) {
    return (
      <div className="bloco voce" role="status">
        <span className="lbl">Você na fila</span>
        <p>Entrando na fila…</p>
      </div>
    );
  }

  if (form) {
    return (
      <FormFila
        className="bloco"
        escopo="eu"
        titulo={<h2 className="h2">Entrar na fila</h2>}
        rotulos={{ solo: 'Seu apelido', dupla1: 'Seu apelido', dupla2: 'Apelido de quem joga com você' }}
        notaDupla="Vocês dois jogam um contra o outro."
        notaSolo="Desafio aberto: a equipe junta você com outra pessoa que veio solo."
        botao={{ texto: 'Bora pra fila', className: 'btn btn-preto btn-lg btn-block' }}
        rodape={<p className="nota">O @ só a equipe vê. A gente guarda pra marcar vocês nas fotos.</p>}
        onEnviar={async (tipo, jogadores) => { await onEntrar(tipo, jogadores); setForm(false); }}
        onCancelar={() => setForm(false)}
      />
    );
  }

  return (
    <div className="cta">
      <button type="button" className="btn btn-preto btn-lg btn-block" onClick={() => setForm(true)}>
        {jogou ? 'Revanche? Entra de novo' : 'Entrar na fila'}
      </button>
      <p className="nota">Em dupla ou solo.</p>
      <a className="btn-link" href={ROTAS.comoJoga}>Nunca jogou? Veja como joga</a>
    </div>
  );
}
