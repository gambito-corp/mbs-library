import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

const LiveComponentEditor = ({
                                 componentName,
                                 variantName,
                                 initialCode,
                                 scope,
                                 isEditorVisible,
                                 setIsEditorVisible
                             }) => {
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        console.log('🔄 LiveEditor: Actualizando código para', variantName);
        setCode(initialCode);

    }, [initialCode, variantName]);


    const defaultScope = {
        React,
        ...scope
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
            {/* Header del Editor */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">⚡</span>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">
                                Editor en Vivo - {componentName}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Edita el código y ve los cambios en tiempo real
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsEditorVisible(!isEditorVisible)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                isEditorVisible
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {isEditorVisible ? '👁️ Ocultar Editor' : '✏️ Mostrar Editor'}
                        </button>
                        <button
                            onClick={() => setCode(initialCode)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
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

            <LiveProvider code={code} scope={defaultScope} noInline={false}>
                {/* Preview siempre visible */}
                <div className="p-8 bg-white min-h-[120px] flex items-center justify-center">
                    <LivePreview />
                </div>

                {/* Editor colapsable */}
                {isEditorVisible && (
                    <div className="border-t border-gray-200">
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

export default LiveComponentEditor;
