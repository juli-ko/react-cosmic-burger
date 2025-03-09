import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchLogin,
	fetchLogout,
	fetchRegister,
	getUser,
} from '../utils/burger-api';

const initialState = {
	user: null,
	isAuthChecked: false,
};

export const register = createAsyncThunk('user/register', async (formData) =>
	fetchRegister(formData)
);
export const login = createAsyncThunk('user/login', async (formData) =>
	fetchLogin(formData)
);
export const logout = createAsyncThunk('user/logout', async () => {
	await fetchLogout();
});
export const checkUserAuth = createAsyncThunk(
	'user/checkAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			getUser()
				.then((res) => dispatch(setUser(res.user)))
				.finally(() => dispatch(setAuthChecked(true)));
		} else {
			dispatch(setAuthChecked(true));
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	reducers: {
		setAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	initialState,
	selectors: {
		getUserInfo: (state) => state.user,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload.user;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.user = null;
			});
	},
});

export const { getUserInfo } = userSlice.selectors;
export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
