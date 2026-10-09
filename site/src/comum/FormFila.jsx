import { useState } from 'react';

const VAZIO = { ap1: '', ig1: '', ap2: '', ig2: '' };

// Formulário de inscrição, usado pela página (quem chega) e pelo painel (quem a equipe adiciona).
// onEnviar(tipo, jogadores) devolve uma Promise; se ela falhar, a mensagem aparece aqui.
export default function FormFila({ escopo, titulo, botao, rotulos, notaDupla, notaSolo, rodape, onEnviar, onCancelar, className }) {
  const [modo, setModo] = useState('dupla');
  const [campos, setCampos] = useState(VAZIO);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const dupla = modo === 'dupla';
  const mudar = (k) => (e) => setCampos((c) => ({ ...c, [k]: e.target.value }));

  async function enviar(e) {
    e.preventDefault();
    if (enviando) return;
    if (!campos.ap1.trim()) return setErro(dupla ? 'Falta o primeiro apelido.' : 'Falta o apelido.');
    if (dupla && !campos.ap2.trim()) return setErro('Falta o segundo apelido.');
    const jogadores = [{ nome: campos.ap1, ig: campos.ig1 }];
    if (dupla) jogadores.push({ nome: campos.ap2, ig: campos.ig2 });
    setEnviando(true);
    setErro('');
    try {
      await onEnviar(modo, jogadores);
      setCampos(VAZIO);
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  const par = (i, rotulo) => (
    <div className="par">
      <div className="campo">
        <label htmlFor={`${escopo}-ap${i}`}>{rotulo}</label>
        <input className="inp" id={`${escopo}-ap${i}`} maxLength={16} autoComplete="off"
          value={campos[`ap${i}`]} onChange={mudar(`ap${i}`)} />
      </div>
      <div className="campo">
        <label htmlFor={`${escopo}-ig${i}`}>Instagram <small>opcional</small></label>
        <div className="ig">
          <span aria-hidden="true">@</span>
          <input className="inp" id={`${escopo}-ig${i}`} maxLength={31} autoComplete="off" autoCapitalize="off"
            spellCheck="false" value={campos[`ig${i}`]} onChange={mudar(`ig${i}`)} />
        </div>
      </div>
    </div>
  );

  return (
    <form className={className} onSubmit={enviar} noValidate>
      <div className="sec-hd">
        {titulo}
        <button type="button" className="btn-link" onClick={onCancelar}>Cancelar</button>
      </div>
      <div className="seg2" role="group" aria-label="Como vai jogar">
        <button type="button" aria-pressed={dupla} onClick={() => { setModo('dupla'); setErro(''); }}>Em dupla</button>
        <button type="button" aria-pressed={!dupla} onClick={() => { setModo('solo'); setErro(''); }}>Solo</button>
      </div>
      {(dupla ? notaDupla : notaSolo) && <p className="nota">{dupla ? notaDupla : notaSolo}</p>}
      {par(1, dupla ? rotulos.dupla1 : rotulos.solo)}
      {dupla && par(2, rotulos.dupla2)}
      {erro && <p className="erro" role="alert">{erro}</p>}
      <button type="submit" className={botao.className} disabled={enviando}>{enviando ? 'Enviando…' : botao.texto}</button>
      {rodape}
    </form>
  );
}
