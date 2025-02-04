import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrder } from '../utils/burger-api';

const initialState = {
	orderNumber: '',
	hasError: false,
	loading: false,
};

export const loadOrders = createAsyncThunk(
	'orders/loadOrders',
	async (idsArr) => fetchOrder(idsArr)
);

const orderDetailsSlice = createSlice({
	name: 'orders',
	reducers: {
		removeOrderNum: (state) => {
			state.orderNumber = '';
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
			});
	},
});

export const { getOrderNumber, getOrderError, getOrderLoading } =
	orderDetailsSlice.selectors;
export const { removeOrderNum } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
