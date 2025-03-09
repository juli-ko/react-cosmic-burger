import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout, fetchRegister } from '../utils/burger-api';

const initialState = {
	user: null,
	isUserAuth: false,
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
	'user/checkUserAuth',
	async () => {
		return;
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
		getUser: (state) => state.user,
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

export const { getUser } = userSlice.selectors;
export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
