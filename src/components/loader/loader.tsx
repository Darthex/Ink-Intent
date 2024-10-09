import cx from 'classnames';

import styles from './loader.module.css';

type LoadingCenteredProps = {
	size?: 'small' | 'medium';
	color?: 'black' | 'white';
};

const Loader = ({ size = 'medium', color = 'black' }: LoadingCenteredProps) => {
	return (
		<div
			className={cx(styles.container, {
				[styles[size]]: size,
			})}
		>
			<div
				className={cx(styles.spinner, {
					[styles[color]]: color,
				})}
			/>
		</div>
	);
};

export default Loader;
