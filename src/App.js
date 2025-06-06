import React from 'react';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const { theme } = useTheme(); // Solo para aplicar data-theme

    return (
        <BrowserRouter> {/* ✅ CORREGIDO: Mayúscula */}
            <div className="App" data-theme={theme}>
                <ThemeToggle />
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
