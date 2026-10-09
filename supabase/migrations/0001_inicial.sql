-- Xadrez Alcoólico: noites, fila, partidas, votos e o painel.
--
-- Tudo que é privado (apelidos com @, celulares, votos, senha) mora no schema
-- "interno", que a API do Supabase não expõe. A página lê só public.publico,
-- um retrato do que todo mundo pode ver, e recebe as mudanças ao vivo por ele.
-- Toda escrita passa por funções: as da página identificam o celular por um id
-- aleatório guardado nele; as do painel exigem o token que a senha devolve.

create schema if not exists interno;
revoke all on schema interno from public, anon, authenticated;

-- ---------------------------------------------------------------- tabelas

create table interno.noites (
  id uuid primary key default gen_random_uuid(),
  aberta boolean not null default true,
  bar text not null default '',
  premio text not null default '',
  cardapio jsonb not null,
  aberta_em timestamptz not null default now(),
  encerrada_em timestamptz
);
create unique index noites_so_uma_aberta on interno.noites ((true)) where aberta;

create table interno.fila (
  id uuid primary key default gen_random_uuid(),
  noite_id uuid not null references interno.noites(id) on delete cascade,
  tipo text not null check (tipo in ('dupla', 'solo')),
  -- [{"nome": "Ana", "ig": "ana.b", "d": "<celular>"}]; "d" nunca sai do banco
  jogadores jsonb not null,
  -- ids de solos juntados nesta entrada: o celular deles se acha por aqui
  outros_ids uuid[] not null default '{}',
  criado_em timestamptz not null default now()
);
create index fila_noite on interno.fila (noite_id, criado_em);

create table interno.partidas (
  id uuid primary key default gen_random_uuid(),
  noite_id uuid not null references interno.noites(id) on delete cascade,
  n int not null,
  rosa jsonb not null,     -- {"nome": "Ana", "ig": "ana.b"}
  amarelo jsonb not null,
  fila_ids uuid[] not null default '{}',
  inicio timestamptz not null default now(),
  fim timestamptz,
  vencedor text check (vencedor in ('rosa', 'amarelo', 'anulada')),
  votos_rosa int,
  votos_amarelo int
);
create unique index partidas_so_uma_rolando on interno.partidas (noite_id) where fim is null;

create table interno.votos (
  partida_id uuid not null references interno.partidas(id) on delete cascade,
  device text not null,
  lado text not null check (lado in ('rosa', 'amarelo')),
  em timestamptz not null default now(),
  primary key (partida_id, device)
);

create table interno.config (chave text primary key, valor text not null);
create table interno.sessoes (token text primary key, expira_em timestamptz not null);
create table interno.tentativas (ip text not null, em timestamptz not null default now());

create table public.publico (
  id int primary key check (id = 1),
  dados jsonb not null,
  atualizado_em timestamptz not null default now()
);
alter table public.publico enable row level security;
create policy "todo mundo lê o retrato público" on public.publico
  for select to anon, authenticated using (true);
revoke all on public.publico from anon, authenticated;
grant select on public.publico to anon, authenticated;
alter publication supabase_realtime add table public.publico;

-- ---------------------------------------------------------------- ajudantes

create function interno.cardapio_padrao() returns jsonb
language sql immutable set search_path = '' as $$
  select '["Xeque Mate", "Gin Queen", "Whisky White Horse", "Vinho Vila do Bispo", "Cachaça da Torre", "Corote"]'::jsonb
$$;

create function interno.config_valor(p_chave text) returns text
language sql stable set search_path = '' as $$
  select valor from interno.config where chave = p_chave
$$;

-- Toda escrita trava a linha do retrato antes de mexer. Assim as escritas
-- entram em fila e o retrato nunca é montado com dado velho.
create function interno.travar() returns void
language plpgsql set search_path = '' as $$
begin
  perform 1 from public.publico where id = 1 for update;
end $$;

create function interno.noite_aberta() returns uuid
language sql stable set search_path = '' as $$
  select id from interno.noites where aberta
$$;

create function interno.checar_device(p_device text) returns void
language plpgsql set search_path = '' as $$
begin
  if p_device is null or p_device !~ '^[A-Za-z0-9-]{16,64}$' then
    raise exception 'Celular não identificado. Recarrega a página.';
  end if;
end $$;

