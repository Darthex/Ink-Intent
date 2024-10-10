import { useState } from 'react';
import { type Editor } from '@tiptap/react';
import {
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Heading2,
	List,
	ListOrdered,
	Quote,
	Undo,
	Code,
	Redo,
} from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

type Props = {
	editor: Editor | null;
};

type PropsWN = {
	editor: Editor;
};

const ACTIONS = {
	BOLD: 'bold',
	ITALIC: 'italic',
	UNDERLINE: 'underline',
	STRIKETHROUGH: 'strikethrough',
	HEADING: 'heading',
	LIST: 'list',
	LIST_ORDERED: 'list_ordered',
	QUOTE: 'quote',
	CODE: 'code',
	UNDO: 'undo',
	REDO: 'redo',
};

const ToolbarToggleGroup = ({ editor }: PropsWN) => {
	const [activeActions, setActiveActions] = useState<string[]>([]);

	const handleActionActivation = (element: string) => {
		if (!activeActions.includes(element)) {
			setActiveActions([...activeActions, element]);
		} else {
			setActiveActions((prevState) =>
				prevState.filter((item) => item !== element)
			);
		}
	};

	const getValue = (name: string) => {
		return editor.isActive(name) ? name : '';
	};

	return (
		<ToggleGroup size="lg" type="multiple" value={activeActions}>
			<ToggleGroupItem
				value={getValue(ACTIONS.BOLD)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleBold().run();
					handleActionActivation(ACTIONS.BOLD);
				}}
			>
				<Bold className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.ITALIC)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleItalic().run();
					handleActionActivation(ACTIONS.ITALIC);
				}}
			>
				<Italic className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.UNDERLINE)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleUnderline().run();
					handleActionActivation(ACTIONS.UNDERLINE);
				}}
			>
				<Underline className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.STRIKETHROUGH)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleStrike().run();
					handleActionActivation(ACTIONS.STRIKETHROUGH);
				}}
			>
				<Strikethrough className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.HEADING)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleHeading({ level: 2 }).run();
					handleActionActivation(ACTIONS.HEADING);
				}}
			>
				<Heading2 className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.LIST)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleBulletList().run();
					handleActionActivation(ACTIONS.LIST);
				}}
			>
				<List className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.LIST_ORDERED)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleOrderedList().run();
					handleActionActivation(ACTIONS.LIST_ORDERED);
				}}
			>
				<ListOrdered className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.QUOTE)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleBlockquote().run();
					handleActionActivation(ACTIONS.QUOTE);
				}}
			>
				<Quote className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.CODE)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().setCode().run();
					handleActionActivation(ACTIONS.CODE);
				}}
			>
				<Code className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.UNDO)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().undo().run();
					handleActionActivation(ACTIONS.UNDO);
				}}
			>
				<Undo className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value={getValue(ACTIONS.REDO)}
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().redo().run();
					handleActionActivation(ACTIONS.REDO);
				}}
			>
				<Redo className="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
};

const Toolbar = ({ editor }: Props) => {
	if (!editor) return null;
	return <ToolbarToggleGroup editor={editor} />;
};

export default Toolbar;
