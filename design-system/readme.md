# Xadrez Alcoólico — Design System

Xadrez Alcoólico é uma marca de Belo Horizonte, nascida no Carnaval de BH de 2026. É uma partida de xadrez em que cada peça é um copinho de 10 ml com bebida: quem captura uma peça do adversário bebe o shot. A partida dura cerca de 20 minutos. A marca vive no ponto de consumo — eventos em bares, festas e bloquinhos — quase sempre ao lado da marca do bar parceiro.

**Público:** maiores de 18 anos; grupos de amigos, casais em date, galera geek, quem quer fugir do evento padrão.

**"Produtos" (superfícies):** não há app nem site. A marca existe em peças físicas e sociais:
- Social: foto de perfil do Instagram, posts e stories (inclusive collab com bares)
- Impressos: panfleto A4, placa de mesa (table tent), cardápio das peças (área modular para os nomes das bebidas)
- Jogo & merch: fichas de jogo, adesivos, pano de mesa (cobre o tampo e cai pelos lados)

## Fontes do briefing
Nenhum arquivo, Figma ou código foi fornecido. Tudo aqui foi construído a partir do briefing em texto:
- Cores iniciais: Creme #F7F3EA, Preto #161412, Rosa #EE5E95, Amarelo #F2C230
- Quadriculado do tabuleiro é recurso visual obrigatório
- Símbolo deve ser reconhecível à distância; prever assinatura "Xadrez Alcoólico × [bar parceiro]"

**Referência tipográfica:** duas imagens da fonte comercial "Shaden Inkbleed" (Blankids) — marcador grosso, arredondado, caixa baixa, com texto de apoio em máquina de escrever. Como Shaden é paga, usamos substitutos livres do Google Fonts (ver Tipografia).

## LOGO
Criado do zero (`assets/`, componente `LogoSymbol`), na direção das referências do cliente: peças de xadrez que são copos com bebida.
- **A · Peão-copo (símbolo principal):** peão em silhueta preta cujo corpo é um copinho de vidro com bebida rosa no fundo, borda grossa preta e base em degraus. É o avatar do Instagram e o favicon. Arquivos: `logo-peao.svg`, `logo-peao-amarelo.svg` (bebida amarela, lado B), `logo-peao-negativo.svg` (traço creme sobre preto).
- **B · Duelo (assinatura de destaque):** peão preto com bebida rosa e peão "branco" vazado com bebida amarela, cada um inclinado 15° sobre o canto interno da base, cabeças e colares quase se chocando. Bases: linha de chão (`logo-brinde.svg`, padrão), sem base (`logo-brinde-solo.svg`), faixa de tabuleiro (`logo-brinde-tabuleiro.svg`); todas com `-negativo`. Prop `base` em `<LogoSymbol variant="brinde" />`.
- **C · Tabuleiro de copinhos (selo):** 2×2 de tabuleiro visto de cima; copos cheios (rosa e amarelo) nas casas pretas, copos vazios (já bebidos) nas creme. Para fichas, adesivos pequenos e carimbos. `logo-tabuleiro.svg`, `logo-tabuleiro-negativo.svg`.
- **Logotipo:** "Xadrez Alcoólico" na fonte display, iniciais maiúsculas. Assinatura = símbolo + logotipo (`<Wordmark symbol symbolVariant="peao|brinde|tabuleiro" />`).
- **Foto de perfil:** fundo creme + peão-copo ocupando ~63% da altura.
- **Mínimos:** peão 20 px de altura; brinde 48 px; tabuleiro 16 px. Área de proteção = largura da cabeça do peão.

---

## CONTENT FUNDAMENTALS

**Idioma:** português do Brasil, coloquial de mesa de bar. Pode ter mineirês leve ("bora", "uai" com parcimônia), nunca caricato.

**Tom:** leve, bem-humorado, sociável. Convida, provoca de leve, não ordena. Nunca infantil (nada de "brincadeirinha", ursinhos, diminutivos fofos) e nunca solene de clube de xadrez ("torneio oficial", "categoria", "rating").

**Pessoa:** fala com "você" (ou implícito no imperativo: "Chama alguém da mesa e desafia"). A marca não fala em primeira pessoa institucional; quando precisa, usa "a gente".

