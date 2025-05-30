import {
    CONTAINER_VARIANTS,
    STYLE_CONFIG,
    SPACING_CONFIG,
    SHADOW_CONFIG,
    BORDER_CONFIG,
    ROUNDED_CONFIG,
    BACKGROUND_CONFIG,
    MAX_WIDTH_CONFIG
} from './Container.constants.js';

/**
 * Genera las clases CSS para el componente Container
 */
export const getContainerClasses = ({
                                        variant = 'default',
                                        size = 'medium',
                                        maxWidth = 'full',
                                        padding = 'medium',
                                        margin = 'none',
                                        centered = false,
                                        fluid = false,
                                        shadow = 'none',
                                        border = 'none',
                                        rounded = 'none',
                                        background = 'transparent',
                                        className = ''
                                    }) => {
    const baseClasses = 'container-component transition-all duration-200';

    // Variante principal
    const variantClasses = STYLE_CONFIG.default[variant] || '';

    // Ancho máximo
    const maxWidthClasses = fluid ? 'w-full' : (MAX_WIDTH_CONFIG[maxWidth] || 'max-w-full');

    // Espaciado
    const paddingClasses = SPACING_CONFIG.padding[padding] || '';
    const marginClasses = SPACING_CONFIG.margin[margin] || '';

    // Centrado
    const centeredClasses = centered ? 'mx-auto' : '';

    // Efectos visuales
    const shadowClasses = SHADOW_CONFIG[shadow] || '';
    const borderClasses = BORDER_CONFIG[border] || '';
    const roundedClasses = ROUNDED_CONFIG[rounded] || '';
    const backgroundClasses = BACKGROUND_CONFIG[background] || '';

    return [
        baseClasses,
        variantClasses,
        maxWidthClasses,
        paddingClasses,
        marginClasses,
        centeredClasses,
        shadowClasses,
        borderClasses,
        roundedClasses,
        backgroundClasses,
        className
    ].filter(Boolean).join(' ').trim();
};

/**
 * Valida si una variante es válida
 */
export const isValidVariant = (variant) => {
    return Object.keys(CONTAINER_VARIANTS).includes(variant);
};

/**
 * Obtiene la configuración de una variante
 */
export const getVariantConfig = (variant) => {
    return CONTAINER_VARIANTS[variant] || CONTAINER_VARIANTS.default;
};

/**
 * Combina clases CSS de forma segura
 */
export const combineClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Calcula el ancho responsivo basado en el tamaño
 */
export const getResponsiveWidth = (size, fluid) => {
    if (fluid) return 'w-full';

    const responsiveWidths = {
        xs: 'w-full sm:max-w-xs',
        small: 'w-full sm:max-w-sm',
        medium: 'w-full md:max-w-md',
        large: 'w-full lg:max-w-lg',
        xlarge: 'w-full xl:max-w-xl',
        full: 'w-full'
    };

    return responsiveWidths[size] || responsiveWidths.medium;
};
