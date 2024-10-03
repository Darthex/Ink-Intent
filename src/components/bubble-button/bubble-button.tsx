import React, { type ReactNode } from 'react';
import cx from 'classnames';
import styles from './bubble-button.module.css';

type Props = {
	children: ReactNode;
	className?: string;
	onClick: () => void;
};

const BubbleButton = ({ children, className, onClick }: Props) => {
	return (
		<button
			className={cx({
				[className]: !!className,
				[styles.button]: true,
			})}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default BubbleButton;
