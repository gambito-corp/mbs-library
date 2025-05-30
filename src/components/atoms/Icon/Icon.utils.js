import { ICON_SIZES, ICON_VARIANTS } from './Icon.constants.js';

/**
 * Genera las clases CSS para el componente Icon
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.size - Tamaño del icono
 * @param {string} params.variant - Variante de color
 * @param {string} params.className - Clases adicionales
 * @param {boolean} params.disabled - Si el icono está deshabilitado
 * @param {boolean} params.loading - Si el icono está en estado de carga
 * @returns {string} Clases CSS combinadas
 */
export const getIconClasses = ({
                                   size = 'medium',
                                   variant = 'default',
                                   className = '',
                                   disabled = false,
                                   loading = false,
                                   textColor // ✅ NUEVA PROP
                               }) => {
    const baseClasses = 'icon-component inline-flex items-center justify-center transition-all duration-200';
    const sizeClasses = ICON_SIZES[size]?.className || 'icon-md';

    // ✅ Usar color personalizado si está disponible
    let variantClasses;
    if (textColor) {
        variantClasses = getIconCustomColorClasses(textColor);
    } else {
        variantClasses = `icon-${variant}`;
    }

    const stateClasses = [
        disabled && 'icon-disabled',
        loading && 'icon-loading'
    ].filter(Boolean).join(' ');

    return [baseClasses, sizeClasses, variantClasses, stateClasses, className]
        .filter(Boolean)
        .join(' ')
        .trim();
};


/**
 * Valida si un tipo de icono es válido
 * @param {string} type - Tipo a validar
 * @returns {boolean} True si es válido
 */
export const isValidIconType = (type) => {
    const validTypes = ['fas', 'far', 'fab', 'fal', 'fad'];
    return validTypes.includes(type);
};

/**
 * Valida si un tamaño de icono es válido
 * @param {string} size - Tamaño a validar
 * @returns {boolean} True si es válido
 */
export const isValidIconSize = (size) => {
    return Object.keys(ICON_SIZES).includes(size);
};

/**
 * Valida si una variante de icono es válida
 * @param {string} variant - Variante a validar
 * @returns {boolean} True si es válida
 */
export const isValidIconVariant = (variant) => {
    return Object.keys(ICON_VARIANTS).includes(variant);
};

/**
 * Renderiza un icono SVG personalizado
 * @param {string} svgContent - Contenido SVG
 * @param {Object} props - Props adicionales
 * @returns {JSX.Element} Elemento SVG renderizado
 */
export const renderCustomIcon = (svgContent, props = {}) => {
    if (!svgContent) return null;

    const { ariaLabel, title, alt } = props;

    return (
        <div
            className="icon-svg-custom"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            role="img"
            aria-label={ariaLabel || alt || 'Custom icon'}
            title={title}
        />
    );
};

/**
 * Convierte un código de color hex a RGB
 * @param {string} hex - Color en formato hex
 * @returns {Object} Objeto con valores r, g, b
 */
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/**
 * Genera un color con opacidad
 * @param {string} color - Color base
 * @param {number} opacity - Opacidad (0-1)
 * @returns {string} Color con opacidad aplicada
 */
export const getColorWithOpacity = (color, opacity = 1) => {
    if (!color) return color;

    const rgb = hexToRgb(color);
    if (rgb) {
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }

    return color;
};

/**
 * Obtiene el tamaño en píxeles de un icono
 * @param {string} size - Tamaño del icono
 * @returns {string} Tamaño en píxeles
 */
export const getIconSizeInPixels = (size) => {
    return ICON_SIZES[size]?.size || ICON_SIZES.medium.size;
};

/**
 * Detecta si un string es un SVG válido
 * @param {string} content - Contenido a validar
 * @returns {boolean} True si es SVG válido
 */
export const isValidSVG = (content) => {
    if (!content || typeof content !== 'string') return false;

    const svgRegex = /<svg[^>]*>[\s\S]*<\/svg>/i;
    return svgRegex.test(content.trim());
};

