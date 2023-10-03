'use client'

import React from "react";

interface IconProps {
    icon: string
}

const LazyComponent = (name: string) => React.lazy(() => import('./languages/' + name + '.tsx'));

const Icon = ({ icon }: IconProps) => {
    const Component = LazyComponent(icon);

    return (
        <React.Suspense>
            <Component width={30} height={30} />
        </React.Suspense>
    )
}

export default Icon