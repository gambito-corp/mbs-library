import { ALERT_TYPES, ALERT_SIZES, STYLE_CONFIG } from './Alert.constants.js';

/**
 * Genera las clases CSS para el componente Alert (extraído de tu código original)
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.type - Tipo de alerta
 * @param {string} params.variant - Variante visual
 * @param {string} params.size - Tamaño del componente
 * @param {string} params.className - Clases adicionales
 * @returns {string} Clases CSS combinadas
 */
export const getAlertClasses = ({ type, variant, size, className }) => {
    const baseClasses = 'rounded-lg font-semibold flex items-start gap-3 relative transition-all duration-200';
    const typeClasses = STYLE_CONFIG[type]?.[variant] || STYLE_CONFIG.info.filled;
    const sizeClasses = `${ALERT_SIZES[size].padding} ${ALERT_SIZES[size].fontSize}`;

    return `${baseClasses} ${typeClasses} ${sizeClasses} ${className}`.trim();
};

/**
 * Obtiene el icono para un tipo específico de alerta (extraído de tu typeConfig)
 * @param {string} type - Tipo de alerta
 * @returns {string} Nombre del icono
 */
export const getAlertIcon = (type) => {
    return ALERT_TYPES[type]?.icon || ALERT_TYPES.info.icon;
};

/**
 * Valida si un tipo de alerta es válido
 * @param {string} type - Tipo a validar
 * @returns {boolean} True si es válido
 */
export const isValidAlertType = (type) => {
    return Object.keys(ALERT_TYPES).includes(type);
};

/**
 * Obtiene la configuración completa de un tipo de alerta
 * @param {string} type - Tipo de alerta
 * @returns {Object} Configuración del tipo
 */
export const getAlertTypeConfig = (type) => {
    return ALERT_TYPES[type] || ALERT_TYPES.info;
};

/**
 * Obtiene las clases de tamaño para un tamaño específico
 * @param {string} size - Tamaño del componente
 * @returns {string} Clases CSS de tamaño
 */
export const getSizeClasses = (size) => {
    const sizeConfig = ALERT_SIZES[size] || ALERT_SIZES.medium;
    return `${sizeConfig.padding} ${sizeConfig.fontSize}`;
};
