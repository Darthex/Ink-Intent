import { useEffect, useState, type ChangeEvent } from 'react';
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

type Form = {
	title: string;
	description: string;
	cover: string | ArrayBuffer | null;
};

const initForm: Form = {
	title: '',
	description: '',
	cover: null,
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
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-center">
						Title
					</Label>
					<Input
						value={publishForm.title}
						name="title"
						type="text"
						className="col-span-3"
						onChange={handleFormChange}
					/>
					<Label htmlFor="name" className="text-center">
						Description
					</Label>
					<Input
						value={publishForm.description}
						name="description"
						type="text"
						className="col-span-3"
						onChange={handleFormChange}
					/>
					<Label htmlFor="name" className="text-center">
						Cover image
					</Label>
					{!selectedImage ? (
						<Input
							className="col-span-3"
							type="file"
							accept="image/png, image/jpeg"
							onChange={handleFormChange}
						/>
					) : (
						<Input
							className="col-span-2"
							type="text"
							disabled
							value={selectedImage.name}
						/>
					)}
					{publishForm.cover && (
						<Button
							variant="destructive"
							className="col-span-1"
							onClick={() => {
								setSelectedImage(null);
								setPublishForm((prevState) => ({
									...prevState,
									cover: null,
								}));
							}}
						>
							Delete
						</Button>
					)}
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
			description="Please mention a fitting title and description for your article. You can also upload a cover image."
			onClick={publishArticle}
			footer="Publish"
			body={renderModalBody()}
			loading={isLoading}
		/>
	);
};

export default QuillPublisher;
