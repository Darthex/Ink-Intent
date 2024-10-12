import { type ReactNode } from 'react';
import { Button } from '../ui/button';

type Props = {
	children: ReactNode;
	onClick: () => void;
};

const BubbleLink = ({ children, onClick }: Props) => {
	return (
		<Button variant="link" onClick={onClick}>
			{children}
		</Button>
	);
};

export default BubbleLink;
