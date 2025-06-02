import React, { lazy, Suspense } from 'react';
import './ContainerSkeleton.css'; // ✅ CSS separado

const LazyContainer = lazy(() => import('./Container.jsx'));

const Container = (props) => {
    // ✅ SKELETON PERSONALIZADO PARA CONTAINER
    const ContainerSkeleton = () => {
        const getSkeletonConfig = () => {
            const config = {
                height: 'container-skeleton--medium',
                width: 'container-skeleton--full',
                padding: 'container-skeleton--padding-medium',
                rounded: 'container-skeleton--rounded-none',
                variant: ''
            };

            // Configuración basada en el tamaño
            switch (props.size) {
                case 'xs':
                    config.height = 'container-skeleton--xs';
                    config.width = 'container-skeleton--xs';
                    break;
                case 'small':
                    config.height = 'container-skeleton--small';
                    config.width = 'container-skeleton--small';
                    break;
                case 'large':
                    config.height = 'container-skeleton--large';
                    config.width = 'container-skeleton--large';
                    break;
                case 'xlarge':
                    config.height = 'container-skeleton--xlarge';
                    config.width = 'container-skeleton--xlarge';
                    break;
            }

            // Configuración basada en maxWidth
            if (props.maxWidth && props.maxWidth !== 'full') {
                config.width = `container-skeleton--max-${props.maxWidth}`;
            }

            // Configuración basada en padding
            if (props.padding && props.padding !== 'medium') {
                config.padding = `container-skeleton--padding-${props.padding}`;
            }

            // Configuración basada en rounded
            if (props.rounded && props.rounded !== 'none') {
                config.rounded = `container-skeleton--rounded-${props.rounded}`;
            }

            // Configuración basada en variante
            if (props.variant && props.variant !== 'default') {
                config.variant = `container-skeleton--${props.variant}`;
            }

            return config;
        };

        const config = getSkeletonConfig();
        const isBlockElement = ['section', 'article', 'main', 'header', 'footer', 'nav', 'aside'].includes(props.as);

        const skeletonClasses = [
            'container-skeleton',
            config.height,
            config.width,
            config.padding,
            config.rounded,
            config.variant,
            props.centered ? 'container-skeleton--centered' : '',
            props.fluid ? 'container-skeleton--fluid' : '',
            props.fitContent ? 'container-skeleton--fit-content' : '',
            isBlockElement ? 'container-skeleton--block' : ''
        ].filter(Boolean).join(' ');

        return (
            <div
                className={skeletonClasses}
                data-testid="ContainerSkeleton"
            >
                {/* Contenido interno del skeleton */}
                <div className="container-skeleton__content">
                    {/* Simular líneas de contenido */}
                    <div className="container-skeleton__line container-skeleton__line--title"></div>
                    <div className="container-skeleton__line container-skeleton__line--text"></div>
                    <div className="container-skeleton__line container-skeleton__line--text container-skeleton__line--short"></div>
                </div>
            </div>
        );
    };

    return (
        <Suspense fallback={<ContainerSkeleton />}>
            <LazyContainer {...props} />
        </Suspense>
    );
};

export default Container;
