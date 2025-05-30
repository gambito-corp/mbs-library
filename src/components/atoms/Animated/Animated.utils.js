import { ENTRANCE_ANIMATIONS, EXIT_ANIMATIONS, ATTENTION_ANIMATIONS } from './Animated.constants.js';

/**
 * Genera las clases CSS para el componente Animated
 */
export const getAnimatedClasses = ({ animation, category, className, isAnimating }) => {
    const baseClasses = 'animated-element transition-all duration-200';

    let animationClass = '';
    if (isAnimating) {
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
    }

    return `${baseClasses} ${animationClass} ${className}`.trim();
};

/**
 * Triggerea una animación
 */
export const triggerAnimation = (setIsAnimating, setAnimationClass, animation, category) => {
    setIsAnimating(true);

    let animationClass = '';
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

    setAnimationClass(animationClass);
};

/**
 * Valida si una animación existe en una categoría
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
 * Obtiene todas las animaciones de una categoría
 */
export const getAnimationsByCategory = (category) => {
    switch (category) {
        case 'entrances':
            return ENTRANCE_ANIMATIONS;
        case 'exits':
            return EXIT_ANIMATIONS;
        case 'attention':
            return ATTENTION_ANIMATIONS;
        default:
            return {};
    }
};
