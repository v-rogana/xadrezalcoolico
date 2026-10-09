const CABECALHO = ['Data', 'Bar', 'Partida', 'Rosa', 'Instagram rosa', 'Amarelo', 'Instagram amarelo',
  'Vencedor', 'Torcida rosa', 'Torcida amarelo', 'Início', 'Fim'];
const VENCEDOR = { rosa: 'Rosa', amarelo: 'Amarelo', anulada: 'Anulada' };

// Apelido vem de qualquer pessoa: um "=" no começo viraria fórmula no Excel.
function celula(valor) {
  let s = valor == null ? '' : String(valor);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// CSV com ";" e BOM: abre direto no Excel em português.
export function baixarPlanilha(linhas) {
  const corpo = linhas.map((l) => [
    l.data, l.bar, l.partida, l.rosa, l.rosa_ig, l.amarelo, l.amarelo_ig,
    VENCEDOR[l.vencedor] ?? l.vencedor, l.votos_rosa, l.votos_amarelo, l.inicio, l.fim,
  ]);
  const texto = '﻿' + [CABECALHO, ...corpo].map((r) => r.map(celula).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob([texto], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `xadrez-alcoolico-partidas-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
