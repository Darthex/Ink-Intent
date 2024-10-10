import { useEffect, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { usePublishMutation } from '../../redux-tlkt/api-injections/article/article.ts';

import { Button } from '../ui/button.tsx';
import { Label } from '../ui/label.tsx';
import { Input } from '../ui/input.tsx';
import Quill from '../../svgs/quill.tsx';
import Modal from '../modal/modal.tsx';
import createToast, { generateError } from '../../utils/toasts.ts';

import { ROUTES } from '../../constants/routes.ts';

type Props = {
	showPublish: boolean;
	user: {
		id: string;
		username: string;
	};
	article: string;
	navigate: NavigateFunction;
};

const EMPTY_ARTICLE = '<p></p>';

const QuillPublisher = ({ showPublish, user, article, navigate }: Props) => {
	const [title, setTitle] = useState('');
	const [triggerPublish, { isLoading, isSuccess, isError, error }] =
		usePublishMutation();
	const disableModal =
		article.trim().length < 1 || article === EMPTY_ARTICLE || isLoading;

	const publishArticle = () => {
		triggerPublish({
			article: {
				title,
				content: JSON.stringify(article),
				owner_id: user.id,
				owner_name: user.username,
			},
		});
	};

	const renderModalTrigger = () => {
		return (
			<Button variant="destructive" disabled={disableModal}>
				Publish
			</Button>
		);
	};

	const renderModalBody = () => {
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
				description: generateError(error),
				actionLabel: 'Ok',
			});
		}
	}, [isSuccess, isError]);

	return !showPublish ? (
		<Button variant="ghost" size="icon" onClick={() => navigate(ROUTES.WRITE)}>
			<Quill />
		</Button>
	) : (
		<Modal
			trigger={renderModalTrigger()}
			title="Ready to publish?"
			description="Please mention a fitting title for your article."
			onClick={publishArticle}
			footer="Publish"
			body={renderModalBody()}
			loading={isLoading}
		/>
	);
};

export default QuillPublisher;
