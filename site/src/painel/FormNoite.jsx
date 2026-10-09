import { useState } from 'react';
import { CARDAPIO_PADRAO as PADRAO, PECAS, TEXTO } from '../lib/constantes.js';

// Abrir ou editar a noite. Já vem preenchido com a noite anterior (mesmo bar, mesmo cardápio).
export default function FormNoite({ titulo, botao, inicial, ocupado, onEnviar, onCancelar }) {
  const [bar, setBar] = useState(inicial?.bar ?? '');
  const [premio, setPremio] = useState(inicial?.premio ?? '');
  const [cardapio, setCardapio] = useState(() => (inicial?.cardapio ?? PADRAO).slice());

  function enviar(e) {
    e.preventDefault();
    onEnviar({ p_bar: bar, p_premio: premio, p_cardapio: cardapio });
  }

  return (
    <form className="card" onSubmit={enviar} noValidate>
      <div className="card-hd">
        <h2 className="h3">{titulo}</h2>
        {onCancelar && <button type="button" className="btn-link" onClick={onCancelar}>Cancelar</button>}
      </div>
      <div className="campo">
        <label htmlFor="noite-bar">Bar <small>opcional</small></label>
        <input className="inp" id="noite-bar" maxLength={40} autoComplete="off" placeholder="Ex.: Charada Fleming"
          value={bar} onChange={(e) => setBar(e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor="noite-premio">Prêmio de quem vencer <small>opcional, por conta da casa</small></label>
        <input className="inp" id="noite-premio" maxLength={40} autoComplete="off" placeholder="Ex.: Jägerinha"
          value={premio} onChange={(e) => setPremio(e.target.value)} />
      </div>
      <details className="det">
        <summary>Cardápio das peças</summary>
        <div className="det-in">
          {PECAS.map((p, i) => (
            <div className="campo" key={p.nome}>
              <label htmlFor={`noite-c${i}`}>{p.glifo + TEXTO} {p.nome}</label>
              <input className="inp" id={`noite-c${i}`} maxLength={40} autoComplete="off" placeholder={PADRAO[i]}
                value={cardapio[i]} onChange={(e) => setCardapio((c) => c.map((v, j) => (j === i ? e.target.value : v)))} />
            </div>
          ))}
          <p className="nota">Campo vazio volta pro cardápio padrão.</p>
        </div>
      </details>
      <button type="submit" className="btn btn-creme btn-xl btn-block" disabled={ocupado}>{botao}</button>
    </form>
  );
}
