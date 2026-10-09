import * as React from 'react';
/**
 * Ficha de jogo circular: cor do lado, anel tracejado, peça no centro e rótulo opcional.
 * @startingPoint section="Jogo" subtitle="Fichas de jogo rosa / amarelo / preto" viewport="700x240"
 */
export interface FichaProps {
  piece?: 'rei' | 'dama' | 'torre' | 'bispo' | 'cavalo' | 'peao';
  side?: 'rosa' | 'amarelo' | 'preto';
  /** texto curto sob a peça — "1 shot", "Rodada 2" */
  label?: string;
  /** diâmetro em px */
  size?: number;
  style?: React.CSSProperties;
}
export declare function Ficha(props: FichaProps): JSX.Element;
