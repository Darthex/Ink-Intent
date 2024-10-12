import { type Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Label } from '../ui/label.tsx';
import { Input } from '../ui/input.tsx';
import { Button } from '../ui/button.tsx';
import { Form } from '../quill-publisher/quill-publisher.tsx';

import styles from './publisher-form.module.css';

type Props = {
	publishForm: Form;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	setPublishForm: Dispatch<SetStateAction<Form>>;
	selectedImage: File | null;
	setSelectedImage: Dispatch<SetStateAction<File | null>>;
};

const PublisherForm = ({
	publishForm,
	onChange,
	setPublishForm,
	selectedImage,
	setSelectedImage,
}: Props) => {
	return (
		<div className="grid gap-4 py-4">
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="name" className="text-center">
					Title <span className={styles.requiredIndicator}>*</span>
				</Label>
				<Input
					value={publishForm.title}
					name="title"
					type="text"
					className="col-span-3"
					onChange={onChange}
				/>
				<Label htmlFor="name" className="text-center">
					Description <span className={styles.requiredIndicator}>*</span>
				</Label>
				<Input
					value={publishForm.description}
					name="description"
					type="text"
					className="col-span-3"
					onChange={onChange}
				/>
				<Label htmlFor="name" className="text-center">
					Cover image
				</Label>
				{!selectedImage ? (
					<Input
						className="col-span-3"
						type="file"
						accept="image/png, image/jpeg"
						onChange={onChange}
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

export default PublisherForm;
