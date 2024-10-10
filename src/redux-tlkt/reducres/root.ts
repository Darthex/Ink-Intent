import { combineSlices } from '@reduxjs/toolkit';
import authReducer from './auth.ts';
import articleReducer from './article.ts';

const combinedReducers = combineSlices({
	auth: authReducer,
	article: articleReducer,
});

export default combinedReducers;
