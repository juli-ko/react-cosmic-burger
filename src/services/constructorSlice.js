import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	bun: null,
};

const constructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addToConstructor: {
			reducer: (state, action) => {
				const item = action.payload;
				if (item.type === 'bun') {
					state.bun = item;
				} else {
					state.items.push(action.payload);
				}
			},
			prepare: (ingredient) => {
				const key = nanoid();
				return { payload: { ...ingredient, key } };
			},
		},
	},
	selectors: {
		getConstructorIngredients: (state) => state.items,
		getConstructorBun: (state) => state.bun,
	},
});

export const { getConstructorIngredients, getConstructorBun } =
	constructorSlice.selectors;
export const { addToConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
