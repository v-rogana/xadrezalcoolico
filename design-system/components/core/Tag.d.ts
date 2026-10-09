import * as React from 'react';
/** Etiqueta pílula curta — datas, locais, "+18", notação de lance. */
export interface TagProps {
  tone?: 'preto' | 'rosa' | 'amarelo' | 'creme';
  /** usa Courier Prime negrito caixa alta — para notação de xadrez (Cxe5), horários, preços */
  mono?: boolean;
  /** só com mono: caixa alta (padrão true). Use false para notação de xadrez — Cxe5, Dxf7# */
  upper?: boolean;
  /** rotação leve em graus (-6 a 6) para clima de adesivo */
  rotate?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
