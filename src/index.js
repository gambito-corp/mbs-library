import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import './utils/fontawesome.js'; // Importar configuración de Font Awesome

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
