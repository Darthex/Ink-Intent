import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: {},
};

const fetchedArticleReducer = createSlice({
	name: 'Article',
	initialState,
	reducers: {
		fetchArticleSuccess: (state, action) => {
			state.articles = {
				...state.articles,
				[action.payload.id]: action.payload.data,
			};
		},
	},
});

export default fetchedArticleReducer.reducer;
export const { fetchArticleSuccess } = fetchedArticleReducer.actions;
