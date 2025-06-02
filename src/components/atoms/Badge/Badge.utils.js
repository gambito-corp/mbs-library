import { BADGE_VARIANTS, BADGE_SIZES, BADGE_SHAPES, BADGE_POSITIONS } from './Badge.constants.js';

/**
 * Genera las clases CSS para el componente Badge
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.variant - Variante del badge
 * @param {string} params.size - Tamaño del badge
 * @param {string} params.shape - Forma del badge
 * @param {boolean} params.positioned - Si está posicionado
 * @param {string} params.position - Posición del badge
 * @param {boolean} params.dot - Si es tipo punto
 * @param {boolean} params.clickable - Si es clicable
 * @param {string} params.className - Clases adicionales
 * @returns {string} Clases CSS combinadas
 */
export const getBadgeClasses = ({
                                    variant = 'default',
                                    size = 'medium',
                                    shape = 'rounded',
                                    positioned = false,
                                    position = 'top-right',
                                    dot = false,
                                    clickable = false,
                                    className = ''
                                }) => {
    // Clases base
    const baseClasses = 'badge-component inline-flex items-center justify-center font-medium transition-all duration-200';

    // Configuración de variante
    const variantConfig = BADGE_VARIANTS[variant] || BADGE_VARIANTS.default;
    const sizeConfig = BADGE_SIZES[size] || BADGE_SIZES.medium;
    const shapeConfig = BADGE_SHAPES[shape] || BADGE_SHAPES.rounded;

    // Clases de variante
    const variantClasses = [
        variantConfig.bgColor,
        variantConfig.textColor,
        variantConfig.borderColor && `border ${variantConfig.borderColor}`
    ].filter(Boolean).join(' ');

    // Clases de tamaño
    const sizeClasses = dot ? sizeConfig.dotSize :
        `${sizeConfig.padding} ${sizeConfig.fontSize} ${sizeConfig.minWidth} ${sizeConfig.height}`;

    // Clases de forma
    const shapeClasses = dot ? 'rounded-full' : shapeConfig.className;

    // Clases de posición
    const positionClasses = positioned ?
        `${BADGE_POSITIONS[position]?.className || ''} z-10` : '';

    // Clases de interacción
    const interactionClasses = clickable ? 'cursor-pointer hover:opacity-80' : '';

    return [
        baseClasses,
        variantClasses,
        sizeClasses,
        shapeClasses,
        positionClasses,
        interactionClasses,
        className
    ].filter(Boolean).join(' ').trim();
};

/**
 * Formatea el contenido del contador
 * @param {number} count - Número a formatear
 * @param {number} max - Valor máximo
 * @returns {string} Contenido formateado
 */
export const formatBadgeCount = (count, max = 99) => {
    if (typeof count !== 'number') return '';
    if (count <= max) return count.toString();
    return `${max}+`;
};

/**
 * Determina si el badge debe ser visible
 * @param {Object} params - Parámetros de visibilidad
 * @param {boolean} params.invisible - Si está marcado como invisible
 * @param {number} params.count - Contador
 * @param {boolean} params.showZero - Si mostrar cuando es cero
 * @param {any} params.children - Contenido hijo
 * @param {boolean} params.dot - Si es tipo punto
 * @returns {boolean} Si debe ser visible
 */
export const shouldBadgeBeVisible = ({
                                         invisible = false,
                                         count,
                                         showZero = false,
                                         children,
                                         dot = false
                                     }) => {
    // Si está marcado como invisible
    if (invisible) return false;

    // Si es tipo punto, siempre visible
    if (dot) return true;

    // Si tiene contenido hijo, visible
    if (children) return true;

    // Si tiene contador
    if (typeof count === 'number') {
        if (count === 0 && !showZero) return false;
        return true;
    }

    // Sin contenido ni contador
    return false;
};

/**
 * Valida las props del badge
 * @param {Object} props - Props del badge
 * @returns {Object} Resultado de validación
 */
export const validateBadgeProps = (props) => {
    const warnings = [];
    const errors = [];

    // Validar variante
    if (props.variant && !Object.keys(BADGE_VARIANTS).includes(props.variant)) {
        warnings.push(`Variante "${props.variant}" no es válida`);
    }

    // Validar tamaño
    if (props.size && !Object.keys(BADGE_SIZES).includes(props.size)) {
        warnings.push(`Tamaño "${props.size}" no es válido`);
    }

    // Validar forma
    if (props.shape && !Object.keys(BADGE_SHAPES).includes(props.shape)) {
        warnings.push(`Forma "${props.shape}" no es válida`);
    }

    // Validar posición
    if (props.position && !Object.keys(BADGE_POSITIONS).includes(props.position)) {
        warnings.push(`Posición "${props.position}" no es válida`);
    }

    // Validar dismissible sin onDismiss
    if (props.dismissible && !props.onDismiss) {
        warnings.push('Badge dismissible sin función onDismiss');
    }

    // Validar positioned sin position
    if (props.positioned && !props.position) {
        warnings.push('Badge positioned sin especificar position');
    }

    // Validar count negativo
    if (typeof props.count === 'number' && props.count < 0) {
        errors.push('Count no puede ser negativo');
    }

    return { warnings, errors, isValid: errors.length === 0 };
};

