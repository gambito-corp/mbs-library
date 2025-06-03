export const BADGE_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Badge estándar con fondo gris'
    },
    primary: {
        label: 'Primario',
        description: 'Badge con color primario azul'
    },
    secondary: {
        label: 'Secundario',
        description: 'Badge con color secundario gris'
    },
    success: {
        label: 'Éxito',
        description: 'Badge verde para estados exitosos'
    },
    warning: {
        label: 'Advertencia',
        description: 'Badge amarillo para advertencias'
    },
    error: {
        label: 'Error',
        description: 'Badge rojo para errores'
    },
    info: {
        label: 'Información',
        description: 'Badge azul para información'
    },
    light: {
        label: 'Claro',
        description: 'Badge con fondo claro'
    },
    dark: {
        label: 'Oscuro',
        description: 'Badge con fondo oscuro'
    }
};

export const BADGE_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'Badge compacto'
    },
    medium: {
        label: 'Mediano',
        description: 'Badge estándar'
    },
    large: {
        label: 'Grande',
        description: 'Badge prominente'
    }
};

export const BADGE_SHAPES = {
    rounded: {
        label: 'Redondeado',
        description: 'Esquinas redondeadas'
    },
    pill: {
        label: 'Píldora',
        description: 'Completamente redondeado'
    },
    square: {
        label: 'Cuadrado',
        description: 'Esquinas rectas'
    }
};

export const BADGE_POSITIONS = {
    'top-right': {
        label: 'Superior derecha'
    },
    'top-left': {
        label: 'Superior izquierda'
    },
    'bottom-right': {
        label: 'Inferior derecha'
    },
    'bottom-left': {
        label: 'Inferior izquierda'
    }
};

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
