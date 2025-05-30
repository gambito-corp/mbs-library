export const TEXT_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Texto estándar sin estilos especiales'
    },
    highlight: {
        label: 'Destacado',
        description: 'Texto con fondo destacado'
    },
    gradient: {
        label: 'Degradado',
        description: 'Texto con efecto de degradado'
    },
    neon: {
        label: 'Neón',
        description: 'Efecto de texto neón brillante'
    },
    retro: {
        label: 'Retro',
        description: 'Estilo retro de terminal'
    },
    muted: {
        label: 'Silenciado',
        description: 'Texto con menor prominencia'
    },
    bold: {
        label: 'Negrita',
        description: 'Texto en negrita'
    },
    italic: {
        label: 'Cursiva',
        description: 'Texto en cursiva'
    }
};

export const TEXT_SIZES = {
    xs: {
        label: 'Extra pequeño',
        description: 'Texto muy pequeño',
        fontSize: 'text-xs',
        lineHeight: 'leading-4'
    },
    small: {
        label: 'Pequeño',
        description: 'Texto pequeño para detalles',
        fontSize: 'text-sm',
        lineHeight: 'leading-5'
    },
    medium: {
        label: 'Mediano',
        description: 'Tamaño estándar para contenido',
        fontSize: 'text-base',
        lineHeight: 'leading-6'
    },
    large: {
        label: 'Grande',
        description: 'Texto grande para títulos',
        fontSize: 'text-lg',
        lineHeight: 'leading-7'
    },
    xlarge: {
        label: 'Extra grande',
        description: 'Texto muy grande para encabezados',
        fontSize: 'text-xl',
        lineHeight: 'leading-8'
    },
    '2xl': {
        label: '2X Grande',
        description: 'Texto masivo para títulos principales',
        fontSize: 'text-2xl',
        lineHeight: 'leading-9'
    },
    '3xl': {
        label: '3X Grande',
        description: 'Texto hero para secciones destacadas',
        fontSize: 'text-3xl',
        lineHeight: 'leading-10'
    }
};

// Configuración de estilos por variante
export const STYLE_CONFIG = {
    default: 'text-gray-900',
    highlight: 'text-gray-900 bg-yellow-200 px-1 rounded',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
    neon: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]',
    retro: 'text-green-400 font-mono bg-black px-2 py-1 rounded',
    muted: 'text-gray-500',
    bold: 'font-bold text-gray-900',
    italic: 'italic text-gray-700'
};

// Tipos de animación disponibles
export const ANIMATION_TYPES = {
    typewriter: {
        label: 'Máquina de escribir',
        description: 'Efecto clásico de máquina de escribir'
    },
    fade: {
        label: 'Desvanecimiento',
        description: 'Aparición gradual de caracteres'
    },
    slide: {
        label: 'Deslizamiento',
        description: 'Caracteres que se deslizan'
    }
};