/**
 * Obtiene la configuración por defecto para un tipo de badge
 * @param {string} type - Tipo de badge
 * @returns {Object} Configuración por defecto
 */
export const getDefaultBadgeConfig = (type) => {
    const configs = {
        notification: {
            variant: 'error',
            shape: 'pill',
            positioned: true,
            position: 'top-right',
            showZero: false
        },
        status: {
            variant: 'success',
            shape: 'pill',
            icon: 'check',
            size: 'small'
        },
        category: {
            variant: 'default',
            shape: 'rounded',
            dismissible: true,
            size: 'medium'
        },
        counter: {
            variant: 'primary',
            shape: 'pill',
            showZero: false,
            max: 99
        },
        dot: {
            dot: true,
            variant: 'error',
            positioned: true,
            position: 'top-right'
        }
    };

    return configs[type] || {};
};

/**
 * Combina configuraciones de badge
 * @param {Object} defaultConfig - Configuración por defecto
 * @param {Object} userConfig - Configuración del usuario
 * @returns {Object} Configuración combinada
 */
export const mergeBadgeConfigs = (defaultConfig, userConfig) => {
    return {
        ...defaultConfig,
        ...userConfig
    };
};

/**
 * Calcula el color del badge basado en el valor
 * @param {number} value - Valor numérico
 * @param {Object} thresholds - Umbrales de color
 * @returns {string} Variante de color
 */
export const getBadgeVariantByValue = (value, thresholds = {}) => {
    const {
        success = 0,
        warning = 5,
        error = 10
    } = thresholds;

    if (value <= success) return 'success';
    if (value <= warning) return 'warning';
    if (value <= error) return 'error';
    return 'error';
};

/**
 * Genera un ID único para el badge
 * @param {string} prefix - Prefijo del ID
 * @returns {string} ID único
 */
export const generateBadgeId = (prefix = 'badge') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Obtiene el texto accesible para el badge
 * @param {Object} params - Parámetros del badge
 * @returns {string} Texto para screen readers
 */
export const getBadgeAccessibleText = ({
                                           children,
                                           count,
                                           variant,
                                           dot
                                       }) => {
    if (dot) {
        return `Indicador ${variant}`;
    }

    if (typeof count === 'number') {
        return `${count} notificaciones`;
    }

    if (children) {
        return `Etiqueta: ${children}`;
    }

    return 'Badge';
};

/**
 * Maneja la animación de entrada del badge
 * @param {HTMLElement} element - Elemento del badge
 * @param {string} animation - Tipo de animación
 */
export const animateBadgeEntry = (element, animation = 'fadeIn') => {
    if (!element) return;

    const animations = {
        fadeIn: 'animate-fade-in',
        slideIn: 'animate-slide-in',
        bounce: 'animate-bounce-in',
        scale: 'animate-scale-in'
    };

    const animationClass = animations[animation] || animations.fadeIn;
    element.classList.add(animationClass);

    // Remover clase después de la animación
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 300);
};

/**
 * Maneja la animación de salida del badge
 * @param {HTMLElement} element - Elemento del badge
 * @param {Function} callback - Función a ejecutar después
 */
export const animateBadgeExit = (element, callback) => {
    if (!element) return;

    element.classList.add('animate-fade-out');

    setTimeout(() => {
        if (callback) callback();
    }, 200);
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineBadgeClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Verifica si un valor es un color válido de badge
 * @param {string} variant - Variante a verificar
 * @returns {boolean} Si es válida
 */
export const isValidBadgeVariant = (variant) => {
    return Object.keys(BADGE_VARIANTS).includes(variant);
};

/**
 * Obtiene el contraste de texto apropiado para un color de fondo
 * @param {string} bgColor - Color de fondo
 * @returns {string} Color de texto
 */
export const getContrastTextColor = (bgColor) => {
    const lightColors = ['yellow', 'warning', 'light'];
    return lightColors.includes(bgColor) ? 'text-black' : 'text-white';
};
