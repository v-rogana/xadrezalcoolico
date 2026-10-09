import * as React from 'react';
/** Peça de xadrez como glifo Unicode (Noto Sans Symbols 2), sempre a versão cheia, colorida pelo lado. */
export interface PieceGlyphProps {
  piece?: 'rei' | 'dama' | 'torre' | 'bispo' | 'cavalo' | 'peao';
  side?: 'rosa' | 'amarelo' | 'preto' | 'creme';
  size?: number;
  /** contorno preto — use quando a peça colorida está sobre creme */
  outline?: boolean;
  style?: React.CSSProperties;
}
export declare function PieceGlyph(props: PieceGlyphProps): JSX.Element;
