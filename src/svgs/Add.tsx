import { forwardRef, type Ref } from 'react';

type Props = {
	size?: 'medium' | 'large';
};

const sizeMap = {
	medium: 40,
	large: 60,
};

// eslint-disable-next-line react/display-name
const Add = forwardRef(({ size = 'medium' }: Props, ref: Ref<any>) => {
	return (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			width={sizeMap[size]}
			height={sizeMap[size]}
			viewBox="0 0 50 50"
		>
			<path
				fill="white"
				d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"
			></path>
			<path fill="white" d="M16 24h18v2H16z"></path>
			<path fill="white" d="M24 16h2v18h-2z"></path>
		</svg>
	);
});

export default Add;
