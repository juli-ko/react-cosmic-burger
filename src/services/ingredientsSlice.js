import {
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import { fetchIngredients } from '../utils/burger-api';

const initialState = {
	ingredients: [],
	hasError: false,
	loading: false,
};

export const loadIngredients = createAsyncThunk(
	'ingredients/loadIngredients',
	async () => {
		return fetchIngredients();
	}
);

const ingredientsSlice = createSlice({
	name: 'ingredients',
	reducers: {},
	initialState,
	selectors: {
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.hasError,
		getIngredientsData: (state) => state.ingredients,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.hasError = action.error?.message || 'Unknown error';
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.ingredients = action.payload.data;
			});
	},
});

export const {
	getIngredientsLoading,
	getIngredientsError,
	getIngredientsData,
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
