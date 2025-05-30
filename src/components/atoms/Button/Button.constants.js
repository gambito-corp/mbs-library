export const BUTTON_VARIANTS = {
    // Variantes estándar (basadas en tus estilos)
    primary: {
        label: 'Primario',
        description: 'Botón principal con gradiente azul',
        baseClasses: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white focus:ring-indigo-300'
    },
    secondary: {
        label: 'Secundario',
        description: 'Botón secundario con gradiente gris',
        baseClasses: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white focus:ring-gray-300'
    },
    success: {
        label: 'Éxito',
        description: 'Botón de éxito con gradiente verde',
        baseClasses: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-300'
    },
    danger: {
        label: 'Peligro',
        description: 'Botón de peligro con gradiente rojo',
        baseClasses: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-300'
    },
    warning: {
        label: 'Advertencia',
        description: 'Botón de advertencia con gradiente amarillo',
        baseClasses: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white focus:ring-yellow-300'
    },

    // Variantes outline
    outline: {
        label: 'Contorno',
        description: 'Botón con solo borde',
        baseClasses: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-indigo-300'
    },
    ghost: {
        label: 'Fantasma',
        description: 'Botón transparente',
        baseClasses: 'text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-300'
    },

    // Variantes de juego (de tus botones anteriores)
    gameReveal: {
        label: 'Revelar Juego',
        description: 'Botón para revelar en juegos',
        baseClasses: 'bg-white rounded-[10px] text-[#195b81] font-extrabold uppercase tracking-wide hover:opacity-80'
    },
    gameCorrect: {
        label: 'Correcto Juego',
        description: 'Botón de respuesta correcta',
        baseClasses: 'bg-green-600 text-white hover:bg-green-700 boton-success-m rounded-[10px] button-overlay'
    },
    gameIncorrect: {
        label: 'Incorrecto Juego',
        description: 'Botón de respuesta incorrecta',
        baseClasses: 'bg-red-600 text-white hover:bg-red-700 button-incorrect rounded-[10px] button-overlay'
    },
    gameRestart: {
        label: 'Reiniciar Juego',
        description: 'Botón para reiniciar juego',
        baseClasses: 'bg-green-600 text-white hover:bg-green-700 boton-success-m'
    },
    gameExit: {
        label: 'Salir Juego',
        description: 'Botón para salir del juego',
        baseClasses: 'bg-blue-600 text-white hover:bg-blue-700 boton-success-m'
    }
};

export const BUTTON_SIZES = {
    xs: {
        label: 'Extra pequeño',
        description: 'Botón muy compacto',
        padding: 'px-2 py-1',
        fontSize: 'text-xs',
        minHeight: 'min-h-[24px]'
    },
    small: {
        label: 'Pequeño',
        description: 'Botón compacto',
        padding: 'px-3 py-1.5',
        fontSize: 'text-xs',
        minHeight: 'min-h-[32px]'
    },
    medium: {
        label: 'Mediano',
        description: 'Botón estándar',
        padding: 'px-4 py-2',
        fontSize: 'text-sm',
        minHeight: 'min-h-[40px]'
    },
    large: {
        label: 'Grande',
        description: 'Botón prominente',
        padding: 'px-6 py-3',
        fontSize: 'text-base',
        minHeight: 'min-h-[48px]'
    },
    xlarge: {
        label: 'Extra grande',
        description: 'Botón muy prominente',
        padding: 'px-8 py-4',
        fontSize: 'text-lg',
        minHeight: 'min-h-[56px]'
    },

    // Tamaños especiales para juegos
    game: {
        label: 'Juego',
        description: 'Tamaño específico para botones de juego',
        padding: 'py-[15px] px-4',
        fontSize: 'text-sm',
        minHeight: 'min-h-[50px]'
    }
};

export const BUTTON_TYPES = {
    button: {
        label: 'Botón',
        description: 'Botón estándar'
    },
    submit: {
        label: 'Enviar',
        description: 'Botón de envío de formulario'
    },
    reset: {
        label: 'Resetear',
        description: 'Botón de reseteo de formulario'
    }
};

// Clases especiales de tus estilos originales
export const SPECIAL_CLASSES = {
    'boton-success-m': 'boton-success-m', // Tu clase personalizada
    'button-overlay': 'button-overlay',   // Tu clase de overlay
    'button-incorrect': 'button-incorrect' // Tu clase de incorrecto
};
