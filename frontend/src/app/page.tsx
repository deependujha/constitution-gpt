'use client';
import axios from 'axios';
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
		axios
			.post('/api/', {
				prompt: msg,
			})
			.then((aiResponse: any) => {
				console.log(`aiResponse`, aiResponse.data);
				// return;
				aiResponse = aiResponse.data.answer;
				setMessages((prev) => [
					...prev,
					{ message: aiResponse, sender: 'bot' },
				]);
				setLoading(false);
			})
			.catch((err: Error) => {
				console.log('err', err);
				setMessages((prev) => [
					...prev,
					{ message: 'An error occurred 🥲', sender: 'bot' },
				]);
				setLoading(false);
				alert(err.message || 'An error occurred while making API request');
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
