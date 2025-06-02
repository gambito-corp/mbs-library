import { TEMPLATENAME_TYPES, TEMPLATENAME_VARIANTS, TEMPLATENAME_SIZES, STYLE_CONFIG } from './Avatar.constants.js';

/**
 * Genera las clases CSS para el componente Avatar
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.type - Tipo del componente
 * @param {string} params.variant - Variante visual
 * @param {string} params.size - Tamaño del componente
 * @param {string} params.className - Clases adicionales
 * @returns {string} Clases CSS combinadas
 */
export const getAvatarClasses = ({ type = 'default', variant = 'default', size = 'medium', className = '' }) => {
    const baseClasses = 'Avatar rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center';
    const typeClasses = STYLE_CONFIG[type]?.[variant] || STYLE_CONFIG.default.default;
    const sizeClasses = `${TEMPLATENAME_SIZES[size].padding} ${TEMPLATENAME_SIZES[size].fontSize}`;

    return `${baseClasses} ${typeClasses} ${sizeClasses} ${className}`.trim();
};

/**
 * Valida si un tipo de Avatar es válido
 * @param {string} type - Tipo a validar
 * @returns {boolean} True si es válido
 */
export const isValidAvatarType = (type) => {
    return Object.keys(TEMPLATENAME_TYPES).includes(type);
};

/**
 * Valida si una variante de Avatar es válida
 * @param {string} variant - Variante a validar
 * @returns {boolean} True si es válida
 */
export const isValidAvatarVariant = (variant) => {
    return Object.keys(TEMPLATENAME_VARIANTS).includes(variant);
};

/**
 * Obtiene la configuración completa de un tipo de Avatar
 * @param {string} type - Tipo del componente
 * @returns {Object} Configuración del tipo
 */
export const getAvatarTypeConfig = (type) => {
    return TEMPLATENAME_TYPES[type] || TEMPLATENAME_TYPES.default;
};

/**
 * Obtiene la configuración completa de una variante de Avatar
 * @param {string} variant - Variante del componente
 * @returns {Object} Configuración de la variante
 */
export const getAvatarVariantConfig = (variant) => {
    return TEMPLATENAME_VARIANTS[variant] || TEMPLATENAME_VARIANTS.default;
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};
