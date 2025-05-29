import React, { useState } from 'react';
import Alert from './atoms/Alert';

const DesignSystemViewer = () => {
    const [activeCategory, setActiveCategory] = useState('atoms');
    const [activeComponent, setActiveComponent] = useState('Alert');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const categories = {
        atoms: {
            name: 'Átomos',
            description: 'Elementos básicos e indivisibles del diseño',
            icon: '⚛️',
            color: 'from-blue-500 to-cyan-500',
            components: {
                Alert: {
                    component: Alert,
                    description: 'Componente para mostrar mensajes informativos al usuario',
                    examples: [
                        {
                            name: 'Error básico',
                            description: 'Alerta de error simple con mensaje',
                            props: { type: 'error', message: 'Este es un mensaje de error' }
                        },
                        {
                            name: 'Éxito con título',
                            description: 'Alerta de éxito con título y mensaje descriptivo',
                            props: {
                                type: 'success',
                                title: 'Operación exitosa',
                                message: 'Los datos se guardaron correctamente'
                            }
                        },
                        {
                            name: 'Warning dismissible',
                            description: 'Alerta de advertencia que se puede cerrar',
                            props: {
                                type: 'warning',
                                message: 'Esta acción no se puede deshacer',
                                dismissible: true,
                                onDismiss: () => console.log('Alert cerrado')
                            }
                        },
                        {
                            name: 'Info outlined grande',
                            description: 'Alerta informativa con variante outlined y tamaño grande',
                            props: {
                                type: 'info',
                                variant: 'outlined',
                                size: 'large',
                                message: 'Información importante para el usuario'
                            }
                        },
                        {
                            name: 'Error sólido pequeño',
                            description: 'Alerta de error con estilo sólido y tamaño pequeño',
                            props: {
                                type: 'error',
                                variant: 'solid',
                                size: 'small',
                                message: 'Error crítico del sistema'
                            }
                        }
                    ]
                }
            }
        },
        molecules: {
            name: 'Moléculas',
            description: 'Combinación de átomos que forman componentes funcionales',
            icon: '🧬',
            color: 'from-green-500 to-emerald-500',
            components: {}
        },
        organisms: {
            name: 'Organismos',
            description: 'Secciones complejas de la interfaz',
            icon: '🦠',
            color: 'from-purple-500 to-pink-500',
            components: {}
        }
    };

    const renderComponent = (componentData, example) => {
        const Component = componentData.component;
        return <Component key={example.name} {...example.props} />;
    };

    const renderCodeExample = (example) => {
        const propsString = Object.entries(example.props)
            .map(([key, value]) => {
                if (typeof value === 'string') return `  ${key}="${value}"`;
                if (typeof value === 'boolean') return value ? `  ${key}` : `  ${key}={false}`;
                if (typeof value === 'function') return `  ${key}={handleFunction}`;
                return `  ${key}={${JSON.stringify(value)}}`;
            })
            .join('\n');

        return `<${activeComponent}${propsString ? '\n' + propsString + '\n' : ''}/>`;
    };

    const filteredComponents = Object.keys(categories[activeCategory].components).filter(
        component => component.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const themeClasses = isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100';

    return (
        <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
            {/* Header mejorado */}
            <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-lg'} shadow-xl border-b sticky top-0 z-50 transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">DS</span>
                            </div>
                            <div>
                                <h1 className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                                    Design System Library
                                </h1>
                                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 font-medium`}>
                                    Librería de componentes estandarizada siguiendo Atomic Design
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
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Sidebar mejorado */}
                    <div className="col-span-3">
                        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/70 backdrop-blur-sm border-gray-200'} rounded-2xl shadow-xl border sticky top-32`}>
                            <div className="p-6">
                                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                                    Categorías
                                </h3>

                                <nav className="space-y-3">
                                    {Object.entries(categories).map(([key, category]) => (
                                        <div key={key}>
                                            <button
                                                onClick={() => setActiveCategory(key)}
                                                className={`w-full text-left p-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                                    activeCategory === key
                                                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                                        : isDarkMode
                                                            ? 'text-gray-300 hover:bg-gray-700'
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{category.icon}</span>
                                                    <div>
                                                        <div className="font-bold">{category.name}</div>
                                                        <div className={`text-sm ${activeCategory === key ? 'text-white/80' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                            {Object.keys(category.components).length} componentes
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>

                                            {activeCategory === key && filteredComponents.length > 0 && (
                                                <div className="mt-3 ml-4 space-y-2">
                                                    {filteredComponents.map(componentName => (
                                                        <button
                                                            key={componentName}
                                                            onClick={() => setActiveComponent(componentName)}
                                                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                                                                activeComponent === componentName
                                                                    ? isDarkMode
                                                                        ? 'bg-blue-600 text-white'
                                                                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                                    : isDarkMode
                                                                        ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                                                        : 'text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {componentName}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content mejorado */}
                    <div className="col-span-9">
                        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/70 backdrop-blur-sm border-gray-200'} rounded-2xl shadow-xl border`}>
                            {/* Component Header mejorado */}
                            <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} px-8 py-6`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 bg-gradient-to-r ${categories[activeCategory].color} text-white text-sm font-bold rounded-full shadow-lg`}>
                                            {categories[activeCategory].icon} {categories[activeCategory].name}
                                        </span>
                                        <div>
                                            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {activeComponent}
                                            </h2>
                                            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                                                {categories[activeCategory].components[activeComponent]?.description || categories[activeCategory].description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {categories[activeCategory].components[activeComponent]?.examples?.length || 0} ejemplos
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Examples mejorados */}
                            <div className="p-8">
                                {categories[activeCategory].components[activeComponent] ? (
                                    <div className="space-y-8">
                                        {categories[activeCategory].components[activeComponent].examples.map((example, index) => (
                                            <div key={index} className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>
                                                {/* Example Header mejorado */}
                                                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-gray-50 to-gray-100'} px-6 py-4 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                {example.name}
                                                            </h3>
                                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                                                                {example.description}
                                                            </p>
                                                        </div>
                                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-100 text-blue-700'}`}>
                                                            Ejemplo {index + 1}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Preview mejorado */}
                                                <div className={`p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                                    <div className="flex items-center justify-center min-h-[100px]">
                                                        {renderComponent(
                                                            categories[activeCategory].components[activeComponent],
                                                            example
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Code mejorado */}
                                                <div className="bg-gray-900 text-gray-100 p-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-sm font-semibold text-gray-300">Código JSX</span>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(renderCodeExample(example))}
                                                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-medium transition-colors duration-200"
                                                        >
                                                            📋 Copiar
                                                        </button>
                                                    </div>
                                                    <pre className="text-sm overflow-x-auto bg-gray-800 p-4 rounded-lg">
                                                        <code className="language-jsx">{renderCodeExample(example)}</code>
                                                    </pre>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="text-6xl mb-4">🚧</div>
                                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                                            En construcción
                                        </h3>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            No hay componentes disponibles en esta categoría todavía
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/50 border-gray-200'} border-t mt-16`}>
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center">
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Construido con ❤️ usando React y Tailwind CSS
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                            Design System Library v1.0.0
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DesignSystemViewer;
