import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import ingredientDetailsReducer from './ingredientDetailsSlice';
import orderDetailsSliceReducer from './orderDetailsSlice';

const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: constructorReducer,
		ingredientDetails: ingredientDetailsReducer,
		orders: orderDetailsSliceReducer,
	},
});

export default store;
