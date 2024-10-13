import { useParams } from 'react-router-dom';
import { useGetSingleArticleQuery } from '../../redux-tlkt/api-injections/article/article.ts';

import Tiptap from '../../components/tiptap/tiptap.tsx';
import Loader from '../../components/loader/loader.tsx';
import defaultCover from '../../assets/images/default-cover.jpg';

import { getFormattedTime } from '../../utils/time.ts';

import styles from './read.module.css';

const Read = () => {
	const { id } = useParams();
	const { data, isFetching } = useGetSingleArticleQuery(id ?? '', {
		skip: !id,
	});

	return (
		<div className={styles.container}>
			{!data?.content && isFetching ? (
				<Loader />
			) : (
				<>
					<div className="relative">
						<div className={styles.cover}>
							<img
								src={data?.cover || defaultCover}
								alt="Image"
								className={styles.image}
							/>
							<div className={styles.details}>
								<span className="text-sm md:text-3xl">{data?.title}</span>
								<span className="text-xs md:text-sm underline text-zinc-500">
									By - {data?.owner_name}
									{', '}
									{getFormattedTime(data?.created_at || '')}
								</span>
								<span className="text-xs md:text-lg">{data?.description}</span>
							</div>
						</div>
					</div>
					{data?.content && <Tiptap editable={false} content={data?.content} />}
				</>
			)}
		</div>
	);
};

export default Read;
