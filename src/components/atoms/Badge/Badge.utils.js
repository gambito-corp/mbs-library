import { BADGE_VARIANTS, BADGE_SIZES, BADGE_SHAPES, BADGE_POSITIONS } from './Badge.constants.js';

/**
 * Genera las clases BEM para el componente Badge
 */
export const getBadgeBEMClasses = ({
                                       variant = 'default',
                                       size = 'medium',
                                       shape = 'rounded',
                                       positioned = false,
                                       position = 'top-right',
                                       dot = false,
                                       clickable = false,
                                       dismissible = false,
                                       className = ''
                                   }) => {
    const base = 'badge';
    const mods = [];

    // Variante
    if (variant !== 'default') {
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
    if (positioned) mods.push(`${base}--positioned`);
    if (dot) mods.push(`${base}--dot`);
    if (clickable) mods.push(`${base}--clickable`);
    if (dismissible) mods.push(`${base}--dismissible`);

    // Posición
    if (positioned && position !== 'top-right') {
        mods.push(`${base}--${position.replace('-', '-')}`);
    }

    return [base, ...mods, className].filter(Boolean).join(' ');
};

/**
 * Formatea el contenido del contador
 */
export const formatBadgeCount = (count, max = 99) => {
    if (typeof count !== 'number') return '';
    if (count <= max) return count.toString();
    return `${max}+`;
};

/**
 * Determina si el badge debe ser visible
 */
export const shouldBadgeBeVisible = ({
                                         invisible = false,
                                         count,
                                         showZero = false,
                                         children,
                                         dot = false
                                     }) => {
    if (invisible) return false;
    if (dot) return true;
    if (children) return true;

    if (typeof count === 'number') {
        if (count === 0 && !showZero) return false;
        return true;
    }

    return false;
};

/**
 * Obtiene el tamaño del icono según el tamaño del badge
 */
export const getIconSizeForBadge = (badgeSize) => {
    switch (badgeSize) {
        case 'small': return 'xs';
        case 'large': return 'small';
        case 'medium':
        default: return 'xs';
    }
};

/**
 * Valida las props del badge
 */
export const validateBadgeProps = (props) => {
    const warnings = [];
    const errors = [];

    if (props.variant && !Object.keys(BADGE_VARIANTS).includes(props.variant)) {
        warnings.push(`Variante "${props.variant}" no es válida`);
    }

    if (props.size && !Object.keys(BADGE_SIZES).includes(props.size)) {
        warnings.push(`Tamaño "${props.size}" no es válido`);
    }

    if (props.shape && !Object.keys(BADGE_SHAPES).includes(props.shape)) {
        warnings.push(`Forma "${props.shape}" no es válida`);
    }

    if (props.dismissible && !props.onDismiss) {
        warnings.push('Badge dismissible sin función onDismiss');
    }

    if (typeof props.count === 'number' && props.count < 0) {
        errors.push('Count no puede ser negativo');
    }

    return { warnings, errors, isValid: errors.length === 0 };
};

/**
 * Obtiene el texto accesible para el badge
 */
export const getBadgeAccessibleText = ({ children, count, variant, dot }) => {
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
