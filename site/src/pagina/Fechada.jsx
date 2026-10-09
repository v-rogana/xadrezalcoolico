import { CARDAPIO_PADRAO, INSTAGRAM, MATERIA_EM, REELS_EM } from '../lib/constantes.js';
import { ROTAS } from '../lib/rotas.js';
import Adesivo from '../comum/Adesivo.jsx';
import { Cardapio } from './Listas.jsx';
import materia from '../imagens/materia-estado-de-minas.jpg';
import equipe from '../imagens/carnaval-equipe.jpg';
import frameReels from '../imagens/carnaval-tabuleiro.jpg';

const Insta = () => <a className="link" href={INSTAGRAM} target="_blank" rel="noopener">@xadrezalcoolico</a>;

// Mesa fechada: a página vira a apresentação do Xadrez Alcoólico.
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

      <section className="sec" aria-labelledby="t-em">
        <div className="sec-hd">
          <h2 className="h2" id="t-em">Saiu no Estado de Minas</h2>
          <span className="meta">16/02/2026</span>
        </div>
        <div className="palco amarelo">
          <a className="recorte" href={MATERIA_EM} target="_blank" rel="noopener" aria-label="Ler a matéria no site do Estado de Minas">
            <img src={materia} width="720" height="780"
              alt="Recorte da matéria do Estado de Minas: Amigos criam xadrez alcoólico e viram atração no Bloco do Malvadão" />
          </a>
        </div>
        <a className="link" href={MATERIA_EM} target="_blank" rel="noopener">Ler a matéria completa</a>
      </section>

      <section className="sec" aria-labelledby="t-nasceu">
        <h2 className="h2" id="t-nasceu">Como nasceu</h2>
        <div className="palco rosa">
          <figure className="polaroid">
            <img src={equipe} width="996" height="558" loading="lazy"
              alt="A equipe do Xadrez Alcoólico de avental rosa, ao lado da mesa com o tabuleiro, no Carnaval de BH" />
            <figcaption>Bloco do Malvadão, Carnaval 2026</figcaption>
          </figure>
        </div>
        <p className="nota">Foto: Quéren Hapuque/EM/D.A Press.</p>
        <p>Três amigos de BH, que se conhecem desde o colégio, levaram o tabuleiro pro Bloco do Malvadão no Carnaval de 2026. Virou a atração do bloco.</p>
      </section>

      <section className="sec" aria-labelledby="t-shot">
        <h2 className="h1" id="t-shot">Cada peça do tabuleiro é um shot.</h2>
        <p>Cada peça é um copinho de 10 ml. Quem captura uma peça do adversário vira o shot. A partida dura uns 20 minutos, entre amigos ou no desafio aberto contra quem estiver no bar.</p>
        <a className="btn btn-preto" href={ROTAS.comoJoga} style={{ alignSelf: 'flex-start' }}>Como joga</a>
      </section>

      <Cardapio cardapio={noite?.cardapio ?? CARDAPIO_PADRAO} nota="O cardápio muda de bar pra bar." />

      <section className="em" aria-labelledby="t-reels">
        <span className="lbl">O reels do Estado de Minas</span>
        <h2 className="h3" id="t-reels">O vídeo que rodou o Instagram</h2>
        <div className="em-grid">
          <img src={frameReels} width="562" height="800" loading="lazy"
            alt="Frame do reels: mão movendo um copinho num tabuleiro de vidro, com copinhos coloridos" />
          <div className="nums">
            <p><b>+800 mil</b><span>visualizações</span></p>
            <p><b>+60 mil</b><span>curtidas</span></p>
            <p><b>+30 mil</b><span>compartilhamentos</span></p>
          </div>
        </div>
        <a className="link" href={REELS_EM} target="_blank" rel="noopener">Ver o reels no Instagram</a>
      </section>

      <section className="teaser" aria-labelledby="t-bar">
        <span className="lbl">Pra bares</span>
        <h2 className="h2" id="t-bar">Tem um bar? Leva o tabuleiro pra lá.</h2>
        <p className="nota">Uma noite piloto. A gente monta, conduz as partidas e divulga em collab com vocês.</p>
        <a className="btn" href={ROTAS.parcerias}>Quero no meu bar</a>
      </section>

      <Adesivo psiu="segue a gente" texto="Próximas noites, fotos e revanches." />
    </>
  );
}
