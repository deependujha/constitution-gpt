import useWindowDimensions from '@/utils/useWindowDimensions';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type Props = {
	addNewMsg: (msg: string, sender: 'user' | 'bot') => void;
};

const InputComponent = ({ addNewMsg }: Props) => {
	const { width } = useWindowDimensions();
	const [inputText, setInputText] = useState('');

	const handleSend = () => {
		addNewMsg(inputText, 'user');
		setInputText('');
	};

	const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSend();
		}
	};

	if (width === 0) {
		return <></>;
	}

	return (
		<div className="flex">
			<input
				type="text"
				className="border-2 border-white rounded-lg p-2 mx-2"
				placeholder="Send a message..."
				style={{
					width: `${width > 800 ? '40vw' : '80vw'}`,
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
