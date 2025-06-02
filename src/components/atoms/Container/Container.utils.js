import { CONTAINER_VARIANTS, CONTAINER_SIZES } from './Container.constants.js';

/**
 * Genera clases BEM para el componente Container
 */
export const getContainerBEMClasses = ({
                                           variant = 'default',
                                           size = 'medium',
                                           maxWidth = 'full',
                                           padding = 'medium',
                                           margin = 'none',
                                           centered = false,
                                           fluid = false,
                                           shadow = 'none',
                                           fitContent = false,
                                           border = 'none',
                                           rounded = 'none',
                                           background = 'transparent',
                                           className = ''
                                       }) => {
    // BLOCK - Clase base del componente
    const blockClass = 'container';

    // MODIFIERS - Variaciones del bloque
    const modifiers = [];

    // Agregar modificador de variante (si no es default)
    if (variant && variant !== 'default') {
        modifiers.push(`${blockClass}--${variant}`);
    }

    // Agregar modificador de tamaño (si no es medium)
    if (size && size !== 'medium') {
        modifiers.push(`${blockClass}--${size}`);
    }

    // Agregar modificador de ancho máximo (si no es full)
    if (maxWidth && maxWidth !== 'full') {
        modifiers.push(`${blockClass}--max-${maxWidth}`);
    }

    // Agregar modificador de padding (si no es medium)
    if (padding && padding !== 'medium') {
        modifiers.push(`${blockClass}--padding-${padding}`);
    }

    // Agregar modificador de margin (si no es none)
    if (margin && margin !== 'none') {
        modifiers.push(`${blockClass}--margin-${margin}`);
    }

    // Agregar modificador de sombra (si no es none)
    if (shadow && shadow !== 'none') {
        modifiers.push(`${blockClass}--shadow-${shadow}`);
    }

    // Agregar modificador de borde (si no es none)
    if (border && border !== 'none') {
        modifiers.push(`${blockClass}--border-${border}`);
    }

    // Agregar modificador de bordes redondeados (si no es none)
    if (rounded && rounded !== 'none') {
        modifiers.push(`${blockClass}--rounded-${rounded}`);
    }

    // Agregar modificador de fondo (si no es transparent)
    if (background && background !== 'transparent') {
        modifiers.push(`${blockClass}--bg-${background}`);
    }

    if (fitContent) {
        modifiers.push(`${blockClass}--fit-content`);
    }

    // Agregar modificadores de estado
    if (centered) {
        modifiers.push(`${blockClass}--centered`);
    }

    if (fluid) {
        modifiers.push(`${blockClass}--fluid`);
    }

    return [blockClass, ...modifiers, className]
        .filter(Boolean)
        .join(' ')
        .trim();
};

export const isValidVariant = (variant) => {
    return Object.keys(CONTAINER_VARIANTS).includes(variant);
};

export const isValidSize = (size) => {
    return Object.keys(CONTAINER_SIZES).includes(size);
};
