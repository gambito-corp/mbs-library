module.exports = {
    // ✅ CONFIGURACIÓN DE ENTORNO PARA ES6+
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },

    // ✅ PARSER OPTIONS CRÍTICOS PARA ES6 MODULES
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',  // ← ESTO RESUELVE EL ERROR DE 'import'
        ecmaFeatures: {
            jsx: true
        }
    },

    // ✅ CONFIGURACIÓN BASE DE REACT
    extends: [
        'react-app',
        'react-app/jest'
    ],

    // ✅ PLUGINS NECESARIOS
    plugins: ['react', 'react-hooks'],

    // ✅ CONFIGURACIONES ESPECÍFICAS POR ARCHIVO
    overrides: [
        {
            // Para archivos .config.js - Ignorar props de React
            files: ['**/*.config.js'],
            rules: {
                'react/no-unknown-property': 'off',
                'react/jsx-no-undef': 'off'
            }
        },
        {
            // Para archivos de test
            files: ['**/__tests__/**/*', '**/*.test.*'],
            rules: {
                'testing-library/no-node-access': 'warn',
                'no-unused-vars': 'warn'
            }
        },
        {
            // Para templates y archivos legacy
            files: ['templates/**/*', '**/AnimatedText.jsx'],
            rules: {
                'no-unused-vars': 'off',
                'react-hooks/exhaustive-deps': 'off'
            }
        }
    ],

    // ✅ REGLAS PERSONALIZADAS
    rules: {
        // Variables no utilizadas como warning
        'no-unused-vars': ['warn', {
            'varsIgnorePattern': '^_',
            'argsIgnorePattern': '^_'
        }],

        // Console.log permitido en desarrollo
        'no-console': ['warn', { allow: ['warn', 'error'] }],

        // React hooks dependencies como warning
        'react-hooks/exhaustive-deps': 'warn',

        // PropTypes como warning
        'react/prop-types': 'warn',

        // Exports anónimos permitidos en configs
        'import/no-anonymous-default-export': ['warn', {
            'allowObject': true,
            'allowArray': true
        }]
    },

    // ✅ ARCHIVOS A IGNORAR COMPLETAMENTE
    ignorePatterns: [
        'dist/',
        'build/',
        'node_modules/',
        'coverage/',
        '*.min.js',
        'docs/**/*.md',
        'templates/**/*'
    ]
};
