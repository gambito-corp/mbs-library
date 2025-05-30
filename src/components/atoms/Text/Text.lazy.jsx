import React, { lazy, Suspense } from 'react';

const LazyText = lazy(() => import('./Text.jsx'));

const Text = (props) => (
    <Suspense fallback={
        <div className="animate-pulse bg-gray-200 h-4 rounded w-32 inline-block">
            <div className="h-full bg-gray-300 rounded w-3/4"></div>
        </div>
    }>
        <LazyText {...props} />
    </Suspense>
);

export default Text;
