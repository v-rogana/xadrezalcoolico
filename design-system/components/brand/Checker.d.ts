import * as React from 'react';
/** Quadriculado de tabuleiro — recurso visual obrigatório. Faixas, bordas, fundos de peça. */
export interface CheckerProps {
  /** classic preto/creme · duel rosa/amarelo · rosa/amarelo com preto · soft creme */
  palette?: 'classic' | 'duel' | 'rosa' | 'amarelo' | 'soft';
  /** lado da casa em px */
  cell?: number;
  width?: number | string;
  height?: number | string;
  /** sobrescreve as cores */
  a?: string;
  b?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Checker(props: CheckerProps): JSX.Element;
