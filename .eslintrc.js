module.exports = {
    extends: [
        'react-app',
        'react-app/jest'
    ],
    overrides: [
        {
            // ✅ Para archivos .config.js - Ignorar props de React
            files: ['**/*.config.js'],
            rules: {
                'react/no-unknown-property': 'off',
                'react/jsx-no-undef': 'off'
            }
        },
        {
            // ✅ Para archivos de test - Reglas más flexibles
            files: ['**/__tests__/**/*', '**/*.test.*'],
            rules: {
                'testing-library/no-node-access': 'error',
                'no-unused-vars': 'warn'
            }
        },
        {
            // ✅ Para archivos legacy - Ignorar warnings
            files: ['**/AnimatedText.jsx', '**/legacy/**/*'],
            rules: {
                'no-unused-vars': 'off',
                'react-hooks/exhaustive-deps': 'off'
            }
        }
    ],
    rules: {
        // ✅ Variables no utilizadas como warning (no error)
        'no-unused-vars': ['warn', {
            'varsIgnorePattern': '^_',
            'argsIgnorePattern': '^_'
        }],

        // ✅ Imports no utilizados como warning
        'no-unused-imports': 'warn',

        // ✅ Console.log permitido en desarrollo
        'no-console': ['warn', { allow: ['warn', 'error'] }],

        // ✅ React hooks dependencies como warning
        'react-hooks/exhaustive-deps': 'warn',

        // ✅ PropTypes como warning
        'react/prop-types': 'warn',

        // ✅ Accesibilidad importante pero no crítica
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/aria-role': 'error',

        // ✅ Exports anónimos permitidos en configs
        'import/no-anonymous-default-export': ['error', {
            'allowObject': true,
            'allowArray': true
        }]
    },

    // ✅ Ignorar archivos específicos
    ignorePatterns: [
        'dist/',
        'build/',
        'node_modules/',
        'coverage/',
        '*.min.js',
        'docs/**/*.md'
    ]
};