create function interno.checar_sessao(p_token text) returns void
language plpgsql set search_path = '' as $$
begin
  if p_token is null or not exists (
    select 1 from interno.sessoes where token = p_token and expira_em > now()
  ) then
    raise exception 'Sua sessão acabou. Entra de novo.' using hint = 'sessao';
  end if;
end $$;

create function interno.limpar_texto(p_texto text, p_max int) returns text
language sql immutable set search_path = '' as $$
  select left(btrim(regexp_replace(coalesce(p_texto, ''), '\s+', ' ', 'g')), p_max)
$$;

create function interno.limpar_jogadores(p_tipo text, p_jogadores jsonb, p_device text)
returns jsonb
language plpgsql set search_path = '' as $$
declare
  v_saida jsonb := '[]';
  v_j jsonb;
  v_nome text;
  v_ig text;
begin
  if p_tipo is null or p_tipo not in ('dupla', 'solo') then
    raise exception 'Escolhe se é em dupla ou solo.';
  end if;
  if p_jogadores is null or jsonb_typeof(p_jogadores) <> 'array'
     or jsonb_array_length(p_jogadores) <> (case p_tipo when 'dupla' then 2 else 1 end) then
    raise exception 'Dupla tem dois apelidos; solo, um.';
  end if;
  for v_j in select value from jsonb_array_elements(p_jogadores) loop
    v_nome := btrim(regexp_replace(coalesce(v_j->>'nome', ''), '\s+', ' ', 'g'));
    v_ig := lower(regexp_replace(btrim(coalesce(v_j->>'ig', '')), '^@+', ''));
    if v_nome = '' then
      raise exception 'Falta apelido.';
    end if;
    if char_length(v_nome) > 16 then
      raise exception 'Apelido com no máximo 16 letras.';
    end if;
    if char_length(v_ig) > 30 or (v_ig <> '' and v_ig !~ '^[a-z0-9._]+$') then
      raise exception 'Esse @ não parece de Instagram.';
    end if;
    v_saida := v_saida || jsonb_build_array(jsonb_build_object('nome', v_nome, 'ig', v_ig, 'd', p_device));
  end loop;
  return v_saida;
end $$;

create function interno.limpar_cardapio(p_cardapio jsonb) returns jsonb
language plpgsql set search_path = '' as $$
declare
  v_padrao jsonb := interno.cardapio_padrao();
  v_saida jsonb := '[]';
  v_item text;
begin
  for i in 0..5 loop
    v_item := case when p_cardapio is not null and jsonb_typeof(p_cardapio) = 'array'
                   then interno.limpar_texto(p_cardapio->>i, 40) else '' end;
    v_saida := v_saida || to_jsonb(coalesce(nullif(v_item, ''), v_padrao->>i));
  end loop;
  return v_saida;
end $$;

create function interno.contar_votos(p_partida uuid) returns jsonb
language sql stable set search_path = '' as $$
  select jsonb_build_object(
    'rosa', count(*) filter (where lado = 'rosa'),
    'amarelo', count(*) filter (where lado = 'amarelo'))
  from interno.votos where partida_id = p_partida
$$;

create function interno.nomes(p_jogadores jsonb) returns jsonb
language sql immutable set search_path = '' as $$
  select coalesce(jsonb_agg(j->>'nome' order by o), '[]')
  from jsonb_array_elements(p_jogadores) with ordinality as t(j, o)
$$;

-- O que a página pode ver. Sem @, sem celulares, sem votos individuais.
create function interno.montar_publico() returns jsonb
language plpgsql set search_path = '' as $$
declare
  v_noite interno.noites;
