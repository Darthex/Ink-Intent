import api from '../../api.ts';
import { PUBLISH_ARTICLE, GET_ARTICLES } from '../../../constants/endpoints.ts';

type Params = {
	skip?: number;
	take?: number;
};

export type Article = {
	content: string;
	created_at: string;
	id: string;
	owner_id: string;
	owner_name: string;
	title: string;
	description: string;
	cover: string | null;
};

type ArticleResponse = {
	count: number;
	result: Article[];
};

const ARTICLE_TAG = 'article/invalidate_existing_cache';

const extendedApi = api
	.enhanceEndpoints({
		addTagTypes: [ARTICLE_TAG],
	})
	.injectEndpoints?.({
		endpoints: (builder) => ({
			publish: builder.mutation({
				query: ({ article }) => ({
					url: PUBLISH_ARTICLE,
					method: 'POST',
					body: article,
				}),
				invalidatesTags: [ARTICLE_TAG],
			}),
			getArticles: builder.query<ArticleResponse, Params>({
				query: (params) => ({
					url: GET_ARTICLES,
					params: params,
				}),
				providesTags: [ARTICLE_TAG],
			}),
		}),
	});

export const { usePublishMutation, useGetArticlesQuery } = extendedApi;
