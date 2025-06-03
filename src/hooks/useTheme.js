import { useState, useEffect } from 'react';

export const useTheme = () => {
    // ✅ INICIALIZACIÓN CORRECTA
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    // ✅ USEEFFECT CON DEPENDENCY ARRAY CORRECTO
    useEffect(() => {
        console.log('🔄 Theme toggled to:', theme);
        localStorage.setItem('theme', theme);

        // Aplicar tema al documento
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        document.body.className = theme;
    }, [theme]); // ✅ SOLO SE EJECUTA CUANDO THEME CAMBIA

    // ✅ FUNCIÓN TOGGLE ESTABLE
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return {
        theme,
        toggleTheme
    };
};
