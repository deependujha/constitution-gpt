'use client';

import ChatBoxComponent from '@/components/ChatBoxComponent';
import ChatMessages from '@/components/ChatMessages';
import InputComponent from '@/components/InputComponent';
import MainLandingComponent from '@/components/MainLandingComponent';
import React from 'react';

const page = () => {
	return (
		<div className="h-screen w-screen bg-center bg-cover bg-[url('/images/bg.jpg')]">
			<div className="heightScroll">
				<div className="flex justify-center items-center">
					{/* <MainLandingComponent /> */}
				</div>
				<div>
					<ChatMessages />
				</div>
			</div>

			<div className="heightInput flex justify-center items-center">
				<InputComponent />
			</div>
		</div>
	);
};

export default page;
