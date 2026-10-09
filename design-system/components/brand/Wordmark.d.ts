import * as React from 'react';
/**
 * Logotipo "Xadrez Alcoólico" na fonte display (provisória: Shrikhand). Com `symbol`, vira a assinatura completa (símbolo + nome).
 * @startingPoint section="Marca" subtitle="Logotipo e assinatura com símbolo" viewport="700x300"
 */
export interface WordmarkProps {
  /** stacked: "xadrez" sobre "alcoólico". inline: uma linha */
  layout?: 'stacked' | 'inline';
  /** duo = xadrez rosa + alcoólico amarelo (só sobre preto) */
  tone?: 'preto' | 'creme' | 'duo' | 'rosa' | 'amarelo';
  /** font-size em px da linha "alcoólico" */
  size?: number;
  /** inclui o símbolo à esquerda */
  symbol?: boolean;
  /** qual símbolo acompanha */
  symbolVariant?: 'peao' | 'brinde' | 'tabuleiro';
  style?: React.CSSProperties;
}
export declare function Wordmark(props: WordmarkProps): JSX.Element;
