import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import urlReducer from './urlReducer';

export type Action = {
	type: string;
	payload?: any;
};

type UseUrlDispatchProps = {
	replace?: boolean;
	locationState?: any;
};

const useUrlDispatch = ({
	replace = false,
	locationState,
}: UseUrlDispatchProps = {}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useCallback(
		(action: Action) => {
			const { pathname, search } = location;
			const newUrl = urlReducer({ pathname, search }, action);
			if (`${pathname}${search}` !== newUrl) {
				navigate(newUrl, {
					replace,
					state: locationState || null,
				});
			}
		},
		[location, navigate, replace, locationState]
	);
	return {
		dispatch,
	};
};

export default useUrlDispatch;
