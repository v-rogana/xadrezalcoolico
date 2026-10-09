import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const caminho = (p) => fileURLToPath(new URL(p, import.meta.url));

// O site mora em site/ e importa o design-system/ da raiz do repositório.
// BASE_PATH: "/xadrezalcoolico/" enquanto o site estiver em v-rogana.github.io;
// "/" quando o domínio xadrezalcoolico.com.br estiver apontado.
export default defineConfig({
  root: 'site',
  envDir: '..',
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { fs: { allow: [caminho('.')] } },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        pagina: caminho('site/index.html'),
        painel: caminho('site/painel/index.html'),
        comoJoga: caminho('site/como-joga/index.html'),
        parcerias: caminho('site/parcerias/index.html'),
      },
      output: {
        // Bibliotecas num arquivo só: mudam pouco e ficam em cache entre as noites.
        manualChunks: (id) => (id.includes('node_modules') ? 'bibliotecas' : undefined),
      },
    },
  },
});
