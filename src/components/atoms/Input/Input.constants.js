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
        supportsToggle: true // ✅ NUEVO
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
        supportsCallback: true // ✅ NUEVO
    }
};

export const INPUT_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Campo estándar sin estilos especiales',
        borderColor: 'border-gray-300',
        focusColor: 'focus:border-blue-500 focus:ring-blue-100',
        backgroundColor: 'bg-white'
    },
    success: {
        label: 'Éxito',
        description: 'Campo con estado de éxito',
        borderColor: 'border-green-500',
        focusColor: 'focus:border-green-600 focus:ring-green-100',
        backgroundColor: 'bg-green-50'
    },
    error: {
        label: 'Error',
        description: 'Campo con estado de error',
        borderColor: 'border-red-500',
        focusColor: 'focus:border-red-600 focus:ring-red-100',
        backgroundColor: 'bg-red-50'
    },
    warning: {
        label: 'Advertencia',
        description: 'Campo con estado de advertencia',
        borderColor: 'border-yellow-500',
        focusColor: 'focus:border-yellow-600 focus:ring-yellow-100',
        backgroundColor: 'bg-yellow-50'
    }
};

export const INPUT_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'Campo compacto',
        padding: 'px-3 py-1.5',
        fontSize: 'text-sm',
        height: 'h-8',
        iconSize: 'xs',
        iconPadding: { left: 'pl-8', right: 'pr-8', both: 'px-8' } // ✅ NUEVO
    },
    medium: {
        label: 'Mediano',
        description: 'Campo estándar',
        padding: 'px-3 py-2',
        fontSize: 'text-base',
        height: 'h-10',
        iconSize: 'small',
        iconPadding: { left: 'pl-10', right: 'pr-10', both: 'px-10' } // ✅ NUEVO
    },
    large: {
        label: 'Grande',
        description: 'Campo prominente',
        padding: 'px-4 py-3',
        fontSize: 'text-lg',
        height: 'h-12',
        iconSize: 'medium',
        iconPadding: { left: 'pl-12', right: 'pr-12', both: 'px-12' } // ✅ NUEVO
    }
};

// ✅ NUEVAS CONSTANTES PARA CALLBACKS
export const ICON_CALLBACK_TYPES = {
    search: {
        icon: 'search',
        description: 'Ejecutar búsqueda',
        position: 'left'
    },
    clear: {
        icon: 'times',
        description: 'Limpiar campo',
        position: 'right'
    },
    filter: {
        icon: 'filter',
        description: 'Abrir filtros',
        position: 'right'
    },
    settings: {
        icon: 'cog',
        description: 'Configuración',
        position: 'right'
    },
    check: {
        icon: 'check',
        description: 'Validar',
        position: 'right'
    },
    copy: {
        icon: 'copy',
        description: 'Copiar contenido',
        position: 'right'
    }
};

// ✅ CONSTANTES PARA PASSWORD TOGGLE
export const PASSWORD_TOGGLE_CONFIG = {
    showIcon: 'eye',
    hideIcon: 'eye-slash',
    position: 'right',
    defaultState: false
};

// Iconos comunes para inputs (ACTUALIZADO)
export const COMMON_INPUT_ICONS = {
    // Por tipo de input
    email: 'envelope',
    password: 'lock',
    search: 'search',
    tel: 'phone',
    url: 'link',
    user: 'user',

    // Estados
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle',

    // Acciones con callbacks
    show: 'eye',
    hide: 'eye-slash',
    clear: 'times',
    filter: 'filter',
    settings: 'cog',
    copy: 'copy',
    paste: 'paste',
    refresh: 'sync-alt' // ✅ NUEVOS
};

// ✅ CONFIGURACIONES PREDEFINIDAS
export const PREDEFINED_CONFIGS = {
    passwordWithToggle: {
        type: 'password',
        showPasswordToggle: true,
        iconLeft: 'lock'
    },
    searchWithClear: {
        type: 'search',
        iconLeft: 'search',
        iconRight: 'times',
        placeholder: 'Buscar...'
    },
    emailWithValidation: {
        type: 'email',
        iconLeft: 'envelope',
        iconRight: 'check',
        placeholder: 'ejemplo@correo.com'
    },
    userWithSettings: {
        type: 'text',
        iconLeft: 'user',
        iconRight: 'cog',
        placeholder: 'Nombre de usuario'
    }
};

// Mensajes por defecto (ACTUALIZADO)
export const DEFAULT_MESSAGES = {
    required: 'Este campo es requerido',
    email: 'Ingresa un email válido',
    minLength: 'Muy corto',
    maxLength: 'Muy largo',
    pattern: 'Formato inválido',
    // ✅ NUEVOS MENSAJES
    passwordToggled: 'Contraseña visible',
    passwordHidden: 'Contraseña oculta',
    iconClicked: 'Icono activado'
};

// Placeholders por tipo (ACTUALIZADO)
export const DEFAULT_PLACEHOLDERS = {
    text: 'Ingresa texto',
    email: 'ejemplo@correo.com',
    password: '••••••••',
    tel: '(555) 123-4567',
    url: 'https://ejemplo.com',
    search: 'Buscar...',
    number: '0'
};

// ✅ UTILIDADES PARA CALLBACKS
export const CALLBACK_UTILS = {
    /**
     * Genera un callback por defecto para un tipo de icono
     */
    getDefaultCallback: (iconType) => {
        const callbacks = {
            search: () => console.log('Ejecutando búsqueda...'),
            clear: () => console.log('Limpiando campo...'),
            filter: () => console.log('Abriendo filtros...'),
            settings: () => console.log('Abriendo configuración...'),
            check: () => console.log('Validando...'),
            copy: () => console.log('Copiando contenido...')
        };

        return callbacks[iconType] || (() => console.log(`Callback para ${iconType}`));
    },

    /**
     * Verifica si un icono debería ser clicable
     */
    isClickableIcon: (iconName) => {
        const clickableIcons = ['search', 'times', 'filter', 'cog', 'check', 'copy', 'eye', 'eye-slash'];
        return clickableIcons.includes(iconName);
    }
};
