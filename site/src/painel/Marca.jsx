import estalo from '../imagens/estalo.png';

// O logo tem traço preto: no painel escuro ele vai dentro de um selo creme.
export default function Marca({ grande = false }) {
  return (
    <span className={`marca-pn${grande ? ' grande' : ''}`} aria-hidden="true">
      <img src={estalo} alt="" width="480" height="371" />
    </span>
  );
}
