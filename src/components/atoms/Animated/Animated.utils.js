import { ENTRANCE_ANIMATIONS, EXIT_ANIMATIONS, ATTENTION_ANIMATIONS } from './Animated.constants.js';

/**
 * Genera las clases CSS para el componente Animated
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.animation - Nombre de la animación
 * @param {string} params.category - Categoría de la animación
 * @param {string} params.className - Clases adicionales
 * @param {boolean} params.isAnimating - Si está animando actualmente
 * @returns {string} Clases CSS combinadas
 */
export const getAnimatedClasses = ({ animation, category, className, isAnimating }) => {
    const baseClasses = 'animated-element';

    // ✅ CORREGIDO: Sin inicialización redundante
    let animationClass;
    switch (category) {
        case 'entrances':
            animationClass = ENTRANCE_ANIMATIONS[animation] || ENTRANCE_ANIMATIONS.fadeIn;
            break;
        case 'exits':
            animationClass = EXIT_ANIMATIONS[animation] || EXIT_ANIMATIONS.fadeOut;
            break;
        case 'attention':
            animationClass = ATTENTION_ANIMATIONS[animation] || ATTENTION_ANIMATIONS.bounce;
            break;
        default:
            animationClass = ENTRANCE_ANIMATIONS[animation] || ENTRANCE_ANIMATIONS.fadeIn;
    }

    // Combinar clases
    const classes = [
        baseClasses,
        isAnimating ? animationClass : '',
        className
    ].filter(Boolean).join(' ');

    return classes.trim();
};

/**
 * Función simplificada para triggear animación
 * @param {Function} setIsAnimating - Función para establecer estado de animación
 */
export const triggerAnimation = (setIsAnimating) => {
    setIsAnimating(true);
    // La lógica de clases se maneja en getAnimatedClasses
};

/**
 * Valida si una animación es válida para una categoría
 * @param {string} animation - Nombre de la animación
 * @param {string} category - Categoría a validar
 * @returns {boolean} True si es válida
 */
export const isValidAnimation = (animation, category) => {
    switch (category) {
        case 'entrances':
            return Object.keys(ENTRANCE_ANIMATIONS).includes(animation);
        case 'exits':
            return Object.keys(EXIT_ANIMATIONS).includes(animation);
        case 'attention':
            return Object.keys(ATTENTION_ANIMATIONS).includes(animation);
        default:
            return false;
    }
};

/**
 * Obtiene todas las animaciones disponibles para una categoría
 * @param {string} category - Categoría de animaciones
 * @returns {Array} Array de nombres de animaciones
 */
export const getAnimationsForCategory = (category) => {
    switch (category) {
        case 'entrances':
            return Object.keys(ENTRANCE_ANIMATIONS);
        case 'exits':
            return Object.keys(EXIT_ANIMATIONS);
        case 'attention':
            return Object.keys(ATTENTION_ANIMATIONS);
        default:
            return [];
    }
};

/**
 * Combina múltiples clases CSS de forma segura
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas sin duplicados
 */
export const combineAnimatedClasses = (...classes) => {
    return classes
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};
