import { TEXT_VARIANTS, TEXT_SIZES, TEXT_COLORS, TEXT_NEON_COLORS }  from './Text.constants.js';


export const getTextBEMClasses = ({
                                      variant = 'default',
                                      size = 'medium',
                                      color,
                                      className = ''
                                  }) => {
    const blockClass = 'text';
    const modifiers = [];

    if (variant && variant !== 'default') {
        modifiers.push(`${blockClass}--${variant}`);
    }

    if (size && size !== 'medium') {
        modifiers.push(`${blockClass}--${size}`);
    }

    if (color && color !== 'default') {
        modifiers.push(`${blockClass}--color-${color}`);
    }

    return [blockClass, ...modifiers, className]
        .filter(Boolean)
        .join(' ')
        .trim();
};


export const isValidBEMVariant = (variant) => {
    return ['default', 'bold', 'bolder', 'tiny', 'light', 'cursiva', 'subrayado', 'muted', 'gradient', 'gradient-animated', 'neon'].includes(variant);
};

export const isValidBEMSize = (size) => {
    return Object.keys(TEXT_SIZES).includes(size);
};

export const isValidBEMColor = (color) => {
    return Object.keys(TEXT_COLORS).includes(color);
};
export const isValidNeonColor = (neonColor) => {
    return Object.keys(TEXT_NEON_COLORS).includes(neonColor);
};