**Forma:** frases curtíssimas, de dois tempos. Pergunta + resposta é a estrutura-assinatura:
- "Capturou? Bebeu."
- "Sexta tem xeque-mate."
- "Seu cavalo tá com sede."
- "Xeque-mate com sede."
- "Agora tem tabuleiro aqui." (collab)
- "Uma partida pra mesa." (table tent)

**Vocabulário de xadrez como piada interna:** nomes de peças (rei, dama, torre, bispo, cavalo, peão), xeque, xeque-mate, revanche, e notação algébrica em Courier Prime como adesivo/etiqueta (`Cxe5`, `Dxf7#`). A notação é decoração para quem entende, não instrução.

**Caixa:** títulos e CTAs em caixa de frase; o logotipo sempre "Xadrez Alcoólico". Texto corrido em caixa normal, com ponto final. Metadados (data, hora, preço, bar parceiro) em máquina de escrever negrito caixa alta: `SEX 14/11 · 22H`.

**Emoji:** não. Nem em posts da marca. Pontuação exagerada (!!!) também não.

**Bebida responsável:** toda peça impressa e todo post de evento leva "Proibido para menores de 18 anos. Beba com moderação." ou a tag `+18`. Não incentivar excesso ("beber até cair", "open bar infinito").

---

## VISUAL FOUNDATIONS

**Conceito: o duelo.** Rosa (jogador A) contra Amarelo (jogador B). As duas cores são quentes, de saturação e claridade parecidas, então brigam sem se anular. O que as une: (1) o Preto como tinta comum — todo traço, sombra e texto é preto; (2) o quadriculado; (3) a cor **Encontro** `#F2906A`, a mistura das duas, usada só no "×" do co-branding e em momentos de captura. Creme é o papel.

**Cores** (`tokens/colors.css`): base `--xa-creme/preto/rosa/amarelo`, escalas 100–700 de rosa, amarelo, creme e preto, e semânticos (`--surface-page`, `--surface-ink`, `--player-a`, `--player-b`, `--text-1..3`, `--text-on-ink`). Texto sobre rosa ou amarelo é **sempre preto** (creme sobre rosa reprova contraste). Rosa e amarelo nunca levam texto creme.

**Tipografia** (`tokens/typography.css`) — **display ainda em escolha**: veja o grupo **Fontes** no Design System (20 opções numeradas + comparativo). Trocar `--font-display` atualiza todas as peças.
- Display (provisória): **Shrikhand**, itálica gorda de letreiro de bar, a mais próxima dos logos de referência. Títulos curtos, caixa de frase, sem inclinação extra, entrelinha 1.
- Acento: **Darumadrop One** (`--font-accent`), marcador arredondado. Só detalhes: adesivos, recados, "psiu, sua vez". Nunca em títulos longos ou no logotipo.
- Texto e rótulos: **Courier Prime** 400/700 (máquina de escrever). Corpo 17/1.45; rótulos, datas, preços, notação de lance e nome do bar em 700 caixa alta, tracking 0.06em.
- Peças: Noto Sans Symbols 2, glifos cheios ♚♛♜♝♞♟.
- O "×" (co-branding, versus) é sempre em Courier Prime 700.
Escala: 144 / 104 / 80 / 56 / 40 / 30 / 24 / 19 / 17 / 14 / 12.

**Quadriculado** (`tokens/patterns.css`, componente `Checker`): obrigatório em toda peça. Usos: faixa de topo/rodapé, faixa divisória entre os dois "lados", fundo de foto de perfil, borda do pano de mesa. Paletas: classic (preto/creme), duel (rosa/amarelo), rosa, amarelo (com preto), soft (creme). Casas de 12/24/48 px (digital) ou proporcionais (impresso). Texto nunca diretamente sobre o quadriculado: sempre numa cartela sólida.

**Layout:** composições divididas em dois campos (rosa | amarelo, ou cima | baixo) com uma faixa quadriculada no meio. Blocos retos, borda preta grossa, nada flutuando sem moldura. Margens generosas (72–80 px em 1080; 56 px em A4). Hierarquia por escala tipográfica, não por cor extra.

**Bordas:** traço preto sólido 2 / 3 / 5 px. Tracejado (`dashed`) só para indicar área modular/editável (slot de bebida, QR code, logo do parceiro) e o anel de segurança das fichas.

**Sombras:** sombra dura sem blur, deslocada para baixo-direita: `--shadow-hard-sm` 2/2, `--shadow-hard` 4/4, `--shadow-hard-lg` 8/8; variações rosa/amarelo para elementos pretos. Sem sombras difusas, sem glow, sem inner shadow.

