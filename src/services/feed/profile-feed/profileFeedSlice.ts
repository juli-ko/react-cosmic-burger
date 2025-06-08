import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { onErrorProfileOrders, onMessageProfileOrders } from './actions';

type TInitialState = {
	orders: TOrder[];
	error: string | null;
};

const initialState: TInitialState = {
	orders: [],
	error: null,
};

export const profileFeedSlice = createSlice({
	name: 'profileFeed',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(onErrorProfileOrders, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessageProfileOrders, (state, action) => {
				state.orders = action.payload.orders;
			});
	},
	selectors: {
		getAllOrders: (state) => state.orders,
	},
});

export const { getAllOrders } = profileFeedSlice.selectors;
export default profileFeedSlice.reducer;
