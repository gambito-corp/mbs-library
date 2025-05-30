import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants.js';

/**
 * Genera las clases CSS para el componente Button
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.variant - Variante del botón
 * @param {string} params.size - Tamaño del botón
 * @param {boolean} params.fullWidth - Si ocupa t-odo el ancho
 * @param {boolean} params.disabled - Si está deshabilitado
 * @param {boolean} params.loading - Si está en estado de carga
 * @param {boolean} params.hasIcon - Si tiene icono
 * @param {string} params.className - Clases adicionales
 * @returns {string} Clases CSS combinadas
 */
export const getButtonClasses = ({
                                     variant = 'primary',
                                     size = 'medium',
                                     fullWidth = false,
                                     disabled = false,
                                     loading = false,
                                     hasIcon = false,
                                     color,
                                     className = ''
                                 }) => {
    // Clases base (de tus estilos originales)
    const baseClasses = 'font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 transform hover:scale-105 shadow-md hover:shadow-lg';

    // Clases de variante
    let variantClasses;
    if (color) {
        variantClasses = getCustomColorClasses(color, variant);
    } else {
        variantClasses = BUTTON_VARIANTS[variant]?.baseClasses || BUTTON_VARIANTS.primary.baseClasses;
    }

    // Clases de tamaño
    const sizeConfig = BUTTON_SIZES[size] || BUTTON_SIZES.medium;
    const sizeClasses = `${sizeConfig.padding} ${sizeConfig.fontSize} ${sizeConfig.minHeight}`;

    // Clases de estado
    const stateClasses = [
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        loading && 'cursor-wait hover:scale-100',
        hasIcon && 'gap-2'
    ].filter(Boolean).join(' ');

    return [baseClasses, variantClasses, sizeClasses, stateClasses, className]
        .filter(Boolean)
        .join(' ')
        .trim();
};

/**
 * Valida si una variante de botón es válida
 * @param {string} variant - Variante a validar
 * @returns {boolean} True si es válida
 */
export const isValidButtonVariant = (variant) => {
    return Object.keys(BUTTON_VARIANTS).includes(variant);
};

/**
 * Valida si un tamaño de botón es válido
 * @param {string} size - Tamaño a validar
 * @returns {boolean} True si es válido
 */
export const isValidButtonSize = (size) => {
    return Object.keys(BUTTON_SIZES).includes(size);
};

/**
 * Obtiene la configuración de una variante
 * @param {string} variant - Variante del botón
 * @returns {Object} Configuración de la variante
 */
export const getButtonVariantConfig = (variant) => {
    return BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
};

/**
 * Obtiene la configuración de un tamaño
 * @param {string} size - Tamaño del botón
 * @returns {Object} Configuración del tamaño
 */
