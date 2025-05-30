export const TEMPLATENAME_TYPES = {
    default: {
        label: 'Por defecto',
        description: 'Estilo por defecto del componente'
    },
    primary: {
        label: 'Primario',
        description: 'Estilo primario destacado'
    },
    secondary: {
        label: 'Secundario',
        description: 'Estilo secundario sutil'
    }
};

export const TEMPLATENAME_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Variante por defecto'
    },
    primary: {
        label: 'Primario',
        description: 'Variante primaria con mayor prominencia'
    },
    secondary: {
        label: 'Secundario',
        description: 'Variante secundaria más sutil'
    },
    outline: {
        label: 'Contorno',
        description: 'Variante solo con bordes'
    }
};

export const TEMPLATENAME_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'Tamaño compacto para espacios reducidos',
        padding: 'px-2 py-1',
        fontSize: 'text-sm'
    },
    medium: {
        label: 'Mediano',
        description: 'Tamaño estándar para uso general',
        padding: 'px-4 py-2',
        fontSize: 'text-base'
    },
    large: {
        label: 'Grande',
        description: 'Tamaño prominente para elementos destacados',
        padding: 'px-6 py-3',
        fontSize: 'text-lg'
    }
};

// Configuración de estilos por variante
export const STYLE_CONFIG = {
    default: {
        default: 'bg-gray-100 border border-gray-300 text-gray-700',
        primary: 'bg-blue-100 border border-blue-300 text-blue-700',
        secondary: 'bg-gray-50 border border-gray-200 text-gray-600',
        outline: 'border-2 border-gray-300 text-gray-700 bg-transparent'
    },
    primary: {
        default: 'bg-blue-500 border border-blue-500 text-white',
        primary: 'bg-blue-600 border border-blue-600 text-white',
        secondary: 'bg-blue-400 border border-blue-400 text-white',
        outline: 'border-2 border-blue-500 text-blue-500 bg-transparent'
    },
    secondary: {
        default: 'bg-gray-500 border border-gray-500 text-white',
        primary: 'bg-gray-600 border border-gray-600 text-white',
        secondary: 'bg-gray-400 border border-gray-400 text-white',
        outline: 'border-2 border-gray-500 text-gray-500 bg-transparent'
    }
};
