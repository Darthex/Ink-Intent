import queryString from 'query-string';
import { omit } from '../utils/lodash.ts';
import { Action } from './useUrlDispatch';

export const PAGINATION_CHANGED = 'PAGINATION_CHANGED';
export const TABLE_SORT_CHANGED = 'TABLE_SORT_CHANGED';
export const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED';
export const SEARCH_TERM_CLEARED = 'SEARCH_TERM_CLEARED';
export const PERSIST_QUERY_NAVIGATE = 'PERSIST_QUERY_NAVIGATE';

type OldLocation = {
	pathname: string;
	search: string;
};

const paginatedFields = {
	skip: 'skip',
	take: 'take',
};

const sortField = {
	field: 'field',
	sort: 'sort',
};

const searchField = 'search';

const urlReducer = (oldLocation: OldLocation, action: Action) => {
	const { pathname, search } = oldLocation;
	const query = queryString.parse(search);

	switch (action.type) {
		case PAGINATION_CHANGED: {
			const oldTake = query[paginatedFields.take];
			const oldSkip = query[paginatedFields.skip];
			const newTake = action.payload.take ?? oldTake;
			let newSkip = action.payload.skip ?? oldSkip;
			if (newTake !== oldTake) {
				// Will reset to page 1 if page size change.
				newSkip = 0;
			}
			const newQuery = {
				...query,
				[paginatedFields.take]: newTake,
				[paginatedFields.skip]: newSkip,
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}

		case TABLE_SORT_CHANGED: {
			const newQuery = {
				...query,
				[sortField.field]: action.payload.field,
				[sortField.sort]: action.payload.sort,
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}

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

		case PERSIST_QUERY_NAVIGATE: {
			const newPath = action.payload.path;
			return `${newPath}?${queryString.stringify(query)}`;
		}

		default:
			return oldLocation;
	}
};

export default urlReducer;
