import React from 'react';
import Image from 'next/image';
import useWindowDimensions from '@/utils/useWindowDimensions';

type Props = {
	message: string;
	sender: 'user' | 'bot';
};

const ChatBoxComponent = ({ message, sender }: Props) => {
	const { width } = useWindowDimensions();

	return (
		<div className="flex place-items-end">
			{sender === 'bot' && (
				<div className="mb-3">
					<Image
						className="rounded-full"
						src="/images/woman.png"
						width={40}
						height={40}
						alt="user"
						priority={false}
					/>
				</div>
			)}

			<div
				className={`${
					sender === 'bot' ? 'bg-blue-300' : 'bg-pink-300'
				} rounded-xl p-2 m-2 chatMsg`}
				style={{
					border: '2px solid blue',
					maxWidth: `${width > 800 ? '40vw' : '70vw'}`,
				}}
			>
				{message}
			</div>
			{sender === 'user' && (
				<div className="mb-3">
					<Image
						className="rounded-full"
						src="/images/icons/user.png"
						width={40}
						height={40}
						alt="user"
						priority={false}
					/>
				</div>
			)}
		</div>
	);
};

export default ChatBoxComponent;
