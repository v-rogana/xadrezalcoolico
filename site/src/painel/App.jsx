import { useCallback, useEffect, useState } from 'react';
import { usePublico } from '../lib/usePublico.js';
import { rpc } from '../lib/supabase.js';
import { ler, gravar } from '../lib/armazem.js';
import { diaCurto } from '../lib/datas.js';
import Peao from '../comum/Peao.jsx';
import Login from './Login.jsx';
import FormNoite from './FormNoite.jsx';
import MesaPainel from './MesaPainel.jsx';
import FilaPainel from './FilaPainel.jsx';
import { baixarPlanilha } from './planilha.js';

const DOZE_HORAS = 12 * 60 * 60 * 1000;

function sessaoGuardada() {
  try {
    const s = JSON.parse(ler('xa:painel') || 'null');
    return s && s.expira > Date.now() ? s.token : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [token, setToken] = useState(sessaoGuardada);
  const [estado, setEstado] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState('');
  const [desfazer, setDesfazer] = useState(null); // { partida, texto }
  const [editando, setEditando] = useState(false);
  const [encerrando, setEncerrando] = useState(false);
  const [proxima, setProxima] = useState('');
  const [salvo, setSalvo] = useState(false);
  const { dados } = usePublico(); // só como sinal: mudou algo, o painel recarrega

  const entrar = (t) => {
    gravar('xa:painel', JSON.stringify({ token: t, expira: Date.now() + DOZE_HORAS }));
    setToken(t);
  };
  const largar = useCallback(() => {
    gravar('xa:painel', null);
    setToken(null);
    setEstado(null);
  }, []);

  const carregar = useCallback(async () => {
    if (!token) return;
    try {
      setEstado(await rpc('painel_estado', { p_token: token }));
    } catch (e) {
      if (e.sessao) largar();
      else setAviso(e.message);
    }
  }, [token, largar]);

  useEffect(() => { carregar(); }, [carregar, dados]);

  useEffect(() => {
    if (!aviso) return undefined;
    const t = setTimeout(() => setAviso(''), 5000);
    return () => clearTimeout(t);
  }, [aviso]);

  useEffect(() => {
    if (!desfazer) return undefined;
    const t = setTimeout(() => setDesfazer(null), 6000);
    return () => clearTimeout(t);
  }, [desfazer]);

  useEffect(() => { if (estado) setProxima(estado.proxima); }, [estado?.proxima]);

  // Toda ação do painel passa por aqui: um toque por vez, erro vira aviso, sessão vencida volta pro login.
  // Com { lancar: true } o erro volta pra quem chamou (formulário que mostra a mensagem no lugar).
  const agir = useCallback(async (nome, args = {}, { lancar = false } = {}) => {
    if (ocupado) return false;
    setOcupado(true);
    try {
      await rpc(nome, { p_token: token, ...args });
      await carregar();
      return true;
    } catch (e) {
      if (e.sessao) largar();
      else if (lancar) throw e;
      else setAviso(e.message);
      return false;
    } finally {
      setOcupado(false);
    }
  }, [ocupado, token, carregar, largar]);

  async function resultado(partida, vencedor, texto) {
    setDesfazer(null);
    if (await agir('painel_resultado', { p_partida: partida, p_vencedor: vencedor })) setDesfazer({ partida, texto });
  }

  async function planilha() {
    try {
      baixarPlanilha(await rpc('painel_planilha', { p_token: token }));
    } catch (e) {
      if (e.sessao) largar();
      else setAviso(e.message);
    }
  }

  async function sair() {
    try { await rpc('painel_sair', { p_token: token }); } catch { /* sai do mesmo jeito */ }
    largar();
  }

  if (!token) return <Login onEntrar={entrar} />;
  if (!estado) return <main className="pn-in"><p role="status">Carregando o painel…</p></main>;

  const noite = estado.noite;
  const aberta = !!noite?.aberta;
  const campoProxima = (id) => (
    <div className="campo">
      <label htmlFor={id}>Próxima noite <small>opcional</small></label>
      <input className="inp" id={id} maxLength={60} autoComplete="off" placeholder="Ex.: SEG 26/10 · Charada Fleming · 20H"
        value={proxima} onChange={(e) => { setProxima(e.target.value); setSalvo(false); }} />
    </div>
  );

  return (
    <>
      <main className="pn-in">
        <header className="pn-hd">
          <Peao tinta="var(--xa-creme)" papel="var(--xa-preto)" />
          <div>
            <h1 className="h2">Painel</h1>
            <p className="meta">{aberta ? `${noite.bar ? `${noite.bar} · ` : ''}${diaCurto(noite.aberta_em)}` : 'Nenhuma noite aberta'}</p>
          </div>
          <button type="button" className="btn-link" onClick={sair}>Sair</button>
        </header>

        {aberta ? (
          <>
            <div className="pn-linha">
              <div className="pn-placar">
                <span className="lbl">Placar</span>
                <span className="pp r">{estado.placar.rosa}</span><span className="vezes">×</span><span className="pp a">{estado.placar.amarelo}</span>
              </div>
              {!editando && <button type="button" className="btn-link" onClick={() => setEditando(true)}>Editar noite</button>}
            </div>

            {editando && (
              <FormNoite titulo="Editar noite" botao="Salvar" inicial={noite} ocupado={ocupado}
                onCancelar={() => setEditando(false)}
                onEnviar={async (n) => { if (await agir('painel_editar_noite', n)) setEditando(false); }} />
            )}

            <MesaPainel estado={estado} agir={agir} ocupado={ocupado} onResultado={resultado} />
            <FilaPainel fila={estado.fila} agir={agir} ocupado={ocupado} />

            {encerrando ? (
              <div className="card confirma">
                <p>Encerrar a noite? A fila é apagada, partida na mesa é anulada, e a página passa a mostrar o placar final.</p>
                {campoProxima('prox-encerrar')}
                <div className="row">
                  <button type="button" className="btn btn-creme btn-sm" disabled={ocupado}
                    onClick={async () => { if (await agir('painel_encerrar_noite', { p_proxima: proxima })) setEncerrando(false); }}>Encerrar</button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setEncerrando(false)}>Voltar</button>
                </div>
              </div>
            ) : (
              <div className="rodape-pn">
                <button type="button" className="btn-link" onClick={() => setEncerrando(true)}>Encerrar noite</button>
                <button type="button" className="btn-link" onClick={planilha}>Baixar planilha</button>
              </div>
            )}
          </>
        ) : (
          <>
            <form className="card" noValidate onSubmit={async (e) => {
              e.preventDefault();
              if (await agir('painel_salvar_proxima', { p_texto: proxima })) setSalvo(true);
            }}>
              <h2 className="h3">Próxima noite</h2>
              <p className="nota">Aparece na página enquanto a mesa estiver fechada.</p>
              {campoProxima('prox-fechada')}
              <button type="submit" className="btn btn-outline btn-block" disabled={ocupado}>Salvar</button>
              {salvo && <p className="nota" role="status">Salvo. Já aparece na página.</p>}
            </form>
            <FormNoite titulo="Abrir noite" botao="Abrir noite" inicial={noite} ocupado={ocupado}
              onEnviar={(n) => agir('painel_abrir_noite', n)} />
            <div className="rodape-pn">
              <button type="button" className="btn-link" onClick={planilha}>Baixar planilha</button>
            </div>
          </>
        )}
      </main>

      {desfazer && (
        <div className="toast" role="status">
          <span>{desfazer.texto}</span>
          <button type="button" className="btn-link" disabled={ocupado}
            onClick={async () => { const d = desfazer; setDesfazer(null); await agir('painel_desfazer', { p_partida: d.partida }); }}>Desfazer</button>
        </div>
      )}
      {aviso && <div className="aviso" role="alert">{aviso}</div>}
    </>
  );
}
