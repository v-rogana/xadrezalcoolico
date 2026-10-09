import { useEffect, useRef, useState } from 'react';
import { usePublico } from '../lib/usePublico.js';
import { rpc } from '../lib/supabase.js';
import { meuCelular } from '../lib/celular.js';
import { ler, gravar } from '../lib/armazem.js';
import Moldura from '../comum/Moldura.jsx';
import Adesivo from '../comum/Adesivo.jsx';
import Mesa from './Mesa.jsx';
import Voce from './Voce.jsx';
import { Fila, Placar, Cardapio } from './Listas.jsx';
import Fechada from './Fechada.jsx';

export default function App() {
  const { dados, semConexao } = usePublico();
  const celular = meuCelular();
  // Id da minha inscrição na fila. O banco devolve ao entrar; fica guardado no celular.
  const [entrada, setEntrada] = useState(() => ler('xa:entrada'));
  const [voto, setVoto] = useState(null); // { partida, lado }
  const [jogou, setJogou] = useState(false);
  const [aguardando, setAguardando] = useState(false); // entrou, mas o retrato ao vivo ainda não chegou
  const [aviso, setAviso] = useState('');
  const visto = useRef(null); // onde a inscrição apareceu por último: 'fila' | 'mesa'

  const guardarEntrada = (id) => {
    setEntrada(id);
    gravar('xa:entrada', id);
  };

  useEffect(() => {
    rpc('meu_estado', { p_device: celular })
      .then((m) => {
        if (m.entrada) guardarEntrada(m.entrada);
        if (m.voto) setVoto(m.voto);
      })
      .catch(() => {});
  }, [celular]);

  useEffect(() => {
    if (!aviso) return undefined;
    const t = setTimeout(() => setAviso(''), 5000);
    return () => clearTimeout(t);
  }, [aviso]);

  const aberta = !!dados?.noite?.aberta;
  const mesa = aberta ? dados.mesa : null;
  const fila = aberta ? dados.fila : [];
  const minha = entrada ? fila.findIndex((e) => e.ids.includes(entrada)) : -1;
  const naMesa = !!(entrada && mesa?.fila_ids?.includes(entrada));
  const meuVoto = voto && mesa && voto.partida === mesa.id ? voto.lado : null;

  // Inscrição que estava na mesa e sumiu = partida acabou. Que estava na fila e sumiu = saiu.
  useEffect(() => {
    if (!dados || !entrada) return;
    const onde = naMesa ? 'mesa' : minha >= 0 ? 'fila' : null;
    if (onde) {
      visto.current = onde;
      setAguardando(false);
      return;
    }
    if (visto.current) {
      if (visto.current === 'mesa') setJogou(true);
      visto.current = null;
      guardarEntrada(null);
    }
  }, [dados, entrada, naMesa, minha]);

  async function votar(lado) {
    const anterior = voto;
    setVoto({ partida: mesa.id, lado });
    try {
      await rpc('votar', { p_device: celular, p_partida: mesa.id, p_lado: lado });
    } catch (e) {
      setVoto(anterior);
      setAviso(e.message);
    }
  }

  async function entrar(tipo, jogadores) {
    const id = await rpc('entrar_fila', { p_device: celular, p_tipo: tipo, p_jogadores: jogadores });
    visto.current = null;
    guardarEntrada(id);
    setJogou(false);
    setAguardando(true);
    setTimeout(() => setAguardando(false), 8000);
  }

  async function sair() {
    try {
      await rpc('sair_fila', { p_device: celular, p_id: entrada });
      visto.current = null;
      guardarEntrada(null);
    } catch (e) {
      setAviso(e.message);
    }
  }

  return (
    <Moldura noite={dados?.noite} aviso={aviso}>
      {!dados ? (
        <p className="carregando" role="status">{semConexao ? 'Sem conexão. Tentando de novo…' : 'Carregando a mesa…'}</p>
      ) : aberta ? (
        <>
          <Mesa mesa={mesa} proximoN={dados.proximo_n} premio={dados.noite.premio} meuVoto={meuVoto} onVotar={votar} />
          <Voce dados={dados} minha={minha} naMesa={naMesa} jogou={jogou} aguardando={aguardando} onEntrar={entrar} onSair={sair} />
          <Fila fila={fila} minha={minha} />
          <Placar placar={dados.placar} hist={dados.hist} />
          <Cardapio cardapio={dados.noite.cardapio} meta="Hoje" nota="Capturou uma peça? Bebe o copinho dela." />
          <Adesivo psiu="psiu," texto="Tirou foto? Marca a gente." />
        </>
      ) : (
        <Fechada dados={dados} />
      )}
    </Moldura>
  );
}
