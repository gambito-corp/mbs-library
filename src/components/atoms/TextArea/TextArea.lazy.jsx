import React, { lazy, Suspense } from 'react';

const LazyTextArea = lazy(() => import('./TextArea.jsx'));

const TextArea = (props) => (
    <Suspense fallback={
        <div className="textarea-container w-full">
            {/* Skeleton para label */}
            {props.label && (
                <div className="animate-pulse bg-gray-200 h-4 w-24 rounded mb-2"></div>
            )}

            {/* Skeleton para textarea con iconos */}
            <div className="relative">
                <div
                    className="animate-pulse bg-gray-200 rounded-lg border"
                    style={{
                        height: props.autoGrow
                            ? `${(props.minRows || 3) * 1.5}rem`
                            : `${(props.rows || 3) * 1.5}rem`,
                        width: props.fullWidth !== false ? '100%' : '300px',
                        minHeight: '60px'
                    }}
                >
                    {/* Skeleton para icono izquierdo */}
                    {(props.iconLeft) && (
                        <div
                            className="absolute left-3 top-4 bg-gray-300 rounded"
                            style={{
                                width: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px',
                                height: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px'
                            }}
                        ></div>
                    )}

                    {/* Skeleton para icono derecho */}
                    {(props.iconRight) && (
                        <div
                            className="absolute right-3 top-4 bg-gray-300 rounded"
                            style={{
                                width: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px',
                                height: props.size === 'small' ? '12px' :
                                    props.size === 'large' ? '20px' : '16px'
                            }}
                        ></div>
                    )}

                    {/* Skeleton para texto */}
                    <div className="p-3 space-y-2">
                        <div className="animate-pulse bg-gray-300 h-3 w-3/4 rounded"></div>
                        <div className="animate-pulse bg-gray-300 h-3 w-1/2 rounded"></div>
                        {(props.rows > 2 || props.autoGrow) && (
                            <div className="animate-pulse bg-gray-300 h-3 w-2/3 rounded"></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Skeleton para mensaje y contador */}
            <div className="flex justify-between items-start mt-2">
                {(props.error || props.success || props.helperText) && (
                    <div className="animate-pulse bg-gray-200 h-3 w-32 rounded"></div>
                )}
                {props.maxLength && (
                    <div className="animate-pulse bg-gray-200 h-3 w-16 rounded ml-auto"></div>
                )}
            </div>
        </div>
    }>
        <LazyTextArea {...props} />
    </Suspense>
);

export default TextArea;
