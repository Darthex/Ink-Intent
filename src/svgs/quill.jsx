import React from 'react';

export default function Quill(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={30}
			height={30}
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="white"
				d="M21 1.997c-15 0-17 14-18 20h1.998q.999-5 5.002-5.5c4-.5 7-4 8-7l-1.5-1l1-1c1-1 2.004-2.5 3.5-5.5"
			></path>
		</svg>
	);
}
