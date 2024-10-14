import { combineSlices } from '@reduxjs/toolkit';
import authReducer from './auth.ts';
import articleReducer from './article.ts';
import fetchedArticle from './fetchedArticle.ts';

const combinedReducers = combineSlices({
	auth: authReducer,
	article: articleReducer,
	fetchedArticle: fetchedArticle,
});

export default combinedReducers;
