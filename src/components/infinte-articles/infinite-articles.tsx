import { useEffect, useRef, useState } from 'react';

import { useGetArticlesQuery } from '../../redux-tlkt/api-injections/article/article.ts';
import { Article } from '../../redux-tlkt/api-injections/article/article.ts';

import ArticleCard from '../article-card/article-card.tsx';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.tsx';
import Loader from '../loader/loader.tsx';

import styles from './infinite-articles.module.css';

const perPage = 10;
const optimisticDefaultMaxCount = 10;

// fixme - if feels like there are tons of side effects here
const InfiniteArticles = () => {
	const [cachedArticles, setCachedArticles] = useState<Article[]>([]);
	const [localLoader, setLocalLoader] = useState(false);
	const [maxArticleCount, setMaxArticleCount] = useState(
		optimisticDefaultMaxCount
	);
	const parentRef = useRef(null);

	const { loadMoreRef, page } = useInfiniteScroll({
		currentPage: 0,
		parentRef,
		loading: localLoader,
	});

	const { data, isFetching } = useGetArticlesQuery(
		{
			take: perPage,
			skip: (page - 1) * perPage,
		},
		{ skip: page <= 0 || (page - 1) * perPage > maxArticleCount }
	);

	useEffect(() => {
		setMaxArticleCount(data?.count ?? optimisticDefaultMaxCount);
		if (data?.result)
			setCachedArticles((prevState) => [...prevState, ...data.result]);
	}, [data]);

	useEffect(() => {
		setLocalLoader(isFetching);
	}, [isFetching]);

	return (
		<div className="h-[calc(100vh-100px)] overflow-scroll" ref={parentRef}>
			<div className={styles.articlesContainer}>
				{cachedArticles.map((article) => (
					<div key={article.id}>
						<ArticleCard article={article} />
					</div>
				))}
			</div>
			<div ref={loadMoreRef} className={styles.footer}>
				{isFetching && <Loader color="white" />}
				<span>&nbsp;</span>
				{!isFetching && page > 1 && (page - 1) * perPage > maxArticleCount && (
					<span className={styles.exclamation}>Whoa! No more articles</span>
				)}
			</div>
		</div>
	);
};

export default InfiniteArticles;
