export const BADGE_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Badge estándar con fondo gris',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200'
    },
    primary: {
        label: 'Primario',
        description: 'Badge con color primario azul',
        bgColor: 'bg-blue-500',
        textColor: 'text-white'
    },
    secondary: {
        label: 'Secundario',
        description: 'Badge con color secundario gris',
        bgColor: 'bg-gray-500',
        textColor: 'text-white'
    },
    success: {
        label: 'Éxito',
        description: 'Badge verde para estados exitosos',
        bgColor: 'bg-green-500',
        textColor: 'text-white'
    },
    warning: {
        label: 'Advertencia',
        description: 'Badge amarillo para advertencias',
        bgColor: 'bg-yellow-500',
        textColor: 'text-black'
    },
    error: {
        label: 'Error',
        description: 'Badge rojo para errores',
        bgColor: 'bg-red-500',
        textColor: 'text-white'
    },
    info: {
        label: 'Información',
        description: 'Badge azul para información',
        bgColor: 'bg-blue-400',
        textColor: 'text-white'
    },
    light: {
        label: 'Claro',
        description: 'Badge con fondo claro',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200'
    },
    dark: {
        label: 'Oscuro',
        description: 'Badge con fondo oscuro',
        bgColor: 'bg-gray-800',
        textColor: 'text-white'
    }
};

export const BADGE_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'Badge compacto',
        padding: 'px-1.5 py-0.5',
        fontSize: 'text-xs',
        minWidth: 'min-w-[1rem]',
        height: 'h-4',
        dotSize: 'w-2 h-2'
    },
    medium: {
        label: 'Mediano',
        description: 'Badge estándar',
        padding: 'px-2 py-1',
        fontSize: 'text-xs',
        minWidth: 'min-w-[1.25rem]',
        height: 'h-5',
        dotSize: 'w-2.5 h-2.5'
    },
    large: {
        label: 'Grande',
        description: 'Badge prominente',
        padding: 'px-2.5 py-1',
        fontSize: 'text-sm',
        minWidth: 'min-w-[1.5rem]',
        height: 'h-6',
        dotSize: 'w-3 h-3'
    }
};

export const BADGE_SHAPES = {
    rounded: {
        label: 'Redondeado',
        description: 'Esquinas redondeadas',
        className: 'rounded'
    },
    pill: {
        label: 'Píldora',
        description: 'Completamente redondeado',
        className: 'rounded-full'
    },
    square: {
        label: 'Cuadrado',
        description: 'Esquinas rectas',
        className: 'rounded-none'
    }
};

export const BADGE_POSITIONS = {
    'top-right': {
        label: 'Superior derecha',
        className: 'absolute -top-1 -right-1 transform translate-x-1/2 -translate-y-1/2'
    },
    'top-left': {
        label: 'Superior izquierda',
        className: 'absolute -top-1 -left-1 transform -translate-x-1/2 -translate-y-1/2'
    },
    'bottom-right': {
        label: 'Inferior derecha',
        className: 'absolute -bottom-1 -right-1 transform translate-x-1/2 translate-y-1/2'
    },
    'bottom-left': {
        label: 'Inferior izquierda',
        className: 'absolute -bottom-1 -left-1 transform -translate-x-1/2 translate-y-1/2'
    }
};

// Iconos comunes para badges
export const COMMON_BADGE_ICONS = {
    // Estados
    check: 'check',
    error: 'times',
    warning: 'exclamation-triangle',
    info: 'info-circle',
    success: 'check-circle',

    // Acciones
    close: 'times',
    add: 'plus',
    remove: 'minus',

    // Categorías
    tag: 'tag',
    star: 'star',
    heart: 'heart',
    bookmark: 'bookmark',

    // Comunicación
    message: 'comment',
    notification: 'bell',
    email: 'envelope',

    // Usuario
    user: 'user',
    admin: 'crown',
    verified: 'check-circle'
};

// Casos de uso predefinidos
export const PREDEFINED_BADGE_TYPES = {
    notification: {
        variant: 'error',
        shape: 'pill',
        positioned: true,
        position: 'top-right'
    },
    status: {
        variant: 'success',
        shape: 'pill',
        icon: 'check'
    },
    category: {
        variant: 'default',
        shape: 'rounded',
        dismissible: true
    },
    counter: {
        variant: 'primary',
        shape: 'pill',
        showZero: false,
        max: 99
    }
};
