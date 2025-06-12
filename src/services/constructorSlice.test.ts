import { TConstructorIngredient } from '../utils/types';
import constructorReducer, {
	addToConstructor,
	clearConstructor,
	initialState,
	moveItem,
	removeItemFromConstructor,
	TInitialState,
} from './constructorSlice';

describe('constructorSlice', () => {
	it('should return the initial state', () => {
		expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle addToConstructor for bun', () => {
		const bun = {
			_id: '1',
			type: 'bun',
			name: 'Test Bun',
		} as TConstructorIngredient;

		const action = addToConstructor(bun);
		const newState = constructorReducer(initialState, action);
		expect(newState.bun).toEqual({ ...bun, key: expect.any(String) });
	});

	it('should handle addToConstructor for item', () => {
		const ingredient = {
			_id: '2',
			type: 'sauce',
			name: 'Test Sauce',
		} as TConstructorIngredient;

		const action = addToConstructor(ingredient);
		const newState = constructorReducer(initialState, action);
		expect(newState.items).toHaveLength(1);
		expect(newState.items[0]).toEqual({
			...ingredient,
			key: expect.any(String),
		});
	});

	it('should handle removeItemFromConstructor', () => {
		const initialState = {
			items: [{ key: '12345' }, { key: '67890' }],
			bun: null,
		} as unknown as TInitialState;

		const ingredient = { key: '12345' } as unknown as TConstructorIngredient;
		const action = removeItemFromConstructor(ingredient);
		const newState = constructorReducer(initialState, action);
		expect(newState.items).toHaveLength(1);
		expect(newState.items).toEqual([{ key: '67890' }]);
	});

	it('should move Item', () => {
		const initialState = {
			items: [{ key: '12345' }, { key: '67890' }],
			bun: null,
		} as unknown as TInitialState;

		const dragIndex = 0;
		const hoverIndex = 1;
		const action = moveItem({ dragIndex, hoverIndex });
		const newState = constructorReducer(initialState, action);
		expect(newState.items).toHaveLength(2);
		expect(newState.items).toEqual([{ key: '67890' }, { key: '12345' }]);
	});

	it('should clear constructor', () => {
		const initialState = {
			items: [{ key: '12345' }, { key: '67890' }],
			bun: null,
		} as unknown as TInitialState;

		const action = clearConstructor();
		const newState = constructorReducer(initialState, action);
		expect(newState.items).toHaveLength(0);
	});
});
