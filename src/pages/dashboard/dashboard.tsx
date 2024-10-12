import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux-tlkt/hooks.ts';

import InfiniteArticles from '../../components/infinte-articles/infinite-articles.tsx';
import TagSelector from '../../components/tag-selector/tag-selector.tsx';

import { isEmpty } from '../../utils/lodash.ts';

import styles from './dashboard.module.css';

const Dashboard = () => {
	const location = useLocation();
	const { isAuthenticated, user } = useAppSelector((state) => state.root.auth);
	const showTagSelector = isAuthenticated && !isEmpty(user);

	return (
		<div className={styles.mainLayout}>
			<div className={styles.section}>
				{showTagSelector && <TagSelector location={location} />}
				<InfiniteArticles
					location={location}
					showTagSelector={showTagSelector}
				/>
			</div>
			<div className={styles.placeholder}>PLACE HOLDER</div>
		</div>
	);
};

export default Dashboard;
