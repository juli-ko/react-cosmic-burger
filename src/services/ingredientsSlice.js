import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
	reducers: {
		incrementCounter: (state, action) => {
			const ingredient = state.ingredients.find(
				(item) => item._id === action.payload
			);
			if (ingredient) {
				if (ingredient.type === 'bun') {
					state.ingredients.map((item) => {
						if (item.type === 'bun') item.counter = 0;
					});
					ingredient.counter += 1;
				}
				ingredient.counter += 1;
			}
		},
		decrementCounter: (state, action) => {
			const ingredient = state.ingredients.find(
				(item) => item._id === action.payload
			);
			if (ingredient && ingredient.counter > 0) {
				if (ingredient.type === 'bun') {
					ingredient.counter -= 1;
				}
				ingredient.counter -= 1;
			}
		},
		clearCounters: (state, action) => {
			state.ingredients.map((ingredient) => (ingredient.counter = 0));
		},
	},
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
				state.ingredients = action.payload.data.map((ingredient) => ({
					...ingredient,
					counter: 0,
				}));
			});
	},
});

export const {
	getIngredientsLoading,
	getIngredientsError,
	getIngredientsData,
	getIngredientById,
} = ingredientsSlice.selectors;
export const { incrementCounter, decrementCounter, clearCounters } =
	ingredientsSlice.actions;
export default ingredientsSlice.reducer;
