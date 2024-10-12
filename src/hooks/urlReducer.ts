import queryString from 'query-string';
import { omit } from '../utils/lodash.ts';
import { Action } from './useUrlDispatch';

export const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED';
export const SEARCH_TERM_CLEARED = 'SEARCH_TERM_CLEARED';
export const TAG_CHANGED = 'TAG_CHANGED';
export const PERSIST_QUERY_NAVIGATE = 'PERSIST_QUERY_NAVIGATE';

type OldLocation = {
	pathname: string;
	search: string;
};

const searchField = 'search';

const urlReducer = (oldLocation: OldLocation, action: Action) => {
	const { pathname, search } = oldLocation;
	const query = queryString.parse(search);

	switch (action.type) {
		case SEARCH_TERM_CHANGED: {
			const newSearchTerm = action.payload.search.trim();
			if (!newSearchTerm) {
				return oldLocation;
			}
			const newQuery = {
				...query,
				[searchField]: newSearchTerm,
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}

		case SEARCH_TERM_CLEARED: {
			const searchOmittedQuery = omit(query, [searchField]);
			const newQuery = {
				...searchOmittedQuery,
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}

		case TAG_CHANGED: {
			const { tag } = action.payload;
			let newQuery;
			if (query.tag && query.tag === tag) {
				const tagOmittedQuery = omit(query, ['tag']);
				newQuery = { ...tagOmittedQuery };
			} else newQuery = { ...query, tag };
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}

		case PERSIST_QUERY_NAVIGATE: {
			const newPath = action.payload.path;
			return `${newPath}?${queryString.stringify(query)}`;
		}

		default:
			return oldLocation;
	}
};

export default urlReducer;
