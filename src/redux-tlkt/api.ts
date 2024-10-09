import axios from 'axios';
import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../utils/workflow.ts';
import { baseUrl } from '../utils/constants.ts';

export const DO_NOT_CACHE_DATA = 0;
export const KEEP_UNUSED_DATA_FOR_SHORT_TIME = 30;
export const KEEP_UNUSED_DATA_FOR_MEDIUM_TIME = 60;
export const KEEP_UNUSED_DATA_FOR_LONG_TIME = 120;

const BASE_URL = baseUrl;

const baseQuery: BaseQueryFn = async (arg) => {
	const { url, method = 'GET', params, body = {}, ...baseFetchOptions } = arg;
	const authToken = getAuthToken();

	axios.defaults.headers.common['Accept'] = 'application/json';
	axios.defaults.headers.common['Authorization'] = authToken;
	axios.defaults.headers.post['Content-Type'] = 'application/json';

	const axiosOptions = {
		...baseFetchOptions,
		method,
	};
	try {
		let finalUrl = `${BASE_URL}${url}`;
		if (params) finalUrl += `?${new URLSearchParams(params).toString()}`;
		if ((method === 'POST' || method === 'PUT') && body) {
			(axiosOptions as any).data = JSON.stringify(body);
		}
		const rawResponse = await axios({
			url: finalUrl,
			...axiosOptions,
		});
		return { data: rawResponse?.data };
	} catch (e: any) {
		return {
			errorCode: e.response?.status,
			error: e.response?.data?.detail,
		};
	}
};

const api = createApi({
	reducerPath: 'api',
	baseQuery,
	keepUnusedDataFor: KEEP_UNUSED_DATA_FOR_SHORT_TIME,
	endpoints: () => ({}),
});

export default api;
