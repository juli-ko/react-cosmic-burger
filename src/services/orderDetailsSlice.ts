import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrder, fetchOrderByNumber } from '../utils/burger-api';
import { TOrder } from '../utils/types';

type TInitialState = {
	orderNumber: number | null;
	orderDetails: TOrder | null | undefined;
	hasError: boolean | string;
	loading: boolean;
};

export const initialState: TInitialState = {
	orderNumber: null,
	orderDetails: null,
	hasError: false,
	loading: false,
};

export const loadOrders = createAsyncThunk('orders/loadOrders', fetchOrder);
export const getOrderByNumber = createAsyncThunk(
	'orders/getOrderByNumber',
	fetchOrderByNumber
);

const orderDetailsSlice = createSlice({
	name: 'orders',
	reducers: {
		removeOrderNum: (state) => {
			state.orderNumber = null;
			state.hasError = false;
		},
	},
	initialState,
	selectors: {
		getOrderLoading: (state) => state.loading,
		getOrderError: (state) => state.hasError,
		getOrderNumber: (state) => state.orderNumber,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadOrders.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadOrders.rejected, (state, action) => {
				state.loading = false;
				state.hasError = action.error?.message || 'Unknown error';
			})
			.addCase(loadOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.orderNumber = action.payload.order.number;
			})
			.addCase(getOrderByNumber.rejected, (state, action) => {
				state.loading = false;
				state.hasError = action.error?.message || 'Unknown error';
			})
			.addCase(getOrderByNumber.fulfilled, (state, action) => {
				state.loading = false;
				state.orderDetails = action.payload.orders[0];
			});
	},
});

export const { getOrderNumber, getOrderError, getOrderLoading } =
	orderDetailsSlice.selectors;
export const { removeOrderNum } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
