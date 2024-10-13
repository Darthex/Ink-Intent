export const REGISTER_USER = '/auth/register';
export const LOGIN_USER = '/auth/login';
export const UPDATE_USER = '/auth/update';
export const PUBLISH_ARTICLE = '/article/publish';
export const GET_ARTICLES = '/article';
export const getSingleArticleByID = (articleID: string) =>
	`/article/${articleID}`;
export const GET_ALL_TAGS = '/tags';
