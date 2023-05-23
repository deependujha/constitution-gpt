'use client';
import React, { useRef } from 'react';
import ChatBoxComponent from './ChatBoxComponent';
import { Pangolin } from 'next/font/google';

const pangolin = Pangolin({
	subsets: ['latin', 'latin-ext'],
	weight: '400',
});

type MsgType = {
	message: string;
	sender: 'user' | 'bot';
};

type Props = {
	messages: MsgType[];
	myRef: React.RefObject<HTMLDivElement>;
};

const ChatMessages = ({ messages, myRef }: Props) => {
	return (
		<div className="my-5" style={{ maxHeight: '90vh', overflowY: 'scroll' }}>
			<div
				className={`py-4 text-xl underline text-center text-pink-800 ${pangolin.className}`}
				style={{ fontSize: '40px' }}
			>
				Constitution GPT
			</div>
			{messages.map((m, index) => {
				return (
					<div
						key={index}
						className={`chatBox flex my-3 ${
							m.sender === 'bot' ? 'justify-start' : 'justify-end'
						}`}
					>
						<ChatBoxComponent message={m.message} sender={m.sender} />
					</div>
				);
			})}
			<div style={{ height: '50px' }}></div>
			<div ref={myRef} className="py-3"></div>
		</div>
	);
};

export default ChatMessages;
