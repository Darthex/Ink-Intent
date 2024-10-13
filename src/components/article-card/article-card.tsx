import { useNavigate } from 'react-router-dom';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import defaultCover from '../../assets/images/default-cover.jpg';
import { Heart, MessageCircle, Ellipsis } from 'lucide-react';
import { Article } from '../../redux-tlkt/api-injections/article/article.ts';
import { getFormattedTime } from '../../utils/time.ts';

import styles from './article-card.module.css';
import { ROUTES } from '../../constants/routes.ts';

type Props = {
	article: Article;
};

const ArticleCard = ({ article }: Props) => {
	const navigate = useNavigate();

	return (
		<Card
			className="w-[350px] lg:w-[700px] cursor-pointer"
			onClick={() => navigate(ROUTES.getReadRoute(article.id))}
		>
			<CardHeader>
				<CardTitle>{article.title}</CardTitle>
				<CardDescription>
					<span>
						By {article.owner_name} - {getFormattedTime(article.created_at)}
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className={styles.body}>
					<span>{article.description}</span>
					<div className={styles.cover}>
						<img
							src={article.cover || defaultCover}
							alt="cover"
							className={styles.image}
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div className={styles.footer}>
					<div className={styles.stats}>
						<div className={styles.singleStat}>
							<Heart size={12} fill="white" />
							<span>3.5k</span>
						</div>
						<div className={styles.singleStat}>
							<MessageCircle size={12} fill="white" />
							<span>75</span>
						</div>
					</div>
					<div className={styles.stats}>
						<div className={styles.singleStat}>
							<Ellipsis />
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ArticleCard;
