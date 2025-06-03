import { IMAGE_VARIANTS, IMAGE_SIZES, IMAGE_SHAPES, AVATAR_STATUS } from './Image.constants.js';

/**
 * Genera las clases BEM para el componente Image
 */
export const getImageBEMClasses = ({
                                       variant = 'thumbnail',
                                       size = 'medium',
                                       shape = 'rounded',
                                       loading = false,
                                       error = false,
                                       hover = false,
                                       className = ''
                                   }) => {
    const base = 'image';
    const mods = [];

    // Variante
    if (variant !== 'thumbnail') {
        mods.push(`${base}--${variant}`);
    }

    // Tamaño
    if (size !== 'medium') {
        mods.push(`${base}--${size}`);
    }

    // Forma
    if (shape !== 'rounded') {
        mods.push(`${base}--${shape}`);
    }

    // Estados
    if (loading) mods.push(`${base}--loading`);
    if (error) mods.push(`${base}--error`);
    if (hover) mods.push(`${base}--hover`);

    return [base, ...mods, className].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para el contenedor
 */
export const getImageContainerBEMClasses = (positioned = false) => {
    const base = 'image-container';
    const mods = [];

    if (positioned) mods.push(`${base}--positioned`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para el status indicator
 */
export const getStatusIndicatorBEMClasses = (status, size = 'medium') => {
    const base = 'image__status';
    const mods = [];

    if (status !== 'online') mods.push(`${base}--${status}`);
    if (size !== 'medium') mods.push(`${base}--${size}`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Genera clases BEM para fallback
 */
export const getFallbackBEMClasses = (type = 'placeholder') => {
    const base = 'image__fallback';
    const mods = [];

    if (type !== 'placeholder') mods.push(`${base}--${type}`);

    return [base, ...mods].filter(Boolean).join(' ');
};

/**
 * Extrae iniciales del nombre
 */
export const getInitials = (name) => {
    if (!name) return '?';

    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }

    return words
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join('');
};

/**
 * Valida si una URL de imagen es válida
 */
export const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;

    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Genera srcSet para imágenes responsive
 */
export const generateSrcSet = (baseSrc, sizes = [1, 2, 3]) => {
    if (!baseSrc) return '';

    return sizes
        .map(scale => `${baseSrc}?w=${scale}x ${scale}x`)
        .join(', ');
};

/**
 * Obtiene el color del status
 */
export const getStatusColor = (status) => {
    return AVATAR_STATUS[status]?.color || AVATAR_STATUS.offline.color;
};

/**
 * Valida las props del componente Image
 */
export const validateImageProps = (props) => {
    const warnings = [];
    const errors = [];

    if (props.variant && !Object.keys(IMAGE_VARIANTS).includes(props.variant)) {
        warnings.push(`Variante "${props.variant}" no es válida`);
    }

    if (props.size && !Object.keys(IMAGE_SIZES).includes(props.size)) {
        warnings.push(`Tamaño "${props.size}" no es válido`);
    }

    if (props.shape && !Object.keys(IMAGE_SHAPES).includes(props.shape)) {
        warnings.push(`Forma "${props.shape}" no es válida`);
    }

    if (props.variant === 'avatar' && props.status && !Object.keys(AVATAR_STATUS).includes(props.status)) {
        warnings.push(`Status "${props.status}" no es válido para avatar`);
    }

    if (!props.src && !props.fallback) {
        errors.push('Se requiere src o fallback');
    }

    return { warnings, errors, isValid: errors.length === 0 };
};
