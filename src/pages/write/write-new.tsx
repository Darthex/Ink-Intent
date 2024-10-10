import { useAppDispatch } from '../../redux-tlkt/hooks.ts';
import Tiptap from '../../components/tiptap/tiptap.tsx';
import { updateArticle } from '../../redux-tlkt/reducres/article.ts';

import styles from './write.module.css';

const Write = () => {
	const dispatch = useAppDispatch();

	const handleContentChange = (newContent: string) => {
		dispatch(updateArticle(newContent));
	};

	return (
		<div className={styles.container}>
			<Tiptap onChange={handleContentChange} />
		</div>
	);
};

export default Write;
