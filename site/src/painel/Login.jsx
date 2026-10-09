import { useState } from 'react';
import { rpc } from '../lib/supabase.js';
import Marca from './Marca.jsx';

export default function Login({ onEntrar }) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    if (!senha) return setErro('Digita a senha pra entrar.');
    setEnviando(true);
    setErro('');
    try {
      const token = await rpc('painel_entrar', { p_senha: senha });
      if (token) onEntrar(token);
      else setErro('Senha errada. Tenta de novo.');
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="pn-in pn-login">
      <Marca grande />
      <h1 className="h2">Painel</h1>
      <p className="nota">Só pra equipe da noite. Entrou, fica logado por 12 horas.</p>
      <form className="login" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input className="inp" id="senha" type="password" autoComplete="current-password"
            value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <button type="submit" className="btn btn-creme btn-xl btn-block" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
      </form>
    </main>
  );
}
