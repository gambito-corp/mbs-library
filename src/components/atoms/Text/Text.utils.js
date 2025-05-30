import { TEXT_VARIANTS, TEXT_SIZES, STYLE_CONFIG } from './Text.constants.js';

/**
 * Genera las clases CSS para el componente Text
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.variant - Variante visual
 * @param {string} params.size - Tamaño del texto
 * @param {string} params.className - Clases adicionales
 * @param {boolean} params.animated - Si el texto está animado
 * @returns {string} Clases CSS combinadas
 */
export const getTextClasses = ({ variant = 'default', size = 'medium', className = '', animated = false, textColor  }) => {
    const baseClasses = 'text-component transition-all duration-200';
    // Usar color personalizado si está disponible
    let variantClasses;
    if (textColor) {
        variantClasses = getTextColorClasses(textColor);
    } else {
        variantClasses = STYLE_CONFIG[variant] || STYLE_CONFIG.default;
    }
    const sizeClasses = `${TEXT_SIZES[size]?.fontSize || 'text-base'} ${TEXT_SIZES[size]?.lineHeight || 'leading-6'}`;
    const animatedClasses = animated ? 'text-animated' : '';

    return [baseClasses, variantClasses, sizeClasses, animatedClasses, className]
        .filter(Boolean)
        .join(' ')
        .trim();
};

/**
 * Valida si una variante de texto es válida
 * @param {string} variant - Variante a validar
 * @returns {boolean} True si es válida
 */
export const isValidTextVariant = (variant) => {
    return Object.keys(TEXT_VARIANTS).includes(variant);
};

/**
 * Valida si un tamaño de texto es válido
 * @param {string} size - Tamaño a validar
 * @returns {boolean} True si es válido
 */
export const isValidTextSize = (size) => {
    return Object.keys(TEXT_SIZES).includes(size);
};

/**
 * Obtiene la configuración de una variante
 * @param {string} variant - Variante del texto
 * @returns {Object} Configuración de la variante
 */
export const getTextVariantConfig = (variant) => {
    return TEXT_VARIANTS[variant] || TEXT_VARIANTS.default;
};

/**
 * Obtiene la configuración de un tamaño
 * @param {string} size - Tamaño del texto
 * @returns {Object} Configuración del tamaño
 */
export const getTextSizeConfig = (size) => {
    return TEXT_SIZES[size] || TEXT_SIZES.medium;
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineTextClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Determina el elemento HTML apropiado basado en el contenido
 * @param {string} content - Contenido del texto
 * @param {string} defaultElement - Elemento por defecto
 * @returns {string} Elemento HTML recomendado
 */
export const getSemanticElement = (content, defaultElement = 'span') => {
    if (!content || typeof content !== 'string') return defaultElement;

    const length = content.length;
    const hasQuestion = content.includes('?');
    const hasExclamation = content.includes('!');
    const isShort = length < 50;
    const isLong = length > 200;

    // Sugerencias semánticas
    if (isShort && (hasQuestion || hasExclamation)) {
        return 'h3'; // Títulos cortos con énfasis
    }

    if (isLong) {
        return 'p'; // Párrafos largos
    }

    return defaultElement;
};

/**
 * Calcula la duración estimada de lectura
 * @param {string} text - Texto a analizar
 * @param {number} wordsPerMinute - Palabras por minuto (promedio 200)
 * @returns {number} Duración en segundos
 */
export const calculateReadingTime = (text, wordsPerMinute = 200) => {
    if (!text || typeof text !== 'string') return 0;

    const words = text.trim().split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes * 60); // Convertir a segundos
};

/**
 * Extrae texto plano de contenido HTML
 * @param {string} htmlContent - Contenido HTML
 * @returns {string} Texto plano
 */
export const extractPlainText = (htmlContent) => {
    if (!htmlContent || typeof htmlContent !== 'string') return '';

    // Crear elemento temporal para extraer texto
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
};

/**
 * Trunca texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @param {string} ellipsis - Caracteres de elipsis
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100, ellipsis = '...') => {
    if (!text || typeof text !== 'string') return '';

    if (text.length <= maxLength) return text;

    return text.substring(0, maxLength - ellipsis.length).trim() + ellipsis;
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalizeWords = (text) => {
    if (!text || typeof text !== 'string') return '';

    return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Convierte texto a formato slug (URL-friendly)
 * @param {string} text - Texto a convertir
 * @returns {string} Slug generado
 */
export const textToSlug = (text) => {
    if (!text || typeof text !== 'string') return '';

    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
        .replace(/[\s_-]+/g, '-') // Reemplazar espacios con guiones
        .replace(/^-+|-+$/g, ''); // Remover guiones al inicio y final
};

/**
 * Cuenta palabras en un texto
 * @param {string} text - Texto a analizar
 * @returns {number} Número de palabras
 */
export const countWords = (text) => {
    if (!text || typeof text !== 'string') return 0;

    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Detecta el idioma del texto (básico)
 * @param {string} text - Texto a analizar
 * @returns {string} Código de idioma detectado
 */
export const detectLanguage = (text) => {
    if (!text || typeof text !== 'string') return 'en';

    // Patrones básicos para detectar idioma
    const patterns = {
        es: /\b(el|la|los|las|un|una|de|en|que|y|a|es|se|no|te|lo|le|da|su|por|son|con|para|al|del|está|muy|todo|pero|más|hacer|puede|tiempo|si|sobre|también)\b/gi,
        en: /\b(the|be|to|of|and|a|in|that|have|i|it|for|not|on|with|he|as|you|do|at|this|but|his|by|from|they|she|or|an|will|my|one|all|would|there|their)\b/gi,
        fr: /\b(le|de|et|à|un|il|être|et|en|avoir|que|pour|dans|ce|son|une|sur|avec|ne|se|pas|tout|plus|pouvoir|par|je|son|que|qui|lui|vous|sur|mes|cette)\b/gi
    };

    let maxMatches = 0;
    let detectedLang = 'en';

    for (const [lang, pattern] of Object.entries(patterns)) {
        const matches = (text.match(pattern) || []).length;
        if (matches > maxMatches) {
            maxMatches = matches;
            detectedLang = lang;
        }
    }

    return detectedLang;
};
export const getTextColorClasses = (color) => {
    if (!color) return '';

    const textColors = {
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
        'gray-900': 'text-gray-900'
    };

    return textColors[color] || `text-${color}`;
};