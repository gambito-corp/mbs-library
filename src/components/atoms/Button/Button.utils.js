import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants.js';

/**
 * Genera las clases BEM para el componente Button
 */
export const getButtonBEMClasses = ({
                                        variant = 'primary',
                                        size = 'medium',
                                        fullWidth = false,
                                        disabled = false,
                                        loading = false,
                                        hasIcon = false,
                                        iconPosition = 'left',
                                        color,
                                        className = ''
                                    }) => {
    const base = 'button';
    const mods = [];

    // Variante
    mods.push(`${base}--${variant}`);

    // Tamaño (solo si no es medium)
    // ✅ SIEMPRE AGREGAR TAMAÑO (incluido medium)
    mods.push(`${base}--${size}`);

    // Estados
    if (fullWidth) mods.push(`${base}--full`);
    if (disabled) mods.push(`${base}--disabled`);
    if (loading) mods.push(`${base}--loading`);
    if (hasIcon) mods.push(`${base}--with-icon`);

    // Posición de icono
    if (hasIcon && iconPosition !== 'left') {
        mods.push(`${base}--icon-${iconPosition}`);
    }

    return [base, ...mods, className].filter(Boolean).join(' ');
};

/**
 * Determina el color de texto automático basado en la variante y color
 */
export const getContrastTextColor = (variant, color) => {
    // Mapeo de colores de texto según la variante
    const textColorMap = {
        primary: '#ffffff',
        gradient: '#ffffff',
        secondary: '#ffffff',
        success: '#ffffff',
        danger: '#ffffff',
        warning: '#ffffff',
        outline: '#2563eb',
        ghost: '#2563eb',
        gameReveal: '#195b81',
        gameCorrect: '#ffffff',
        gameIncorrect: '#ffffff',
        gameRestart: '#ffffff',
        gameExit: '#ffffff'
    };

    return textColorMap[variant] || '#ffffff';
};

/**
 * Valida si una variante es válida
 */
export const isValidVariant = (variant) => {
    return Object.keys(BUTTON_VARIANTS).includes(variant);
};

/**
 * Valida si un tamaño es válido
 */
export const isValidSize = (size) => {
    return Object.keys(BUTTON_SIZES).includes(size);
};

/**
 * Obtiene la configuración de una variante
 */
export const getVariantConfig = (variant) => {
    return BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
};

/**
 * Obtiene la configuración de un tamaño
 */
export const getSizeConfig = (size) => {
    return BUTTON_SIZES[size] || BUTTON_SIZES.medium;
};
