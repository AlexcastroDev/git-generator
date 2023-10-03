import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Github Generated',
	description: 'Improve your Github profile with this tool',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
