// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState('light'); // ✅ Por defecto light

    useEffect(() => {
        // ✅ DETECCIÓN MÁS ROBUSTA
        const detectTheme = () => {
            try {
                // Método 1: matchMedia
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                console.log('🔍 matchMedia result:', mediaQuery.matches);

                // Método 2: Verificar CSS computed styles
                const testElement = document.createElement('div');
                testElement.style.display = 'none';
                testElement.style.colorScheme = 'light dark';
                document.body.appendChild(testElement);

                const computedStyle = window.getComputedStyle(testElement);
                console.log('🎨 Computed color-scheme:', computedStyle.colorScheme);

                document.body.removeChild(testElement);

                // Método 3: Verificar si hay override del usuario
                const userPreference = localStorage.getItem('theme');
                console.log('💾 User preference:', userPreference);

                // Decidir tema final
                let finalTheme = 'light';

                if (userPreference) {
                    finalTheme = userPreference;
                } else {
                    finalTheme = mediaQuery.matches ? 'dark' : 'light';
                }

                console.log('🎯 Final theme:', finalTheme);
                return finalTheme;

            } catch (error) {
                console.error('❌ Error detecting theme:', error);
                return 'light'; // Fallback seguro
            }
        };

        // Detectar tema inicial
        const initialTheme = detectTheme();
        setTheme(initialTheme);

        // ✅ APLICAR AL DOCUMENTO
        document.documentElement.setAttribute('data-theme', initialTheme);
        document.body.setAttribute('data-theme', initialTheme);

        // Escuchar cambios del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            console.log('🔄 System theme changed:', e.matches ? 'dark' : 'light');
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        };

        // ✅ USAR addEventListener (más moderno que addListener)
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    // Función para cambiar tema manualmente
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log('🔄 Theme toggled to:', newTheme);
    };

    return { theme, toggleTheme };
};
