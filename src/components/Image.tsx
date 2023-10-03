'use client';

import React from 'react';

interface IconProps {
	icon: string;
	order: number;
}

const LazyComponent = (name: string) =>
	React.lazy(() => import('./languages/' + name + '.tsx'));

const Icon = ({ icon, order }: IconProps) => {
	const Component = LazyComponent(icon);
	const positionX = order === 0 ? 0 : order * 40;

	return (
		<React.Suspense>
			<Component width={30} height={30} x={positionX} />
		</React.Suspense>
	);
};

export default Icon;
