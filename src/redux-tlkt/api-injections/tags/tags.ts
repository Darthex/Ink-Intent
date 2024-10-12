import api, { KEEP_UNUSED_DATA_FOR_LONG_TIME } from '../../api.ts';
import { GET_ALL_TAGS } from '../../../constants/endpoints.ts';

type TagsResponse = {
	tags: string[];
};

const extendedApi = api.injectEndpoints?.({
	endpoints: (builder) => ({
		getTags: builder.query<TagsResponse, void>({
			query: () => ({
				url: GET_ALL_TAGS,
			}),
			keepUnusedDataFor: KEEP_UNUSED_DATA_FOR_LONG_TIME,
		}),
	}),
});

export const { useGetTagsQuery } = extendedApi;
