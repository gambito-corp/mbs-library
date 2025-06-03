import { INPUT_VARIANTS, INPUT_SIZES, VALIDATION_PATTERNS } from './Input.constants.js';

/**
 * Genera las clases BEM para el componente Input
 */
export const getInputBEMClasses = ({
                                       variant = 'default',
                                       size = 'medium',
                                       fullWidth = true,
                                       disabled = false,
                                       readOnly = false,
                                       hasIconLeft = false,
                                       hasIconRight = false,
                                       className = ''
                                   }) => {
    const base = 'input';
    const mods = [];

    // Variante
    if (variant !== 'default') {
        mods.push(`${base}--${variant}`);
    }

    // Tamaño
    if (size !== 'medium') {
        mods.push(`${base}--${size}`);
    }

    // Estados
    if (fullWidth) mods.push(`${base}--full`);
    if (disabled) mods.push(`${base}--disabled`);
    if (readOnly) mods.push(`${base}--readonly`);
    if (hasIconLeft) mods.push(`${base}--with-icon-left`);
    if (hasIconRight) mods.push(`${base}--with-icon-right`);

    return [base, ...mods, className].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para el contenedor
 */
export const getInputContainerBEMClasses = (fullWidth = true) => {
    const base = 'input-container';
    const mods = [];

    if (fullWidth) mods.push(`${base}--full`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para el wrapper
 */
export const getInputWrapperBEMClasses = () => {
    return 'input__wrapper';
};

/**
 * Genera clases BEM para iconos
 */
export const getInputIconBEMClasses = (position = 'left', clickable = false) => {
    const base = 'input__icon';
    const mods = [];

    mods.push(`${base}--${position}`);
    if (clickable) mods.push(`${base}--clickable`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para etiquetas
 */
export const getInputLabelBEMClasses = (required = false) => {
    const base = 'input__label';
    const mods = [];

    if (required) mods.push(`${base}--required`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para mensajes
 */
export const getInputMessageBEMClasses = (type = 'default') => {
    const base = 'input__message';
    const mods = [];

    if (type !== 'default') mods.push(`${base}--${type}`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Valida un input según su tipo
 */
export const validateInput = (value, type = 'text', required = false) => {
    const result = {
        isValid: true,
        message: ''
    };

    if (required && (!value || value.trim() === '')) {
        result.isValid = false;
        result.message = 'Este campo es requerido';
        return result;
    }

    if (!value || value.trim() === '') {
        return result;
    }

    const validation = VALIDATION_PATTERNS[type];
    if (validation && !validation.pattern.test(value)) {
        result.isValid = false;
        result.message = validation.message;
    }

    return result;
};

/**
 * Obtiene el icono apropiado para un tipo de input
 */
export const getIconForInputType = (type) => {
    const iconMap = {
        email: 'envelope',
        password: 'lock',
        search: 'search',
        tel: 'phone',
        url: 'link',
        text: 'font',
        number: 'hashtag'
    };

    return iconMap[type] || null;
};

/**
 * Formatea el valor según el tipo de input
 */
export const formatInputValue = (value, type) => {
    if (!value) return value;

    switch (type) {
        case 'tel':
            return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        case 'number':
            return value.replace(/[^\d.-]/g, '');
        case 'email':
            return value.toLowerCase().trim();
        default:
            return value;
    }
};
