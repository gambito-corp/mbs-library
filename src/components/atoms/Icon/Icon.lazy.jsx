import React, { lazy, Suspense } from 'react';

const LazyIcon = lazy(() => import('./Icon.jsx'));

const Icon = (props) => (
    <Suspense fallback={
        <div className="animate-pulse bg-gray-200 rounded-full inline-flex items-center justify-center"
             style={{
                 width: props.size === 'xs' ? '12px' :
                     props.size === 'small' ? '16px' :
                         props.size === 'large' ? '24px' :
                             props.size === 'xlarge' ? '32px' :
                                 props.size === '2x' ? '40px' :
                                     props.size === '3x' ? '60px' : '20px',
                 height: props.size === 'xs' ? '12px' :
                     props.size === 'small' ? '16px' :
                         props.size === 'large' ? '24px' :
                             props.size === 'xlarge' ? '32px' :
                                 props.size === '2x' ? '40px' :
                                     props.size === '3x' ? '60px' : '20px'
             }}>
            <div className="w-2/3 h-2/3 bg-gray-300 rounded"></div>
        </div>
    }>
        <LazyIcon {...props} />
    </Suspense>
);

export default Icon;
