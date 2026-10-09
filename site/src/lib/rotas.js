// BASE_URL muda entre v-rogana.github.io/xadrezalcoolico/ e o domínio próprio.
const base = import.meta.env.BASE_URL;

export const ROTAS = {
  inicio: base,
  comoJoga: `${base}como-joga/`,
  parcerias: `${base}parcerias/`,
};
