import { createRoot } from 'react-dom/client';
import '../comum/toque.js';
import '../estilos/base.css';
import '../estilos/painel.css';
import App from './App.jsx';

createRoot(document.getElementById('raiz')).render(<App />);
