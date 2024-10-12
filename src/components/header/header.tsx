import { useLocation, useNavigate } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';

import { useAppSelector } from '../../redux-tlkt/hooks.ts';
import { RootState } from '../../redux-tlkt/store.ts';

import Inker from '../inker/inker.tsx';
import SearchBar from '../search-bar/search-bar.tsx';
import ProfileSheet from '../profile-sheet/profile-sheet.tsx';
import QuillPublisher from '../quill-publisher/quill-publisher.tsx';

import { ROUTES } from '../../constants/routes.ts';

import styles from './header.module.css';

const getState = (selector: TypedUseSelectorHook<RootState>) => {
	const { auth, article } = selector((state: RootState) => state.root);
	return {
		isAuthenticated: auth.isAuthenticated,
		user: auth.user,
		article: article.article,
	};
};

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isWritePage = location.pathname === ROUTES.WRITE;
	const isDashboard = location.pathname === ROUTES.DASHBOARD;
	const { user, isAuthenticated, article } = getState(useAppSelector);

	return (
		<div className={styles.layout}>
			<Inker
				size="medium"
				onClick={() => navigate(isDashboard ? ROUTES.HOME : ROUTES.DASHBOARD)}
			/>
			<div className={styles.actions}>
				{!isWritePage && <SearchBar />}
				<QuillPublisher
					showPublish={isWritePage}
					article={article}
					user={user}
					navigate={navigate}
				/>
				<ProfileSheet
					isAuthenticated={isAuthenticated}
					user={user}
					navigate={navigate}
				/>
			</div>
		</div>
	);
};

export default Header;
