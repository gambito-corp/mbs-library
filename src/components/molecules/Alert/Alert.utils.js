import { ALERT_TYPES } from './Alert.constants.js';

/**
 * Obtiene el icono automático según el tipo de alert
 */
export const getIconForType = (alertType) => {
    const iconMap = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'times-circle'
    };
    return iconMap[alertType] || 'info-circle';
};

/**
 * Obtiene el color del tipo de alert
 */
export const getColorForType = (alertType) => {
    return ALERT_TYPES[alertType]?.color || ALERT_TYPES.info.color;
};

/**
 * Valida si una URL es válida
 */
export const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;

    try {
        new URL(url);
        return true;
    } catch {
        // Si no es URL absoluta, verificar si es relativa válida
        return url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
    }
};

/**
 * Valida las props del Alert
 */
export const validateAlertProps = (props) => {
    const warnings = [];
    const errors = [];

    // Validar tipo
    if (props.type && !Object.keys(ALERT_TYPES).includes(props.type)) {
        warnings.push(`Tipo "${props.type}" no es válido`);
    }

    // Validar enlace
    if (props.linkText && !props.linkUrl) {
        warnings.push('linkText proporcionado sin linkUrl');
    }

    if (props.linkUrl && !props.linkText) {
        warnings.push('linkUrl proporcionado sin linkText');
    }

    if (props.linkUrl && !isValidUrl(props.linkUrl)) {
        errors.push(`URL "${props.linkUrl}" no es válida`);
    }

    // Validar contenido
    if (!props.title && !props.message) {
        warnings.push('Alert sin título ni mensaje');
    }

    return { warnings, errors, isValid: errors.length === 0 };
};

/**
 * Genera el texto accesible para el alert
 */
export const getAlertAccessibleText = ({ type, title, message }) => {
    const typeLabel = ALERT_TYPES[type]?.label || 'Información';
    const content = [title, message].filter(Boolean).join(': ');
    return `${typeLabel}. ${content}`;
};

/**
 * Determina si el enlace debe abrirse en nueva ventana
 */
export const shouldOpenInNewWindow = (url, target) => {
    if (target === '_blank') return true;
    if (target && target !== '_self') return true;

    // URLs externas por defecto en nueva ventana
    try {
        const urlObj = new URL(url);
        return urlObj.origin !== window.location.origin;
    } catch {
        return false; // URLs relativas en misma ventana
    }
};

/**
 * Formatea el mensaje para mostrar
 */
export const formatMessage = (message, maxLength = 200) => {
    if (!message || typeof message !== 'string') return '';

    if (message.length <= maxLength) return message;

    return message.substring(0, maxLength - 3) + '...';
};

/**
 * Genera clases CSS para el alert
 */
export const getAlertClasses = ({ type, className = '' }) => {
    return [
        'alert',
        type ? `alert--${type}` : '',
        className
    ].filter(Boolean).join(' ');
};
