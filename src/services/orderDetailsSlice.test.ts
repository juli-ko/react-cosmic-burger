import { configureStore } from '@reduxjs/toolkit';
import orderDetailsReducer, {
	initialState,
	loadOrders,
	getOrderByNumber,
	removeOrderNum,
} from './orderDetailsSlice';
import { TOrderByNumberResponse, TOrderResponse } from '../utils/types';

const mockOrdersResponse: TOrderResponse = {
	success: true,
	order: {
		number: 12345,
	},
};

const mockOrderDetailsResponse: TOrderByNumberResponse = {
	success: true,
	orders: [
		{
			ingredients: ['12345'],
			_id: '12345',
			name: 'name',
			status: 'created',
			number: 12345,
			createdAt: '12345',
			updatedAt: '12345',
		},
	],
};

describe('orderDetailsSlice', () => {
	it('should return the initial state', () => {
		expect(orderDetailsReducer(undefined, { type: '' })).toEqual(initialState);
	});

	let store: ReturnType<typeof configureStore>;
	beforeEach(() => {
		store = configureStore({
			reducer: {
				orders: orderDetailsReducer,
			},
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should load order', async () => {
		const expectedState: typeof initialState = {
			...initialState,
			loading: false,
			hasError: false,
			orderNumber: 12345,
		};

		const action = await loadOrders.fulfilled(mockOrdersResponse, 'test', [
			'12345',
		]);
		const newState = orderDetailsReducer(undefined, action);
		expect(newState).toEqual(expectedState);
	});

	it('should set loading to true during loading', () => {
		const action = loadOrders.pending('test', ['12345']);
		const newState = orderDetailsReducer(undefined, action);
		expect(newState.loading).toBe(true);
	});

	it('should handle errors during loading', async () => {
		const expectedState: typeof initialState = {
			...initialState,
			loading: false,
			hasError: 'Network Error',
			orderNumber: null,
		};

		const action = await loadOrders.rejected(
			new Error('Network Error'),
			'test',
			['12345']
		);
		const newState = orderDetailsReducer(undefined, action);
		expect(newState).toEqual(expectedState);
	});

	it('should handle getOrderByNumber', async () => {
		const expectedState = {
			...initialState,
			orderDetails: {
				ingredients: ['12345'],
				_id: '12345',
				name: 'name',
				status: 'created',
				number: 12345,
				createdAt: '12345',
				updatedAt: '12345',
			},
			loading: false,
			hasError: false,
		};

		const action = await getOrderByNumber.fulfilled(
			mockOrderDetailsResponse,
			'test',
			'12345'
		);
		const newState = orderDetailsReducer(undefined, action);
		expect(newState).toEqual(expectedState);
	});

	it('should handle errors during loading order by number', async () => {
		const expectedState = {
			...initialState,
			loading: false,
			hasError: 'Network Error',
		};

		const action = await getOrderByNumber.rejected(
			new Error('Network Error'),
			'test',
			'12345'
		);
		const newState = orderDetailsReducer(undefined, action);
		expect(newState).toEqual(expectedState);
	});

	it('should remove order', () => {
		const previousState = {
			...initialState,
			orderNumber: 12345,
			hasError: false,
		};

		const action = removeOrderNum();
		const newState = orderDetailsReducer(previousState, action);
		expect(newState.orderNumber).toEqual(null);
	});
});
