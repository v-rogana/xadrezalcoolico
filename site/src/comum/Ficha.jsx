import { TEXTO } from '../lib/constantes.js';

export default function Ficha({ lado }) {
  return <span className={`ficha ${lado}`} aria-hidden="true">{'♟' + TEXTO}</span>;
}
