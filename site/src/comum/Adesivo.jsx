import { INSTAGRAM } from '../lib/constantes.js';

// Adesivo inteiro clicável, abre o Instagram.
export default function Adesivo({ psiu, texto }) {
  return (
    <a className="adesivo adesivo-link" href={INSTAGRAM} target="_blank" rel="noopener">
      <span className="psiu">{psiu}</span>
      <span className="ades-txt">{texto}</span>
      <span className="arroba">@xadrezalcoolico</span>
    </a>
  );
}
