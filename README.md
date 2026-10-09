# Xadrez Alcoólico

Site da noite. Em `/` fica a mesa ao vivo, a torcida, a fila e o placar, para quem chega pelo QR da lona. Em `/painel` fica a operação da equipe, protegida por senha.

- **Site:** React + Vite, em `site/`. Publicado no GitHub Pages a cada push na `main`.
- **Dados:** Supabase. A página só lê a tabela `public.publico`, um retrato sem @ e sem identificação de celular, e escreve por funções. Todo o resto fica no schema `interno`, que a API não expõe. O banco é criado pelos arquivos de `supabase/migrations/`.
- **Marca:** `design-system/` é a cópia do projeto no Claude Design. O site usa os tokens dele, então trocar `--font-display` lá muda a fonte aqui.

## Rodar no computador

```sh
npm install
npm run dev        # http://localhost:5173 e http://localhost:5173/painel/
```

## Banco

Os comandos abaixo precisam de um `.env.local`, que fica fora do git, com `SUPABASE_DB_HOST`, `SUPABASE_PROJECT_REF` e `SUPABASE_DB_PASSWORD`.

```sh
npm run migrar                          # aplica as migrações que faltam
npm run senha-painel -- <nova senha>    # troca a senha do painel e derruba quem estiver logado
```

No painel, o botão **Baixar planilha** gera um arquivo para o Excel com uma linha por partida.
