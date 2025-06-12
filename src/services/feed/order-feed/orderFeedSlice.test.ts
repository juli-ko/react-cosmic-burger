import { configureStore } from '@reduxjs/toolkit';
import reducer, {
	initialState,
	getAllOrders,
	getTotalOrders,
	getTotalToday,
} from './orderFeedSlice';
import { onError, onMessage } from './actions';
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

const mockOrdersResponse: TOrdersAllResponse = {
	success: true,
	orders: mockOrders,
	total: 150,
	totalToday: 25,
};

describe('orderFeedSlice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	let store: ReturnType<typeof configureStore>;
	beforeEach(() => {
		store = configureStore({
			reducer: {
				orderFeed: reducer,
			},
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should handle onError action', () => {
		const errorMsg = 'WebSocket connection failed';
		const action = onError(errorMsg);
		const newState = reducer(undefined, action);
		expect(newState.error).toBe(errorMsg);
	});

	it('should handle onMessage action', () => {
		const action = onMessage(mockOrdersResponse);
		const newState = reducer(undefined, action);
		expect(newState.orders).toEqual(mockOrdersResponse.orders);
		expect(newState.total).toBe(mockOrdersResponse.total);
		expect(newState.totalToday).toBe(mockOrdersResponse.totalToday);
		expect(newState.error).toBeNull();
	});

	it('selectors should return correct slices of state', () => {
		const testState = {
			orderFeed: {
				orders: mockOrders,
				total: 150,
				totalToday: 25,
				error: null,
			},
		};

		expect(getAllOrders(testState)).toEqual(mockOrders);
		expect(getTotalOrders(testState)).toBe(150);
		expect(getTotalToday(testState)).toBe(25);
	});
});
