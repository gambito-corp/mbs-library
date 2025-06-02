import { TEXTAREA_VARIANTS, TEXTAREA_SIZES, RESIZE_OPTIONS, AUTO_GROW_CONFIG } from './TextArea.constants.js';

/**
 * Genera las clases CSS para el componente TextArea
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.variant - Variante del TextArea
 * @param {string} params.size - Tamaño del TextArea
 * @param {string} params.resize - Tipo de redimensionamiento
 * @param {boolean} params.fullWidth - Si ocupa todo el ancho
 * @param {boolean} params.disabled - Si está deshabilitado
 * @param {boolean} params.readOnly - Si es solo lectura
 * @param {boolean} params.error - Si tiene error
 * @param {boolean} params.success - Si tiene éxito
 * @param {boolean} params.hasIconLeft - Si tiene icono izquierdo
 * @param {boolean} params.hasIconRight - Si tiene icono derecho
 * @param {boolean} params.autoGrow - Si tiene crecimiento automático
 * @param {string} params.className - Clases adicionales
 * @returns {string} Clases CSS combinadas
 */
export const getTextAreaClasses = ({
                                       variant = 'default',
                                       size = 'medium',
                                       resize = 'vertical',
                                       fullWidth = true,
                                       disabled = false,
                                       readOnly = false,
                                       error = false,
                                       success = false,
                                       hasIconLeft = false,
                                       hasIconRight = false,
                                       autoGrow = false,
                                       className = ''
                                   }) => {
    // Clases base
    const baseClasses = 'textarea-field w-full border rounded-lg transition-all duration-200 focus:outline-none';

    // Configuración de variante
    const variantConfig = TEXTAREA_VARIANTS[variant] || TEXTAREA_VARIANTS.default;
    const sizeConfig = TEXTAREA_SIZES[size] || TEXTAREA_SIZES.medium;
    const resizeConfig = RESIZE_OPTIONS[resize] || RESIZE_OPTIONS.vertical;

    // Clases de variante
    const variantClasses = `${variantConfig.borderColor} ${variantConfig.focusColor} ${variantConfig.backgroundColor}`;

    // Clases de tamaño
    const sizeClasses = `${sizeConfig.padding} ${sizeConfig.fontSize}`;

    // Clases de resize
    const resizeClasses = resizeConfig.className;

    // Clases de estado
    const stateClasses = [
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
        readOnly && 'bg-gray-50 cursor-default',
        error && 'border-red-500 focus:border-red-600 focus:ring-red-100 bg-red-50',
        success && 'border-green-500 focus:border-green-600 focus:ring-green-100 bg-green-50',
        autoGrow && 'overflow-hidden'
    ].filter(Boolean).join(' ');

    // Clases de iconos
    const iconClasses = [
        hasIconLeft && sizeConfig.iconPadding.left,
        hasIconRight && sizeConfig.iconPadding.right,
        hasIconLeft && hasIconRight && sizeConfig.iconPadding.both
    ].filter(Boolean).join(' ');

    return [baseClasses, variantClasses, sizeClasses, resizeClasses, stateClasses, iconClasses, className]
        .filter(Boolean)
        .join(' ')
        .trim();
};

/**
 * Calcula el número de filas para auto-grow
 * @param {HTMLTextAreaElement} textarea - Elemento textarea
 * @param {number} minRows - Mínimo de filas
 * @param {number} maxRows - Máximo de filas
 * @returns {number} Número de filas calculado
 */
export const calculateAutoGrowRows = (textarea, minRows = 2, maxRows = 10) => {
    if (!textarea) return minRows;

    // Resetear altura para obtener scrollHeight real
    textarea.style.height = 'auto';

    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 24;
    const paddingTop = parseInt(getComputedStyle(textarea).paddingTop) || 0;
    const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom) || 0;

    const contentHeight = textarea.scrollHeight - paddingTop - paddingBottom;
    const calculatedRows = Math.ceil(contentHeight / lineHeight);

    return Math.min(Math.max(calculatedRows, minRows), maxRows);
};

/**
 * Ajusta la altura del textarea para auto-grow
 * @param {HTMLTextAreaElement} textarea - Elemento textarea
 * @param {number} minRows - Mínimo de filas
 * @param {number} maxRows - Máximo de filas
 */
export const adjustTextAreaHeight = (textarea, minRows = 2, maxRows = 10) => {
    if (!textarea) return;

    const rows = calculateAutoGrowRows(textarea, minRows, maxRows);
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 24;
    const paddingTop = parseInt(getComputedStyle(textarea).paddingTop) || 0;
    const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom) || 0;

    const newHeight = (rows * lineHeight) + paddingTop + paddingBottom;
    textarea.style.height = `${newHeight}px`;
};

/**
 * Valida el contenido del textarea
 * @param {string} value - Valor a validar
 * @param {Object} rules - Reglas de validación
 * @returns {Object} Resultado de validación
 */
