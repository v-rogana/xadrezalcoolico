const fuso = 'America/Sao_Paulo';

// "SEG 19/10"
export function diaCurto(iso) {
  const d = new Date(iso);
  const semana = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', timeZone: fuso })
    .format(d).replace('.', '').toUpperCase();
  const dia = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: fuso }).format(d);
  return `${semana} ${dia}`;
}

// "21:42"
export function hora(iso) {
  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: fuso })
    .format(new Date(iso));
}
