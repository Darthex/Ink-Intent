import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';

import { useAppSelector } from '../../redux-tlkt/hooks.ts';
import { RootState } from '../../redux-tlkt/store.ts';
import { usePublishMutation } from '../../redux-tlkt/api-injections/article/article.ts';

import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar.tsx';
import { Button } from '../ui/button.tsx';
import { Label } from '../ui/label.tsx';
import { Input } from '../ui/input.tsx';
import Inker from '../inker/inker.tsx';
import Quill from '../../svgs/quill.tsx';
import Modal from '../modal/modal.tsx';
import SearchBar from '../search-bar/search-bar.tsx';
import createToast from '../../utils/toasts.ts';

import { ROUTES } from '../../constants/routes.ts';

import styles from './header.module.css';

const EMPTY_ARTICLE = '<p></p>';

const getState = (selector: TypedUseSelectorHook<RootState>) => {
	const { auth, article } = selector((state: RootState) => state.root);
	return {
		isAuthenticated: auth.isAuthenticated,
		user: auth.user,
		article: article.article,
	};
};

const Header = () => {
	const [title, setTitle] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	const [triggerPublish, { isLoading, isSuccess, isError }] =
		usePublishMutation();
	const isWritePage = location.pathname === ROUTES.WRITE;
	const { user, isAuthenticated, article } = getState(useAppSelector);
	const disableModal =
		article.trim().length < 1 || article === EMPTY_ARTICLE || isLoading;

	const publishArticle = () => {
		triggerPublish({
			article: {
				title,
				content: JSON.stringify(article),
				owner_id: user.id,
				owner_name: 'Darthex',
			},
		});
	};

	const renderTrigger = () => {
		return (
			<Button variant="destructive" disabled={disableModal}>
				Publish
			</Button>
		);
	};

	const renderBody = () => {
		return (
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-center">
						Title
					</Label>
					<Input
						value={title}
						className="col-span-3"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
			</div>
		);
	};

	useEffect(() => {
		if (isSuccess) {
			createToast({
				type: 'success',
				title: 'Your Article has been published.',
				actionLabel: 'Ok',
			});
			navigate(ROUTES.DASHBOARD);
		}
		if (isError) {
			createToast({
				type: 'error',
				title: `Couldn't publish article, try again.`,
				actionLabel: 'Ok',
			});
		}
	}, [isSuccess, isError]);

	return (
		<div className={styles.layout}>
			<Inker size="medium" onClick={() => navigate(ROUTES.DASHBOARD)} />
			<div className={styles.actions}>
				{!isWritePage && <SearchBar />}
				{!isWritePage ? (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate(ROUTES.WRITE)}
					>
						<Quill />
					</Button>
				) : (
					<Modal
						trigger={renderTrigger()}
						title="Ready to publish?"
						description="Please mention a fitting title for your article."
						onClick={publishArticle}
						footer="Publish"
						body={renderBody()}
						disabled={isLoading}
						loading={isLoading}
					/>
				)}
				{!isAuthenticated ? (
					<Button onClick={() => navigate(ROUTES.AUTH)}>Login</Button>
				) : (
					<Avatar
						onClick={() => navigate(ROUTES.AUTH)}
						style={{ cursor: 'pointer' }}
					>
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback>
							{(user as any)?.email[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				)}
			</div>
		</div>
	);
};

export default Header;
