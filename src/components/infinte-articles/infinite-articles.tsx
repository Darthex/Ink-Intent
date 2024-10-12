import { useEffect, useMemo, useRef, useState } from 'react';
import { type Location } from 'react-router-dom';
import queryString from 'query-string';

import { useGetArticlesQuery } from '../../redux-tlkt/api-injections/article/article.ts';
import { Article } from '../../redux-tlkt/api-injections/article/article.ts';

import ArticleCard from '../article-card/article-card.tsx';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.tsx';
import Loader from '../loader/loader.tsx';

import styles from './infinite-articles.module.css';

const perPage = 10;
const optimisticDefaultMaxCount = 10;

// fixme - it feels like there are tons of side effects here
const InfiniteArticles = ({
	location,
	showTagSelector,
}: {
	location: Location<any>;
	showTagSelector: boolean;
}) => {
	const [cachedArticles, setCachedArticles] = useState<Article[]>([]);
	const [localLoader, setLocalLoader] = useState(false);
	const [maxArticleCount, setMaxArticleCount] = useState(
		optimisticDefaultMaxCount
	);
	const parentRef = useRef(null);
	const searchRef = useRef<string | undefined>(undefined); // this has to be undefined
	const tagRef = useRef<string | undefined>(undefined);
	const margin = showTagSelector ? '160px' : '100px';

	const { search, tag } = useMemo(
		() => queryString.parse(location.search),
		[location.search]
	);

	const { loadMoreRef, page, resetPage } = useInfiniteScroll({
		currentPage: 0,
		parentRef,
		loading: localLoader,
	});

	const { data, isFetching } = useGetArticlesQuery(
		{
			take: perPage,
			skip: (page - 1) * perPage,
			...(search ? { search: search as string } : {}),
			...(tag ? { tags: tag } : {}),
		},
		{
			refetchOnMountOrArgChange: true,
			skip: page <= 0 || (page - 1) * perPage > maxArticleCount,
		}
	);

	useEffect(() => {
		setMaxArticleCount(data?.count ?? optimisticDefaultMaxCount);
		/* IDK if this the best method to achieve what I wanted, so basically lets say the search term is
    empty at page load (unless loaded from url), so fetching articles from api should append these articles to
    already fetched list because it's an infinite list, but now if I change the search term, I don't want the new
    results to append to the existing list I want to show a new list, but now all subsequent loads of this search term
    should append to this new list (wtf I hope it makes sense).
    */
		if (search === searchRef.current) {
			if (data?.result) {
				setCachedArticles((prevState) => [...prevState, ...data.result]);
			}
		}
		if (search !== searchRef.current) {
			if (data?.result) {
				setCachedArticles(data.result);
				searchRef.current = search as string;
			}
		}
		if (tag === tagRef.current) {
			if (data?.result) {
				setCachedArticles((prevState) => [...prevState, ...data.result]);
			}
		}
		if (tag !== tagRef.current) {
			if (data?.result) {
				setCachedArticles(data.result);
				tagRef.current = tag as string;
			}
		}
	}, [data, resetPage]);

	useEffect(() => {
		setLocalLoader(isFetching);
	}, [isFetching]);

	useEffect(() => {
		if (search !== searchRef.current) resetPage(1);
		if (tag !== tagRef.current) resetPage(1);
	}, [search, searchRef, tag, tagRef]);

	return (
		<div
			className={`h-[calc(100vh-${margin})] overflow-scroll`}
			ref={parentRef}
		>
			<div className={styles.articlesContainer}>
				{search === searchRef.current &&
					cachedArticles.map((article) => (
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