begin
  select * into v_noite from interno.noites order by aberta desc, aberta_em desc limit 1;
  return jsonb_build_object(
    'noite', case when v_noite.id is null then null else jsonb_build_object(
      'id', v_noite.id, 'aberta', v_noite.aberta, 'bar', v_noite.bar,
      'premio', v_noite.premio, 'cardapio', v_noite.cardapio,
      'aberta_em', v_noite.aberta_em, 'encerrada_em', v_noite.encerrada_em) end,
    'proxima', coalesce(interno.config_valor('proxima'), ''),
    'mesa', (
      select jsonb_build_object(
        'id', p.id, 'n', p.n, 'rosa', p.rosa->>'nome', 'amarelo', p.amarelo->>'nome',
        'fila_ids', to_jsonb(p.fila_ids), 'inicio', p.inicio,
        'votos', interno.contar_votos(p.id))
      from interno.partidas p where p.noite_id = v_noite.id and p.fim is null),
    'fila', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id, 'ids', to_jsonb(array[f.id] || f.outros_ids),
        'tipo', f.tipo, 'nomes', interno.nomes(f.jogadores)) order by f.criado_em)
      from interno.fila f where f.noite_id = v_noite.id), '[]'),
    'hist', coalesce((
      select jsonb_agg(jsonb_build_object(
        'n', p.n, 'vencedor', p.vencedor,
        'nome', case p.vencedor when 'rosa' then p.rosa->>'nome' when 'amarelo' then p.amarelo->>'nome' end)
        order by p.n desc)
      from interno.partidas p where p.noite_id = v_noite.id and p.fim is not null), '[]'),
    'placar', (
      select jsonb_build_object(
        'rosa', count(*) filter (where vencedor = 'rosa'),
        'amarelo', count(*) filter (where vencedor = 'amarelo'))
      from interno.partidas where noite_id = v_noite.id),
    'proximo_n', (select coalesce(max(n), 0) + 1 from interno.partidas where noite_id = v_noite.id)
  );
end $$;

create function interno.publicar() returns void
language plpgsql set search_path = '' as $$
begin
  update public.publico set dados = interno.montar_publico(), atualizado_em = now() where id = 1;
end $$;

insert into public.publico (id, dados) values (1, interno.montar_publico());

-- ---------------------------------------------------------------- página

create function public.entrar_fila(p_device text, p_tipo text, p_jogadores jsonb)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_noite uuid;
  v_id uuid;
begin
  perform interno.checar_device(p_device);
  perform interno.travar();
  v_noite := interno.noite_aberta();
  if v_noite is null then
    raise exception 'A mesa tá fechada agora.';
  end if;
  if exists (
    select 1 from interno.fila
    where noite_id = v_noite and jogadores @> jsonb_build_array(jsonb_build_object('d', p_device))
  ) then
    raise exception 'Esse celular já tá na fila.';
  end if;
  insert into interno.fila (noite_id, tipo, jogadores)
  values (v_noite, p_tipo, interno.limpar_jogadores(p_tipo, p_jogadores, p_device))
  returning id into v_id;
  perform interno.publicar();
  return v_id;
end $$;

