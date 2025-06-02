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
        description: 'Contenedor muy compacto (320px)'
    },
    small: {
        label: 'Pequeño',
        description: 'Contenedor compacto (480px)'
    },
    medium: {
        label: 'Mediano',
        description: 'Contenedor estándar (640px)'
    },
    large: {
        label: 'Grande',
        description: 'Contenedor amplio (768px)'
    },
    xlarge: {
        label: 'Extra grande',
        description: 'Contenedor muy amplio (1024px)'
    },
    full: {
        label: 'Completo',
        description: 'Contenedor de ancho completo'
    }
};

export const CONTAINER_MAX_WIDTHS = {
    xs: '20rem',      // 320px
    sm: '24rem',      // 384px
    md: '28rem',      // 448px
    lg: '32rem',      // 512px
    xl: '36rem',      // 576px
    '2xl': '42rem',   // 672px
    '3xl': '48rem',   // 768px
    '4xl': '56rem',   // 896px
    '5xl': '64rem',   // 1024px
    '6xl': '72rem',   // 1152px
    '7xl': '80rem',   // 1280px
    full: '100%',
    none: 'none'
};

export const CONTAINER_PADDINGS = {
    none: '0',
    small: '0.5rem',   // 8px
    medium: '1rem',    // 16px
    large: '1.5rem',   // 24px
    xlarge: '2rem'     // 32px
};

export const CONTAINER_MARGINS = {
    none: '0',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
    auto: 'auto'
};
