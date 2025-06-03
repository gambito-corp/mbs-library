import React from 'react';
import DesignSystemViewer from './docs/components/DesignSystemViewer';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
    const { theme } = useTheme(); // Solo para aplicar data-theme

    return (
        <div className="App" data-theme={theme}>
            {/* ✅ UN SOLO BOTÓN DE TEMA */}
            <ThemeToggle />
            <DesignSystemViewer />
        </div>
    );
}

export default App;
