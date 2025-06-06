import React, { lazy, Suspense } from 'react';

const LazyAlert = lazy(() => import('./Alert.jsx'));

const Alert = (props) => (
    <Suspense fallback={
        <div
            className="animate-pulse bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center gap-3"
            style={{
                minHeight: '60px',
                maxWidth: 'fit-content',
                margin: '0 auto'
            }}
        >
            {/* Skeleton para icono */}
            <div
                className="animate-pulse bg-gray-300 rounded-full"
                style={{
                    width: '24px',
                    height: '24px',
                    flexShrink: 0
                }}
            ></div>

            {/* Skeleton para contenido */}
            <div className="flex flex-col gap-2">
                {/* Skeleton para título */}
                <div
                    className="animate-pulse bg-gray-300 rounded"
                    style={{
                        width: '120px',
                        height: '16px'
                    }}
                ></div>

                {/* Skeleton para mensaje */}
                <div
                    className="animate-pulse bg-gray-300 rounded"
                    style={{
                        width: '200px',
                        height: '14px'
                    }}
                ></div>
            </div>
        </div>
    }>
        <LazyAlert {...props} />
    </Suspense>
);

export default Alert;
