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
	disabled: boolean;
	loading: boolean;
};

const Modal = ({
	trigger,
	title,
	description,
	onClick,
	footer,
	body,
	disabled,
	loading,
}: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]" disabled={disabled}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{body}
				<DialogFooter>
					<Button onClick={onClick} disabled={disabled}>
						{loading ? <Loader /> : footer}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
