import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
            <div className="theme-toggle__track">
                <div className="theme-toggle__thumb">
                    <span className="theme-toggle__icon">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </span>
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
