export const INPUT_TYPES = {
    text: {
        label: 'Texto',
        description: 'Campo de texto básico',
        icon: 'font'
    },
    email: {
        label: 'Email',
        description: 'Campo para direcciones de correo',
        icon: 'envelope'
    },
    password: {
        label: 'Contraseña',
        description: 'Campo para contraseñas',
        icon: 'lock',
        supportsToggle: true
    },
    number: {
        label: 'Número',
        description: 'Campo numérico',
        icon: 'hashtag'
    },
    tel: {
        label: 'Teléfono',
        description: 'Campo para números telefónicos',
        icon: 'phone'
    },
    url: {
        label: 'URL',
        description: 'Campo para direcciones web',
        icon: 'link'
    },
    search: {
        label: 'Búsqueda',
        description: 'Campo de búsqueda',
        icon: 'search',
        supportsCallback: true
    }
};

export const INPUT_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Campo estándar sin estilos especiales'
    },
    success: {
        label: 'Éxito',
        description: 'Campo con estado de éxito'
    },
    error: {
        label: 'Error',
        description: 'Campo con estado de error'
    },
    warning: {
        label: 'Advertencia',
        description: 'Campo con estado de advertencia'
    }
};

export const INPUT_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'Campo compacto'
    },
    medium: {
        label: 'Mediano',
        description: 'Campo estándar'
    },
    large: {
        label: 'Grande',
        description: 'Campo prominente'
    }
};

export const VALIDATION_PATTERNS = {
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Ingresa un email válido'
    },
    tel: {
        pattern: /^[\+]?[1-9][\d]{0,15}$/,
        message: 'Ingresa un teléfono válido'
    },
    url: {
        pattern: /^https?:\/\/.+/,
        message: 'Ingresa una URL válida'
    }
};

export const DEFAULT_MESSAGES = {
    required: 'Este campo es requerido',
    email: 'Ingresa un email válido',
    minLength: 'Muy corto',
    maxLength: 'Muy largo',
    pattern: 'Formato inválido',
    passwordToggled: 'Contraseña visible',
    passwordHidden: 'Contraseña oculta'
};

export const DEFAULT_PLACEHOLDERS = {
    text: 'Ingresa texto',
    email: 'ejemplo@correo.com',
    password: '••••••••',
    tel: '(555) 123-4567',
    url: 'https://ejemplo.com',
    search: 'Buscar...',
    number: '0'
};
