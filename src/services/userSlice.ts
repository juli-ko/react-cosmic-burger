import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchLogin,
	fetchLogout,
	fetchRegister,
	getUser,
	refreshUser,
} from '../utils/burger-api';
import { TAuthResponse, TFormData, TUser } from '../utils/types';

type TInitialState = {
	user: TUser | null;
	isAuthChecked: boolean;
};

export const initialState: TInitialState = {
	user: null,
	isAuthChecked: false, // isAuthChecked флаг, показывающий что проверка токена произведена при этом результат проверки не имеет значения
};

export const register = createAsyncThunk<
	TAuthResponse,
	Pick<TFormData, 'name' | 'email' | 'password'>
>('user/register', async (formData) => fetchRegister(formData));
export const login = createAsyncThunk<
	TAuthResponse,
	Pick<TFormData, 'email' | 'password'>
>('user/login', async (formData) => fetchLogin(formData));
export const logout = createAsyncThunk('user/logout', async () => {
	await fetchLogout();
});
export const refresh = createAsyncThunk<
	Pick<TAuthResponse, 'user' | 'success'>,
	Pick<TFormData, 'name' | 'email' | 'password'>
>('user/refreshUser', async (formData) => {
	return await refreshUser(formData);
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
		setAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		setUser: (state, action: PayloadAction<TUser>) => {
			state.user = action.payload;
		},
	},
	initialState,
	selectors: {
		getUserInfo: (state) => state.user,
		getUserAuth: (state) => state.isAuthChecked,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload.user;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(refresh.fulfilled, (state, action) => {
				state.user = action.payload.user;
			});
	},
});

export const { getUserInfo, getUserAuth } = userSlice.selectors;
export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
