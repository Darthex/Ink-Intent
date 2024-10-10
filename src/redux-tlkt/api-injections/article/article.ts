import api from '../../api.ts';
import { PUBLISH_ARTICLE } from '../../../constants/endpoints.ts';

const extendedApi = api.injectEndpoints?.({
	endpoints: (builder) => ({
		publish: builder.mutation({
			query: ({ article }) => ({
				url: PUBLISH_ARTICLE,
				method: 'POST',
				body: article,
			}),
		}),
	}),
});

export const { usePublishMutation } = extendedApi;
