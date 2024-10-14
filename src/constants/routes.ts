export const ROUTES = {
	HOME: '/home',
	DASHBOARD: '/',
	AUTH: '/auth',
	WRITE: '/write',
	EDIT: '/write/:id',
	getEditRoute: (articleId: string) => `/write/${articleId}`,
	READ: '/read/:id',
	getReadRoute: (articleId: string) => `/read/${articleId}`,
};
