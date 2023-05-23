import React from 'react';
import Image from 'next/image';
import { Pangolin } from 'next/font/google';

const pangolin = Pangolin({
	subsets: ['latin', 'latin-ext'],
	weight: '400',
});

const MainLandingComponent = () => {
	return (
		<div>
			<div className="flex flex-col justify-center items-center">
				<Image
					className="rounded-full"
					src="/images/woman.png"
					width={350}
					height={350}
					alt="woman"
					priority={true}
				/>
				<div
					className={`my-4 text-xl text-pink-800 ${pangolin.className}`}
					style={{ fontSize: '40px' }}
				>
					Constitution GPT
				</div>
			</div>
		</div>
	);
};

export default MainLandingComponent;