/**
 * Detecta si un string es una URL de imagen válida
 * @param {string} url - URL a validar
 * @returns {boolean} True si es URL de imagen válida
 */
export const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;

    const imageExtensions = /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i;
    const dataUrl = /^data:image\//i;

    return imageExtensions.test(url) || dataUrl.test(url) || url.startsWith('http');
};

/**
 * Detecta si un string es un emoji válido
 * @param {string} text - Texto a validar
 * @returns {boolean} True si es emoji válido
 */
export const isValidEmoji = (text) => {
    if (!text || typeof text !== 'string') return false;

    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(text);
};

/**
 * Genera un ID único para iconos
 * @param {string} prefix - Prefijo del ID
 * @returns {string} ID único
 */
export const generateIconId = (prefix = 'icon') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineIconClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Obtiene el contraste de color apropiado
 * @param {string} backgroundColor - Color de fondo
 * @returns {string} Color de texto contrastante
 */
export const getContrastColor = (backgroundColor) => {
    if (!backgroundColor) return '#000000';

    const rgb = hexToRgb(backgroundColor);
    if (!rgb) return '#000000';

    // Calcular luminancia
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

    return luminance > 0.5 ? '#000000' : '#ffffff';
};

/**
 * Optimiza un SVG para mejor rendimiento
 * @param {string} svgContent - Contenido SVG
 * @returns {string} SVG optimizado
 */
export const optimizeSVG = (svgContent) => {
    if (!svgContent) return svgContent;

    return svgContent
        .replace(/\s+/g, ' ') // Reducir espacios múltiples
        .replace(/>\s+</g, '><') // Eliminar espacios entre tags
        .trim();
};

/**
 * Convierte un icono FontAwesome a formato de array
 * @param {string|Array} icon - Icono en formato string o array
 * @param {string} defaultType - Tipo por defecto
 * @returns {Array} Icono en formato array [tipo, nombre]
 */
export const normalizeIconFormat = (icon, defaultType = 'fas') => {
    if (Array.isArray(icon)) {
        return icon;
    }

    if (typeof icon === 'string') {
        return [defaultType, icon];
    }

    return [defaultType, 'question-circle'];
};

// Agregar esta utilidad a Icon.utils.js
export const decodeSVG = (base64String) => {
    try {
        // Extraer solo la parte base64
        const base64Data = base64String.replace('data:image/svg+xml;base64,', '');
        const decodedSVG = atob(base64Data);
        console.log('🔍 SVG decodificado:', decodedSVG);
        return decodedSVG;
    } catch (error) {
        console.error('❌ Error decodificando SVG:', error);
        return null;
    }
};

export const getIconCustomColorClasses = (color) => {
    if (!color) return '';

    // ✅ MAPEO ESTÁTICO - Tailwind puede detectar estas clases
    const iconColors = {
        // Colores básicos
        blue: 'text-blue-500',
        red: 'text-red-500',
        green: 'text-green-500',
        yellow: 'text-yellow-500',
        purple: 'text-purple-500',
        pink: 'text-pink-500',
        indigo: 'text-indigo-500',
        gray: 'text-gray-500',
        orange: 'text-orange-500',
        teal: 'text-teal-500',
        cyan: 'text-cyan-500',
        emerald: 'text-emerald-500',
        white: 'text-white',
        black: 'text-black',

        // Tonos específicos
        'blue-600': 'text-blue-600',
        'red-600': 'text-red-600',
        'green-600': 'text-green-600',
        'gray-600': 'text-gray-600',
        'gray-700': 'text-gray-700',
        'gray-800': 'text-gray-800',
        'gray-900': 'text-gray-900',

        // Colores adicionales
        'blue-400': 'text-blue-400',
        'blue-700': 'text-blue-700',
        'red-400': 'text-red-400',
        'red-700': 'text-red-700',
        'green-400': 'text-green-400',
        'green-700': 'text-green-700'
    };

    return iconColors[color] || 'text-gray-500';
};
