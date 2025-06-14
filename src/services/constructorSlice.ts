import {
	createSlice,
	createSelector,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../utils/types';

export type TInitialState = {
	items: TConstructorIngredient[];
	bun: TIngredient | null;
};

export const initialState: TInitialState = {
	items: [],
	bun: null,
};

const constructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addToConstructor: {
			prepare: (ingredient: TIngredient) => {
				const key = nanoid();
				return { payload: { ...ingredient, key } };
			},
			reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
				const item = action.payload;
				if (item.type === 'bun') {
					state.bun = item;
				} else {
					state.items.push(item);
				}
			},
		},
		removeItemFromConstructor: (
			state,
			action: PayloadAction<TConstructorIngredient>
		) => {
			state.items = state.items.filter(
				(item) => item.key !== action.payload.key
			);
		},
		moveItem: (
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			const { dragIndex, hoverIndex } = action.payload;
			const dragItem = state.items[dragIndex];
			state.items.splice(dragIndex, 1);
			state.items.splice(hoverIndex, 0, dragItem);
		},
		clearConstructor: (state) => {
			state.items = [];
			state.bun = null;
		},
	},
	selectors: {
		getConstructorIngredients: (state) => state.items,
		getConstructorBun: (state) => state.bun,
		getConstructorIds: createSelector(
			(state: TInitialState) => state.items,
			(state: TInitialState) => state.bun,
			(items, bun) => {
				if (bun) {
					return [bun._id, ...items.map((item) => item._id), bun._id];
				}
				return items.map((item) => item._id);
			}
		),
	},
});

export const {
	getConstructorIngredients,
	getConstructorBun,
	getConstructorIds,
} = constructorSlice.selectors;
export const {
	addToConstructor,
	removeItemFromConstructor,
	moveItem,
	clearConstructor,
} = constructorSlice.actions;
export default constructorSlice.reducer;
