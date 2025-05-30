export const CONTAINER_TYPES = {
    layout: {
        label: 'Layout',
        description: 'Contenedor para estructurar el layout'
    },
    content: {
        label: 'Contenido',
        description: 'Contenedor para agrupar contenido'
    },
    card: {
        label: 'Tarjeta',
        description: 'Contenedor con estilo de tarjeta'
    }
};

export const CONTAINER_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Contenedor básico sin estilos especiales'
    },
    card: {
        label: 'Tarjeta',
        description: 'Contenedor con apariencia de tarjeta'
    },
    panel: {
        label: 'Panel',
        description: 'Contenedor con bordes y fondo'
    },
    hero: {
        label: 'Héroe',
        description: 'Contenedor para secciones destacadas'
    },
    sidebar: {
        label: 'Sidebar',
        description: 'Contenedor para barras laterales'
    },
    modal: {
        label: 'Modal',
        description: 'Contenedor para contenido modal'
    }
};

export const CONTAINER_SIZES = {
    xs: {
        label: 'Extra pequeño',
        description: 'Contenedor muy compacto',
        maxWidth: 'max-w-xs'
    },
    small: {
        label: 'Pequeño',
        description: 'Contenedor compacto',
        maxWidth: 'max-w-sm'
    },
    medium: {
        label: 'Mediano',
        description: 'Contenedor estándar',
        maxWidth: 'max-w-md'
    },
    large: {
        label: 'Grande',
        description: 'Contenedor amplio',
        maxWidth: 'max-w-lg'
    },
    xlarge: {
        label: 'Extra grande',
        description: 'Contenedor muy amplio',
        maxWidth: 'max-w-xl'
    },
    full: {
        label: 'Completo',
        description: 'Contenedor de ancho completo',
        maxWidth: 'max-w-full'
    }
};

// Configuración de estilos por variante
export const STYLE_CONFIG = {
    default: {
        default: '',
        card: 'bg-white border border-gray-200 shadow-sm',
        panel: 'bg-gray-50 border border-gray-300',
        hero: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
        sidebar: 'bg-gray-100 border-r border-gray-300',
        modal: 'bg-white border border-gray-300 shadow-xl'
    }
};

// Configuración de espaciado
export const SPACING_CONFIG = {
    padding: {
        none: 'p-0',
        small: 'p-2',
        medium: 'p-4',
        large: 'p-6',
        xlarge: 'p-8'
    },
    margin: {
        none: 'm-0',
        small: 'm-2',
        medium: 'm-4',
        large: 'm-6',
        xlarge: 'm-8',
        auto: 'mx-auto'
    }
};

// Configuración de sombras
export const SHADOW_CONFIG = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
};

// Configuración de bordes
export const BORDER_CONFIG = {
    none: '',
    sm: 'border',
    md: 'border-2',
    lg: 'border-4',
    dashed: 'border border-dashed',
    dotted: 'border border-dotted'
};

// Configuración de bordes redondeados
export const ROUNDED_CONFIG = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
};

// Configuración de fondos
export const BACKGROUND_CONFIG = {
    transparent: 'bg-transparent',
    white: 'bg-white',
    gray: 'bg-gray-100',
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    accent: 'bg-purple-500'
};

// Configuración de anchos máximos
export const MAX_WIDTH_CONFIG = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    none: 'max-w-none'
};
