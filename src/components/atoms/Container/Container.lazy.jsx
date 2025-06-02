import React, { lazy, Suspense } from 'react';
import './AnimatedSkeleton.css';

const LazyAnimated = lazy(() => import('./Animated.jsx'));

const Animated = (props) => {
    // ✅ SKELETON PERSONALIZADO PARA ANIMATED
    const AnimatedSkeleton = () => {
        const getSkeletonConfig = () => {
            const config = {
                height: 'animated-skeleton--medium',
                animation: 'animated-skeleton--pulse',
                category: ''
            };

            // Configuración basada en la categoría
            switch (props.category) {
                case 'entrances':
                    config.animation = 'animated-skeleton--fade-in';
                    break;
                case 'exits':
                    config.animation = 'animated-skeleton--fade-out';
                    break;
                case 'attention':
                    config.animation = 'animated-skeleton--bounce';
                    break;
                case 'sliding':
                    config.animation = 'animated-skeleton--slide';
                    break;
                case 'rotating':
                    config.animation = 'animated-skeleton--rotate';
                    break;
                case 'scaling':
                    config.animation = 'animated-skeleton--scale';
                    break;
                default:
                    config.animation = 'animated-skeleton--pulse';
            }

            // Configuración basada en la animación específica
            if (props.animation) {
                config.category = `animated-skeleton--${props.animation}`;
            }

            return config;
        };

        const config = getSkeletonConfig();

        const skeletonClasses = [
            'animated-skeleton',
            config.height,
            config.animation,
            config.category,
            props.repeat ? 'animated-skeleton--infinite' : '',
            props.className || ''
        ].filter(Boolean).join(' ');

        const skeletonStyles = {
            animationDuration: `${props.duration || 0.6}s`,
            animationDelay: `${props.delay || 0}s`,
            animationTimingFunction: props.easing || 'ease',
            animationDirection: props.direction || 'normal',
            animationFillMode: props.fillMode || 'both',
            animationPlayState: props.playState || 'running',
            ...props.style
        };

        return (
            <div
                className={skeletonClasses}
                style={skeletonStyles}
                data-testid="AnimatedSkeleton"
            >
                <div className="animated-skeleton__content">
                    <div className="animated-skeleton__line animated-skeleton__line--title"></div>
                    <div className="animated-skeleton__line animated-skeleton__line--text"></div>
                    <div className="animated-skeleton__line animated-skeleton__line--text animated-skeleton__line--short"></div>
                </div>
            </div>
        );
    };

    return (
        <Suspense fallback={<AnimatedSkeleton />}>
            <LazyAnimated {...props} />
        </Suspense>
    );
};

export default Animated;
