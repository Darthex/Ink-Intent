import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	loading: false,
	user: {},
};

const authReducer = createSlice({
	name: 'Auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
		},
		validate: (state, action: any) => {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		login: (state, action: any) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload.user;
		},
	},
});

export default authReducer.reducer;
export const { logout, validate, login } = authReducer.actions;
