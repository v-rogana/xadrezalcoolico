// localStorage pode não existir (aba anônima, bloqueio): nunca deixa a página cair por isso.
export function ler(chave) {
  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}

export function gravar(chave, valor) {
  try {
    if (valor == null) localStorage.removeItem(chave);
    else localStorage.setItem(chave, valor);
  } catch {
    // sem armazenamento: vale só enquanto a página estiver aberta
  }
}
