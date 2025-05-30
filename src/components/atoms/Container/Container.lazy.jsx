import React, { lazy, Suspense } from 'react';

const LazyContainer = lazy(() => import('./Container.jsx'));

const Container = (props) => (
    <Suspense fallback={
        <div className="animate-pulse bg-gray-200 h-24 rounded-lg w-full">
            <div className="h-full bg-gray-300 rounded w-full"></div>
        </div>
    }>
        <LazyContainer {...props} />
    </Suspense>
);

export default Container;
