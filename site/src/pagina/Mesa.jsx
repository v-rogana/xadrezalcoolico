import { useEffect, useRef, useState } from 'react';
import { hora } from '../lib/datas.js';
import { TEXTO } from '../lib/constantes.js';
import Peao from '../comum/Peao.jsx';

const outro = (lado) => (lado === 'rosa' ? 'amarelo' : 'rosa');

function Premio({ premio }) {
  if (!premio) return null;
  return (
    <div className="premio">
      <span className="glifo" aria-hidden="true">{'♚' + TEXTO}</span>
      <div>
        <span className="lbl">Quem vencer leva</span>
        <b>{premio}</b>
        <span className="nota">por conta da casa</span>
      </div>
    </div>
  );
}

// "Torcida não vira a casaca", diz a frase. O botão diz que vira.
function VotoFeito({ lado, onVirar }) {
  const moeda = useRef(null);
  const [visual, setVisual] = useState(lado);
  const [girando, setGirando] = useState(false);

  useEffect(() => {
    if (!girando) setVisual(lado);
  }, [lado, girando]);

  function virar() {
    if (girando) return;
    const el = moeda.current;
    const reduz = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduz || !el?.animate) {
      onVirar(outro(lado));
      return;
    }
    setGirando(true);
    const de = lado === 'rosa' ? 0 : 180;
    const giro = el.animate(
      [
        { transform: `translateY(0) rotateY(${de}deg)` },
        { transform: `translateY(-34px) rotateY(${de + 450}deg)`, offset: 0.5 },
        { transform: `translateY(0) rotateY(${de + 900}deg)` },
      ],
      { duration: 820, easing: 'cubic-bezier(.33,.8,.4,1)' },
    );
    const meio = setTimeout(() => setVisual(outro(lado)), 410);
    giro.onfinish = () => {
      clearTimeout(meio);
      setVisual(outro(lado));
      setGirando(false);
      onVirar(outro(lado));
    };
  }

  return (
    <div className="voto-ok">
      <p><b>Você tá com o {lado}.</b><br />Torcida não vira a casaca.</p>
      <button type="button" className={`casaca ${visual}`} onClick={virar} disabled={girando}
        aria-label={`Virar casaca: passar pro ${outro(lado)}`}>
        <span className="moeda" ref={moeda} style={{ transform: `rotateY(${visual === 'rosa' ? 0 : 180}deg)` }} aria-hidden="true">
          <span className="face f-rosa"><Peao bebida="var(--xa-rosa)" /></span>
          <span className="face f-amarelo"><Peao bebida="var(--xa-amarelo)" /></span>
        </span>
        <span>Virar casaca</span>
      </button>
    </div>
  );
}

// Todo mundo vota, inclusive quem está jogando.
export default function Mesa({ mesa, proximoN, premio, meuVoto, onVotar }) {
  if (!mesa) {
    return (
      <section className="sec" aria-labelledby="t-mesa">
        <div className="sec-hd">
          <h2 className="h2" id="t-mesa">Na mesa agora</h2>
          <span className="meta">Partida {proximoN}</span>
        </div>
        <div className="mesa-livre">
          <p className="h3">Mesa livre.</p>
          <p className="nota">A próxima dupla já já senta.</p>
        </div>
        <Premio premio={premio} />
      </section>
    );
  }

  // O quadriculado fica entre 30% e 70% pra caber o nome de quem tá perdendo a torcida.
  const total = mesa.votos.rosa + mesa.votos.amarelo;
  const p = Math.round(Math.min(70, Math.max(30, total ? (mesa.votos.rosa / total) * 100 : 50)));

  return (
    <section className="sec" aria-labelledby="t-mesa">
      <div className="sec-hd">
        <h2 className="h2" id="t-mesa">Na mesa agora</h2>
        <span className="meta">Partida {mesa.n} · desde {hora(mesa.inicio)}</span>
      </div>
      <div className="banda" style={{ '--p': `${p}%` }} role="img" aria-label={`${mesa.rosa} de rosa contra ${mesa.amarelo} de amarelo`}>
        <div className="b-a" />
        <div className="b-x" />
        <span className="b-nome r">{mesa.rosa}</span>
        <span className="b-nome a">{mesa.amarelo}</span>
      </div>
      <Premio premio={premio} />
      {meuVoto ? (
        <VotoFeito lado={meuVoto} onVirar={onVotar} />
      ) : (
        <div className="voto">
          <p className="h3">De que lado você tá?</p>
          <div className="voto-btns">
            <button type="button" className="btn btn-rosa" onClick={() => onVotar('rosa')}>Rosa</button>
            <button type="button" className="btn btn-amarelo" onClick={() => onVotar('amarelo')}>Amarelo</button>
          </div>
        </div>
      )}
    </section>
  );
}
