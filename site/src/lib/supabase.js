import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

// Chama uma função do banco. Os erros que o banco levanta de propósito (P0001)
// já vêm em português pra mostrar; o resto vira um aviso de conexão.
export async function rpc(nome, args) {
  const { data, error } = await supabase.rpc(nome, args);
  if (error) {
    const erro = new Error(
      error.code === 'P0001' ? error.message : 'Não deu certo. Confere a internet e tenta de novo.',
    );
    erro.sessao = error.hint === 'sessao';
    throw erro;
  }
  return data;
}
