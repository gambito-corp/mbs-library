import React, { lazy, Suspense } from 'react';

const LazyImage = lazy(() => import('./Image.jsx'));

const Image = (props) => (
    <Suspense fallback={
        <div
            className="animate-pulse bg-gray-200 rounded inline-flex items-center justify-center"
            style={{
                width: props.size === 'xs' ? '24px' :
                    props.size === 'small' ? '32px' :
                        props.size === 'large' ? '64px' :
                            props.size === 'xl' ? '96px' : '48px',
                height: props.size === 'xs' ? '24px' :
                    props.size === 'small' ? '32px' :
                        props.size === 'large' ? '64px' :
                            props.size === 'xl' ? '96px' : '48px',
                borderRadius: props.variant === 'avatar' || props.shape === 'circle' ? '50%' :
                    props.shape === 'square' ? '0' : '8px'
            }}
        >
            {/* Skeleton para icono */}
            <div
                className="animate-pulse bg-gray-300 rounded"
                style={{
                    width: props.size === 'xs' ? '8px' :
                        props.size === 'small' ? '12px' :
                            props.size === 'large' ? '24px' :
                                props.size === 'xl' ? '32px' : '16px',
                    height: props.size === 'xs' ? '8px' :
                        props.size === 'small' ? '12px' :
                            props.size === 'large' ? '24px' :
                                props.size === 'xl' ? '32px' : '16px'
                }}
            ></div>

            {/* Skeleton para status indicator (solo avatars) */}
            {props.variant === 'avatar' && props.status && (
                <div
                    className="absolute bottom-0 right-0 animate-pulse bg-gray-300 rounded-full border-2 border-white"
                    style={{
                        width: props.size === 'xs' ? '8px' :
                            props.size === 'small' ? '10px' :
                                props.size === 'large' ? '20px' :
                                    props.size === 'xl' ? '24px' : '16px',
                        height: props.size === 'xs' ? '8px' :
                            props.size === 'small' ? '10px' :
                                props.size === 'large' ? '20px' :
                                    props.size === 'xl' ? '24px' : '16px'
                    }}
                ></div>
            )}

            {/* Skeleton para badge */}
            {props.badge && (
                <div
                    className="absolute -top-1 -right-1 animate-pulse bg-gray-300 rounded-full"
                    style={{
                        width: '16px',
                        height: '16px'
                    }}
                ></div>
            )}
        </div>
    }>
        <LazyImage {...props} />
    </Suspense>
);

export default Image;
