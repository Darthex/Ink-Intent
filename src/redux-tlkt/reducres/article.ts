import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	article: '',
};

const articleReducer = createSlice({
	name: 'Article',
	initialState,
	reducers: {
		updateArticle: (state, action) => {
			state.article = action.payload;
		},
	},
});

export default articleReducer.reducer;
export const { updateArticle } = articleReducer.actions;
