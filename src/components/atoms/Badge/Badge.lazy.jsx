import React, { lazy, Suspense } from 'react';

const LazyBadge = lazy(() => import('./Badge.jsx'));

const Badge = (props) => (
    <Suspense fallback={
        <div
            className="animate-pulse bg-gray-200 rounded inline-flex items-center justify-center"
            style={{
                width: props.dot ? '10px' :
                    props.size === 'small' ? '20px' :
                        props.size === 'large' ? '30px' : '25px',
                height: props.dot ? '10px' :
                    props.size === 'small' ? '16px' :
                        props.size === 'large' ? '24px' : '20px',
                minWidth: props.dot ? '10px' : '20px'
            }}
        >
            {!props.dot && (
                <div className="animate-pulse bg-gray-300 h-2 w-3 rounded"></div>
            )}
        </div>
    }>
        <LazyBadge {...props} />
    </Suspense>
);

export default Badge;
