import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { constructorSlice } from './constructorSlice';
import { ingredientsSlice } from './ingredientsSlice';

const rootReducer = combineSlices({
	constructorSlice,
	ingredientsSlice,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
