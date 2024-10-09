import { combineSlices } from '@reduxjs/toolkit';
import authReducer from './auth.ts';

const combinedReducers = combineSlices({
	auth: authReducer,
});

export default combinedReducers;
