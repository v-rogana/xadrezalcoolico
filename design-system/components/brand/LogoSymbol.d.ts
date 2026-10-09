import * as React from 'react';
/**
 * Símbolo da marca. peao = o peão-copo (corpo do peão é um copinho com bebida) — símbolo principal e foto de perfil.
 * brinde = duelo: peão rosa e peão amarelo inclinados 15° até quase se chocarem — assinatura de destaque. Base opcional.
 * tabuleiro = 2×2 de tabuleiro com copinhos vistos de cima (cheios = em jogo, vazios = já bebidos).
 * @startingPoint section="Marca" subtitle="Peão-copo, brinde e tabuleiro de copinhos" viewport="700x440"
 */
export interface LogoSymbolProps {
  variant?: 'peao' | 'brinde' | 'tabuleiro';
  /** color = traço preto (fundo claro) · negativo = traço creme (fundo preto) · amarelo = troca a bebida do peão para amarelo */
  tone?: 'color' | 'negativo' | 'amarelo';
  /** só para brinde: linha = linha de chão (padrão) · nenhuma = só as peças · tabuleiro = faixa fina de tabuleiro */
  base?: 'linha' | 'nenhuma' | 'tabuleiro';
  /** altura em px (largura segue a proporção) */
  size?: number;
  style?: React.CSSProperties;
}
export declare function LogoSymbol(props: LogoSymbolProps): JSX.Element;
