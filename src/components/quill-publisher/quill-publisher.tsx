import { useEffect, useState, type ChangeEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { usePublishMutation } from '../../redux-tlkt/api-injections/article/article.ts';

import { Button } from '../ui/button.tsx';
import Quill from '../../svgs/quill.tsx';
import Modal from '../modal/modal.tsx';
import PublisherForm from '../publisher-form/publisher-form.tsx';
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

export type Form = {
	title: string;
	description: string;
	cover: string | ArrayBuffer | null;
	tags: string[];
};

const initForm: Form = {
	title: '',
	description: '',
	cover: null,
	tags: [],
};

const QuillPublisher = ({ showPublish, user, article, navigate }: Props) => {
	const [publishForm, setPublishForm] = useState(initForm);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [triggerPublish, { isLoading, isSuccess, isError, error }] =
		usePublishMutation();
	const disableModal =
		article.trim().length < 1 || article === EMPTY_ARTICLE || isLoading;

	const publishArticle = () => {
		triggerPublish({
			article: {
				title: publishForm.title,
				description: publishForm.description,
				cover: publishForm.cover,
				content: JSON.stringify(article),
				owner_id: user.id,
				owner_name: user.username,
				tags: publishForm.tags,
			},
		});
	};

	const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'file') {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					setPublishForm((prevState) => ({
						...prevState,
						cover: reader.result,
					}));
				};
				reader.readAsDataURL(file);
				setSelectedImage(file);
			}
		} else if (e.target.role === 'checkbox') {
			setPublishForm((prevState) => ({
				...prevState,
				tags: !prevState.tags.includes(e.target.id)
					? [...prevState.tags, e.target.id]
					: prevState.tags.filter((item) => item !== e.target.id),
			}));
		} else {
			setPublishForm((prevState) => ({
				...prevState,
				[e.target.name]: e.target.value,
			}));
		}
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
			<PublisherForm
				setPublishForm={setPublishForm}
				publishForm={publishForm}
				onChange={handleFormChange}
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
			/>
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
			description="Please mention a fitting title and description for your article. You can also upload a cover image."
			onClick={publishArticle}
			footer="Publish"
			body={renderModalBody()}
			loading={isLoading}
			disabled={!publishForm.title || !publishForm.description}
		/>
	);
};

export default QuillPublisher;
