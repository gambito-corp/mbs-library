import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest
            }
        },
        plugins: {
            react,
            'react-hooks': reactHooks
        },
        rules: {
            'no-unused-vars': 'warn',
            'react/prop-types': 'warn'
        }
    },
    {
        files: ['**/*.config.js'],
        rules: {
            'react/no-unknown-property': 'off',
            'react/jsx-no-undef': 'off'
        }
    }
];