-- Quem sai de uma dupla que veio junta tira a dupla toda. Se a dupla foi
-- formada pelo painel juntando dois solos, quem fica volta a ser solo.
create function public.sair_fila(p_device text, p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_entrada interno.fila;
  v_resto jsonb;
begin
  perform interno.checar_device(p_device);
  perform interno.travar();
  select * into v_entrada from interno.fila
  where (id = p_id or p_id = any(outros_ids))
    and jogadores @> jsonb_build_array(jsonb_build_object('d', p_device));
  if v_entrada.id is null then
    raise exception 'Não achei você na fila.';
  end if;
  select coalesce(jsonb_agg(j order by o), '[]') into v_resto
  from jsonb_array_elements(v_entrada.jogadores) with ordinality as t(j, o)
  where j->>'d' is not null and j->>'d' <> p_device;
  if jsonb_array_length(v_resto) = 0 then
    delete from interno.fila where id = v_entrada.id;
  else
    update interno.fila set tipo = 'solo', jogadores = v_resto where id = v_entrada.id;
  end if;
  perform interno.publicar();
end $$;

-- Votar de novo troca o lado: é o "virar casaca".
create function public.votar(p_device text, p_partida uuid, p_lado text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_device(p_device);
  if p_lado is null or p_lado not in ('rosa', 'amarelo') then
    raise exception 'Escolhe rosa ou amarelo.';
  end if;
  perform interno.travar();
  if not exists (select 1 from interno.partidas where id = p_partida and fim is null) then
    raise exception 'Essa partida já acabou.';
  end if;
  insert into interno.votos (partida_id, device, lado) values (p_partida, p_device, p_lado)
  on conflict (partida_id, device) do update set lado = excluded.lado, em = now();
  perform interno.publicar();
end $$;

create function public.meu_estado(p_device text) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_device(p_device);
  return jsonb_build_object(
    'entrada', (
      select f.id from interno.fila f
      where f.noite_id = interno.noite_aberta()
        and f.jogadores @> jsonb_build_array(jsonb_build_object('d', p_device))
      limit 1),
    'voto', (
      select jsonb_build_object('partida', v.partida_id, 'lado', v.lado)
      from interno.votos v join interno.partidas p on p.id = v.partida_id
      where v.device = p_device and p.fim is null
      limit 1));
end $$;

-- ---------------------------------------------------------------- painel

create function public.painel_entrar(p_senha text) returns text
language plpgsql security definer set search_path = '' as $$
declare
  v_cabecalhos jsonb := coalesce(nullif(current_setting('request.headers', true), ''), '{}')::jsonb;
  v_ip text;
  v_hash text;
  v_token text;
begin
  v_ip := coalesce(
    nullif(v_cabecalhos->>'cf-connecting-ip', ''),
    nullif(btrim(split_part(coalesce(v_cabecalhos->>'x-forwarded-for', ''), ',', 1)), ''),
    'desconhecido');
  delete from interno.tentativas where em < now() - interval '1 day';
  if (select count(*) from interno.tentativas where ip = v_ip and em > now() - interval '15 minutes') >= 10 then
    raise exception 'Muitas tentativas erradas. Espera 15 minutos.';
  end if;
  v_hash := interno.config_valor('senha_hash');
  if v_hash is null then
    raise exception 'A senha do painel ainda não foi definida.';
  end if;
  if p_senha is null or extensions.crypt(p_senha, v_hash) <> v_hash then
    insert into interno.tentativas (ip) values (v_ip);
    return null;
  end if;
  delete from interno.sessoes where expira_em < now();
  v_token := encode(extensions.gen_random_bytes(32), 'hex');
  insert into interno.sessoes (token, expira_em) values (v_token, now() + interval '12 hours');
  return v_token;
end $$;

create function public.painel_sair(p_token text) returns void
language sql security definer set search_path = '' as $$
  delete from interno.sessoes where token = p_token
$$;

create function public.painel_estado(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_noite interno.noites;
begin
  perform interno.checar_sessao(p_token);
  select * into v_noite from interno.noites order by aberta desc, aberta_em desc limit 1;
  return jsonb_build_object(
    'noite', case when v_noite.id is null then null else jsonb_build_object(
      'id', v_noite.id, 'aberta', v_noite.aberta, 'bar', v_noite.bar,
      'premio', v_noite.premio, 'cardapio', v_noite.cardapio,
      'aberta_em', v_noite.aberta_em, 'encerrada_em', v_noite.encerrada_em) end,
    'proxima', coalesce(interno.config_valor('proxima'), ''),
    'mesa', (
      select jsonb_build_object(
        'id', p.id, 'n', p.n, 'rosa', p.rosa, 'amarelo', p.amarelo,
        'inicio', p.inicio, 'votos', interno.contar_votos(p.id))
      from interno.partidas p where p.noite_id = v_noite.id and p.fim is null),
    'fila', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id, 'tipo', f.tipo,
        'jogadores', (
          select jsonb_agg(jsonb_build_object('nome', j->>'nome', 'ig', j->>'ig') order by o)
          from jsonb_array_elements(f.jogadores) with ordinality as t(j, o)))
        order by f.criado_em)
      from interno.fila f where f.noite_id = v_noite.id), '[]'),
    'placar', (
      select jsonb_build_object(
        'rosa', count(*) filter (where vencedor = 'rosa'),
        'amarelo', count(*) filter (where vencedor = 'amarelo'),
        'partidas', count(*) filter (where fim is not null))
      from interno.partidas where noite_id = v_noite.id),
    'proximo_n', (select coalesce(max(n), 0) + 1 from interno.partidas where noite_id = v_noite.id));
end $$;

create function public.painel_abrir_noite(p_token text, p_bar text, p_premio text, p_cardapio jsonb)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  if interno.noite_aberta() is not null then
    raise exception 'Já tem uma noite aberta.';
  end if;
  delete from interno.fila;
  insert into interno.noites (bar, premio, cardapio)
  values (interno.limpar_texto(p_bar, 40), interno.limpar_texto(p_premio, 40), interno.limpar_cardapio(p_cardapio));
  insert into interno.config (chave, valor) values ('proxima', '')
  on conflict (chave) do update set valor = excluded.valor;
  perform interno.publicar();
end $$;

