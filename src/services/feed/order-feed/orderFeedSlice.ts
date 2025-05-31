import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { onError, onMessage } from './actions';

type TInitialState = {
	orders: TOrder[];
	total: number | null;
	totalToday: number | null;
	error: string | null;
};

const initialState: TInitialState = {
	orders: [],
	total: null,
	totalToday: null,
	error: null,
};

export const orderFeedSlice = createSlice({
	name: 'orderFeed',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.orders = action.payload.orders;
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
			});
	},
	selectors: {
		getAllOrders: (state) => state.orders,
		getTotalOrders: (state) => state.total,
		getTotalToday: (state) => state.totalToday,
	},
});

export const { getAllOrders, getTotalOrders, getTotalToday } =
	orderFeedSlice.selectors;
export default orderFeedSlice.reducer;
