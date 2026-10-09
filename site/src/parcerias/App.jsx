import { INSTAGRAM, WHATSAPP } from '../lib/constantes.js';
import { ROTAS } from '../lib/rotas.js';
import Moldura from '../comum/Moldura.jsx';

// Página pros bares. Texto do verso da proposta impressa.
export default function App() {
  return (
    <Moldura>
      <a className="btn-link voltar" href={ROTAS.inicio}>← Voltar pra mesa</a>

      <section className="sec" aria-labelledby="t-parc">
        <span className="tag tag-rosa" style={{ alignSelf: 'flex-start' }}>Pra bares e marcas</span>
        <h1 className="h1" id="t-parc">Uma noite de Xadrez Alcoólico no seu bar</h1>
        <p className="lead">Uma noite piloto pra medir o impacto no movimento e no consumo da casa.</p>
      </section>

      <div className="stat rosa">
        <span className="stat-num">250 mi</span>
        <span className="lbl">Usuários no Chess.com</span>
        <p>O xadrez nunca esteve tão em alta. Só o Chess.com, maior site do jogo, saltou de 100 pra 250 milhões de usuários em pouco mais de três anos.</p>
      </div>
      <div className="stat amarelo">
        <span className="stat-num">+800 mil</span>
        <span className="lbl">Visualizações no reels do Estado de Minas</span>
        <p>O tabuleiro é visual: as pessoas tiram foto, gravam stories e postam sem ninguém pedir.</p>
      </div>

      <section className="sec" aria-labelledby="t-ganha">
        <h2 className="h2" id="t-ganha">O que o bar ganha</h2>
        <ul className="ganhos">
          <li><h3 className="h3">Público novo</h3><p>Grupos de amigos atrás de desafio, casais em date, a galera geek e quem não curte a noitada padrão.</p></li>
          <li><h3 className="h3">A atração da noite</h3><p>O tabuleiro segura o cliente no bar e puxa consumo nas mesas em volta.</p></li>
          <li><h3 className="h3">Collab no Instagram</h3><p>Os posts saem em collab com o perfil do bar, e o jogo rende fotos e stories a noite toda.</p></li>
          <li><h3 className="h3">Bebidas da casa em destaque</h3><p>O cardápio das peças usa as bebidas da casa, e quem vence a partida ganha um drink do bar.</p></li>
        </ul>
      </section>

      <section className="sec" aria-labelledby="t-piloto">
        <h2 className="h2" id="t-piloto">Como funciona o piloto</h2>
        <ol className="passos">
          <li><p>A gente monta o tabuleiro e conduz as partidas a noite toda.</p></li>
          <li><p>A entrada fica entre R$ 15 e R$ 20 por jogador, valor que só cobre nossos insumos.</p></li>
          <li><p>A cobrança fica do jeito mais simples pra casa: ficha no caixa, consumação mínima ou a gente cuidando da lista e do pagamento.</p></li>
          <li><p>A divulgação fica por nossa conta, em collab com o bar.</p></li>
          <li><p>Depois da noite, olhamos juntos o público, as menções no Instagram e o consumo, e montamos um formato recorrente.</p></li>
        </ol>
      </section>

      <section className="bloco" aria-labelledby="t-conversa">
        <h2 className="h2" id="t-conversa">Vamos conversar?</h2>
        <p>Criamos o Xadrez Alcoólico no Carnaval de BH. No evento, a gente monta o tabuleiro e conduz as partidas a noite toda.</p>
        <a className="btn btn-preto btn-lg btn-block" href={WHATSAPP} target="_blank" rel="noopener">Chamar no WhatsApp</a>
        <p className="nota">Ou manda uma mensagem no <a className="link" href={INSTAGRAM} target="_blank" rel="noopener">@xadrezalcoolico</a>.</p>
      </section>
    </Moldura>
  );
}
