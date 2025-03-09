import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import orderDetailsSliceReducer from './orderDetailsSlice';
import userReducer from './userSlice';

const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: constructorReducer,
		orders: orderDetailsSliceReducer,
		user: userReducer,
	},
});

export default store;
