import React, { useState, useEffect } from 'react';
import {useTheme} from "../../hooks/useTheme";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';


// Importaciones de componentes
import Alert from '../../../../mbs-library/src/components/molecules/Alert/Alert.jsx';
import Text from '../../../../mbs-library/src/components/atoms/Text/Text.jsx';
import Container from '../../../../mbs-library/src/components/atoms/Container/Container.jsx';
import Animated from '../../../../mbs-library/src/components/atoms/Animated/Animated.jsx';
import Icon from '../../../../mbs-library/src/components/atoms/Icon/Icon.jsx';
import Button from '../../../../mbs-library/src/components/atoms/Button/Button.jsx';
import Input from '../../../../mbs-library/src/components/atoms/Input/Input.jsx';
import TextArea from '../../../../mbs-library/src/components/atoms/TextArea/TextArea.jsx';
import Badge from "../../../../mbs-library/src/components/atoms/Badge/Badge.jsx";
import Image from "../../../../mbs-library/src/components/atoms/Image/Image.jsx";
import { AlertConfig } from '../../../../mbs-library/src/components/molecules/Alert/Alert.config';
import { TextConfig } from '../../../../mbs-library/src/components/atoms/Text/Text.config.js';
import { ContainerConfig } from '../../../../mbs-library/src/components/atoms/Container/Container.config.js';
import { AnimatedConfig } from '../../../../mbs-library/src/components/atoms/Animated/Animated.config.js';
import { IconConfig } from '../../../../mbs-library/src/components/atoms/Icon/Icon.config.js';
import { ButtonConfig } from "../../../../mbs-library/src/components/atoms/Button/Button.config.js";
import { InputConfig } from "../../../../mbs-library/src/components/atoms/Input/Input.config.js";
import { TextAreaConfig } from '../../../../mbs-library/src/components/atoms/TextArea/TextArea.config.js';
import { BadgeConfig } from "../../../../mbs-library/src/components/atoms/Badge/Badge.config.js";
import { ImageConfig } from "../../../../mbs-library/src/components/atoms/Image/Image.config.js";

