import React, { lazy, Suspense } from 'react';

const LazyButton = lazy(() => import('./Button.jsx'));

const Button = (props) => (
    <Suspense fallback={
        <div
            className="animate-pulse bg-gray-200 rounded-lg inline-flex items-center justify-center"
            style={{
                width: props.fullWidth ? '100%' :
                    props.size === 'xs' ? '60px' :
                        props.size === 'small' ? '80px' :
                            props.size === 'large' ? '120px' :
                                props.size === 'xlarge' ? '140px' : '100px',
                height: props.size === 'xs' ? '24px' :
                    props.size === 'small' ? '32px' :
                        props.size === 'large' ? '48px' :
                            props.size === 'xlarge' ? '56px' : '40px'
            }}
        >
            <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
        </div>
    }>
        <LazyButton {...props} />
    </Suspense>
);

export default Button;
