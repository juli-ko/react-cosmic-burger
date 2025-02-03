import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	reducers: {},
	initialState,
	selectors: {},
	extraReducers: (builder) => {},
});
