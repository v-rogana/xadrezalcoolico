import * as React from 'react';
/**
 * Linha modular do cardápio das peças: peça → bebida. Sem `drink`, mostra slot tracejado para preencher.
 * @startingPoint section="Cardápio" subtitle="Linha de cardápio peça → bebida" viewport="700x300"
 */
export interface MenuItemProps {
  piece?: 'rei' | 'dama' | 'torre' | 'bispo' | 'cavalo' | 'peao';
  /** nome da bebida — área modular, troca por evento */
  drink?: string;
  /** detalhe curto (ingredientes, teor) */
  note?: string;
  /** quantas peças por lado (peão = 8) */
  count?: number;
  side?: 'rosa' | 'amarelo' | 'preto' | 'creme';
  /** inverte para fundo preto */
  dark?: boolean;
  style?: React.CSSProperties;
}
export declare function MenuItem(props: MenuItemProps): JSX.Element;
