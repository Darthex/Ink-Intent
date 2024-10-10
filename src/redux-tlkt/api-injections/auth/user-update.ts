import api from '../../api.ts';
import { UPDATE_USER } from '../../../constants/endpoints.ts';

const extendedApi = api.injectEndpoints?.({
	endpoints: (builder) => ({
		userUpdate: builder.mutation({
			query: ({ data }) => ({
				url: UPDATE_USER,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useUserUpdateMutation } = extendedApi;
