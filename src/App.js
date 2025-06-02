// src/App.js
import React, { useEffect } from 'react';
import DesignSystemViewer from './docs/components/DesignSystemViewer';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        console.log('🎨 App theme updated:', theme);

        // ✅ FORZAR APLICACIÓN EN MÚLTIPLES LUGARES
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        document.body.className = theme; // También como clase

    }, [theme]);

    return (
        <div className="App" data-theme={theme}>
            {/* ✅ BOTÓN DE DEBUG TEMPORAL */}
            <button
                onClick={toggleTheme}
                style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    zIndex: 9999,
                    padding: '8px',
                    background: theme === 'dark' ? '#fff' : '#000',
                    color: theme === 'dark' ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {theme === 'dark' ? '☀️' : '🌙'} {theme}
            </button>

            <DesignSystemViewer />
        </div>
    );
}

export default App;
