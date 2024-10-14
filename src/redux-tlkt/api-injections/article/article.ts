import api, {
	DO_NOT_CACHE_DATA,
	KEEP_UNUSED_DATA_FOR_LONG_TIME,
} from '../../api.ts';
import {
	PUBLISH_ARTICLE,
	GET_ARTICLES,
	getSingleArticleByID,
} from '../../../constants/endpoints.ts';

type Params = {
	skip?: number;
	take?: number;
	search?: string;
};

export type Article = {
	content: string;
	created_at: string;
	id: string;
	owner_id: string;
	owner_name: string;
	title: string;
	description: string;
	cover: string | ArrayBuffer | null;
	tags: string[];
};

type ArticleResponse = {
	count: number;
	result: Article[];
};

const ARTICLE_TAG = 'article/invalidate_existing_cache';
const UPDATE_TAG = 'article/update_existing_cache';

const extendedApi = api
	.enhanceEndpoints({
		addTagTypes: [ARTICLE_TAG, UPDATE_TAG],
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
			update: builder.mutation<
				any,
				{ articleId: string; article: Omit<Article, 'id' | 'created_at'> }
			>({
				query: ({ articleId, article }) => ({
					url: getSingleArticleByID(articleId),
					method: 'PUT',
					body: article,
				}),
				invalidatesTags: ({ articleId }) => [
					{ type: UPDATE_TAG, id: articleId },
				],
			}),
			getArticles: builder.query<ArticleResponse, Params>({
				query: (params) => ({
					url: GET_ARTICLES,
					params: params,
				}),
				keepUnusedDataFor: DO_NOT_CACHE_DATA,
				providesTags: [ARTICLE_TAG],
			}),
			getSingleArticle: builder.query<Article, string>({
				query: (id) => ({
					url: getSingleArticleByID(id),
				}),
				keepUnusedDataFor: KEEP_UNUSED_DATA_FOR_LONG_TIME,
				providesTags: (data) =>
					data?.id
						? [{ type: UPDATE_TAG, id: data.id }]
						: [{ type: UPDATE_TAG, id: 'UPDATE_TAG' }],
			}),
		}),
	});

export const {
	usePublishMutation,
	useUpdateMutation,
	useGetArticlesQuery,
	useGetSingleArticleQuery,
} = extendedApi;
