import { destroySession, getSession } from './sessions';
import { accessTokenKey, tokenType, requestMethod } from './constants';
import { logout, validate } from '../redux-tlkt/reducres/auth.ts';

export const workflowStarted = (dispatch: any) => {
	dispatch(logout());
	destroySession();
};

export const validateSession = async (dispatch: any) => {
	const session = await getSession();
	if (!session) {
		await dispatch(logout());
	} else {
		await dispatch(validate(session.user));
	}
};

export const getAuthToken = () => {
	let token;
	try {
		const credentials = getSession();
		if (credentials?.['token_type'] === tokenType) {
			token = `${requestMethod} ${credentials?.[accessTokenKey]}`;
		}
	} catch {
		token = '';
	}
	return token;
};
