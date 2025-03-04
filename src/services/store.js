import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import orderDetailsSliceReducer from './orderDetailsSlice';

const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: constructorReducer,
		orders: orderDetailsSliceReducer,
	},
});

export default store;