**Cantos:** casas e cartelas retas (radius 0). Pílula (999px) para botões e tags. Círculo para fichas e adesivos redondos. Raio 6/12px só em UI utilitária (inputs, listas).

**Cards:** cartela creme ou cor de jogador, borda preta 3–4px, sombra dura 4–8px. Sem cards arredondados com borda colorida lateral.

**Fundos:** cor chapada (creme, preto, rosa, amarelo) ou quadriculado. Sem gradientes, sem texturas, sem blur, sem transparência decorativa.

**Imagem/fotografia:** ainda não há acervo. Direção recomendada: fotos de mesa real no bar, flash direto, cor quente, grão leve, copinhos e mãos em primeiro plano. Fotos entram em molduras retas com borda preta.

**Ícones:** peças de xadrez como glifo (ver Iconografia).

**Movimento (digital):** curto e com "estalo". Hover: elemento sobe 2px e a sombra cresce. Press: elemento afunda até a sombra (translate = deslocamento da sombra, sombra 0). Easing `--ease-out` 90–160 ms; `--ease-snap` (leve overshoot) para entradas de fichas/adesivos. Sem fades longos.

**Estados:** hover = levantar + sombra maior (não muda de cor). Press = afundar. Foco = sombra dura rosa. Desabilitado = 40% de opacidade, sem sombra.

**Adesivos:** recorte especial com borda creme de ~10px e contorno preto, leve rotação (−6° a 8°).

**Co-branding:** `Xadrez Alcoólico × [bar]`. O × usa Encontro sobre preto (ou preto sobre fundos claros). O logo do parceiro nunca maior que a assinatura XA; sem logo, nome do bar em Courier Prime 700 caixa alta.

---

## ICONOGRAPHY

- **Sistema principal:** peças de xadrez Unicode (U+265A–265F, versões cheias) renderizadas em **Noto Sans Symbols 2** (self-hosted em `fonts/`), coloridas pelo lado (rosa/amarelo/preto/creme) com contorno preto opcional (`-webkit-text-stroke`). Sempre com variation selector U+FE0E para não virar emoji. Componente: `PieceGlyph`.
- **Fichas** (`Ficha`) são o "ícone composto" da marca: círculo na cor do lado + anel tracejado + peça.
- **Caracteres:** `×` (co-branding), `·` (separador de metadados), `#` e `+` da notação de xadrez.
- **Ícones de UI:** a marca não tem set próprio. Se precisar (ex.: ícone de localização, Instagram), use **Lucide** via CDN, stroke 2.5, preto — substituição sugerida, não oficial.
- **Emoji:** não usar.
- **SVG:** só o logo (`assets/logo-*.svg`). Nenhum outro ativo de ícone.

---

## Index

- `styles.css` — entrada global (só `@import`)
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `patterns.css`
- `fonts/` — woff2 self-hosted (Shrikhand, Darumadrop One, Courier Prime, Noto Sans Symbols 2)
- `guidelines/` — cards de fundamentos, marca e logo; `guidelines/fontes/` = aba Fontes (opções de tipografia)
- `components/` — primitivos React
- `ui_kits/aplicacoes/` — todas as peças da marca, interativas
- `assets/` — logo-peao(-amarelo|-negativo).svg, logo-brinde(-negativo).svg, logo-tabuleiro(-negativo).svg
- `thumbnail.html`, `SKILL.md`

### Components
- `components/core/` — **Button** (primary/rosa/amarelo/outline, sm/md/lg), **Tag** (pílula; `mono` para notação)
- `components/brand/` — **LogoSymbol** (peão-copo / brinde / tabuleiro), **Wordmark** (logotipo; `symbol` = assinatura completa), **CoBrand** (XA × bar parceiro), **Checker** (quadriculado)
- `components/game/` — **PieceGlyph** (peça Unicode), **Ficha** (ficha de jogo)
- `components/menu/` — **MenuItem** (linha peça → bebida, slot modular)

### UI kits
- `ui_kits/aplicacoes/` — Foto de perfil, Post de evento, Story, Post collab, Panfleto A4, Placa de mesa, Cardápio das peças, Fichas, Adesivos, Pano de mesa

### Intentional additions
Sem fonte de componentes, o conjunto foi dimensionado para a marca (peças impressas/sociais), não para um app: sem Input, Select, Dialog etc.
