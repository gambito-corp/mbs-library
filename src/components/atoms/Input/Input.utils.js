import { INPUT_VARIANTS, INPUT_SIZES, VALIDATION_PATTERNS } from './Input.constants.js';

/**
 * Genera las clases CSS para el componente Input
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.variant - Variante del input
 * @param {string} params.size - Tamaño del input
 * @param {boolean} params.fullWidth - Si ocupa todo el ancho
 * @param {boolean} params.disabled - Si está deshabilitado
 * @param {boolean} params.readOnly - Si es solo lectura
 * @param {boolean} params.error - Si tiene error
 * @param {boolean} params.success - Si tiene éxito
 * @param {boolean} params.hasIcon - Si tiene icono
 * @param {string} params.className - Clases adicionales
 * @returns {string} Clases CSS combinadas
 */
export const getInputClasses = ({
                                    variant = 'default',
                                    size = 'medium',
                                    fullWidth = true,
                                    disabled = false,
                                    readOnly = false,
                                    error = false,
                                    success = false,
                                    hasIcon = false,
                                    className = ''
                                }) => {
    // Clases base
    const baseClasses = 'input-field transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded-lg border';

    // Configuración de variante
    const variantConfig = INPUT_VARIANTS[variant] || INPUT_VARIANTS.default;
    const sizeConfig = INPUT_SIZES[size] || INPUT_SIZES.medium;

    // Clases de variante
    const variantClasses = `${variantConfig.borderColor} ${variantConfig.focusColor} ${variantConfig.backgroundColor}`;

    // Clases de tamaño
    const sizeClasses = `${sizeConfig.padding} ${sizeConfig.fontSize} ${sizeConfig.height}`;

    // Clases de estado
    const stateClasses = [
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
        readOnly && 'bg-gray-50 cursor-default',
        hasIcon && 'pl-10', // Espacio para icono izquierdo
        error && 'border-red-500 focus:border-red-600 focus:ring-red-500',
        success && 'border-green-500 focus:border-green-600 focus:ring-green-500'
    ].filter(Boolean).join(' ');

    return [baseClasses, variantClasses, sizeClasses, stateClasses, className]
        .filter(Boolean)
        .join(' ')
        .trim();
};

/**
 * Genera clases para el contenedor del input
 * @param {boolean} fullWidth - Si ocupa todo el ancho
 * @returns {string} Clases del contenedor
 */
export const getInputContainerClasses = (fullWidth = true) => {
    const baseClasses = 'input-container';
    const widthClasses = fullWidth ? 'w-full' : 'inline-block';

    return `${baseClasses} ${widthClasses}`;
};

/**
 * Genera clases para el wrapper del input
 * @returns {string} Clases del wrapper
 */
export const getInputWrapperClasses = () => {
    return 'input-wrapper relative flex items-center';
};

/**
 * Genera clases para iconos del input
 * @param {string} position - Posición del icono (left, right)
 * @param {string} size - Tamaño del input
 * @returns {string} Clases del icono
 */
export const getInputIconClasses = (position = 'left', size = 'medium') => {
    const baseClasses = 'input-icon absolute pointer-events-none';
    const positionClasses = position === 'left' ? 'left-3' : 'right-3';
    const sizeClasses = 'top-1/2 transform -translate-y-1/2';

    return `${baseClasses} ${positionClasses} ${sizeClasses}`;
};

/**
 * Valida un input según su tipo
 * @param {string} value - Valor a validar
 * @param {string} type - Tipo de input
 * @param {boolean} required - Si es requerido
 * @returns {Object} Resultado de validación
 */
export const validateInput = (value, type = 'text', required = false) => {
    const result = {
        isValid: true,
        message: ''
    };

    // Validar campo requerido
    if (required && (!value || value.trim() === '')) {
        result.isValid = false;
        result.message = 'Este campo es requerido';
        return result;
    }

    // Si no hay valor y no es requerido, es válido
    if (!value || value.trim() === '') {
        return result;
    }

    // Validar según el tipo
    const validation = VALIDATION_PATTERNS[type];
    if (validation && !validation.pattern.test(value)) {
        result.isValid = false;
        result.message = validation.message;
    }

    return result;
};

/**
 * Formatea el valor según el tipo de input
 * @param {string} value - Valor a formatear
 * @param {string} type - Tipo de input
 * @returns {string} Valor formateado
 */
export const formatInputValue = (value, type) => {
    if (!value) return value;

    switch (type) {
        case 'tel':
            // Formatear teléfono (ejemplo básico)
            return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        case 'number':
            // Asegurar que solo sean números
            return value.replace(/[^\d.-]/g, '');
        case 'email':
            // Convertir a minúsculas
            return value.toLowerCase().trim();
        default:
            return value;
    }
};

/**
 * Obtiene el icono apropiado para un tipo de input
 * @param {string} type - Tipo de input
 * @returns {string} Nombre del icono
 */
export const getIconForInputType = (type) => {
    const iconMap = {
        email: 'envelope',
        password: 'lock',
        search: 'search',
        tel: 'phone',
        url: 'link',
        user: 'user',
        date: 'calendar',
        time: 'clock'
    };

    return iconMap[type] || null;
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineInputClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Valida si un tamaño de input es válido
 * @param {string} size - Tamaño a validar
 * @returns {boolean} True si es válido
 */
export const isValidInputSize = (size) => {
    return Object.keys(INPUT_SIZES).includes(size);
};

/**
 * Valida si una variante de input es válida
 * @param {string} variant - Variante a validar
 * @returns {boolean} True si es válida
 */
export const isValidInputVariant = (variant) => {
    return Object.keys(INPUT_VARIANTS).includes(variant);
};

/**
 * Genera placeholder apropiado según el tipo
 * @param {string} type - Tipo de input
 * @returns {string} Placeholder sugerido
 */
export const getPlaceholderForType = (type) => {
    const placeholders = {
        email: 'ejemplo@correo.com',
        password: '••••••••',
        tel: '(555) 123-4567',
        url: 'https://ejemplo.com',
        search: 'Buscar...',
        date: 'dd/mm/aaaa',
        time: 'hh:mm',
        number: '0'
    };

    return placeholders[type] || '';
};
