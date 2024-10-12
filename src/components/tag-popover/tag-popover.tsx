import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Props = {
	trigger: ReactNode;
	content: ReactNode;
};

const TagPopover = ({ trigger, content }: Props) => {
	return (
		<Popover>
			<PopoverTrigger className="w-full">{trigger}</PopoverTrigger>
			<PopoverContent>{content}</PopoverContent>
		</Popover>
	);
};

export default TagPopover;
