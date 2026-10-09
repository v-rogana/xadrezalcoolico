import * as React from 'react';
/**
 * Assinatura em dupla: "Xadrez Alcoólico × [bar parceiro]". O × é o ponto de encontro (cor --xa-encontro sobre preto).
 * @startingPoint section="Marca" subtitle="Co-branding com bar parceiro" viewport="700x300"
 */
export interface CoBrandProps {
  /** nome do bar — usado como texto se não houver logo */
  partner?: string;
  /** URL do logo do parceiro (altura ≈ 1,7× size) */
  partnerLogo?: string;
  layout?: 'inline' | 'stacked';
  tone?: 'preto' | 'creme' | 'duo';
  size?: number;
  /** inclui o símbolo antes do logotipo (padrão true) */
  symbol?: boolean;
  style?: React.CSSProperties;
}
export declare function CoBrand(props: CoBrandProps): JSX.Element;
