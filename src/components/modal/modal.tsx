import { type ReactNode } from 'react';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import Loader from '../loader/loader.tsx';

type Props = {
	trigger: ReactNode;
	title: string;
	description: string;
	onClick: () => void;
	footer: string;
	body: ReactNode;
	loading: boolean;
};

const Modal = ({
	trigger,
	title,
	description,
	onClick,
	footer,
	body,
	loading,
}: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent
				className="sm:max-w-[425px]"
				disabled={loading}
				onInteractOutside={(e) => {
					if (loading) e.preventDefault();
				}}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{body}
				<DialogFooter>
					<Button onClick={onClick} disabled={loading}>
						{loading ? <Loader /> : footer}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
