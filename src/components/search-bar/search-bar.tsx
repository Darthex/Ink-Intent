import { useState, type KeyboardEvent, type ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input';
import Search from '../../svgs/search.tsx';
import Cross from '../../svgs/cross.tsx';

import useUrlDispatch from '../../hooks/useUrlDispatch.tsx';
import {
	SEARCH_TERM_CHANGED,
	SEARCH_TERM_CLEARED,
} from '../../hooks/urlReducer.ts';

type Props = {
	onSearch?: (term: string) => void;
	clearTerm?: boolean;
};

const SearchBar = ({ onSearch, clearTerm }: Props) => {
	const location = useLocation();
	const { search: urlSearchString } = queryString.parse(location.search);
	const [searchTerm, setSearchTerm] = useState(
		(urlSearchString as string) ?? ''
	);
	const { dispatch } = useUrlDispatch({ replace: true });

	const canSearch = searchTerm !== urlSearchString;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSearch = () => {
		if (onSearch) {
			onSearch(searchTerm);
			if (clearTerm) setSearchTerm('');
		} else {
			dispatch({
				type: SEARCH_TERM_CHANGED,
				payload: { search: searchTerm },
			});
		}
	};

	const handleClear = () => {
		setSearchTerm('');
		dispatch({
			type: SEARCH_TERM_CLEARED,
		});
	};

	const handleEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
		if (e.key === 'Enter' && !searchTerm && urlSearchString) {
			handleClear();
		}
	};

	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<Input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleChange}
				onKeyDown={handleEnterKeyPress}
			/>
			<Button
				variant="ghost"
				size="icon"
				onClick={canSearch ? handleSearch : handleClear}
			>
				{canSearch ? <Search /> : <Cross />}
			</Button>
		</div>
	);
};

export default SearchBar;
