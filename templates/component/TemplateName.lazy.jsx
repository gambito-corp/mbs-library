import React, { lazy, Suspense } from 'react';

const LazyTemplateName = lazy(() => import('./TemplateName'));

const TemplateName = (props) => (
    <Suspense fallback={
        <div className="animate-pulse bg-gray-200 h-12 rounded-lg flex items-center px-4">
            <div className="w-4 h-4 bg-gray-300 rounded mr-3"></div>
            <div className="flex-1">
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
        </div>
    }>
        <LazyTemplateName {...props} />
    </Suspense>
);

export default TemplateName;
