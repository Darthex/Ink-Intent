import { accessTokenKey, authSessionKey } from './constants';

export type Token = {
	access_token: string;
	token_type: string;
	user: object;
};

export const updateSession = (username: string) => {
	const validSession = JSON.parse(localStorage.getItem(authSessionKey)!);
	const newSession = {
		...validSession,
		user: {
			...validSession.user,
			username,
		},
	};
	localStorage.setItem(authSessionKey, JSON.stringify(newSession));
};

export const createSession = (token: Token) => {
	localStorage.setItem(authSessionKey, JSON.stringify(token));
};

export const getSession = () => {
	let credentials;
	try {
		credentials = JSON.parse(localStorage.getItem(authSessionKey)!);
		if (!Object.keys(credentials).includes(accessTokenKey)) {
			credentials = null;
		}
	} catch {
		credentials = null;
	}
	return credentials;
};

export const getUsername = () => {
	return JSON.parse(localStorage.getItem(authSessionKey) as string)?.user
		?.username;
};

export const getTagsFromSession = (): string[] => {
	return JSON.parse(localStorage.getItem(authSessionKey) as string)?.user?.tags;
};

export const destroySession = () => {
	localStorage.removeItem(authSessionKey);
};
