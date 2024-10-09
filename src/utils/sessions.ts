import { accessTokenKey, authSessionKey } from './constants';

export type Token = {
	access_token: string;
	token_type: string;
	user: object;
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

export const destroySession = () => {
	localStorage.removeItem(authSessionKey);
};
