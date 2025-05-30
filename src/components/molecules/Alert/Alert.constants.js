export const ALERT_TYPES = {
    error: {
        icon: 'exclamation-triangle',
        label: 'Error',
        description: 'Indica un error o problema que requiere atención inmediata',
        severity: 'high'
    },
    success: {
        icon: 'check',
        label: 'Éxito',
        description: 'Confirma que una acción se completó exitosamente',
        severity: 'low'
    },
    warning: {
        icon: 'exclamation-triangle',
        label: 'Advertencia',
        description: 'Alerta sobre algo que requiere precaución',
        severity: 'medium'
    },
    info: {
        icon: 'info-circle',
        label: 'Información',
        description: 'Proporciona información útil al usuario',
        severity: 'low'
    }
};

export const ALERT_VARIANTS = {
    filled: {
        label: 'Relleno',
        description: 'Fondo de color con bordes y texto contrastante'
    },
    outlined: {
        label: 'Contorno',
        description: 'Solo bordes con fondo transparente'
    },
    solid: {
        label: 'Sólido',
        description: 'Fondo sólido con texto blanco'
    }
};

export const ALERT_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'Compacto para espacios reducidos',
        padding: 'px-3 py-2',
        fontSize: 'text-sm'
    },
    medium: {
        label: 'Mediano',
        description: 'Tamaño estándar para uso general',
        padding: 'px-4 py-3',
        fontSize: 'text-base'
    },
    large: {
        label: 'Grande',
        description: 'Prominente para mensajes importantes',
        padding: 'px-6 py-4',
        fontSize: 'text-lg'
    }
};

// Configuración de estilos por tipo y variante (extraída de tu código original)
export const STYLE_CONFIG = {
    error: {
        filled: 'bg-red-100 border border-red-400 text-red-700',
        outlined: 'border-2 border-red-400 text-red-700 bg-transparent',
        solid: 'bg-red-500 text-white border border-red-500'
    },
    success: {
        filled: 'bg-green-100 border border-green-400 text-green-700',
        outlined: 'border-2 border-green-400 text-green-700 bg-transparent',
        solid: 'bg-green-500 text-white border border-green-500'
    },
    warning: {
        filled: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
        outlined: 'border-2 border-yellow-400 text-yellow-700 bg-transparent',
        solid: 'bg-yellow-500 text-white border border-yellow-500'
    },
    info: {
        filled: 'bg-blue-100 border border-blue-400 text-blue-700',
        outlined: 'border-2 border-blue-400 text-blue-700 bg-transparent',
        solid: 'bg-blue-500 text-white border border-blue-500'
    }
};