export const getButtonSizeConfig = (size) => {
    return BUTTON_SIZES[size] || BUTTON_SIZES.medium;
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineButtonClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Determina el tamaño del icono basado en el tamaño del botón
 * @param {string} buttonSize - Tamaño del botón
 * @returns {string} Tamaño del icono apropiado
 */
export const getIconSizeForButton = (buttonSize) => {
    const iconSizeMap = {
        xs: 'xs',
        small: 'xs',
        medium: 'small',
        large: 'medium',
        xlarge: 'large',
        game: 'small'
    };

    return iconSizeMap[buttonSize] || 'small';
};

/**
 * Genera props específicas según el elemento HTML
 * @param {string} as - Elemento a renderizar
 * @param {Object} props - Props originales
 * @returns {Object} Props filtradas según el elemento
 */
export const getElementSpecificProps = (as, props) => {
    const { href, target, type, disabled, onClick, ...restProps } = props;

    switch (as) {
        case 'a':
        case 'link':
            return {
                href,
                target,
                onClick: disabled ? undefined : onClick,
                ...restProps
            };

        case 'button':
            return {
                type,
                disabled,
                onClick: disabled ? undefined : onClick,
                ...restProps
            };

        default:
            return {
                onClick: disabled ? undefined : onClick,
                ...restProps
            };
    }
};

/**
 * Calcula el contraste de color para texto
 * @param {string} backgroundColor - Color de fondo
 * @returns {string} Color de texto contrastante
 */
export const getContrastTextColor = (backgroundColor) => {
    // Colores predefinidos para variantes
    const contrastMap = {
        primary: 'white',
        secondary: 'white',
        success: 'white',
        danger: 'white',
        warning: 'white',
        outline: 'inherit',
        ghost: 'inherit',
        gameReveal: '#195b81',
        gameCorrect: 'white',
        gameIncorrect: 'white',
        gameRestart: 'white',
        gameExit: 'white'
    };

    return contrastMap[backgroundColor] || 'white';
};

/**
 * Genera clases de animación para diferentes estados
 * @param {string} state - Estado del botón (hover, active, focus)
 * @returns {string} Clases de animación
 */
export const getAnimationClasses = (state) => {
    const animations = {
        hover: 'hover:scale-105 hover:shadow-lg',
        active: 'active:scale-95',
        focus: 'focus:ring-4',
        loading: 'cursor-wait',
        disabled: 'cursor-not-allowed hover:scale-100'
    };

    return animations[state] || '';
};

/**
 * Valida las props del botón
 * @param {Object} props - Props a validar
 * @returns {Array} Array de errores de validación
 */
export const validateButtonProps = (props) => {
    const errors = [];

    if (props.variant && !isValidButtonVariant(props.variant)) {
        errors.push(`Variante inválida: ${props.variant}`);
    }

    if (props.size && !isValidButtonSize(props.size)) {
        errors.push(`Tamaño inválido: ${props.size}`);
    }

    if (props.as === 'a' && !props.href) {
        errors.push('href es requerido cuando as="a"');
    }

    if (props.iconPosition && !['left', 'right', 'top', 'bottom'].includes(props.iconPosition)) {
        errors.push(`Posición de icono inválida: ${props.iconPosition}`);
    }

    return errors;
};

/**
 * Genera clases responsivas para el botón
 * @param {string} size - Tamaño base
 * @returns {string} Clases responsivas
 */
export const getResponsiveClasses = (size) => {
    const responsiveMap = {
        xs: 'sm:px-3 sm:py-2',
        small: 'sm:px-4 sm:py-2',
        medium: 'sm:px-6 sm:py-3',
        large: 'sm:px-8 sm:py-4',
        xlarge: 'sm:px-10 sm:py-5'
    };

    return responsiveMap[size] || '';
};

export const getCustomColorClasses = (color, variant = 'primary') => {
    if (!color) return '';

    // Mapeo de colores Tailwind
    const colorMap = {
        // Colores básicos
        blue: {
            bg: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
            text: 'text-white',
            border: 'border-blue-500 hover:border-blue-600'
        },
        red: {
            bg: 'bg-red-500 hover:bg-red-600 focus:ring-red-300',
            text: 'text-white',
            border: 'border-red-500 hover:border-red-600'
        },
        green: {
            bg: 'bg-green-500 hover:bg-green-600 focus:ring-green-300',
            text: 'text-white',
            border: 'border-green-500 hover:border-green-600'
        },
        yellow: {
            bg: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300',
            text: 'text-white',
            border: 'border-yellow-500 hover:border-yellow-600'
        },
        purple: {
            bg: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-300',
            text: 'text-white',
            border: 'border-purple-500 hover:border-purple-600'
        },
        pink: {
            bg: 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-300',
            text: 'text-white',
            border: 'border-pink-500 hover:border-pink-600'
        },
        indigo: {
            bg: 'bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300',
            text: 'text-white',
            border: 'border-indigo-500 hover:border-indigo-600'
        },
        gray: {
            bg: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-300',
            text: 'text-white',
            border: 'border-gray-500 hover:border-gray-600'
        },
        orange: {
            bg: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-300',
            text: 'text-white',
            border: 'border-orange-500 hover:border-orange-600'
        },
        teal: {
            bg: 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-300',
            text: 'text-white',
            border: 'border-teal-500 hover:border-teal-600'
        },
        cyan: {
            bg: 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-300',
            text: 'text-white',
            border: 'border-cyan-500 hover:border-cyan-600'
        },
        emerald: {
            bg: 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-300',
            text: 'text-white',
            border: 'border-emerald-500 hover:border-emerald-600'
        }
    };

    const colorConfig = colorMap[color];
    if (!colorConfig) return '';

    // Aplicar según la variante
    switch (variant) {
        case 'outline':
            return `${colorConfig.border} text-${color}-500 hover:bg-${color}-500 hover:text-white`;
        case 'ghost':
            return `text-${color}-500 hover:bg-${color}-50`;
        default:
            return `${colorConfig.bg} ${colorConfig.text}`;
    }
};