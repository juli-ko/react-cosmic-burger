import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';

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
					state.items.push(item);
				}
			},
			prepare: (ingredient) => {
				const key = nanoid();
				return { payload: { ...ingredient, key } };
			},
		},
		removeItemFromConstructor: {
			reducer: (state, action) => {
				state.items = state.items.filter(
					(item) => item.key !== action.payload.key
				);
			},
		},
	},
	selectors: {
		getConstructorIngredients: (state) => state.items,
		getConstructorBun: (state) => state.bun,
		getConstructorIds: createSelector(
			(state) => state.items,
			(state) => state.bun,
			(items, bun) => {
				const ids = bun ? [bun._id] : [];
				if (items.length > 0) {
					return [...ids, ...items.map((item) => item._id)];
				}
				return ids;
			}
		),
	},
});

export const {
	getConstructorIngredients,
	getConstructorBun,
	getConstructorIds,
} = constructorSlice.selectors;
export const { addToConstructor, removeItemFromConstructor } =
	constructorSlice.actions;
export default constructorSlice.reducer;
