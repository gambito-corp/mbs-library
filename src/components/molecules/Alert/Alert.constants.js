export const ALERT_TYPES = {
    info: {
        label: 'Información',
        description: 'Alert para mostrar información general',
        icon: 'info-circle',
        color: '#1565c0'
    },
    success: {
        label: 'Éxito',
        description: 'Alert para mostrar operaciones exitosas',
        icon: 'check-circle',
        color: '#2e7d32'
    },
    warning: {
        label: 'Advertencia',
        description: 'Alert para mostrar advertencias',
        icon: 'exclamation-triangle',
        color: '#b26a00'
    },
    error: {
        label: 'Error',
        description: 'Alert para mostrar errores',
        icon: 'times-circle',
        color: '#c62828'
    }
};

export const ALERT_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'Alert compacto',
        padding: 'small'
    },
    medium: {
        label: 'Mediano',
        description: 'Alert estándar',
        padding: 'medium'
    },
    large: {
        label: 'Grande',
        description: 'Alert prominente',
        padding: 'large'
    }
};

export const ALERT_SHADOWS = {
    none: {
        label: 'Sin sombra',
        description: 'Alert sin sombra'
    },
    sm: {
        label: 'Sombra pequeña',
        description: 'Sombra sutil'
    },
    md: {
        label: 'Sombra mediana',
        description: 'Sombra estándar'
    },
    lg: {
        label: 'Sombra grande',
        description: 'Sombra prominente'
    }
};

export const LINK_TARGETS = {
    '_blank': {
        label: 'Nueva ventana',
        description: 'Abre en nueva ventana/pestaña'
    },
    '_self': {
        label: 'Misma ventana',
        description: 'Abre en la misma ventana'
    },
    '_parent': {
        label: 'Ventana padre',
        description: 'Abre en la ventana padre'
    },
    '_top': {
        label: 'Ventana superior',
        description: 'Abre en la ventana superior'
    }
};
