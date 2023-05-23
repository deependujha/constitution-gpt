'use client';

import InputComponent from '@/components/InputComponent';
import MainLandingComponent from '@/components/MainLandingComponent';
import React from 'react';

const page = () => {
	return (
		<div className="h-screen w-screen bg-center bg-cover bg-[url('/images/bg.jpg')]">
			<div className="heightScroll flex justify-center items-center">
				<MainLandingComponent />
			</div>

			<div className="heightInput flex justify-center items-center">
				<InputComponent />
			</div>
		</div>
	);
};

export default page;
