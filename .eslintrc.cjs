module.exports = {
    // ✅ CONFIGURACIÓN MÍNIMA QUE FUNCIONA
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },

    // ✅ ESTO RESUELVE EL ERROR "import is reserved"
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",  // ← CRÍTICO
        ecmaFeatures: {
            jsx: true
        }
    },

    // ✅ EXTENDS BÁSICOS
    extends: [
        "react-app",
        "react-app/jest"
    ],

    // ✅ CONFIGURACIONES ESPECÍFICAS
    overrides: [
        {
            // Para archivos .config.js - Ignorar props de React
            files: ['**/*.config.js'],
            rules: {
                'react/no-unknown-property': 'off',
                'react/jsx-no-undef': 'off'
            }
        }
    ],

    // ✅ REGLAS BÁSICAS
    rules: {
        "no-unused-vars": "warn",
        "react/prop-types": "warn",
        "import/no-anonymous-default-export": ["warn", {
            "allowObject": true,
            "allowArray": true
        }]
    }
};
