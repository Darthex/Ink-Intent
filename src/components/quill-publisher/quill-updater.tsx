import { useEffect, useState, type ChangeEvent, useMemo } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { useUpdateMutation } from '../../redux-tlkt/api-injections/article/article.ts';

import { Button } from '../ui/button.tsx';
import Modal from '../modal/modal.tsx';
import PublisherForm from '../publisher-form/publisher-form.tsx';
import createToast, { generateError } from '../../utils/toasts.ts';

import { ROUTES } from '../../constants/routes.ts';

type Props = {
	user: {
		id: string;
		username: string;
	};
	article: string;
	navigate: NavigateFunction;
	formData: Form;
	id?: string;
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

const QuillUpdater = ({ user, article, navigate, formData, id }: Props) => {
	const [publishForm, setPublishForm] = useState(formData);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [triggerUpdate, { isLoading, isSuccess, isError, error }] =
		useUpdateMutation();
	const initialFetchedArticleState = useMemo(() => article, []);
	const disableModal =
		article?.trim().length < 1 ||
		article === EMPTY_ARTICLE ||
		initialFetchedArticleState === article ||
		isLoading;

	const updateArticle = () => {
		triggerUpdate({
			articleId: id!,
			article: {
				title: publishForm?.title,
				description: publishForm?.description,
				cover: publishForm?.cover,
				content: JSON.stringify(article),
				owner_id: user.id,
				owner_name: user.username,
				tags: publishForm?.tags,
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
				Save
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
				title: 'Your Article has been updated.',
				actionLabel: 'Ok',
			});
			setPublishForm(initForm);
			navigate(ROUTES.getReadRoute(id!));
		}
		if (isError) {
			createToast({
				type: 'error',
				title: `Couldn't update article, try again.`,
				description: generateError(error),
				actionLabel: 'Ok',
			});
		}
	}, [isSuccess, isError]);

	return (
		<Modal
			trigger={renderModalTrigger()}
			title="Ready to publish?"
			description="Please mention a fitting title and description for your article. You can also upload a cover image."
			onClick={updateArticle}
			footer="Save"
			body={renderModalBody()}
			loading={isLoading}
			disabled={!publishForm.title || !publishForm.description}
		/>
	);
};

export default QuillUpdater;
