'use client';

import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState({
		width: 0,
	});

	// function getWindowDimensions() {
	// 	const { innerWidth: width } = window || 0;
	// 	return {
	// 		width,
	// 	};
	// }

	useEffect(() => {
		function handleResize() {
			setWindowDimensions({ width: window.innerWidth });
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		setWindowDimensions({ width: window.innerWidth });
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
