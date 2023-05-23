import './globals.css';
import { Inter } from 'next/font/google';
import MsgContext from '@/context/MsgContext';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Constituion  GPT',
	description: 'A GPT-3.5 powered chatbot for the Indian Constitution',
};

type Msgs = {
	message: string;
	sender: 'user' | 'bot';
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [msgs, setMsgs] = useState([] as Msgs[]);

	const addNewMsg = (msg: Msgs) => {
		setMsgs([...msgs, msg]);
	};

	return (
		<html lang="en">
			<body className={inter.className}>
				<MsgContext.Provider value={{ msgs, addNewMsg }}>
					{children}
				</MsgContext.Provider>
			</body>
		</html>
	);
}
