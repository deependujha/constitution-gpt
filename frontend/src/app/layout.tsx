import './globals.css';
import { Roboto } from 'next/font/google';

const inter = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata = {
	title: 'Constitution  GPT',
	description: 'A GPT-3.5 powered chatbot for the Indian Constitution',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-black`}
				style={{ height: '100vh' }}
			>
				{children}
			</body>
		</html>
	);
}
