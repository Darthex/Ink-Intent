export const ROUTES = {
	HOME: '/home',
	DASHBOARD: '/',
	AUTH: '/auth',
	WRITE: '/write',
	READ: '/read/:id',
	getReadRoute: (articleId: string) => `/read/${articleId}`,
};
