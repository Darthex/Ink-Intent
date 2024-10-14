import { useLocation, useNavigate } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';

import { useAppSelector } from '../../redux-tlkt/hooks.ts';
import { RootState } from '../../redux-tlkt/store.ts';
import { useGetSingleArticleQuery } from '../../redux-tlkt/api-injections/article/article.ts';

import { Button } from '../ui/button.tsx';
import Inker from '../inker/inker.tsx';
import SearchBar from '../search-bar/search-bar.tsx';
import ProfileSheet from '../profile-sheet/profile-sheet.tsx';
import QuillPublisher from '../quill-publisher/quill-publisher.tsx';

import { ROUTES } from '../../constants/routes.ts';

import styles from './header.module.css';
import Quill from '../../svgs/quill.tsx';
import QuillUpdater from '../quill-publisher/quill-updater.tsx';

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
	const articleID = location.pathname.split('/')[2]; // idk why but useParams() is not working.
	const isWritePage = location.pathname.split('/')[1] === 'write';
	const isReadPage = location.pathname.split('/')[1] === 'read';
	const isDashboard = location.pathname === ROUTES.DASHBOARD;
	const { user, isAuthenticated, article } = getState(useAppSelector);
	const { data } = useGetSingleArticleQuery(articleID, {
		skip: !articleID,
	});
	const isMyArticle = !!articleID && user?.id === data?.owner_id;
	const fetchedForm =
		articleID && data
			? {
					title: data?.title,
					description: data?.description,
					cover: data?.cover,
					tags: data?.tags,
				}
			: null;

	return (
		<div className={styles.layout}>
			<Inker
				size="medium"
				onClick={() => navigate(isDashboard ? ROUTES.HOME : ROUTES.DASHBOARD)}
			/>
			<div className={styles.actions}>
				{!isWritePage && !isReadPage && <SearchBar />}
				{!isWritePage && !isReadPage && (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate(ROUTES.WRITE)}
					>
						<Quill />
					</Button>
				)}
				{isReadPage && isMyArticle && isAuthenticated && (
					<Button onClick={() => navigate(ROUTES.getEditRoute(articleID))}>
						Edit
					</Button>
				)}
				{isWritePage && !articleID && (
					<QuillPublisher article={article} user={user} navigate={navigate} />
				)}
				{isWritePage && articleID && fetchedForm && (
					<QuillUpdater
						article={article}
						user={user}
						navigate={navigate}
						formData={fetchedForm}
						id={articleID}
					/>
				)}
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