const DesignSystemViewer = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeCategory, setActiveCategory] = useState('atoms');
    const [activeComponent, setActiveComponent] = useState('Alert');
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [isEditorVisible, setIsEditorVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { theme, toggleTheme } = useTheme();
    // Configuración de componentes
    const componentsData = {
        atoms: {
            name: 'Átomos',
            icon: '⚛️',
            color: 'from-blue-500 to-cyan-500',
            components: {
                Text: TextConfig,
                Container: ContainerConfig,
                Animated: AnimatedConfig,
                Icon: IconConfig,
                Button: ButtonConfig,
                Input: InputConfig,
                TextArea: TextAreaConfig,
                Badge: BadgeConfig,
                Image: ImageConfig,
            }
        },
        molecules: {
            name: 'Moléculas',
            icon: '🧬',
            color: 'from-green-500 to-emerald-500',
            components: {
                Alert: AlertConfig,

            }
        },
        organisms: {
            name: 'Organismos',
            icon: '🦠',
            color: 'from-purple-500 to-pink-500',
            components: {}
        }
    };
    const categories = componentsData;
    const componentScope = {
        React,
        useState: React.useState,
        useEffect: React.useEffect,
        useRef: React.useRef,
        Animated,
        Text,
        Container,
        Icon,
        Button,
        Input,
        TextArea,
        Badge,
        Image,
        Alert,

        PropTypes: require('prop-types')
    };

    // ✅ RESETEAR VARIANTE CUANDO CAMBIA COMPONENTE
    useEffect(() => {

    }, [activeComponent, selectedVariant]);

    // ✅ DEBUG PARA VER CAMBIOS
    useEffect(() => {
    }, [activeComponent, selectedVariant]);

    useEffect(() => {
        setIsDarkMode(theme === 'dark');
    }, [theme]);

    useEffect(() => {
        if ((isDarkMode && theme !== 'dark') || (!isDarkMode && theme !== 'light')) {
            toggleTheme();
        }
    }, [isDarkMode, theme, toggleTheme]);

    const currentComponent = componentsData[activeCategory]?.components[activeComponent];
    const currentVariant = currentComponent?.variants?.[selectedVariant];

    const themeClasses = isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100';


    return (
        <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
            {/* Header */}
            <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-lg'} shadow-xl border-b sticky top-0 z-50 transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                className={`p-2 rounded-lg transition-colors ${
                                    isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {sidebarCollapsed ? '☰' : '✕'}
                            </button>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">DS</span>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Design System Studio
                                </h1>
                                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 font-medium`}>
                                    Librería de componentes con editor en vivo
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Buscador */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar componentes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-64 px-4 py-2 rounded-lg border ${
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                />
                                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                            </div>

                            {/* Toggle Dark Mode */}
                            <div className={isDarkMode ? 'dark' : 'light'}>
                                <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                        isDarkMode
                                            ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {isDarkMode ? '☀️' : '🌙'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`${sidebarCollapsed ? 'w-16' : 'w-80'} ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/70 backdrop-blur-sm border-gray-200'
                } border-r transition-all duration-300 min-h-screen`}>
                    <div className="p-4">
                        {!sidebarCollapsed && (
                            <h2 className="text-lg font-semibold mb-4">Componentes</h2>
                        )}

                        <nav className="space-y-3">
                            {Object.entries(categories).map(([key, category]) => (
                                <SidebarCategory
                                    key={key}
                                    categoryKey={key}
                                    category={category}
                                    collapsed={sidebarCollapsed}
                                    activeCategory={activeCategory}
                                    activeComponent={activeComponent}
                                    onCategorySelect={setActiveCategory}
                                    onComponentSelect={setActiveComponent}
                                    isDarkMode={isDarkMode}
                                />
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {currentComponent ? (
                        <div className="space-y-6">
                            {/* Component Header */}
                            <div className={`${
                                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/70 backdrop-blur-sm border-gray-200'
                            } rounded-xl p-6 border`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-3xl font-bold">{currentComponent.name}</h2>
                                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                                            {currentComponent.description}
                                        </p>
                                    </div>
                                    <span className="text-4xl">
                                        {categories[activeCategory].icon}
                                    </span>
                                </div>

                                {/* Variant Selector */}
                                {currentComponent.variants && currentComponent.variants.length > 0 && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">
                                            Variantes disponibles: ({currentComponent.variants.length})
                                        </label>
                                        <select
                                            value={selectedVariant}
                                            onChange={(e) => {
                                                const newVariant = Number(e.target.value);
                                                setSelectedVariant(newVariant);
                                            }}
                                            className={`w-full px-3 py-2 rounded-lg border ${
                                                isDarkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                            } focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                                        >
                                            {currentComponent.variants.map((variant, index) => (
                                                <option key={index} value={index}>
                                                    {variant.name} {index === selectedVariant ? '✓' : ''}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Debug info */}
                                        <div className="mt-2 text-xs text-gray-500">
                                            Variante actual: {selectedVariant + 1} - {currentVariant?.name}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Live Editor con Key para forzar re-render */}
                            {currentVariant && (
                                <LiveComponentEditor
                                    key={`${activeComponent}-${selectedVariant}`}
                                    componentName={currentComponent.name}
                                    variantName={currentVariant.name}
                                    initialCode={currentVariant.code}
                                    scope={componentScope}
                                    isDarkMode={isDarkMode}
                                    isEditorVisible={isEditorVisible}
                                    setIsEditorVisible={setIsEditorVisible}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🎨</div>
                            <h3 className="text-xl font-bold mb-2">Selecciona un componente</h3>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                                Elige un componente del sidebar para comenzar
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// ✅ COMPONENTE SIDEBAR CATEGORY
const SidebarCategory = ({
                             categoryKey,
                             category,
                             collapsed,
                             activeCategory,
                             activeComponent,
                             onCategorySelect,
                             onComponentSelect,
                             isDarkMode
                         }) => {
    const [isOpen, setIsOpen] = useState(activeCategory === categoryKey);
    const isActive = activeCategory === categoryKey;

    const handleCategoryClick = () => {
        if (!collapsed) {
            setIsOpen(!isOpen);
        }
        onCategorySelect(categoryKey);
    };

    const buttonClasses = `w-full text-left p-3 rounded-lg font-semibold transition-all duration-200 ${
        isActive
            ? isDarkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            : isDarkMode
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-700 hover:bg-gray-100'
    }`;

    return (
        <div className="mb-2">
            <button onClick={handleCategoryClick} className={buttonClasses}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        {!collapsed && <span>{category.name}</span>}
                    </div>
                    {!collapsed && (
                        <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                            ▶
                        </span>
                    )}
                </div>
            </button>

            {!collapsed && isOpen && (
                <div className="mt-2 ml-4 space-y-1">
                    {Object.entries(category.components).map(([componentKey, component]) => (
                        <button
                            key={componentKey}
                            onClick={() => onComponentSelect(componentKey)}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                activeComponent === componentKey
                                    ? isDarkMode
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-blue-50 text-blue-600'
                                    : isDarkMode
                                        ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {component.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ✅ COMPONENTE LIVE EDITOR
const LiveComponentEditor = ({
                                 componentName,
                                 variantName,
                                 initialCode,
                                 scope,
                                 isDarkMode,
                                 isEditorVisible,
                                 setIsEditorVisible
                             }) => {
    const [code, setCode] = useState(initialCode);

    // Actualizar código cuando cambie la variante
    useState(() => {
        setCode(initialCode);
    }, [initialCode]);
    // ✅ ACTUALIZAR CÓDIGO AUTOMÁTICAMENTE
    useEffect(() => {
        setCode(initialCode);
    }, [initialCode, variantName]); // ✅ Dependencias correctas

    const headerClasses = isDarkMode
        ? 'bg-gray-700 border-gray-600'
        : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';

    const previewClasses = isDarkMode
        ? 'bg-gray-800'
        : 'bg-white';

    return (
        <div className={`border rounded-xl overflow-hidden shadow-lg ${
            isDarkMode ? 'border-gray-600' : 'border-gray-200'
        }`}>
            {/* Header del Editor */}
            <div className={`${headerClasses} px-6 py-4 border-b`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">⚡</span>
                        <div>
                            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Editor en Vivo - {componentName}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {variantName} - Edita el código y ve los cambios en tiempo real
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsEditorVisible(!isEditorVisible)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                isEditorVisible
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : isDarkMode
                                        ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {isEditorVisible ? '👁️ Ocultar Editor' : '✏️ Mostrar Editor'}
                        </button>
                        <button
                            onClick={() => setCode(initialCode)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                isDarkMode
                                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                                    : 'bg-gray-600 text-white hover:bg-gray-700'
                            }`}
                        >
                            🔄 Reset
                        </button>
                        <button
                            onClick={() => navigator.clipboard.writeText(code)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            📋 Copiar
                        </button>
                    </div>
                </div>
            </div>

            <LiveProvider code={code} scope={scope} noInline={false}>
                {/* Preview siempre visible */}
                <div className={`p-8 ${previewClasses} min-h-[120px] flex items-center justify-center`}>
                    <LivePreview />
                </div>

                {/* Editor colapsable */}
                {isEditorVisible && (
                    <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className="bg-gray-900 text-gray-100">
                            <div className="px-6 py-3 bg-gray-800 border-b border-gray-700">
                                <span className="text-sm font-semibold text-gray-300">
                                    Editor JSX - Edita en tiempo real
                                </span>
                            </div>
                            <div className="p-4">
                                <LiveEditor
                                    onChange={setCode}
                                    className="font-mono text-sm leading-6"
                                    style={{
                                        fontFamily: 'Fira Code, Monaco, Consolas, monospace',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        background: 'transparent',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Errores */}
                <LiveError className="bg-red-50 border-t border-red-200 p-4 text-red-800 text-sm font-mono" />
            </LiveProvider>
        </div>
    );
};

export default DesignSystemViewer;
