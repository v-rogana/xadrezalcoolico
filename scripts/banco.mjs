// Conexão com o Postgres do Supabase pelo pooler (o host direto é só IPv6).
// Lê SUPABASE_DB_HOST, SUPABASE_PROJECT_REF e SUPABASE_DB_PASSWORD do .env.local.
import pg from 'pg';

export async function conectar() {
  const { SUPABASE_DB_HOST, SUPABASE_PROJECT_REF, SUPABASE_DB_PASSWORD } = process.env;
  if (!SUPABASE_DB_HOST || !SUPABASE_PROJECT_REF || !SUPABASE_DB_PASSWORD) {
    throw new Error('Faltam SUPABASE_DB_HOST, SUPABASE_PROJECT_REF ou SUPABASE_DB_PASSWORD no .env.local');
  }
  const cliente = new pg.Client({
    host: SUPABASE_DB_HOST,
    port: 5432,
    user: `postgres.${SUPABASE_PROJECT_REF}`,
    password: SUPABASE_DB_PASSWORD,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
  });
  await cliente.connect();
  return cliente;
}
