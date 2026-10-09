import { ler, gravar } from './armazem.js';

// Id aleatório que identifica este celular pro banco: um voto e uma inscrição por celular.
// Quem limpar o navegador vira outro celular; numa mesa de bar, tudo bem.
let naMemoria = null;

function novoId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function meuCelular() {
  let id = ler('xa:celular') || naMemoria;
  if (!id) {
    id = novoId();
    gravar('xa:celular', id);
  }
  naMemoria = id;
  return id;
}
