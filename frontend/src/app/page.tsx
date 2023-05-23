'use client';

import React, { useRef, useState } from 'react';
import ChatBoxComponent from '@/components/ChatBoxComponent';
import ChatMessages from '@/components/ChatMessages';
import InputComponent from '@/components/InputComponent';
import MainLandingComponent from '@/components/MainLandingComponent';
import MakeAPIRequest from '@/utils/MakeAPIRequest';

type MsgType = {
	message: string;
	sender: 'user' | 'bot';
};

const Page = () => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([] as MsgType[]);
	const myRef = useRef<HTMLDivElement>(null);

	const addNewMsg = async (msg: string, sender: 'user' | 'bot') => {
		if (msg.trim() === '') return;
		setMessages((prev) => [...prev, { message: msg, sender: sender }]);
		setTimeout(() => {
			if (myRef.current !== null) {
				myRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		}, 300);
		setLoading(true);
		MakeAPIRequest(msg).then((aiResponse: any) => {
			// console.log('aiResponse', aiResponse);
			if (aiResponse === 'An error occurred while making API request') return;
			setMessages((prev) => [...prev, { message: aiResponse, sender: 'bot' }]);
			setLoading(false);
		});
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
						<ChatMessages messages={messages} myRef={myRef} loading={loading} />
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
