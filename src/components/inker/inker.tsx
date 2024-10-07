import React, { forwardRef, type Ref } from 'react';
import cx from 'classnames';
import styles from './inker.module.css';

type Props = {
	className?: string;
	size?: 'medium' | 'large';
};

// eslint-disable-next-line react/display-name
const Inker = forwardRef(
	({ className = '', size = 'large' }: Props, ref: Ref<any>) => {
		return (
			<h1 className={cx(className, styles[size], styles.title)} ref={ref}>
				Ink & Intent
			</h1>
		);
	}
);

export default Inker;