export const validateTextArea = (value, rules = {}) => {
    const result = {
        isValid: true,
        errors: [],
        warnings: []
    };

    const text = value || '';
    const length = text.length;

    // Validar campo requerido
    if (rules.required && length === 0) {
        result.isValid = false;
        result.errors.push('Este campo es requerido');
        return result;
    }

    // Validar longitud mínima
    if (rules.minLength && length > 0 && length < rules.minLength) {
        result.isValid = false;
        result.errors.push(`Mínimo ${rules.minLength} caracteres`);
    }

    // Validar longitud máxima
    if (rules.maxLength && length > rules.maxLength) {
        result.isValid = false;
        result.errors.push(`Máximo ${rules.maxLength} caracteres`);
    }

    // Advertencia cerca del límite
    if (rules.maxLength && length > rules.maxLength * 0.8) {
        result.warnings.push(`Te acercas al límite (${length}/${rules.maxLength})`);
    }

    return result;
};

/**
 * Obtiene el estado del contador de caracteres
 * @param {number} currentLength - Longitud actual
 * @param {number} maxLength - Longitud máxima
 * @returns {Object} Estado del contador
 */
export const getCharacterCounterState = (currentLength, maxLength) => {
    if (!maxLength) return { color: 'normal', percentage: 0 };

    const percentage = currentLength / maxLength;

    if (percentage >= 1.0) {
        return { color: 'danger', percentage, isOverLimit: true };
    } else if (percentage >= 0.8) {
        return { color: 'warning', percentage, isNearLimit: true };
    } else {
        return { color: 'normal', percentage };
    }
};

/**
 * Formatea el texto del contador de caracteres
 * @param {number} currentLength - Longitud actual
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto formateado
 */
export const formatCharacterCount = (currentLength, maxLength) => {
    if (maxLength) {
        return `${currentLength}/${maxLength}`;
    } else {
        return `${currentLength}`;
    }
};

/**
 * Maneja atajos de teclado en textarea
 * @param {KeyboardEvent} event - Evento de teclado
 * @param {Object} callbacks - Callbacks para atajos
 */
export const handleKeyboardShortcuts = (event, callbacks = {}) => {
    const { ctrlKey, metaKey, key } = event;
    const isModifierPressed = ctrlKey || metaKey;

    if (!isModifierPressed) return;

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
        case 'b':
            if (callbacks.onBold) {
                event.preventDefault();
                callbacks.onBold();
            }
            break;
        case 'i':
            if (callbacks.onItalic) {
                event.preventDefault();
                callbacks.onItalic();
            }
            break;
        default:
            break;
    }
};

/**
 * Obtiene la posición del cursor en el textarea
 * @param {HTMLTextAreaElement} textarea - Elemento textarea
 * @returns {Object} Posición del cursor
 */
export const getCursorPosition = (textarea) => {
    if (!textarea) return { start: 0, end: 0 };

    return {
        start: textarea.selectionStart,
        end: textarea.selectionEnd
    };
};

/**
 * Establece la posición del cursor en el textarea
 * @param {HTMLTextAreaElement} textarea - Elemento textarea
 * @param {number} start - Posición inicial
 * @param {number} end - Posición final
 */
export const setCursorPosition = (textarea, start, end = start) => {
    if (!textarea) return;

    textarea.focus();
    textarea.setSelectionRange(start, end);
};

/**
 * Inserta texto en la posición del cursor
 * @param {HTMLTextAreaElement} textarea - Elemento textarea
 * @param {string} textToInsert - Texto a insertar
 * @returns {string} Nuevo valor del textarea
 */
export const insertTextAtCursor = (textarea, textToInsert) => {
    if (!textarea) return '';

    const { start, end } = getCursorPosition(textarea);
    const currentValue = textarea.value;

    const newValue = currentValue.slice(0, start) + textToInsert + currentValue.slice(end);
    const newCursorPosition = start + textToInsert.length;

    textarea.value = newValue;
    setCursorPosition(textarea, newCursorPosition);

    return newValue;
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineTextAreaClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Valida si un tamaño de textarea es válido
 * @param {string} size - Tamaño a validar
 * @returns {boolean} True si es válido
 */
export const isValidTextAreaSize = (size) => {
    return Object.keys(TEXTAREA_SIZES).includes(size);
};

/**
 * Valida si una variante de textarea es válida
 * @param {string} variant - Variante a validar
 * @returns {boolean} True si es válida
 */
export const isValidTextAreaVariant = (variant) => {
    return Object.keys(TEXTAREA_VARIANTS).includes(variant);
};

/**
 * Obtiene la configuración por defecto para un caso de uso
 * @param {string} useCase - Caso de uso
 * @returns {Object} Configuración por defecto
 */
export const getDefaultConfigForUseCase = (useCase) => {
    const configs = {
        comment: { rows: 3, maxLength: 500, placeholder: 'Escribe tu comentario...' },
        message: { autoGrow: true, minRows: 2, maxRows: 8, placeholder: 'Escribe tu mensaje...' },
        description: { rows: 5, maxLength: 1000, placeholder: 'Describe detalladamente...' },
        review: { autoGrow: true, maxLength: 800, placeholder: 'Comparte tu experiencia...' },
        feedback: { rows: 4, maxLength: 600, placeholder: 'Tus comentarios...' }
    };

    return configs[useCase] || { rows: 3, placeholder: 'Escribe aquí...' };
};
