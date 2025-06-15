import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
	initialState,
	setUser,
	setAuthChecked,
	login,
	logout,
	register,
	refresh,
	checkUserAuth,
} from './userSlice';
import { getUser } from '../utils/burger-api';
import { TAuthResponse, TUser } from '../utils/types';

const mockUser: TUser = {
	email: 'test@example.com',
	name: 'Test User',
};

const mockAuthResponse: TAuthResponse = {
	success: true,
	user: mockUser,
	accessToken: 'testAccessToken',
	refreshToken: 'testRefreshToken',
};

describe('userSlice', () => {
	it('should return the initial state', () => {
		expect(userReducer(undefined, { type: '' })).toEqual(initialState);
	});

	let store: ReturnType<typeof configureStore>;

	beforeEach(() => {
		store = configureStore({
			reducer: {
				user: userReducer,
			},
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should set user', () => {
		const action = setUser(mockUser);
		const newState = userReducer(undefined, action);
		expect(newState.user).toEqual(mockUser);
	});

	it('should set auth checked', () => {
		const action = setAuthChecked(true);
		const newState = userReducer(undefined, action);
		expect(newState.isAuthChecked).toBe(true);
	});

	it('should handle register', async () => {
		const action = await register.fulfilled(mockAuthResponse, 'test', {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
		});
		const newState = userReducer(undefined, action);
		expect(newState.user).toEqual(mockUser);
	});

	it('should handle login', async () => {
		const action = await login.fulfilled(mockAuthResponse, 'test', {
			email: 'test@example.com',
			password: 'password',
		});
		const newState = userReducer(undefined, action);
		expect(newState.user).toEqual(mockUser);
	});

	it('should handle logout', async () => {
		const previousState = { ...initialState, user: mockUser };
		const action = await logout.fulfilled(undefined, 'test');
		const newState = userReducer(previousState, action);
		expect(newState.user).toBeNull();
	});

	it('should handle refresh', async () => {
		const action = await refresh.fulfilled(
			{ success: true, user: mockUser },
			'test',
			{ name: 'Updated User', email: 'updated@example.com', password: '' }
		);
		const newState = userReducer(undefined, action);
		expect(newState.user).toEqual(mockUser);
	});
});
