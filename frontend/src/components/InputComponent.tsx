'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const InputComponent = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);
		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleSend = () => {
		console.log('clicked on send');
		console.log(inputText);
		setInputText('');
	};

	const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<div className="flex">
			<input
				type="text"
				className="border-2 border-white rounded-lg p-2 mx-2"
				placeholder="Send a message..."
				style={{
					width: `${windowWidth > 800 ? '40vw' : '80vw'}`,
				}}
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyDown={handleEnterPress}
			/>
			<button className="mx-2" onClick={handleSend}>
				<Image src="/images/icons/send.png" alt="send" width={40} height={40} />
			</button>
			<button className="mx-2 hidden sm:block">
				<Image
					src="/images/icons/microphone.png"
					alt="send"
					width={40}
					height={40}
				/>
			</button>
		</div>
	);
};

export default InputComponent;
