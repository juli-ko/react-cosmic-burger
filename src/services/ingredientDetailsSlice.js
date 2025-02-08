import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	item: null,
};

const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		addToDetails: {
			reducer: (state, action) => {
				state.item = action.payload;
			},
		},
		removeFromDetails: {
			reducer: (state) => {
				state.item = null;
			},
		},
	},
	selectors: {
		getItemData: (state) => state.item,
	},
});

export const { getItemData } = ingredientDetailsSlice.selectors;
export const { addToDetails, removeFromDetails } =
	ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
