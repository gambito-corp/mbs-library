import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ANIMATED_CATEGORIES } from './Animated.constants.js';
import { getAnimatedClasses, triggerAnimation } from './Animated.utils.js';
import './Animated.css';

const Animated = ({
                      children,
                      animation = 'fadeIn',
                      category = 'entrances',
                      duration = 0.6,
                      delay = 0,
                      easing = 'ease',
                      trigger = 'mount',
                      repeat = false,
                      direction = 'normal',
                      fillMode = 'both',
                      playState = 'running',
                      onAnimationStart,
                      onAnimationEnd,
                      onAnimationIteration,
                      className = '',
                      style = {},
                      ...props
                  }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    // Generar clases CSS usando utilidades
    const animatedClasses = getAnimatedClasses({
        animation,
        category,
        className,
        isAnimating
    });

    // Estilos dinámicos para la animación
    const animationStyles = {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: easing,
        animationDirection: direction,
        animationFillMode: fillMode,
        animationPlayState: playState,
        animationIterationCount: repeat ? 'infinite' : '1',
        ...style
    };

    // Trigger automático al montar
    useEffect(() => {
        if (trigger === 'mount') {
            triggerAnimation(setIsAnimating, animation, category);
        }
    }, [trigger, animation, category]);

    // Handlers de eventos
    const handleAnimationStart = (e) => {
        onAnimationStart?.(e);
    };

    const handleAnimationEnd = (e) => {
        setIsAnimating(false);
        onAnimationEnd?.(e);
    };

    const handleAnimationIteration = (e) => {
        onAnimationIteration?.(e);
    };

    // Función para triggear manualmente
    const playAnimation = () => {
        triggerAnimation(setIsAnimating, animation, category);
    };

    // Exponer función para uso externo
    React.useImperativeHandle(props.ref, () => ({
        play: playAnimation,
        isAnimating
    }));

    return (
        <div
            className={animatedClasses}
            style={animationStyles}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            onAnimationIteration={handleAnimationIteration}
            data-testid="Animated"
            data-animation={`${category}-${animation}`}
            {...props}
        >
            {children}
        </div>
    );
};

Animated.propTypes = {
    children: PropTypes.node.isRequired,
    animation: PropTypes.string,
    category: PropTypes.oneOf(Object.keys(ANIMATED_CATEGORIES)),
    duration: PropTypes.number,
    delay: PropTypes.number,
    easing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
    trigger: PropTypes.oneOf(['mount', 'manual', 'hover', 'click']),
    repeat: PropTypes.bool,
    direction: PropTypes.oneOf(['normal', 'reverse', 'alternate', 'alternate-reverse']),
    fillMode: PropTypes.oneOf(['none', 'forwards', 'backwards', 'both']),
    playState: PropTypes.oneOf(['running', 'paused']),
    onAnimationStart: PropTypes.func,
    onAnimationEnd: PropTypes.func,
    onAnimationIteration: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};

Animated.defaultProps = {
    animation: 'fadeIn',
    category: 'entrances',
    duration: 0.6,
    delay: 0,
    easing: 'ease',
    trigger: 'mount',
    repeat: false,
    direction: 'normal',
    fillMode: 'both',
    playState: 'running',
    className: '',
    style: {}
};

export default Animated;
