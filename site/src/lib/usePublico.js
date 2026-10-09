import { useEffect, useRef, useState } from 'react';
import { supabase } from './supabase.js';

// O retrato público da noite, ao vivo: busca uma vez e depois escuta as mudanças.
// Celular dorme e perde a conexão, então busca de novo ao voltar pra aba,
// ao reconectar e, por garantia, a cada 30 segundos.
export function usePublico() {
  const [estado, setEstado] = useState({ dados: null, semConexao: false });
  const ultimo = useRef(0);

  useEffect(() => {
    let vivo = true;

    const aplicar = (linha) => {
      if (!vivo || !linha?.dados) return;
      const quando = Date.parse(linha.atualizado_em) || 0;
      if (quando < ultimo.current) return; // chegou fora de ordem
      ultimo.current = quando;
      setEstado({ dados: linha.dados, semConexao: false });
    };

    const buscar = async () => {
      const { data, error } = await supabase
        .from('publico').select('dados, atualizado_em').eq('id', 1).single();
      if (!vivo) return;
      if (error) setEstado((e) => ({ ...e, semConexao: true }));
      else aplicar(data);
    };

    buscar();
    const canal = supabase
      .channel('publico')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'publico' }, (m) => aplicar(m.new))
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') buscar();
      });
    const aoVoltar = () => {
      if (document.visibilityState === 'visible') buscar();
    };
    document.addEventListener('visibilitychange', aoVoltar);
    window.addEventListener('online', buscar);
    const reserva = setInterval(buscar, 30000);

    return () => {
      vivo = false;
      supabase.removeChannel(canal);
      document.removeEventListener('visibilitychange', aoVoltar);
      window.removeEventListener('online', buscar);
      clearInterval(reserva);
    };
  }, []);

  return estado;
}
