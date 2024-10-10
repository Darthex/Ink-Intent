import { type ReactNode } from 'react';
import { Button } from '../ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet';
import Loader from '../loader/loader.tsx';

type Props = {
	trigger: ReactNode;
	title: string;
	description: string;
	body: ReactNode;
	footer: ReactNode;
	onClick: () => void;
	loading?: boolean;
	extraContent?: ReactNode;
	footerClassName?: string;
};

const SheetWrapper = ({
	trigger,
	title,
	description,
	body,
	footer,
	onClick,
	loading,
	extraContent,
	footerClassName,
}: Props) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent
				disabled={loading || false}
				onInteractOutside={(e) => {
					if (loading) e.preventDefault();
				}}
			>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				{body}
				<SheetFooter>
					<SheetClose asChild>
						<Button
							onClick={(e) => {
								e.preventDefault();
								onClick();
							}}
							disabled={loading}
						>
							{loading ? <Loader /> : footer}
						</Button>
					</SheetClose>
				</SheetFooter>
				{extraContent && (
					<SheetFooter className={footerClassName}>{extraContent}</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	);
};

export default SheetWrapper;
