import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
	initialState,
	incrementCounter,
	decrementCounter,
	clearCounters,
	loadIngredients,
} from './ingredientsSlice';

const mockIngredientsResponse = {
	success: true,
	data: [
		{
			_id: '1',
			name: 'Ingredient 1',
			type: 'bun',
			proteins: 10,
			fat: 10,
			carbohydrates: 10,
			calories: 100,
			image: 'image1',
			image_large: 'image_large1',
			image_mobile: 'image_mobile1',
			price: 100,
			__v: 0,
		},
	].map((ingredient) => ({ ...ingredient, counter: 0 })),
};

const createTestIngredient = (id: string, counter: number = 0) => ({
	_id: id,
	name: 'Test Ingredient',
	type: 'bun',
	counter,
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	image: 'test-image-url',
	image_large: 'test-image-large-url',
	image_mobile: 'test-image-mobile-url',
	price: 0,
	__v: 0,
});

describe('ingredientsSlice', () => {
	it('should return the initial state', () => {
		expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
	});

	let store: ReturnType<typeof configureStore>;

	beforeEach(() => {
		store = configureStore({
			reducer: {
				ingredients: ingredientsReducer,
			},
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should loadIngredients', async () => {
		const expectedState = {
			...initialState,
			loading: false,
			hasError: false,
			ingredients: mockIngredientsResponse.data.map((ingredient) => ({
				...ingredient,
				counter: 0,
			})),
		};

		const action = await loadIngredients.fulfilled(
			mockIngredientsResponse,
			'test'
		);
		const newState = ingredientsReducer(undefined, action);
		expect(newState).toEqual(expectedState);
	});

	it('should set loading to true during loadIngredients', () => {
		const action = loadIngredients.pending('test');
		const newState = ingredientsReducer(undefined, action);
		expect(newState.loading).toBe(true);
	});

	it('should handle errors during loading', async () => {
		const expectedState = {
			...initialState,
			loading: false,
			hasError: 'Network Error',
			ingredients: [],
		};

		const action = await loadIngredients.rejected(
			new Error('Network Error'),
			'test'
		);
		const newState = ingredientsReducer(undefined, action);
		expect(newState).toEqual(expectedState);
	});

	it('should handle incrementCounter', () => {
		const previousState = {
			...initialState,
			ingredients: [
				{
					_id: '1',
					type: 'bun',
					counter: 0,
					name: 'Test Ingredient',
					proteins: 0,
					fat: 0,
					carbohydrates: 0,
					calories: 0,
					image: 'test-image-url',
					image_large: 'test-image-large-url',
					image_mobile: 'test-image-mobile-url',
					price: 0,
					__v: 0,
				},
			],
		};

		const action = incrementCounter('1');
		const newState = ingredientsReducer(previousState, action);
		expect(newState.ingredients[0].counter).toBe(2);
	});

	it('should handle decrementCounter', () => {
		const previousState = {
			...initialState,
			ingredients: [createTestIngredient('1', 2)],
		};

		const action = decrementCounter('1');
		const newState = ingredientsReducer(previousState, action);
		expect(newState.ingredients[0].counter).toBe(0);
	});

	it('should handle clearCounters', () => {
		const previousState = {
			...initialState,
			ingredients: [createTestIngredient('1', 3), createTestIngredient('2', 0)],
		};

		const newState = ingredientsReducer(previousState, clearCounters());
		expect(
			newState.ingredients.every((ingredient) => ingredient.counter === 0)
		).toBe(true);
	});
});
