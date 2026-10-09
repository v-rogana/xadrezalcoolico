import * as React from 'react';
/**
 * Botão pílula com borda preta de 3px e sombra dura (sem blur). Hover levanta, press "afunda" na sombra.
 * @startingPoint section="Core" subtitle="Botões da marca: preto, rosa, amarelo, outline" viewport="700x260"
 */
export interface ButtonProps {
  /** primary = preto c/ sombra rosa; rosa / amarelo = cores de jogador; outline = transparente */
  variant?: 'primary' | 'rosa' | 'amarelo' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
