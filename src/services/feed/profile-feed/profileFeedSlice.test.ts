import { configureStore } from '@reduxjs/toolkit';
import reducer, { initialState, getAllOrders } from './profileFeedSlice';
import { onErrorProfileOrders, onMessageProfileOrders } from './actions';
import { TOrdersAllResponse, TOrder } from '../../../utils/types';

const mockOrders: TOrder[] = [
	{
		ingredients: ['ingredient1', 'ingredient2'],
		_id: 'order1',
		name: 'Order 1',
		status: 'done',
		number: 1,
		createdAt: '2025-06-13T10:00:00Z',
		updatedAt: '2025-06-13T10:05:00Z',
	},
	{
		ingredients: ['ingredient3'],
		_id: 'order2',
		name: 'Order 2',
		status: 'pending',
		number: 2,
		createdAt: '2025-06-13T11:00:00Z',
		updatedAt: '2025-06-13T11:05:00Z',
	},
];

const mockOrdersResponse = {
	success: true,
	orders: mockOrders,
} as TOrdersAllResponse;

describe('profileFeedSlice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	let store: ReturnType<typeof configureStore>;
	beforeEach(() => {
		store = configureStore({
			reducer: {
				profileFeed: reducer,
			},
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should handle onErrorProfileOrders action', () => {
		const errorMsg = 'WebSocket connection failed';
		const action = onErrorProfileOrders(errorMsg);
		const newState = reducer(undefined, action);
		expect(newState.error).toBe(errorMsg);
	});

	it('should handle onMessageProfileOrders action', () => {
		const action = onMessageProfileOrders(mockOrdersResponse);
		const newState = reducer(undefined, action);
		expect(newState.orders).toEqual(mockOrdersResponse.orders);
		expect(newState.error).toBeNull();
	});

	it('selector getAllOrders should return orders', () => {
		const testState = {
			profileFeed: {
				orders: mockOrders,
				error: null,
			},
		};
		expect(getAllOrders(testState)).toEqual(mockOrders);
	});
});
