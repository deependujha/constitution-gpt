'use client';

import React, { useRef, useState } from 'react';
import ChatBoxComponent from '@/components/ChatBoxComponent';
import ChatMessages from '@/components/ChatMessages';
import InputComponent from '@/components/InputComponent';
import MainLandingComponent from '@/components/MainLandingComponent';

type MsgType = {
	message: string;
	sender: 'user' | 'bot';
};

const Page = () => {
	const [messages, setMessages] = useState([] as MsgType[]);
	const myRef = useRef<HTMLDivElement>(null);

	const addNewMsg = (msg: string, sender: 'user' | 'bot') => {
		if (msg.trim() === '') return;
		setMessages((prev) => [...prev, { message: msg, sender: sender }]);
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{ message: 'Jai siya Ram! 🛕', sender: 'bot' },
			]);
			if (myRef.current !== null) {
				myRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		}, 500);

		if (myRef.current !== null) {
			myRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="h-screen w-screen bg-center bg-cover bg-[url('/images/bg.jpg')]">
			<div className="heightScroll">
				{messages.length === 0 ? (
					<div className="flex heightScroll justify-center items-center">
						<MainLandingComponent />
					</div>
				) : (
					<div>
						<ChatMessages messages={messages} myRef={myRef} />
					</div>
				)}
			</div>

			<div className="heightInput flex justify-center items-center">
				<InputComponent addNewMsg={addNewMsg} />
			</div>
		</div>
	);
};

export default Page;
