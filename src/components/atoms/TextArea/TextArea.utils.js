import { TEXTAREA_VARIANTS, TEXTAREA_SIZES, RESIZE_OPTIONS } from './TextArea.constants.js';

/**
 * Genera las clases BEM para el componente TextArea
 */
export const getTextAreaBEMClasses = ({
                                          variant = 'default',
                                          size = 'medium',
                                          fullWidth = true,
                                          disabled = false,
                                          readOnly = false,
                                          hasIconLeft = false,
                                          hasIconRight = false,
                                          resize = 'vertical',
                                          autoGrow = false,
                                          className = ''
                                      }) => {
    const base = 'textarea';
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
    if (autoGrow) mods.push(`${base}--auto-grow`);

    // Resize
    if (resize !== 'vertical') {
        mods.push(`${base}--resize-${resize}`);
    }

    return [base, ...mods, className].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para el contenedor
 */
export const getTextAreaContainerBEMClasses = (fullWidth = true) => {
    const base = 'textarea-container';
    const mods = [];

    if (fullWidth) mods.push(`${base}--full`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para el wrapper
 */
export const getTextAreaWrapperBEMClasses = () => {
    return 'textarea__wrapper';
};

/**
 * Genera clases BEM para iconos
 */
export const getTextAreaIconBEMClasses = (position = 'left', clickable = false) => {
    const base = 'textarea__icon';
    const mods = [];

    mods.push(`${base}--${position}`);
    if (clickable) mods.push(`${base}--clickable`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para etiquetas
 */
export const getTextAreaLabelBEMClasses = (required = false) => {
    const base = 'textarea__label';
    const mods = [];

    if (required) mods.push(`${base}--required`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para mensajes
 */
export const getTextAreaMessageBEMClasses = (type = 'default') => {
    const base = 'textarea__message';
    const mods = [];

    if (type !== 'default') mods.push(`${base}--${type}`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para contador de caracteres
 */
export const getCharacterCounterBEMClasses = (status = 'normal') => {
    const base = 'textarea__counter';
    const mods = [];

    if (status !== 'normal') mods.push(`${base}--${status}`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Calcula la altura automática del textarea
 */
export const calculateAutoHeight = (value, minRows = 2, maxRows = 10, lineHeight = 1.5) => {
    if (!value) return `${minRows * lineHeight}rem`;

    const lines = value.split('\n').length;
    const calculatedRows = Math.max(minRows, Math.min(lines, maxRows));

    return `${calculatedRows * lineHeight}rem`;
};

/**
 * Valida el contenido del textarea
 */
export const validateTextArea = (value, rules = {}) => {
    const result = {
        isValid: true,
        message: '',
        characterCount: value ? value.length : 0
    };

    if (rules.required && (!value || value.trim() === '')) {
        result.isValid = false;
        result.message = 'Este campo es requerido';
        return result;
    }

    if (rules.minLength && value && value.length < rules.minLength) {
        result.isValid = false;
        result.message = `Mínimo ${rules.minLength} caracteres`;
        return result;
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
        result.isValid = false;
        result.message = `Máximo ${rules.maxLength} caracteres`;
        return result;
    }

    return result;
};

/**
 * Obtiene el estado del contador de caracteres
 */
export const getCharacterCounterStatus = (currentLength, maxLength, warningThreshold = 0.8) => {
    if (!maxLength) return 'normal';

    const percentage = currentLength / maxLength;

    if (percentage >= 1) return 'danger';
    if (percentage >= warningThreshold) return 'warning';
    return 'normal';
};

/**
 * Maneja atajos de teclado
 */
export const handleKeyboardShortcuts = (event, callbacks = {}) => {
    const { ctrlKey, key } = event;

    if (ctrlKey) {
        switch (key.toLowerCase()) {
            case 's':
                if (callbacks.onSave) {
                    event.preventDefault();
                    callbacks.onSave();
                }
                break;
            case 'enter':
                if (callbacks.onSend) {
                    event.preventDefault();
                    callbacks.onSend();
                }
                break;
            default:
                break;
        }
    }
};
