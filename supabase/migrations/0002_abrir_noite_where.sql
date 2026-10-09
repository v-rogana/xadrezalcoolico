-- Chamadas pela API passam pelo safeupdate do Supabase, que recusa DELETE sem WHERE.
create or replace function public.painel_abrir_noite(p_token text, p_bar text, p_premio text, p_cardapio jsonb)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  if interno.noite_aberta() is not null then
    raise exception 'Já tem uma noite aberta.';
  end if;
  delete from interno.fila where true;
  insert into interno.noites (bar, premio, cardapio)
  values (interno.limpar_texto(p_bar, 40), interno.limpar_texto(p_premio, 40), interno.limpar_cardapio(p_cardapio));
  insert into interno.config (chave, valor) values ('proxima', '')
  on conflict (chave) do update set valor = excluded.valor;
  perform interno.publicar();
end $$;
