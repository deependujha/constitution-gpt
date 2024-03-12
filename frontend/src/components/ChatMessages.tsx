'use client';
import React, { useRef } from 'react';
import ChatBoxComponent from './ChatBoxComponent';
import { Pangolin } from 'next/font/google';
import Typewriter from 'typewriter-effect';

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
	loading: boolean;
};

const ChatMessages = ({ messages, myRef, loading }: Props) => {
	return (
		<div className="" style={{ maxHeight: '90vh', overflowY: 'scroll' }}>
			<div
				className={`py-8 text-xl underline text-center text-pink-800 ${pangolin.className}`}
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
			{loading && (
				<div
					className="text-pink-500 text-center py-4"
					style={{ height: '60px' }}
					ref={myRef}
				>
					<Typewriter
						onInit={(typewriter) => {
							typewriter
								.typeString('Please wait. AI is generating response...')
								.pauseFor(1500)
								.deleteAll()
								.start();
						}}
						options={{
							autoStart: true,
							loop: true,
							deleteSpeed: 50,
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default ChatMessages;
