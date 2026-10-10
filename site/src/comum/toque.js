// Celular não tem hover, então o "isto é clicável" vem de outro jeito:
// cada botão ou link dá uma cutucada (inclina e volta) uma vez, quando aparece na tela.
// O CSS só anima .cutuca em tela de toque e respeita quem pediu menos movimento.

// O Safari do iPhone só aplica :active (o "afundar" dos botões) se a página escutar o toque.
document.addEventListener('touchstart', () => {}, { passive: true });

const CLICAVEIS = '.btn, .btn-link, .link, .recorte, .casaca';

if (window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
  let fila = 0;
  const visto = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      visto.unobserve(e.target);
      // Quem aparece junto cutuca em sequência, não tudo de uma vez.
      e.target.style.setProperty('--atraso', `${(fila++ % 4) * 90}ms`);
      e.target.classList.add('cutuca');
      e.target.addEventListener('animationend', () => e.target.classList.remove('cutuca'), { once: true });
    }
    fila = 0;
  }, { threshold: 0.8 });

  const observar = (raiz) => {
    if (raiz.matches?.(CLICAVEIS)) visto.observe(raiz);
    raiz.querySelectorAll?.(CLICAVEIS).forEach((el) => visto.observe(el));
  };
  // Começa só depois que os dados ao vivo chegam: enquanto carrega, a página é curta e o rodapé
  // aparece no topo, gastando a cutucada antes de alguém rolar até lá.
  // Depois, o React continua redesenhando: observa o que for entrando.
  window.addEventListener('load', () => setTimeout(() => {
    observar(document.body);
    new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach(observar)))
      .observe(document.body, { childList: true, subtree: true });
  }, 900));
}
