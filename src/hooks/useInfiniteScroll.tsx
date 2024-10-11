import {
	useEffect,
	useState,
	useRef,
	useCallback,
	MutableRefObject,
} from 'react';

type Props = {
	parentRef: MutableRefObject<any>;
	currentPage: number;
	loading?: boolean;
};

const useInfiniteScroll = ({ parentRef, currentPage, loading }: Props) => {
	const [page, setPage] = useState(currentPage);
	const loadMoreRef = useRef(null);

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [target] = entries;
			if (target.isIntersecting && !loading) {
				setPage((prev) => prev + 1);
			}
		},
		[loading]
	);

	const resetPage = useCallback((pageNum: number) => {
		setPage(pageNum);
	}, []);

	useEffect(() => {
		const currentValue = loadMoreRef.current;
		const options = {
			root: parentRef.current,
			rootMargin: '0px',
			threshold: 0.0,
		};

		const observer = new IntersectionObserver(handleObserver, options);
		if (currentValue) observer.observe(currentValue);

		return () => {
			if (currentValue) observer.disconnect();
		};
	}, [handleObserver, parentRef]);

	return { loadMoreRef, page, resetPage };
};

export default useInfiniteScroll;
