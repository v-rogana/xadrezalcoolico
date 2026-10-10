import { usePublico } from '../lib/usePublico.js';
import { CARDAPIO_PADRAO, PECAS, TEXTO } from '../lib/constantes.js';
import { ROTAS } from '../lib/rotas.js';
import Moldura from '../comum/Moldura.jsx';

const CHESS = 'https://www.chess.com/learn-how-to-play-chess';

// Tabuleirinho 5×5: a peça, pra onde ela anda (bolinha) e onde o peão captura (×).
const RETO = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
function raios(direcoes) {
  const casas = [];
  for (const [dl, dc] of direcoes) {
    for (let l = 2 + dl, c = 2 + dc; l >= 0 && l < 5 && c >= 0 && c < 5; l += dl, c += dc) casas.push([l, c]);
  }
  return casas;
}
const MOVIMENTOS = [
  { nome: 'Rei', pos: [2, 2], anda: [...RETO, ...DIAG].map(([l, c]) => [2 + l, 2 + c]),
    texto: 'Anda uma casa pra qualquer lado. Nunca é capturado: a partida acaba antes, no xeque-mate.' },
  { nome: 'Dama', pos: [2, 2], anda: raios([...RETO, ...DIAG]),
    texto: 'Anda quantas casas quiser, reto ou na diagonal. É a peça mais forte.' },
  { nome: 'Cavalo', pos: [2, 2], anda: [[0, 1], [0, 3], [1, 0], [1, 4], [3, 0], [3, 4], [4, 1], [4, 3]],
    texto: 'Anda em L e é a única peça que pula por cima das outras.' },
  { nome: 'Bispo', pos: [2, 2], anda: raios(DIAG),
    texto: 'Anda quantas casas quiser, só na diagonal.' },
  { nome: 'Torre', pos: [2, 2], anda: raios(RETO),
    texto: 'Anda quantas casas quiser, em linha reta.' },
  { nome: 'Peão', pos: [3, 2], anda: [[2, 2], [1, 2]], captura: [[2, 1], [2, 3]],
    texto: 'Anda uma casa pra frente (duas na primeira jogada) e captura na diagonal (×). Chegou do outro lado? Vira a peça que você quiser.' },
];

function Tabuleirinho({ glifo, mov }) {
  const tem = (lista, l, c) => (lista ?? []).some(([a, b]) => a === l && b === c);
  const casas = [];
  for (let l = 0; l < 5; l++) {
    for (let c = 0; c < 5; c++) {
      let dentro = null;
      if (l === mov.pos[0] && c === mov.pos[1]) dentro = <span className="mg">{glifo + TEXTO}</span>;
      else if (tem(mov.anda, l, c)) dentro = <span className="dot" />;
      else if (tem(mov.captura, l, c)) dentro = <span className="cap">×</span>;
      casas.push(<span key={`${l}${c}`} className={(l + c) % 2 ? 'esc' : 'cla'}>{dentro}</span>);
    }
  }
  return <div className="mini" aria-hidden="true">{casas}</div>;
}

export default function App() {
  const { dados } = usePublico();
  const noite = dados?.noite;
  const aberta = !!noite?.aberta;
  const cardapio = noite?.cardapio ?? CARDAPIO_PADRAO;
  const premio = aberta && noite.premio ? `Quem vencer leva ${noite.premio}, por conta da casa.` : 'Quem vencer leva o prêmio da noite, por conta da casa.';

  const regras = [
    ['♟', <><b>Capturou? Bebeu.</b> Quem captura uma peça do adversário bebe o copinho dela. Sempre.</>],
    ['♜', 'Cada peça é um copinho de 10 ml com a bebida do cardápio da noite.'],
    ['♛', 'Peão que chega do outro lado vira a peça que você quiser, e o copinho troca junto. Dá pra escolher pelo gosto da bebida.'],
    ['♝', 'Relógio de 10 minutos pra cada um. Zerou o seu, perdeu.'],
    ['♚', `Xeque-mate vence a partida, e quem deu o mate bebe o rei do adversário. ${premio}`],
    ['♞', 'Empate ou desistência anula a partida. Não conta no placar.'],
    ['♟', 'Em dupla, é amigo contra amigo. Solo, é desafio aberto: a equipe junta você com outra pessoa.'],
    ['♜', 'Não bebe álcool? Dá pra jogar com outra bebida. Combina com a equipe antes de sentar.'],
  ];

  return (
    <Moldura noite={noite}>
      <a className="btn-link voltar" href={ROTAS.inicio}>← Voltar pra mesa</a>

      <section className="sec" aria-labelledby="t-regras">
        <h1 className="h1" id="t-regras">Como joga</h1>
        <p className="lead">É xadrez de verdade, com copinhos no lugar das peças. Não precisa jogar bem. Precisa saber mexer as peças, e isso dá pra aprender aqui em dois minutos.</p>
      </section>

      <section className="sec" aria-labelledby="t-casa">
        <h2 className="h2" id="t-casa">Regras da casa</h2>
        <ul className="regras-casa">
          {regras.map(([glifo, texto], i) => (
            <li key={i}><span className="glifo" aria-hidden="true">{glifo + TEXTO}</span><span>{texto}</span></li>
          ))}
        </ul>
      </section>

      <section className="sec" aria-labelledby="t-xadrez">
        <h2 className="h2" id="t-xadrez">Xadrez em dois minutos</h2>
        <div className="objetivo">
          <span className="lbl">O objetivo</span>
          <p><b>Dar xeque-mate:</b> atacar o rei do adversário de um jeito que ele não tenha pra onde fugir.</p>
          <p><b>Xeque</b> é quando o rei está sendo atacado. Quem está em xeque precisa sair dele na hora.</p>
        </div>
        <p className="nota">Nos tabuleirinhos, a bolinha rosa mostra pra onde cada peça anda.</p>
        <ul className="pecas">
          {MOVIMENTOS.map((mov, i) => (
            <li key={mov.nome}>
              <Tabuleirinho glifo={PECAS[i].glifo} mov={mov} />
              <div className="peca-txt">
                <div className="peca-nome"><b>{mov.nome}</b><span className="meta">{cardapio[i]}</span></div>
                <p>{mov.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec" aria-labelledby="t-nunca">
        <h2 className="h2" id="t-nunca">Nunca jogou?</h2>
        <p>Pode chegar assim mesmo. A equipe explica na mesa e acompanha a primeira partida.</p>
        <a className="link" href={CHESS} target="_blank" rel="noopener">Quer treinar antes? O Chess.com ensina de graça</a>
      </section>

      {aberta && <a className="btn btn-preto btn-lg btn-block" href={`${ROTAS.inicio}#entrar`}>Bora pra fila</a>}
    </Moldura>
  );
}
