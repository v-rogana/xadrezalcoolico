// Define (ou troca) a senha do /painel. Só o hash vai pro banco.
// Uso: npm run senha-painel -- <senha>
// Trocar a senha derruba quem estiver logado.
import { conectar } from './banco.mjs';

const senha = process.argv[2];
if (!senha || senha.length < 6) {
  console.error('Uso: npm run senha-painel -- <senha com 6 ou mais caracteres>');
  process.exit(1);
}
const banco = await conectar();
try {
  await banco.query(
    `insert into interno.config (chave, valor)
     values ('senha_hash', extensions.crypt($1, extensions.gen_salt('bf', 10)))
     on conflict (chave) do update set valor = excluded.valor`,
    [senha],
  );
  await banco.query('delete from interno.sessoes');
  console.log('senha do painel definida');
} finally {
  await banco.end();
}
