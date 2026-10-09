// Aplica, em ordem, os arquivos de supabase/migrations que ainda não rodaram.
// Uso: npm run migrar
import fs from 'node:fs';
import path from 'node:path';
import { conectar } from './banco.mjs';

const pasta = 'supabase/migrations';
const banco = await conectar();
try {
  await banco.query(`
    create schema if not exists interno;
    create table if not exists interno.migracoes (nome text primary key, em timestamptz not null default now());
  `);
  const feitas = new Set((await banco.query('select nome from interno.migracoes')).rows.map((r) => r.nome));
  const arquivos = fs.readdirSync(pasta).filter((f) => f.endsWith('.sql')).sort();
  let aplicadas = 0;
  for (const arquivo of arquivos) {
    if (feitas.has(arquivo)) continue;
    const sql = fs.readFileSync(path.join(pasta, arquivo), 'utf8');
    await banco.query('begin');
    try {
      await banco.query(sql);
      await banco.query('insert into interno.migracoes (nome) values ($1)', [arquivo]);
      await banco.query('commit');
      console.log('aplicada:', arquivo);
      aplicadas++;
    } catch (erro) {
      await banco.query('rollback');
      throw new Error(`${arquivo}: ${erro.message}`);
    }
  }
  if (!aplicadas) console.log('nada novo pra aplicar');
} finally {
  await banco.end();
}
