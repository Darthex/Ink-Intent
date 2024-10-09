import { configureStore, combineReducers } from '@reduxjs/toolkit';
import combinedReducers from './reducres/root.ts';
import api from './api.ts';

const appReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	root: combinedReducers,
});

const store = configureStore({
	reducer: appReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
