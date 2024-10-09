import api from '../../api.ts';
import { LOGIN_USER, REGISTER_USER } from '../../../constants/endpoints.ts';
import { createSession } from '../../../utils/sessions.ts';
import { ROUTES } from '../../../constants/routes.ts';
import { login } from '../../reducres/auth.ts';
import createToast from '../../../utils/toasts.ts';

const extendedApi = api.injectEndpoints?.({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: ({ argument }) => ({
				url: LOGIN_USER,
				method: 'POST',
				body: argument.data,
			}),
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { navigate, dispatch } = arg.argument;
					if (data.access_token && data.token_type) {
						dispatch(login(data));
						createSession(data);
						navigate(ROUTES.DASHBOARD, { replace: true });
					}
				} catch (e: any) {
					createToast({
						type: 'error',
						description: e.error,
						title: 'An error occurred while logging in',
						actionLabel: 'Ok',
					});
				}
			},
		}),
		register: builder.mutation({
			query: ({ data }) => ({
				url: REGISTER_USER,
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					createToast({
						type: 'success',
						title: 'User created. Please login',
						actionLabel: 'Ok',
					});
				} catch (e: any) {
					createToast({
						type: 'error',
						description: e.error,
						title: 'An error occurred while registering',
						actionLabel: 'Ok',
					});
				}
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = extendedApi;
