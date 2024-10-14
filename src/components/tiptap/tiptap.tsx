import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Toolbar from './toolbar.tsx';

const extensions = [StarterKit, Underline];

type Props = {
	onChange?: (newContent: string) => void;
	editable?: boolean;
	content?: string;
};

const Tiptap = ({ onChange, editable = true, content }: Props) => {
	const editor = useEditor({
		extensions,
		editorProps: {
			attributes: {
				class:
					'flex flex-col px-4 py-3 justify-start border-r border-l border-white-700 text-white-400 items-start w-full gap-3 font-medium text-[16px] pt-4  outline-none text-wrap',
			},
		},
		editable,
		content: content ? JSON.parse(content) : '',
		onUpdate: ({ editor }) => {
			onChange!(editor.getHTML());
		},
	});

	return (
		<div className="w-full">
			{editable && <Toolbar editor={editor} />}
			<EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
		</div>
	);
};

export default Tiptap;
