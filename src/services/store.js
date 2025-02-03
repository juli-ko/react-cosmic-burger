import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';

const store = configureStore({
	reducer: {
		burgerConstructor: constructorReducer,
		ingredients: ingredientsReducer,
	},
});

export default store;
