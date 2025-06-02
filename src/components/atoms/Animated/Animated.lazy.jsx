import React, { lazy, Suspense } from 'react';
import './TextSkeleton.css'; // ✅ CSS separado

const LazyText = lazy(() => import('./Text.jsx'));

const Text = (props) => {
    const TextSkeleton = () => {
        const getSkeletonClass = () => {
            let classes = 'text-skeleton';

            // Agregar clase de tamaño
            if (props.size) {
                classes += ` text-skeleton--${props.size}`;
            }

            // Agregar clase de variante
            if (props.variant && props.variant !== 'default') {
                classes += ` text-skeleton--${props.variant}`;
            }

            // Agregar clase de elemento
            if (props.as) {
                classes += ` text-skeleton--${props.as}`;
            }

            return classes;
        };

        return (
            <div
                className={getSkeletonClass()}
                data-testid="TextSkeleton"
            />
        );
    };

    return (
        <Suspense fallback={<TextSkeleton />}>
            <LazyText {...props} />
        </Suspense>
    );
};

export default Text;