create function public.painel_editar_noite(p_token text, p_bar text, p_premio text, p_cardapio jsonb)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  update interno.noites
  set bar = interno.limpar_texto(p_bar, 40),
      premio = interno.limpar_texto(p_premio, 40),
      cardapio = interno.limpar_cardapio(p_cardapio)
  where aberta;
  if not found then
    raise exception 'Nenhuma noite aberta.';
  end if;
  perform interno.publicar();
end $$;

-- Partida que estiver rolando é anulada. A fila some; as partidas ficam.
create function public.painel_encerrar_noite(p_token text, p_proxima text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_noite uuid;
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  v_noite := interno.noite_aberta();
  if v_noite is null then
    raise exception 'Nenhuma noite aberta.';
  end if;
  update interno.partidas p
  set fim = now(), vencedor = 'anulada',
      votos_rosa = (interno.contar_votos(p.id)->>'rosa')::int,
      votos_amarelo = (interno.contar_votos(p.id)->>'amarelo')::int
  where p.noite_id = v_noite and p.fim is null;
  delete from interno.fila where noite_id = v_noite;
  update interno.noites set aberta = false, encerrada_em = now() where id = v_noite;
  insert into interno.config (chave, valor) values ('proxima', interno.limpar_texto(p_proxima, 60))
  on conflict (chave) do update set valor = excluded.valor;
  perform interno.publicar();
end $$;

create function public.painel_salvar_proxima(p_token text, p_texto text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  insert into interno.config (chave, valor) values ('proxima', interno.limpar_texto(p_texto, 60))
  on conflict (chave) do update set valor = excluded.valor;
  perform interno.publicar();
end $$;

-- Chama a primeira dupla da fila. As cores são sorteadas.
create function public.painel_chamar(p_token text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_noite uuid;
  v_entrada interno.fila;
  v_a jsonb;
  v_b jsonb;
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  v_noite := interno.noite_aberta();
  if v_noite is null then
    raise exception 'Nenhuma noite aberta.';
  end if;
  if exists (select 1 from interno.partidas where noite_id = v_noite and fim is null) then
    raise exception 'Ainda tem partida na mesa.';
  end if;
  select * into v_entrada from interno.fila
  where noite_id = v_noite and tipo = 'dupla' order by criado_em limit 1;
  if v_entrada.id is null then
    raise exception 'Não tem dupla pronta na fila.';
  end if;
  v_a := jsonb_build_object('nome', v_entrada.jogadores->0->>'nome', 'ig', v_entrada.jogadores->0->>'ig');
  v_b := jsonb_build_object('nome', v_entrada.jogadores->1->>'nome', 'ig', v_entrada.jogadores->1->>'ig');
  if random() < 0.5 then
    select v_b, v_a into v_a, v_b;
  end if;
  insert into interno.partidas (noite_id, n, rosa, amarelo, fila_ids)
  values (
    v_noite,
    (select coalesce(max(n), 0) + 1 from interno.partidas where noite_id = v_noite),
    v_a, v_b, array[v_entrada.id] || v_entrada.outros_ids);
  delete from interno.fila where id = v_entrada.id;
  perform interno.publicar();
end $$;

-- Os votos acompanham a pessoa, não a cor.
create function public.painel_inverter(p_token text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_partida uuid;
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  update interno.partidas set rosa = amarelo, amarelo = rosa
  where noite_id = interno.noite_aberta() and fim is null
  returning id into v_partida;
  if v_partida is null then
    raise exception 'Não tem partida na mesa.';
  end if;
  update interno.votos set lado = case lado when 'rosa' then 'amarelo' else 'rosa' end
  where partida_id = v_partida;
  perform interno.publicar();
end $$;

create function public.painel_resultado(p_token text, p_partida uuid, p_vencedor text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_sessao(p_token);
  if p_vencedor is null or p_vencedor not in ('rosa', 'amarelo', 'anulada') then
    raise exception 'Resultado inválido.';
  end if;
  perform interno.travar();
  update interno.partidas p
  set fim = now(), vencedor = p_vencedor,
      votos_rosa = (interno.contar_votos(p.id)->>'rosa')::int,
      votos_amarelo = (interno.contar_votos(p.id)->>'amarelo')::int
  where p.id = p_partida and p.fim is null;
  if not found then
    raise exception 'Essa partida já tinha acabado.';
  end if;
  perform interno.publicar();
end $$;

-- Desfaz um resultado registrado há menos de um minuto, se a mesa ainda não
-- recebeu outra partida.
create function public.painel_desfazer(p_token text, p_partida uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_noite uuid;
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  select noite_id into v_noite from interno.partidas
  where id = p_partida and fim > now() - interval '1 minute';
  if v_noite is null then
    raise exception 'Passou do tempo de desfazer.';
  end if;
  if exists (select 1 from interno.partidas where noite_id = v_noite and fim is null) then
    raise exception 'Já tem outra partida na mesa.';
  end if;
  update interno.partidas
  set fim = null, vencedor = null, votos_rosa = null, votos_amarelo = null
  where id = p_partida;
  perform interno.publicar();
end $$;

create function public.painel_adicionar(p_token text, p_tipo text, p_jogadores jsonb) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_noite uuid;
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  v_noite := interno.noite_aberta();
  if v_noite is null then
    raise exception 'Nenhuma noite aberta.';
  end if;
  insert into interno.fila (noite_id, tipo, jogadores)
  values (v_noite, p_tipo, interno.limpar_jogadores(p_tipo, p_jogadores, null));
  perform interno.publicar();
end $$;

create function public.painel_remover(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  delete from interno.fila where id = p_id;
  perform interno.publicar();
end $$;

-- Junta dois solos. A dupla fica no lugar de quem chegou antes.
create function public.painel_juntar(p_token text, p_a uuid, p_b uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_primeiro interno.fila;
  v_segundo interno.fila;
begin
  perform interno.checar_sessao(p_token);
  perform interno.travar();
  if p_a is null or p_b is null or p_a = p_b then
    raise exception 'Escolhe dois solos diferentes.';
  end if;
  select * into v_primeiro from interno.fila
  where id in (p_a, p_b) and tipo = 'solo' and noite_id = interno.noite_aberta()
  order by criado_em limit 1;
  select * into v_segundo from interno.fila
  where id in (p_a, p_b) and tipo = 'solo' and noite_id = interno.noite_aberta()
  order by criado_em desc limit 1;
  if v_primeiro.id is null or v_primeiro.id = v_segundo.id then
    raise exception 'Esses dois não são solos da fila.';
  end if;
  update interno.fila
  set tipo = 'dupla',
      jogadores = v_primeiro.jogadores || v_segundo.jogadores,
      outros_ids = v_primeiro.outros_ids || v_segundo.id || v_segundo.outros_ids
  where id = v_primeiro.id;
  delete from interno.fila where id = v_segundo.id;
  perform interno.publicar();
end $$;

-- Uma linha por partida terminada, de todas as noites, pra virar planilha.
create function public.painel_planilha(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  perform interno.checar_sessao(p_token);
  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'data', to_char(p.inicio at time zone 'America/Sao_Paulo', 'DD/MM/YYYY'),
      'bar', n.bar,
      'partida', p.n,
      'rosa', p.rosa->>'nome', 'rosa_ig', p.rosa->>'ig',
      'amarelo', p.amarelo->>'nome', 'amarelo_ig', p.amarelo->>'ig',
      'vencedor', p.vencedor,
      'votos_rosa', p.votos_rosa, 'votos_amarelo', p.votos_amarelo,
      'inicio', to_char(p.inicio at time zone 'America/Sao_Paulo', 'HH24:MI'),
      'fim', to_char(p.fim at time zone 'America/Sao_Paulo', 'HH24:MI'))
      order by p.inicio)
    from interno.partidas p join interno.noites n on n.id = p.noite_id
    where p.fim is not null), '[]');
end $$;

-- ---------------------------------------------------------------- permissões

revoke execute on all functions in schema interno from public, anon, authenticated;

revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function
  public.entrar_fila(text, text, jsonb),
  public.sair_fila(text, uuid),
  public.votar(text, uuid, text),
  public.meu_estado(text),
  public.painel_entrar(text),
  public.painel_sair(text),
  public.painel_estado(text),
  public.painel_abrir_noite(text, text, text, jsonb),
  public.painel_editar_noite(text, text, text, jsonb),
  public.painel_encerrar_noite(text, text),
  public.painel_salvar_proxima(text, text),
  public.painel_chamar(text),
  public.painel_inverter(text),
  public.painel_resultado(text, uuid, text),
  public.painel_desfazer(text, uuid),
  public.painel_adicionar(text, text, jsonb),
  public.painel_remover(text, uuid),
  public.painel_juntar(text, uuid, uuid),
  public.painel_planilha(text)
to anon, authenticated;
