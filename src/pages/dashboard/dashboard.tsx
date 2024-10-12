import { useLocation } from 'react-router-dom';

import InfiniteArticles from '../../components/infinte-articles/infinite-articles.tsx';
import TagSelector from '../../components/tag-selector/tag-selector.tsx';

import styles from './dashboard.module.css';

const Dashboard = () => {
	const location = useLocation();

	return (
		<div className={styles.mainLayout}>
			<div className={styles.section}>
				<TagSelector location={location} />
				<InfiniteArticles location={location} />
			</div>
			<div className={styles.placeholder}>PLACE HOLDER</div>
		</div>
	);
};

export default Dashboard;
