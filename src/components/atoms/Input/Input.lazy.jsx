import React, { lazy, Suspense } from 'react';

const LazyInput = lazy(() => import('./Input.jsx'));

const Input = (props) => (
    <Suspense fallback={
        <div className="input-container w-full">
            {/* Skeleton para label */}
            {props.label && (
                <div className="animate-pulse bg-gray-200 h-4 w-20 rounded mb-2"></div>
            )}

            {/* Skeleton para input con iconos */}
            <div className="relative">
                <div
                    className="animate-pulse bg-gray-200 rounded-lg border"
                    style={{
                        height: props.size === 'small' ? '32px' :
                            props.size === 'large' ? '48px' : '40px',
                        width: props.fullWidth !== false ? '100%' : '200px'
                    }}
                >
                    {/* ✅ Skeleton para icono izquierdo */}
                    {(props.iconLeft || (props.icon && props.iconPosition === 'left')) && (
                        <div
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded"
                            style={{
                                width: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px',
                                height: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px'
                            }}
                        ></div>
                    )}

                    {/* ✅ Skeleton para icono derecho */}
                    {(props.iconRight ||
                        (props.icon && props.iconPosition === 'right') ||
                        (props.showPasswordToggle && props.type === 'password')) && (
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded"
                            style={{
                                width: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px',
                                height: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px'
                            }}
                        ></div>
                    )}
                </div>
            </div>

            {/* Skeleton para mensaje */}
            {(props.error || props.success || props.helperText) && (
                <div className="animate-pulse bg-gray-200 h-3 w-32 rounded mt-2"></div>
            )}
        </div>
    }>
        <LazyInput {...props} />
    </Suspense>
);

export default Input;
