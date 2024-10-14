import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux-tlkt/hooks.ts';
import { useGetSingleArticleQuery } from '../../redux-tlkt/api-injections/article/article.ts';

import Tiptap from '../../components/tiptap/tiptap.tsx';
import Loader from '../../components/loader/loader.tsx';
import createToast from '../../utils/toasts.ts';

import { updateArticle } from '../../redux-tlkt/reducres/article.ts';
import { ROUTES } from '../../constants/routes.ts';

import styles from './write.module.css';

const Write = ({ isEdit = false }: { isEdit?: boolean }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { data, isFetching, isError } = useGetSingleArticleQuery(id as string, {
		skip: !isEdit || !id,
	});

	const handleContentChange = (newContent: string) => {
		dispatch(updateArticle(newContent));
	};

	let props;
	if (data && isEdit) {
		props = {
			onChange: handleContentChange,
			content: data?.content,
		};
	} else {
		props = {
			onChange: handleContentChange,
		};
	}

	useEffect(() => {
		if (isError) {
			createToast({
				type: 'error',
				title: 'An error occurred',
				description: 'Could not find article',
			});
			navigate(ROUTES.DASHBOARD);
		}
	}, [isError]);

	useEffect(() => {
		return () => {
			dispatch(updateArticle(''));
		};
	}, []);

	return (
		<div className={styles.container}>
			{isFetching ? <Loader /> : <Tiptap {...props} />}
		</div>
	);
};

export default Write;
