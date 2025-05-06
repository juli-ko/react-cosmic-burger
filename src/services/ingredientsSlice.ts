import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredients } from '../utils/burger-api';
import { TData, TIngredientResponse } from '../utils/types';

type TInitialState = {
	ingredients: TData;
	hasError: boolean | string;
	loading: boolean;
};

const initialState: TInitialState = {
	ingredients: [],
	hasError: false,
	loading: false,
};

export const loadIngredients = createAsyncThunk<TIngredientResponse>(
	'ingredients/loadIngredients',
	async () => {
		return fetchIngredients();
	}
);

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		incrementCounter: (state, action: PayloadAction<string>) => {
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
		decrementCounter: (state, action: PayloadAction<string>) => {
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
		clearCounters: (state) => {
			state.ingredients.map((ingredient) => (ingredient.counter = 0));
		},
	},
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
} = ingredientsSlice.selectors;
export const { incrementCounter, decrementCounter, clearCounters } =
	ingredientsSlice.actions;
export default ingredientsSlice.reducer;
