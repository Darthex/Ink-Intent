import { useMemo, useRef } from 'react';
import { type Location } from 'react-router-dom';
import queryString from 'query-string';
import { cn } from '../../lib/utils.ts';

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Button } from '../ui/button.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import useUrlDispatch from '../../hooks/useUrlDispatch.tsx';
import { getTagsFromSession } from '../../utils/sessions.ts';
import { TAG_CHANGED } from '../../hooks/urlReducer.ts';

import styles from './tag-selector.module.css';

const defaultTags = [
	// TODO: remove
	'Lifestyle',
	'Programming',
	'Technology',
	'Business',
	'Entertainment',
	'Education',
	'Environment',
	'Design',
	'Personal',
	'Finance',
	// 'News & Politics',
	'Sports',
];

const TagSelector = ({ location }: { location: Location<any> }) => {
	const tags = getTagsFromSession() || defaultTags;
	const scrollRef = useRef<any>(null);
	const { dispatch } = useUrlDispatch({ replace: true });

	const { tag: queryTag } = useMemo(
		() => queryString.parse(location.search),
		[location.search]
	);

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
		}
	};

	const onTagClick = (tag: string) => {
		dispatch({
			type: TAG_CHANGED,
			payload: { tag },
		});
	};

	return (
		<div className="w-[350px] lg:w-[700px] h-[40px] flex items-center relative">
			<Button
				className={cn('hidden md:inline-flex', styles.floatingButton)}
				variant="ghost"
				size="sm"
				onClick={scrollLeft}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<Button
				className={cn(
					'hidden md:inline-flex',
					styles.floatingButton,
					styles.right
				)}
				variant="ghost"
				size="sm"
				onClick={scrollRight}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
			<div className={styles.scrollDiv} ref={scrollRef}>
				<ToggleGroup
					type="multiple"
					className="md:mx-[30px]"
					value={[queryTag as string]} // lol why did I even use a toggle group
				>
					{tags.map((tag) => (
						<ToggleGroupItem
							value={tag}
							key={tag}
							onClick={() => onTagClick(tag)}
						>
							<span>{tag}</span>
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>
		</div>
	);
};

export default TagSelector;
