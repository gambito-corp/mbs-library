import React, { lazy, Suspense } from 'react';

const LazyText = lazy(() => import('./Text.jsx'));

const Text = (props) => (
    <Suspense fallback={
        <span className="animate-pulse bg-gray-200 h-4 w-16 rounded inline-block"></span>
    }>
        <LazyText {...props} />
    </Suspense>
);

export default Text;
